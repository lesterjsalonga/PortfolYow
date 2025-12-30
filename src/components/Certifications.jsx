import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { 
  Award, 
  Calendar, 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight,
  Trophy,
  BookOpen,
  Users,
  Shield
} from 'lucide-react'

const Certifications = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [currentIndex, setCurrentIndex] = useState(0)

  const certifications = [
    {
      title: "Agentblazer Champion Workshop",
      issuer: "Salesforce",
      date: "October 2025",
      type: "Workshop",
      icon: Trophy,
      color: "cyan",
      description: "Advanced Salesforce development and automation techniques",
      pdfPath: "/assets/pdfs/certifications/Salesforce_Agentblazer_Champion.pdf"
    },
    {
      title: "HCIA–Cloud Service V3.5",
      issuer: "Huawei",
      date: "November 2025",
      type: "Certification",
      icon: Award,
      color: "blue",
      description: "Cloud service architecture and implementation",
      pdfPath: "/assets/images/certifications/Huawei_HCIA_Cloud_Service.png"
    },
    {
      title: "HCIA–Cloud Computing V5.5",
      issuer: "Huawei",
      date: "November 2025",
      type: "Certification",
      icon: Award,
      color: "purple",
      description: "Comprehensive cloud computing fundamentals",
      pdfPath: "/assets/images/certifications/Huawei_HCIA_Cloud_Computing.png"
    },
    {
      title: "HCIA–AI V4.0",
      issuer: "Huawei",
      date: "November 2025",
      type: "Certification",
      icon: Award,
      color: "cyan",
      description: "Artificial Intelligence and machine learning basics",
      pdfPath: "/assets/images/certifications/Huawei_HCIA_AI.png"
    },
    {
      title: "AI for Business Professionals",
      issuer: "HP Life",
      date: "November 2025",
      type: "Course",
      icon: BookOpen,
      color: "blue",
      description: "Business applications of AI technologies",
      pdfPath: "/assets/pdfs/certifications/HP_Life_AI_Business.pdf"
    },
    {
      title: "Introduction to Cybersecurity Awareness",
      issuer: "HP Life",
      date: "November 2025",
      type: "Course",
      icon: Shield,
      color: "purple",
      description: "Cybersecurity fundamentals and best practices",
      pdfPath: "/assets/pdfs/certifications/HP_Life_Cybersecurity.pdf"
    },
    {
      title: "Microsoft Office Specialist – Excel 2019",
      issuer: "Microsoft",
      date: "June 2023",
      type: "Certification",
      icon: Award,
      color: "cyan",
      description: "Advanced Excel skills and data analysis",
      pdfPath: "/assets/pdfs/certifications/Microsoft_Excel_2019.pdf"
    },
    {
      title: "Java Programming",
      issuer: "Oracle",
      date: "May 2023",
      type: "Certification",
      icon: Award,
      color: "blue",
      description: "Object-oriented programming with Java",
      pdfPath: "/assets/pdfs/certifications/Oracle_Java_Programming.pdf"
    }
  ]

  const seminars = [
    {
      title: "4th Regional Cybersecurity Conference",
      organizer: "PSITE-CL",
      date: "October 2025",
      type: "Conference",
      icon: Users,
      description: "Latest trends in cybersecurity and threat prevention"
    },
    {
      title: "Introduction to Networking (CompTIA Network+)",
      organizer: "EPCPS",
      date: "November 2025",
      type: "Training",
      icon: BookOpen,
      description: "Network infrastructure and protocols"
    },
    {
      title: "International Research Conference on IT Education",
      organizer: "IRCITE",
      date: "November 2024",
      type: "Conference",
      icon: Users,
      description: "Research and innovation in IT education"
    },
    {
      title: "Digital Transformation 101 Webinar Series",
      organizer: "University of the Philippines",
      date: "November 2024",
      type: "Webinar",
      icon: BookOpen,
      description: "Digital transformation strategies for MSMEs"
    }
  ]

  const competitions = [
    {
      title: "Huawei ICT Competition – Cloud Track",
      organizer: "Huawei",
      date: "November 2025",
      type: "Competition",
      result: "APAC Practice Competition Participant",
      icon: Trophy,
      description: "Cloud computing skills competition at APAC level"
    }
  ]

  const itemsPerPage = 3
  const totalItems = certifications.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages)
  }

  const getCurrentItems = () => {
    const startIndex = currentIndex * itemsPerPage
    return certifications.slice(startIndex, startIndex + itemsPerPage)
  }

  const getColorClass = (color) => {
    switch (color) {
      case 'cyan': return 'cert-cyan'
      case 'blue': return 'cert-blue'
      case 'purple': return 'cert-purple'
      default: return 'cert-cyan'
    }
  }

  return (
    <section id="certifications" className="certifications section">
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
            Certifications & <span className="gradient-text">Achievements</span>
          </motion.h2>

          {/* Certifications Carousel */}
          <div className="certifications-carousel">
            <motion.div
              className="carousel-header"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <h3>Professional Certifications</h3>
              <div className="carousel-controls">
                <button className="carousel-btn" onClick={prevSlide}>
                  <ChevronLeft size={20} />
                </button>
                <span className="carousel-indicator">
                  {currentIndex + 1} / {totalPages}
                </span>
                <button className="carousel-btn" onClick={nextSlide}>
                  <ChevronRight size={20} />
                </button>
              </div>
            </motion.div>

            <div className="carousel-container">
              <motion.div
                className="certifications-grid"
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                {getCurrentItems().map((cert, index) => (
                  <motion.div
                    key={`${cert.title}-${currentIndex}`}
                    className={`cert-card glass ${getColorClass(cert.color)}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: `var(--glow-${cert.color})`,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="cert-header">
                      <cert.icon className="cert-icon" />
                      <div className="cert-type">{cert.type}</div>
                    </div>
                    
                    <h4 className="cert-title">{cert.title}</h4>
                    <p className="cert-issuer">{cert.issuer}</p>
                    <p className="cert-description">{cert.description}</p>
                    
                    <div className="cert-footer">
                      <div className="cert-date">
                        <Calendar size={16} />
                        <span>{cert.date}</span>
                      </div>
                      <button 
                        className="cert-link"
                        onClick={() => window.open(cert.pdfPath, '_blank')}
                        title="View Certificate"
                      >
                        <ExternalLink size={16} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>

          {/* Training & Seminars */}
          <motion.div
            className="seminars-section"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <h3>Training & Seminars</h3>
            <div className="seminars-grid">
              {seminars.map((seminar, index) => (
                <motion.div
                  key={seminar.title}
                  className="seminar-card glass"
                  initial={{ opacity: 0, x: -30 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "var(--glow-blue)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <seminar.icon className="seminar-icon" />
                  <div className="seminar-content">
                    <h4 className="seminar-title">{seminar.title}</h4>
                    <p className="seminar-organizer">{seminar.organizer}</p>
                    <p className="seminar-description">{seminar.description}</p>
                    <div className="seminar-meta">
                      <span className="seminar-type">{seminar.type}</span>
                      <span className="seminar-date">{seminar.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Competitions */}
          <motion.div
            className="competitions-section"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <h3>Competitions</h3>
            <div className="competitions-grid">
              {competitions.map((competition, index) => (
                <motion.div
                  key={competition.title}
                  className="competition-card glass cert-purple"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "var(--glow-purple)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <competition.icon className="competition-icon" />
                  <div className="competition-content">
                    <h4 className="competition-title">{competition.title}</h4>
                    <p className="competition-organizer">{competition.organizer}</p>
                    <p className="competition-result">{competition.result}</p>
                    <p className="competition-description">{competition.description}</p>
                    <div className="competition-date">
                      <Calendar size={16} />
                      <span>{competition.date}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default Certifications