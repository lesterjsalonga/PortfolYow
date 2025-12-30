import { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Torus, MeshDistortMaterial } from '@react-three/drei'
import { motion, useInView } from 'framer-motion'
import { 
  Code, 
  Cloud, 
  Eye,
  Zap
} from 'lucide-react'

const AnimatedTorus = () => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.3
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.2
    }
  })

  return (
    <Torus ref={meshRef} args={[1, 0.4, 16, 100]}>
      <MeshDistortMaterial
        color="#0066ff"
        attach="material"
        distort={0.2}
        speed={1}
        roughness={0}
        transparent
        opacity={0.8}
      />
    </Torus>
  )
}

const Skills = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const skillCategories = [
    {
      title: "Augmented Reality",
      icon: Eye,
      color: "cyan",
      skills: ["Unity 3D", "AR Foundation", "Vuforia", "ARCore/ARKit", "3D Modeling"]
    },
    {
      title: "Full Stack Development",
      icon: Code,
      color: "blue",
      skills: ["React/Next.js", "Node.js", "JavaScript/TypeScript", "HTML/CSS", "RESTful APIs"]
    },
    {
      title: "Cloud & Database",
      icon: Cloud,
      color: "purple",
      skills: ["Huawei Cloud", "Firebase", "PostgreSQL", "Supabase", "MongoDB"]
    },
    {
      title: "Development Tools",
      icon: Zap,
      color: "cyan",
      skills: ["Git/GitHub", "VS Code", "Unity Editor", "Figma", "Postman"]
    }
  ]

  const getColorClass = (color) => {
    switch (color) {
      case 'cyan': return 'skill-cyan'
      case 'blue': return 'skill-blue'
      case 'purple': return 'skill-purple'
      default: return 'skill-cyan'
    }
  }

  return (
    <section id="skills" className="skills section">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="skills-header">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Technical <span className="gradient-text">Skills</span>
            </motion.h2>

            <motion.div
              className="skills-3d"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ delay: 0.4, duration: 1 }}
            >
              <Canvas camera={{ position: [0, 0, 5] }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} />
                <AnimatedTorus />
              </Canvas>
            </motion.div>
          </div>

          <div className="skills-grid">
            {skillCategories.map((category, categoryIndex) => (
              <motion.div
                key={category.title}
                className={`skill-category glass ${getColorClass(category.color)}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ delay: 0.6 + categoryIndex * 0.2, duration: 0.8 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: `var(--glow-${category.color})`,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="category-header">
                  <category.icon className="category-icon" />
                  <h3 className="category-title">{category.title}</h3>
                </div>

                <div className="skills-list">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill}
                      className="skill-tag"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ 
                        delay: 0.8 + categoryIndex * 0.2 + skillIndex * 0.1, 
                        duration: 0.5 
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2,
                        transition: { duration: 0.2 }
                      }}
                    >
                      {skill}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Skills