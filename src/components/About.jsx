import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Box, MeshWobbleMaterial } from '@react-three/drei'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Trophy } from 'lucide-react'

const AnimatedCube = () => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.5
    }
  })

  return (
    <Box ref={meshRef} args={[2, 2, 2]}>
      <MeshWobbleMaterial
        color="#8b5cf6"
        attach="material"
        factor={0.6}
        speed={0.5}
        roughness={0}
        transparent
        opacity={0.8}
      />
    </Box>
  )
}

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { icon: GraduationCap, label: "President's Lister", value: "BSIT Student" },
    { icon: MapPin, label: "Location", value: "Bocaue, Bulacan" },
    { icon: Calendar, label: "OJT Date", value: "January 2026" },
    { icon: Trophy, label: "Specialization", value: "AR Development" }
  ]

  return (
    <section id="about" className="about section">
      <div className="container">
        <motion.div
          ref={ref}
          className="about-content"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="about-text">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              About <span className="gradient-text">Me</span>
            </motion.h2>

            <motion.p
              className="about-description"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I am a Bachelor of Science in Information Technology student at Dr. Yanga's Colleges Inc., 
              specializing in Augmented Reality, Full Stack Development, and Cloud Fundamentals. 
              I have experience leading projects, developing AR applications using Unity and Vuforia, 
              and building web platforms with modern frameworks.
            </motion.p>

            <motion.p
              className="about-passion"
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              I am passionate about using technology to enhance learning, navigation, and user experiences 
              through innovative AR solutions and robust web applications.
            </motion.p>

            <motion.div
              className="stats-grid"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="stat-card glass"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05, boxShadow: "var(--glow-purple)" }}
                >
                  <stat.icon className="stat-icon" />
                  <div className="stat-content">
                    <h4 className="stat-value">{stat.value}</h4>
                    <p className="stat-label">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="about-3d"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={0.5} />
              <pointLight position={[10, 10, 10]} />
              <AnimatedCube />
            </Canvas>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default About