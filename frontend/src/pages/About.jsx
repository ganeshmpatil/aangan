import { motion } from 'motion/react'
import { Phone, Mail, MapPin, Target, Eye, Heart } from 'lucide-react'
import { apiUrl } from '../utils/api'

function About() {
  return (
    <main className="pt-16">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-dark to-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4"
          >
            About Aangan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg max-w-2xl mx-auto"
          >
            We are on a mission to digitize and simplify housing society management across India.
          </motion.p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-primary-dark mb-6">Our Story</h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              Aangan was born out of a simple frustration -- managing a housing society shouldn't require
              piles of paper, endless WhatsApp groups, and manual accounting. We saw committee members
              struggling with outdated processes and residents disconnected from their own community decisions.
            </p>
            <p className="text-gray-600 text-lg leading-relaxed">
              So we built Aangan -- a complete, easy-to-use platform that brings society management into
              the digital age. From maintenance billing to visitor management, from complaint tracking to
              financial reporting, Aangan handles it all so that committees can focus on what truly matters:
              building better communities.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Our Mission',
                desc: 'To empower every housing society in India with technology that simplifies management, enhances transparency, and strengthens community bonds.',
              },
              {
                icon: Eye,
                title: 'Our Vision',
                desc: 'A future where every resident is connected, every rupee is accounted for, and every society runs like a well-oiled machine.',
              },
              {
                icon: Heart,
                title: 'Our Values',
                desc: 'Transparency in operations, simplicity in design, security in data handling, and dedication to customer success.',
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 text-center"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <item.icon size={28} className="text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary-dark mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-dark mb-4">Contact Us</h2>
            <p className="text-gray-600 text-lg">We'd love to hear from you. Reach out anytime.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-start gap-4 p-4 bg-surface rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Phone size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-dark mb-1">Sales Inquiry</h3>
                  <a href="tel:9930668736" className="text-lg text-primary hover:text-accent transition-colors font-medium">
                    +91 9930668736
                  </a>
                  <p className="text-gray-500 text-sm mt-1">Mon - Sat, 9:00 AM - 7:00 PM</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <Mail size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-dark mb-1">Email</h3>
                  <a href="mailto:sales@aangan.in" className="text-lg text-primary hover:text-accent transition-colors font-medium">
                    sales@aangan.in
                  </a>
                  <p className="text-gray-500 text-sm mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-surface rounded-xl">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                  <MapPin size={22} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary-dark mb-1">Location</h3>
                  <p className="text-gray-700">Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(e.target)
                fetch(apiUrl('/api/v1/marketing/inquiries'), {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(Object.fromEntries(formData)),
                })
                  .then(() => alert('Thank you! We will contact you shortly.'))
                  .catch(() => alert('Something went wrong. Please call us at 9930668736.'))
                e.target.reset()
              }}
              className="bg-surface rounded-2xl p-8 space-y-4"
            >
              <h3 className="text-xl font-bold text-primary-dark mb-2">Send us a message</h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Mobile Number"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <input
                name="email"
                type="email"
                placeholder="Email (optional)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <input
                name="society_name"
                type="text"
                placeholder="Society Name"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <textarea
                name="message"
                rows={4}
                placeholder="Your Message"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-white py-3 rounded-xl font-semibold transition-colors"
              >
                Send Message
              </button>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default About
