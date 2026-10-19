import { useState } from 'react'
import { motion } from 'motion/react'
import { Phone, CheckCircle2, Clock, Users, Monitor } from 'lucide-react'

function BookDemo() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    fetch('/api/demos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(formData)),
    })
      .then(() => setSubmitted(true))
      .catch(() => alert('Something went wrong. Please call us at 9930668736.'))
  }

  if (submitted) {
    return (
      <main className="pt-16 min-h-screen flex items-center justify-center bg-surface">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={40} className="text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-primary-dark mb-4">Demo Booked!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your interest. Our team will contact you within 24 hours to schedule the demo.
          </p>
          <div className="bg-white rounded-xl p-4 border border-gray-100">
            <p className="text-sm text-gray-500">Need immediate assistance?</p>
            <a href="tel:9930668736" className="text-xl font-bold text-primary hover:text-accent transition-colors">
              +91 9930668736
            </a>
          </div>
        </motion.div>
      </main>
    )
  }

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
            Book a Free Demo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-blue-100 text-lg max-w-2xl mx-auto"
          >
            See how Aangan can transform your society management. No commitments, no charges.
          </motion.p>
        </div>
      </section>

      {/* Demo info + Form */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Left - Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-primary-dark mb-6">What to expect</h2>
              <div className="space-y-6">
                {[
                  { icon: Clock, title: '30-Minute Session', desc: 'A quick, focused walkthrough of the platform tailored to your society.' },
                  { icon: Monitor, title: 'Live Product Demo', desc: 'See real features in action -- billing, complaints, visitor management, and more.' },
                  { icon: Users, title: 'Q&A with Our Team', desc: 'Ask anything about pricing, setup, migration, or customization.' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                      <item.icon size={22} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary-dark">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-white rounded-2xl p-6 border border-gray-100">
                <p className="text-gray-500 text-sm mb-2">Prefer to talk right away?</p>
                <a
                  href="tel:9930668736"
                  className="flex items-center gap-3 text-primary hover:text-accent transition-colors"
                >
                  <Phone size={22} />
                  <span className="text-2xl font-bold">+91 9930668736</span>
                </a>
                <p className="text-gray-400 text-sm mt-2">Mon - Sat, 9:00 AM - 7:00 PM</p>
              </div>
            </motion.div>

            {/* Right - Form */}
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 space-y-4"
            >
              <h3 className="text-xl font-bold text-primary-dark mb-2">Schedule your demo</h3>
              <input
                name="contact_person"
                type="text"
                required
                placeholder="Your Name *"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <input
                name="phone"
                type="tel"
                required
                placeholder="Mobile Number *"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <input
                name="email"
                type="email"
                placeholder="Email (optional)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <input
                name="society_name"
                type="text"
                required
                placeholder="Society Name *"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  name="city"
                  type="text"
                  placeholder="City"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
                <select
                  name="total_flats"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-500"
                >
                  <option value="">Number of Flats</option>
                  <option value="1-50">1 - 50</option>
                  <option value="51-100">51 - 100</option>
                  <option value="101-200">101 - 200</option>
                  <option value="201-500">201 - 500</option>
                  <option value="500+">500+</option>
                </select>
              </div>
              <select
                name="role"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-gray-500"
              >
                <option value="">Your Role</option>
                <option value="chairman">Chairman</option>
                <option value="secretary">Secretary</option>
                <option value="treasurer">Treasurer</option>
                <option value="committee_member">Committee Member</option>
                <option value="resident">Resident</option>
                <option value="property_manager">Property Manager</option>
              </select>
              <textarea
                name="message"
                rows={3}
                placeholder="Any specific requirements?"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
              <button
                type="submit"
                className="w-full bg-accent hover:bg-accent-light text-white py-3.5 rounded-xl font-semibold text-lg transition-colors"
              >
                Book My Free Demo
              </button>
              <p className="text-center text-gray-400 text-xs">
                No spam. No commitments. We'll call you to schedule at your convenience.
              </p>
            </motion.form>
          </div>
        </div>
      </section>
    </main>
  )
}

export default BookDemo
