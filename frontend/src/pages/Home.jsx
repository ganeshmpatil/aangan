import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Link } from 'react-router-dom'
import {
  Building2, Shield, CreditCard, Users, Bell, BarChart3,
  Wrench, FileText, ArrowRight, CheckCircle2, Phone,
  Car, CalendarDays, Vote, Lightbulb, DoorOpen, ScrollText,
  Mail, AlertTriangle, Smartphone, Globe, Lock, Warehouse,
  UserCheck, ClipboardList, Landmark, Receipt, BookOpen,
  Megaphone, HandCoins, BadgeCheck, Cog, ChevronDown, ChevronUp,
  CircleDot, Boxes, GraduationCap, ShieldCheck, PenSquare
} from 'lucide-react'

const featureCategories = [
  {
    id: 'residents',
    title: 'Resident & Flat Management',
    color: 'bg-blue-500',
    features: [
      { icon: Users, title: 'Resident Directory', desc: 'Searchable directory with member profiles, contact info, flat assignments, and family details.' },
      { icon: Building2, title: 'Flat Registry', desc: 'Complete flat inventory with wing, floor, area (sqft), and owner tracking.' },
      { icon: DoorOpen, title: 'Tenant & Move In/Out', desc: 'Track rental tenants, agreements, move-in approvals, and move-out workflows.' },
      { icon: UserCheck, title: 'Ownership Records', desc: 'Track ownership history, transfers, share certificates, and purchase dates.' },
    ],
  },
  {
    id: 'finance',
    title: 'Financial Management',
    color: 'bg-green-500',
    features: [
      { icon: CreditCard, title: 'Maintenance Billing', desc: 'Auto-generate monthly bills with multiple charge heads -- maintenance, sinking fund, water, repairs.' },
      { icon: Receipt, title: 'Payment Tracking', desc: 'Record payments via cash, cheque, bank transfer. Receipt generation and pending dues tracking.' },
      { icon: BarChart3, title: 'Accounting & Reports', desc: 'Double-entry bookkeeping, journal entries, account heads, and audit-ready financial statements.' },
      { icon: Landmark, title: 'Budget Management', desc: 'Annual budget planning, budget vs actual comparison, and financial year segregation.' },
      { icon: HandCoins, title: 'Vendor Payments', desc: 'Track vendor invoices, payment history, and AMC contract renewals.' },
      { icon: PenSquare, title: 'Flat Charge Overrides', desc: 'Custom billing exceptions for specific flats with reason tracking and effective dates.' },
    ],
  },
  {
    id: 'governance',
    title: 'Governance & Democracy',
    color: 'bg-purple-500',
    features: [
      { icon: CalendarDays, title: 'Meeting Management', desc: 'Schedule AGM, SGM, committee meetings with agenda, minutes, action items, and attendance.' },
      { icon: Vote, title: 'Polls & Voting', desc: 'Create polls with multiple options, anonymous voting, real-time results, and bilingual support.' },
      { icon: Lightbulb, title: 'Suggestions Box', desc: 'Residents submit ideas, upvote suggestions, and committee responds with status updates.' },
      { icon: ScrollText, title: 'Society Bylaws', desc: 'Digital bylaws organized by sections, version control, amendments with bilingual content.' },
      { icon: ClipboardList, title: 'Decisions Log', desc: 'Flattened view of all meeting decisions, action items with owner and due date tracking.' },
      { icon: BadgeCheck, title: 'Elections', desc: 'Conduct committee elections -- nominations, voting rounds, and result declaration.' },
    ],
  },
  {
    id: 'operations',
    title: 'Day-to-Day Operations',
    color: 'bg-orange-500',
    features: [
      { icon: Wrench, title: 'Grievance Management', desc: 'Raise complaints across 8 categories with priority levels, ticket tracking, and resolution workflow.' },
      { icon: Bell, title: 'Notices & Announcements', desc: 'Broadcast bilingual notices -- pin important ones, categorize by type, and track readership.' },
      { icon: Boxes, title: 'Hall Booking', desc: 'Reserve community hall with time slots, guest count, charges, deposits, and admin approval.' },
      { icon: Warehouse, title: 'Inventory Management', desc: 'Track society assets -- quantity, condition, location, serial numbers, and maintenance status.' },
      { icon: ClipboardList, title: 'Task Management', desc: 'Assign tasks to committee members with priority, due dates, and status tracking.' },
      { icon: GraduationCap, title: 'Audit Checklist', desc: 'Pre-defined audit items with completion tracking, evidence attachment, and scheduling.' },
    ],
  },
  {
    id: 'security',
    title: 'Security & Vehicles',
    color: 'bg-red-500',
    features: [
      { icon: Shield, title: 'Visitor Management', desc: 'Log visitor entry/exit with purpose, host resident, vehicle details, and timestamps.' },
      { icon: Car, title: 'Vehicle Registry', desc: 'Register all vehicles -- cars, bikes, EVs with parking slot assignment and sticker numbers.' },
      { icon: CircleDot, title: 'Parking Management', desc: 'Define parking slots, allocate to flats, track availability, and manage releases.' },
      { icon: ShieldCheck, title: 'Watchman & Patrol', desc: 'Guard duty scheduling, patrol route management, and security log tracking.' },
    ],
  },
  {
    id: 'communication',
    title: 'Communication & Notifications',
    color: 'bg-teal-500',
    features: [
      { icon: Mail, title: 'Email Notifications', desc: 'Bulk email to all residents or selected groups with bilingual content and delivery tracking.' },
      { icon: Megaphone, title: 'Multi-Channel Alerts', desc: 'Send notifications via WhatsApp, SMS, email, push, and in-app with delivery status.' },
      { icon: AlertTriangle, title: 'Emergency Contacts', desc: 'Quick-access directory with committee, police, fire, ambulance numbers and custom contacts.' },
      { icon: FileText, title: 'Certificates & NOCs', desc: 'Generate membership certificates, no-objection certificates, and official documents digitally.' },
    ],
  },
  {
    id: 'platform',
    title: 'Platform & Technology',
    color: 'bg-indigo-500',
    features: [
      { icon: Smartphone, title: 'Mobile App (Flutter)', desc: 'Native mobile app for Android & iOS plus installable PWA -- manage society on the go.' },
      { icon: Globe, title: 'Bilingual Support', desc: 'Full English and Marathi support across all screens, notices, bylaws, and communications.' },
      { icon: Lock, title: 'Role-Based Access', desc: 'Admin and Member roles with fine-grained permissions. Secure JWT authentication with auto-refresh.' },
      { icon: Cog, title: 'Workflow Automation', desc: 'Automated billing cycles, grievance workflows, meeting reminders, and tenant onboarding via Temporal.' },
    ],
  },
]

