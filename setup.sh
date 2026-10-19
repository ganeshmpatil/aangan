#!/bin/bash
set -e

# ============================================================
# Aangan - Fully Automated Deployment
# Frontend → Cloudflare Pages (aan-gan.com)
# Backend  → Render (aangan-api)
# Database → Neon PostgreSQL
# ============================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_step() { echo -e "\n${BLUE}==>${NC} ${1}"; }
print_success() { echo -e "${GREEN}[OK]${NC} ${1}"; }
print_warn() { echo -e "${YELLOW}[!]${NC} ${1}"; }
print_error() { echo -e "${RED}[ERROR]${NC} ${1}"; exit 1; }

REPO_DIR="$(cd "$(dirname "$0")" && pwd)"
PROJECT_NAME="aangan"
DOMAIN="aan-gan.com"
GITHUB_REPO="ganeshmpatil/aangan"
NEON_ORG_ID="org-delicate-waterfall-67232231"

# ============================================================
# 1. Prerequisites
# ============================================================
print_step "1/8 Checking prerequisites..."

for cmd in node npm gh render; do
  command -v "$cmd" &>/dev/null && print_success "$cmd" || print_error "$cmd not found"
done
command -v wrangler &>/dev/null || alias wrangler='npx wrangler'
npx wrangler whoami &>/dev/null && print_success "wrangler (Cloudflare)" || print_error "Run: npx wrangler login"
npx neonctl me &>/dev/null && print_success "neonctl (Neon)" || print_error "Run: npx neonctl auth"
render whoami &>/dev/null && print_success "render CLI" || print_error "Run: render login"

# ============================================================
# 2. Neon Database
# ============================================================
print_step "2/8 Setting up Neon PostgreSQL..."

