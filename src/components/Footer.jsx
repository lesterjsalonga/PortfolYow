import { motion } from 'framer-motion'
import { 
  Github, 
  Mail, 
  MapPin, 
  Phone, 
  Linkedin, 
  ExternalLink,
  ArrowUp
} from 'lucide-react'

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "lstrsalonga21@gmail.com",
      href: "mailto:lstrsalonga21@gmail.com"
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Bocaue, Bulacan, Philippines",
      href: null
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/lesterjsalonga",
      href: "https://github.com/lesterjsalonga"
    }
  ]

  const quickLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    { name: "Certifications", href: "#certifications" }
  ]

  return (
    <footer id="contact" className="footer">
      <div className="bg-grid"></div>
      
      <div className="container">
        <div className="footer-content">
          {/* Main Footer Content */}
          <div className="footer-main">
            <motion.div
              className="footer-brand"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h3 
                className="gradient-text"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Mark Lester J. Salonga
              </motion.h3>
              <motion.p 
                className="footer-tagline"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Emerging AR Developer & Tech Innovator
              </motion.p>
              <motion.p 
                className="footer-description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Passionate about creating innovative AR experiences and robust web applications 
                that enhance user engagement and solve real-world problems.
              </motion.p>
            </motion.div>

            <motion.div
              className="footer-links"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h4
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Quick Links
              </motion.h4>
              <ul>
                {quickLinks.map((link, index) => (
                  <motion.li
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                    viewport={{ once: true }}
                    whileHover={{ x: 5, transition: { duration: 0.2 } }}
                  >
                    <a href={link.href} className="footer-link">
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="footer-contact"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <motion.h4
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Get In Touch
              </motion.h4>
              <div className="contact-list">
                {contactInfo.map((contact, index) => (
                  <motion.div
                    key={contact.label}
                    className="contact-item"
                    initial={{ opacity: 0, x: -40, scale: 0.8 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.15, duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05, 
                      x: 10,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div
                      initial={{ rotate: -180, opacity: 0 }}
                      whileInView={{ rotate: 0, opacity: 1 }}
                      transition={{ delay: 0.8 + index * 0.15, duration: 0.5 }}
                      viewport={{ once: true }}
                    >
                      <contact.icon className="contact-icon" />
                    </motion.div>
                    <div className="contact-content">
                      <span className="contact-label">{contact.label}</span>
                      {contact.href ? (
                        <a 
                          href={contact.href} 
                          className="contact-value"
                          target={contact.href.startsWith('http') ? '_blank' : '_self'}
                          rel={contact.href.startsWith('http') ? 'noopener noreferrer' : ''}
                        >
                          {contact.value}
                          {contact.href.startsWith('http') && <ExternalLink size={14} />}
                        </a>
                      ) : (
                        <span className="contact-value">{contact.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="footer-cta"
            initial={{ opacity: 0, y: 60, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div 
              className="cta-content glass"
              initial={{ opacity: 0, rotateX: -15 }}
              whileInView={{ opacity: 1, rotateX: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Ready to collaborate?
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                Let's create something amazing together with AR and modern web technologies.
              </motion.p>
              <motion.div 
                className="cta-buttons"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="#projects"
                  className="glow-button primary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  View My Work
                </motion.a>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Footer Bottom */}
          <motion.div
            className="footer-bottom"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <div className="footer-bottom-content">
              <motion.p 
                className="copyright"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                © 2025 Mark Lester J. Salonga. All rights reserved.
              </motion.p>
              
              <motion.div 
                className="footer-social"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.a
                  href="https://github.com/lesterjsalonga"
                  className="social-link"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, rotate: -90 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 1.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Github size={20} />
                </motion.a>
                <motion.a
                  href="mailto:lstrsalonga21@gmail.com"
                  className="social-link"
                  whileHover={{ scale: 1.2, rotate: -5 }}
                  initial={{ opacity: 0, rotate: 90 }}
                  whileInView={{ opacity: 1, rotate: 0 }}
                  transition={{ delay: 1.6, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Mail size={20} />
                </motion.a>
              </motion.div>

              <motion.button
                className="scroll-top"
                onClick={scrollToTop}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <ArrowUp size={20} />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Animated Wave */}
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path
            d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
            opacity=".25"
            className="wave-path"
          />
          <path
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
            opacity=".5"
            className="wave-path"
          />
          <path
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
            className="wave-path"
          />
        </svg>
      </div>
    </footer>
  )
}

export default Footer