const stats = [
  { value: '60+', label: 'Features' },
  { value: '45+', label: 'Modules' },
  { value: 'EN + MR', label: 'Bilingual' },
  { value: 'Web + App', label: 'Multi-Platform' },
]

function FeatureCategory({ category, index }) {
  const [expanded, setExpanded] = useState(index < 3)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-2xl border border-gray-100 overflow-hidden"
    >
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className={`w-3 h-3 rounded-full ${category.color}`} />
          <h3 className="text-xl font-bold text-primary-dark">{category.title}</h3>
          <span className="text-sm text-gray-400 font-medium">{category.features.length} features</span>
        </div>
        {expanded ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="grid sm:grid-cols-2 gap-4 px-6 pb-6">
              {category.features.map((feature) => (
                <motion.div
                  key={feature.title}
                  whileHover={{ y: -2 }}
                  className="flex gap-4 p-4 rounded-xl bg-surface hover:shadow-sm transition-all"
                >
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                    <feature.icon size={20} className="text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary-dark text-sm">{feature.title}</h4>
                    <p className="text-gray-500 text-xs leading-relaxed mt-1">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function Home() {
  const totalFeatures = featureCategories.reduce((sum, cat) => sum + cat.features.length, 0)

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-primary-dark via-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-300 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block bg-accent/20 text-accent-light px-4 py-1.5 rounded-full text-sm font-medium mb-6">
                  {totalFeatures}+ Features | Bilingual | Web + Mobile
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6"
              >
                Your Society,{' '}
                <span className="text-accent">Your Aangan</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg sm:text-xl text-blue-100 max-w-xl mb-10"
              >
                The most comprehensive society management platform -- billing, accounting,
                grievances, visitor management, hall booking, polls, meetings, bylaws,
                parking, and so much more. Available in English and Marathi.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              >
                <Link
                  to="/book-demo"
                  className="inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent-light text-white px-8 py-3.5 rounded-xl text-lg font-semibold transition-colors shadow-lg"
                >
                  Book a Demo
                  <ArrowRight size={20} />
                </Link>
                <a
                  href="tel:9930668736"
                  className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-8 py-3.5 rounded-xl text-lg font-semibold transition-colors border border-white/20"
                >
                  <Phone size={20} />
                  Call Sales: 9930668736
                </a>
              </motion.div>
            </div>

            {/* Right - Hero Image */}
            <motion.div
              initial={{ opacity: 0, x: 40, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-3xl blur-2xl" />
                <img
                  src="/images/hero-community.png"
                  alt="Happy community living in a modern housing society"
                  className="relative rounded-2xl shadow-2xl w-full object-cover border-2 border-white/10"
                />
                <div className="absolute -bottom-4 -right-4 bg-white rounded-xl p-3 shadow-lg">
                  <img src="/images/app-icon.png" alt="Aangan App" className="w-16 h-16 rounded-lg" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary">{stat.value}</div>
                <div className="text-gray-500 text-sm mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Highlight Features - Quick Visual Grid */}
      <section className="bg-surface py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-4">
              One Platform. Every Need.
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From maintenance bills to meeting minutes, from parking slots to poll results --
              Aangan is the only app your society will ever need.
            </p>
          </motion.div>

          {/* Quick highlight icons */}
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-16">
            {[
              { icon: CreditCard, label: 'Billing' },
              { icon: BarChart3, label: 'Accounting' },
              { icon: Wrench, label: 'Complaints' },
              { icon: Shield, label: 'Visitors' },
              { icon: Car, label: 'Parking' },
              { icon: CalendarDays, label: 'Meetings' },
              { icon: Vote, label: 'Polls' },
              { icon: Bell, label: 'Notices' },
              { icon: Boxes, label: 'Hall Booking' },
              { icon: Users, label: 'Directory' },
              { icon: ScrollText, label: 'Bylaws' },
              { icon: DoorOpen, label: 'Tenants' },
              { icon: Warehouse, label: 'Inventory' },
              { icon: Mail, label: 'Emails' },
              { icon: Smartphone, label: 'Mobile App' },
              { icon: Globe, label: 'Bilingual' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 bg-white rounded-xl p-4 border border-gray-100 hover:border-primary/30 hover:shadow-sm transition-all cursor-default"
              >
                <item.icon size={24} className="text-primary" />
                <span className="text-xs font-medium text-gray-600">{item.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Detailed Feature Categories */}
          <div className="space-y-4">
            {featureCategories.map((category, i) => (
              <FeatureCategory key={category.id} category={category} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Aangan */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-6">
                Why Societies Choose Aangan
              </h2>
              <div className="space-y-4">
                {[
                  'Zero setup cost -- get started in minutes',
                  'WhatsApp, SMS, Email & Push notifications',
                  'Bilingual interface -- English and Marathi',
                  'Flutter mobile app + PWA -- works everywhere',
                  'Role-based access -- Admin & Member views',
                  'JWT security with auto token refresh',
                  'Temporal workflow automation for billing, grievances',
                  'Dedicated support for committee members',
                  '45+ database models -- nothing is left out',
                  'Audit-ready financials with double-entry bookkeeping',
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 size={20} className="text-green-500 mt-0.5 shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-primary to-primary-light rounded-3xl p-8 text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Ready to transform your society?</h3>
              <p className="text-blue-100 mb-6">
                Join societies across India who trust Aangan for their complete management needs --
                from maintenance billing to meeting minutes, from parking to polls.
              </p>
              <Link
                to="/book-demo"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent-light text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Get Started Today
                <ArrowRight size={18} />
              </Link>
              <div className="mt-6 pt-6 border-t border-white/20">
                <p className="text-sm text-blue-200">Or call us directly</p>
                <a href="tel:9930668736" className="text-2xl font-bold hover:text-accent transition-colors">
                  +91 9930668736
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Platform Highlights */}
      <section className="bg-primary-dark py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built for Scale. Designed for Simplicity.
            </h2>
            <p className="text-blue-200 text-lg max-w-2xl mx-auto">
              Enterprise-grade technology, wrapped in an interface anyone can use.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Smartphone, title: 'Web + Mobile + PWA', desc: 'React web dashboard, Flutter mobile app, and installable PWA for offline access.' },
              { icon: Globe, title: 'English + Marathi', desc: 'Every screen, notice, bylaw, and communication fully bilingual.' },
              { icon: Lock, title: 'Bank-Grade Security', desc: 'JWT authentication, role-based access control, and tenant data isolation.' },
              { icon: Cog, title: 'Workflow Automation', desc: 'Temporal-powered automation for billing cycles, reminders, and onboarding.' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center"
              >
                <div className="w-12 h-12 bg-accent/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-blue-200 text-sm">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Download App Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-br from-surface to-white rounded-3xl border border-gray-100 p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-4">
                  Download the Aangan App
                </h2>
                <p className="text-gray-600 text-lg mb-6">
                  Manage your society on the go. Available as a mobile app and installable PWA.
                  Scan the QR code to download.
                </p>
                <div className="space-y-3">
                  {[
                    'Android APK -- direct download',
                    'iOS -- Add to Home Screen (PWA)',
                    'Works offline with service worker',
                    'Push notifications for instant alerts',
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-green-500 shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="flex flex-col items-center"
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                  <img
                    src="/images/download-qr.png"
                    alt="Scan to download Aangan app"
                    className="w-48 h-48 sm:w-56 sm:h-56"
                  />
                </div>
                <p className="text-gray-500 text-sm mt-4">Scan with your phone camera</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-accent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Start managing your society smarter</h2>
              <p className="text-white/80 mt-1">Free demo. No commitments. Setup in 24 hours.</p>
            </div>
            <Link
              to="/book-demo"
              className="bg-white text-primary hover:bg-gray-100 px-8 py-3.5 rounded-xl font-semibold transition-colors shrink-0"
            >
              Book a Free Demo
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Home
