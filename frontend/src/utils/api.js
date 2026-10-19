const API_BASE = import.meta.env.PROD
  ? 'https://sainath-society.onrender.com'
  : ''

export function apiUrl(path) {
  return `${API_BASE}${path}`
}