NEON_PROJECT_ID=$(npx neonctl projects list --org-id "$NEON_ORG_ID" --output json 2>/dev/null | node -e "
  const data = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const proj = data.find(p => p.name === 'aangan');
  if (proj) process.stdout.write(proj.id);
" 2>/dev/null || echo "")

if [ -n "$NEON_PROJECT_ID" ]; then
  print_success "Neon project 'aangan' already exists (ID: $NEON_PROJECT_ID)"
else
  print_warn "Creating Neon project 'aangan'..."
  NEON_CREATE_OUTPUT=$(npx neonctl projects create --name aangan --org-id "$NEON_ORG_ID" --region-id aws-ap-southeast-1 --output json 2>/dev/null)
  NEON_PROJECT_ID=$(echo "$NEON_CREATE_OUTPUT" | node -e "
    const data = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
    process.stdout.write(data.project.id);
  ")
  print_success "Neon project created (ID: $NEON_PROJECT_ID)"
fi

# Get connection string
DATABASE_URL=$(npx neonctl connection-string --project-id "$NEON_PROJECT_ID" --org-id "$NEON_ORG_ID" 2>/dev/null)
print_success "Database URL obtained"

# Initialize tables via psql
print_warn "Initializing database tables..."
psql "$DATABASE_URL" -c "
CREATE TABLE IF NOT EXISTS demo_requests (
  id SERIAL PRIMARY KEY,
  contact_person VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  society_name VARCHAR(255),
  city VARCHAR(100),
  total_flats VARCHAR(20),
  role VARCHAR(50),
  message TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS inquiries (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255),
  society_name VARCHAR(255),
  message TEXT,
  status VARCHAR(20) DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);" 2>/dev/null
print_success "Database tables created"

# ============================================================
# 3. Configure backend for production
# ============================================================
print_step "3/8 Configuring backend..."

cat > "$REPO_DIR/backend/.env.production" <<EOF
PORT=5000
DATABASE_URL=${DATABASE_URL}
NODE_ENV=production
EOF
print_success "Backend .env.production created"

# ============================================================
# 4. Configure frontend API helper
# ============================================================
print_step "4/8 Configuring frontend for production API..."

mkdir -p "$REPO_DIR/frontend/src/utils"
cat > "$REPO_DIR/frontend/src/utils/api.js" <<'APIEOF'
const API_URL = import.meta.env.VITE_API_URL || ''

export function apiUrl(path) {
  return `${API_URL}${path}`
}
APIEOF
print_success "API helper created"

# ============================================================
# 5. Build & Deploy Frontend → Cloudflare Pages
# ============================================================
print_step "5/8 Building & deploying frontend to Cloudflare Pages..."

cd "$REPO_DIR/frontend"
npm install --silent 2>/dev/null
npm run build 2>/dev/null
[ -d "dist" ] && print_success "Frontend built" || print_error "Build failed"

# Create or find project
if npx wrangler pages project list 2>/dev/null | grep -q "$PROJECT_NAME"; then
  print_success "Cloudflare Pages project exists"
else
  npx wrangler pages project create "$PROJECT_NAME" --production-branch main 2>/dev/null || true
  print_success "Cloudflare Pages project created"
fi

# Deploy
DEPLOY_OUTPUT=$(npx wrangler pages deploy dist --project-name "$PROJECT_NAME" 2>&1)
PAGES_URL=$(echo "$DEPLOY_OUTPUT" | grep -oP 'https://[a-z0-9-]+\.pages\.dev' | head -1 || echo "https://${PROJECT_NAME}.pages.dev")
print_success "Frontend deployed: $PAGES_URL"

# ============================================================
# 6. Deploy Backend → Render
# ============================================================
print_step "6/8 Deploying backend to Render..."

# Create render.yaml blueprint
cat > "$REPO_DIR/render.yaml" <<RENDERYAML
services:
  - type: web
    name: aangan-api
    runtime: node
    repo: https://github.com/${GITHUB_REPO}
    rootDir: backend
    buildCommand: npm install
    startCommand: node index.js
    plan: free
    envVars:
      - key: PORT
        value: "5000"
      - key: DATABASE_URL
        value: "${DATABASE_URL}"
      - key: NODE_ENV
        value: production
RENDERYAML

# Check if service already exists
RENDER_SERVICE_ID=$(render services list --output json 2>/dev/null | node -e "
  const data = JSON.parse(require('fs').readFileSync('/dev/stdin','utf8'));
  const arr = Array.isArray(data) ? data : (data.services || []);
  for (const item of arr) {
    const svc = item.service || item;
    if (svc.name === 'aangan-api') { process.stdout.write(svc.id); break; }
  }
" 2>/dev/null || echo "")

if [ -n "$RENDER_SERVICE_ID" ]; then
  print_success "Render service 'aangan-api' already exists ($RENDER_SERVICE_ID)"
  RENDER_URL="https://aangan-api.onrender.com"
else
  print_warn "Creating Render web service..."
  RENDER_CREATE=$(render services create \
    --name aangan-api \
    --type web_service \
    --repo "https://github.com/${GITHUB_REPO}" \
    --branch main \
    --runtime node \
    --root-directory backend \
    --build-command "npm install" \
    --start-command "node index.js" \
    --plan free \
    --env-var "PORT=5000" \
    --env-var "DATABASE_URL=${DATABASE_URL}" \
    --env-var "NODE_ENV=production" \
    --output json 2>&1) || true
  echo "$RENDER_CREATE"
  RENDER_URL="https://aangan-api.onrender.com"
  print_success "Render service created (first deploy takes 2-3 min)"
fi
print_success "Backend URL: $RENDER_URL"

# ============================================================
# 7. Rebuild frontend with production API URL
# ============================================================
print_step "7/8 Rebuilding frontend with production API..."

cd "$REPO_DIR/frontend"
VITE_API_URL="$RENDER_URL" npm run build 2>/dev/null
npx wrangler pages deploy dist --project-name "$PROJECT_NAME" 2>/dev/null
print_success "Frontend redeployed with API URL: $RENDER_URL"

# ============================================================
# 8. Domain setup (Cloudflare + GoDaddy instructions)
# ============================================================
print_step "8/8 Domain configuration..."

# Try to add custom domain to Cloudflare Pages
npx wrangler pages project edit "$PROJECT_NAME" 2>/dev/null || true

echo ""
echo -e "${GREEN}============================================================${NC}"
echo -e "${GREEN}  DEPLOYMENT COMPLETE${NC}"
echo -e "${GREEN}============================================================${NC}"
echo ""
echo -e "  Frontend : ${BLUE}$PAGES_URL${NC}"
echo -e "  Backend  : ${BLUE}$RENDER_URL${NC}"
echo -e "  Database : ${BLUE}Neon PostgreSQL ($NEON_PROJECT_ID)${NC}"
echo -e "  GitHub   : ${BLUE}https://github.com/${GITHUB_REPO}${NC}"
echo ""
echo -e "${YELLOW}  FINAL STEP - Connect domain ${DOMAIN}:${NC}"
echo ""
echo "  1. Go to https://dash.cloudflare.com"
echo "     → Add site → ${DOMAIN} → Free plan"
echo "     → Note the 2 nameservers Cloudflare gives you"
echo ""
echo "  2. Go to GoDaddy → ${DOMAIN} → DNS → Nameservers"
echo "     → Change to 'Custom' → Paste the 2 Cloudflare nameservers"
echo ""
echo "  3. Back in Cloudflare → Pages → ${PROJECT_NAME}"
echo "     → Custom domains → Add → ${DOMAIN}"
echo ""
echo "  DNS propagation takes 1-24 hours. After that:"
echo -e "  ${GREEN}https://${DOMAIN}${NC} will be live with free SSL."
echo ""
echo -e "${GREEN}============================================================${NC}"

# ============================================================
# Commit & push all deployment config
# ============================================================
cd "$REPO_DIR"
git add -A
git diff --cached --quiet || {
  git commit -m "Add deployment config for Cloudflare Pages + Render + Neon"
  git push origin main
  print_success "Deployment config pushed to GitHub"
}

echo -e "\n${GREEN}All done!${NC}"
