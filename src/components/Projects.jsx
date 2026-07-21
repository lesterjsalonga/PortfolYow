import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Eye, Calendar, Users, Code } from 'lucide-react'

const Projects = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [selectedProject, setSelectedProject] = useState(null)

  const projects = [
    {
      id: 1,
      title: "ARchive: AR Museum Guide",
      subtitle: "Augmented Reality for ALAB Museum • Dr. Elida Research Award",
      description: "Developed an AR-enabled museum exhibit guide to enhance visitor engagement and learning using Unity, Vuforia, and AR Foundation. Recipient of the Dr. Elida Research Award.",
      longDescription: "A comprehensive AR museum experience that transforms how visitors interact with exhibits. Features marker-based and markerless AR tracking, interactive 3D models, and real-time information overlays. This project was recognized with the Dr. Elida Research Award for its innovation and impact.",
      tech: ["Unity", "Vuforia", "AR Foundation", "ReactJS", "Supabase", "PostgreSQL", "Huawei Cloud"],
      role: "Project Leader | Developer",
      date: "December 2025",
      status: "Completed",
      features: [
        "Marker-based and markerless AR tracking",
        "Interactive 3D exhibit models",
        "Content management platform",
        "Cloud-based backend support",
        "Real-time visitor analytics",
        "🏆 Dr. Elida Research Award recipient"
      ],
      image: "/api/placeholder/600/400",
      category: "AR Development"
    },
    {
      id: 2,
      title: "Outsight: AR Campus Navigation",
      subtitle: "Augmented Reality Campus Guide",
      description: "Created an AR-based campus navigation system with real-time path guidance using Unity + AR Foundation and Firebase integration.",
      longDescription: "An innovative campus navigation solution that uses AR to provide intuitive wayfinding. Students can point their device at any location and receive real-time directional guidance with contextual information.",
      tech: ["Unity", "AR Foundation", "Firebase", "C#", "Android SDK"],
      role: "Project Leader | Developer",
      date: "March 2025",
      status: "Completed",
      features: [
        "Real-time AR path guidance",
        "Location-based services",
        "Interactive campus map",
        "Multi-language support",
        "Offline mode capability"
      ],
      image: "/api/placeholder/600/400",
      category: "AR Development"
    },
    {
      id: 3,
      title: "TrainTrack: Student Training Management",
      subtitle: "Student Training and Event Management System",
      description: "Full-stack system for managing student training programs with secure authentication, resume submission workflow, and admin approval with feedback.",
      longDescription: "A full-featured training management system that streamlines student-admin interactions. Features secure authentication with password hashing and RBAC, resume submission and approval workflows with admin feedback and status tracking.",
      tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "Bootstrap"],
      role: "Project Leader | Developer",
      date: "March 2025",
      status: "Completed",
      features: [
        "Secure user authentication with password hashing",
        "Resume upload and approval system with feedback",
        "Status tracking for submissions",
        "Role-based access control (RBAC)",
        "Admin dashboard for comprehensive management",
        "Responsive design with mobile support"
      ],
      image: "/api/placeholder/600/400",
      category: "Web Development"
    },
    {
      id: 4,
      title: "Tourism Website",
      subtitle: "Dynamic City Tourism Platform",
      description: "Designed, developed, and deployed a dynamic tourism website with CMS features, user authentication, and responsive UI/UX.",
      longDescription: "A full-featured tourism platform that showcases city attractions and provides comprehensive travel information with an intuitive user experience. Coordinated project workflow and client communication throughout development.",
      tech: ["HTML", "CSS", "JavaScript"],
      role: "Freelance Web Developer",
      date: "December 2024",
      status: "Completed",
      features: [
        "Dynamic content management system",
        "User authentication system",
        "Responsive design",
        "Client-driven project workflow",
        "SEO-optimized content"
      ],
      image: "/api/placeholder/600/400",
      category: "Web Development"
    }
  ]

  const ProjectModal = ({ project, onClose }) => {
    if (!project) return null

    return (
      <motion.div
        className="project-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="project-modal glass"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="modal-header">
            <h3 className="gradient-text">{project.title}</h3>
            <button className="modal-close" onClick={onClose}>×</button>
          </div>
          
          <div className="modal-content">
            <p className="project-long-desc">{project.longDescription}</p>
            
            <div className="project-details">
              <div className="detail-item">
                <Users className="detail-icon" />
                <span>{project.role}</span>
              </div>
              <div className="detail-item">
                <Calendar className="detail-icon" />
                <span>{project.date}</span>
              </div>
              <div className="detail-item">
                <Code className="detail-icon" />
                <span>{project.category}</span>
              </div>
            </div>

            <div className="project-features">
              <h4>Key Features</h4>
              <ul>
                {project.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="project-tech">
              <h4>Technologies Used</h4>
              <div className="tech-tags">
                {project.tech.map((tech, index) => (
                  <span key={index} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  }

  return (
    <section id="projects" className="projects section">
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
            Featured <span className="gradient-text">Projects</span>
          </motion.h2>

          <div className="projects-grid">
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                className="project-card glass"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 0.4 + index * 0.2, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.02, 
                  boxShadow: "var(--glow-cyan)",
                  transition: { duration: 0.3 }
                }}
              >
                <div className="project-header">
                  <div className="project-category">{project.category}</div>
                  <div className="project-status">{project.status}</div>
                </div>

                <h3 className="project-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>

                <div className="project-meta">
                  <div className="project-role">
                    <Users size={16} />
                    <span>{project.role}</span>
                  </div>
                  <div className="project-date">
                    <Calendar size={16} />
                    <span>{project.date}</span>
                  </div>
                </div>

                <div className="project-tech-preview">
                  {project.tech.slice(0, 3).map((tech, techIndex) => (
                    <span key={techIndex} className="tech-tag small">{tech}</span>
                  ))}
                  {project.tech.length > 3 && (
                    <span className="tech-more">+{project.tech.length - 3} more</span>
                  )}
                </div>

                <div className="project-actions">
                  <button
                    className="project-btn view"
                    onClick={() => setSelectedProject(project)}
                  >
                    <Eye size={16} />
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  )
}

export default Projects