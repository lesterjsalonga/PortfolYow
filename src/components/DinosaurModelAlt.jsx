import { useRef, useState, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useAnimations } from '@react-three/drei'

const DinosaurModelAlt = () => {
  const group = useRef()
  const [model, setModel] = useState(null)
  const [error, setError] = useState(null)

  // Alternative loading method
  useEffect(() => {
    const loader = new GLTFLoader()
    
    loader.load(
      '/assets/3d-models/walking_indominus_rex.glb',
      (gltf) => {
        console.log('Model loaded successfully:', gltf)
        setModel(gltf)
      },
      (progress) => {
        console.log('Loading progress:', (progress.loaded / progress.total * 100) + '%')
      },
      (error) => {
        console.error('Error loading model:', error)
        setError(error)
      }
    )
  }, [])

  const { actions } = useAnimations(model?.animations || [], group)

  // Start animations
  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstAnimation = Object.keys(actions)[0]
      if (actions[firstAnimation]) {
        actions[firstAnimation].play()
      }
    }
  }, [actions])

  // Gentle rotation
  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.2
    }
  })

  if (error) {
    console.error('Rendering fallback due to error:', error)
    return <FallbackModel />
  }

  if (!model) {
    return <LoadingModel />
  }

  return (
    <group ref={group} scale={[3, 3, 3]} position={[0, -1, 0]}>
      <primitive object={model.scene} />
    </group>
  )
}

// Loading placeholder
const LoadingModel = () => {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime
    }
  })

  return (
    <mesh ref={meshRef} scale={[2, 2, 2]} position={[0, 0, 0]}>
      <octahedronGeometry args={[1]} />
      <meshStandardMaterial color="#00ffff" wireframe />
    </mesh>
  )
}

// Fallback component
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
      <meshStandardMaterial color="#ff6b6b" wireframe />
    </mesh>
  )
}

export default DinosaurModelAlt