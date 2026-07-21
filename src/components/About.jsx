import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion, useInView } from 'framer-motion'
import { GraduationCap, MapPin, Calendar, Trophy } from 'lucide-react'
import DinosaurModelAlt from './DinosaurModelAlt'

const About = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const stats = [
    { icon: GraduationCap, label: "President's Lister", value: "BSIT Graduate" },
    { icon: MapPin, label: "Location", value: "Bocaue, Bulacan" },
    { icon: Calendar, label: "Experience", value: "Intern + Freelance" },
    { icon: Trophy, label: "Specialty", value: "Full-Stack & AR/XR" }
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
          <motion.div
            className="about-3d"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.6, duration: 1 }}
          >
            <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              <Suspense fallback={
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="#8b5cf6" />
                </mesh>
              }>
                <DinosaurModelAlt />
              </Suspense>
              <OrbitControls 
                enableZoom={false} 
                autoRotate 
                autoRotateSpeed={0.5}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
            </Canvas>
          </motion.div>

          <div className="about-text">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              About <span className="gradient-text">Me</span>
            </motion.h2>

            <motion.p
              className="about-description"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              I'm a full-stack developer and recent BSIT graduate from Dr. Yanga's Colleges Inc., 
              where I graduated as a President's Lister. I build web systems and applications end-to-end — 
              from backend APIs and databases to responsive frontends — with a specialty in 
              Augmented Reality and XR development using Unity and Vuforia.
            </motion.p>

            <motion.p
              className="about-passion"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              I've shipped production systems during my internship at SMTCDC and built freelance projects 
              for real clients. AR is what makes my work distinctive — I've led AR projects for museum 
              exhibit guides and campus navigation — but my goal is to bring that same creative problem-solving 
              to any full-stack or software role.
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
        </motion.div>
      </div>
    </section>
  )
}

export default About