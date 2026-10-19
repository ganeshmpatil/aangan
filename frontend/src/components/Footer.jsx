import { Phone, Mail, MapPin } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src="/images/app-icon.png" alt="Aangan" className="w-10 h-10 rounded-lg" />
              <span className="text-2xl font-bold">Aangan</span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Complete society management solution for modern housing societies.
              Simplify operations, enhance transparency, and build stronger communities.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="/" className="hover:text-accent transition-colors">Home</a></li>
              <li><a href="/about" className="hover:text-accent transition-colors">About Us</a></li>
              <li><a href="/book-demo" className="hover:text-accent transition-colors">Book a Demo</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-accent" />
                <a href="tel:9930668736" className="hover:text-accent transition-colors">
                  +91 9930668736
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-accent" />
                <a href="mailto:sales@aangan.in" className="hover:text-accent transition-colors">
                  sales@aangan.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={16} className="text-accent mt-0.5" />
                <span>Mumbai, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Aangan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
