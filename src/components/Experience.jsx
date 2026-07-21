import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react'

const Experience = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const experiences = [
    {
      role: "IT Intern / Junior Developer",
      company: "St. Martin of Tours Credit and Development Cooperative (SMTCDC)",
      location: "Bocaue, Bulacan",
      period: "January 2026 – April 2026",
      type: "Internship",
      color: "cyan",
      highlights: [
        "Developed and deployed a multi-tier IT Service Request System integrated into the employee portal, with ticketing, approvals, and role-based access control (RBAC).",
        "Implemented image upload with scanner integration, server-side file compression (2MB limit), and CSV export for ticket metrics.",
        "Applied web security best practices including input sanitization and RBAC.",
        "Wrote technical documentation and presented system prototypes to stakeholders.",
        "Provided on-site technical support during the SMTCDC General Assembly.",
        "Applied SQL optimization techniques across the system."
      ]
    },
    {
      role: "Freelance Web Developer",
      company: "Independent Client",
      location: "Philippines",
      period: "December 2024",
      type: "Freelance",
      color: "blue",
      highlights: [
        "Designed, developed, and deployed a dynamic tourism website for a city client.",
        "Implemented CMS features, user authentication, and responsive UI/UX using HTML, CSS, and JavaScript.",
        "Coordinated project workflow and managed client communication throughout the engagement."
      ]
    }
  ]

  const getColorClass = (color) => {
    switch (color) {
      case 'cyan': return 'exp-cyan'
      case 'blue': return 'exp-blue'
      case 'purple': return 'exp-purple'
      default: return 'exp-cyan'
    }
  }

  return (
    <section id="experience" className="experience section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Work <span className="gradient-text">Experience</span>
          </motion.h2>

          <div className="experience-timeline">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.role}
                className={`experience-card glass ${getColorClass(exp.color)}`}
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ delay: 0.4 + index * 0.3, duration: 0.8 }}
                whileHover={{
                  scale: 1.01,
                  boxShadow: `var(--glow-${exp.color})`,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="exp-header">
                  <div className="exp-title-group">
                    <div className="exp-type-badge">{exp.type}</div>
                    <h3 className="exp-role gradient-text">{exp.role}</h3>
                    <h4 className="exp-company">{exp.company}</h4>
                  </div>
                  <div className="exp-meta">
                    <div className="exp-meta-item">
                      <Calendar size={15} />
                      <span>{exp.period}</span>
                    </div>
                    <div className="exp-meta-item">
                      <MapPin size={15} />
                      <span>{exp.location}</span>
                    </div>
                  </div>
                </div>

                <ul className="exp-highlights">
                  {exp.highlights.map((point, i) => (
                    <motion.li
                      key={i}
                      className="exp-highlight-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ delay: 0.6 + index * 0.3 + i * 0.08, duration: 0.5 }}
                    >
                      <ChevronRight size={14} className="exp-bullet" />
                      <span>{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Experience
