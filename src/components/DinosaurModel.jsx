import { useRef, Suspense } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'

const DinosaurModel = () => {
  const group = useRef()
  
  try {
    console.log('Attempting to load GLB model...')
    const { scene, animations } = useGLTF('/assets/3d-models/walking_indominus_rex.glb')
    const { actions } = useAnimations(animations, group)

    console.log('GLB model loaded successfully:', { scene, animations })

    // Start the walking animation if it exists
    useFrame(() => {
      if (actions && Object.keys(actions).length > 0) {
        const firstAnimation = Object.keys(actions)[0]
        if (actions[firstAnimation] && !actions[firstAnimation].isRunning()) {
          actions[firstAnimation].play()
        }
      }
    })

    // Gentle rotation for the model
    useFrame((state) => {
      if (group.current) {
        group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
      }
    })

    return (
      <group ref={group} scale={[5.5, 5.5, 5.5]} position={[0, -2, 0]}>
        <primitive object={scene} />
      </group>
    )
  } catch (error) {
    console.error('Error loading dinosaur model:', error)
    // Fallback to a simple animated box if model fails to load
    return <FallbackModel />
  }
}

// Fallback component with animation
const FallbackModel = () => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.5
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3
    }
  })

  return (
    <mesh ref={meshRef} scale={[3, 2, 1]} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00ffff" wireframe />
    </mesh>
  )
}

// Preload the model with error handling
try {
  useGLTF.preload('/assets/3d-models/walking_indominus_rex.glb')
} catch (error) {
  console.error('Error preloading GLB model:', error)
}

export default DinosaurModel