import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import DinosaurModel from './DinosaurModel'

const Hero = () => {
  const handleViewProjects = () => {
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleViewCV = () => {
    window.open('/assets/pdfs/cv/Mark_Lester_Salonga_CV.pdf', '_blank')
  }

  return (
    <section id="home" className="hero">
      <div className="bg-grid"></div>
      
      <div className="hero-container">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="hero-intro"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
            >
              <span className="hero-greeting">Hi, I'm Lester 👋</span>
            </motion.div>

            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="gradient-text">Emerging AR Developer</span>
              <br />
              & Tech Innovator
            </motion.h1>
            
            <motion.div
              className="hero-location"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              <span className="location-text">📍 Based in Bocaue, Bulacan, Philippines</span>
            </motion.div>

            <motion.div
              className="hero-stack"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
            >
              <p className="stack-intro">My tech stack includes:</p>
              <div className="tech-stack">
                <span className="tech-item">Unity & AR Foundation</span>
                <span className="tech-item">React & Next.js</span>
                <span className="tech-item">Node.js & PHP</span>
                <span className="tech-item">Huawei Cloud</span>
                <span className="tech-item">Firebase & Supabase</span>
              </div>
            </motion.div>
            
            <motion.div
              className="hero-buttons"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <button className="glow-button primary" onClick={handleViewProjects}>
                View Projects
              </button>
              <button className="glow-button secondary" onClick={handleViewCV}>
                View CV
              </button>
            </motion.div>
          </motion.div>

          <motion.div
            className="hero-3d"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <pointLight position={[-10, -10, -5]} intensity={0.5} />
              <Suspense fallback={
                <mesh>
                  <boxGeometry args={[1, 1, 1]} />
                  <meshStandardMaterial color="#00ffff" />
                </mesh>
              }>
                <DinosaurModel />
              </Suspense>
              <OrbitControls 
                enableZoom={false} 
                autoRotate 
                autoRotateSpeed={0.8}
                enablePan={false}
                maxPolarAngle={Math.PI / 2}
                minPolarAngle={Math.PI / 3}
              />
            </Canvas>
          </motion.div>
        </div>

        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <ChevronDown className="scroll-arrow" />
          <span>Scroll to explore</span>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero