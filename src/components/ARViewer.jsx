import { useState, useRef, Suspense, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { useGLTF, useAnimations, Text } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera, Search, Target } from 'lucide-react'

// AR Dinosaur Model Component with Movement
const ARDinosaurModel = ({ modelPath, position = [0, 0, 0], scale = [0.5, 0.5, 0.5], movement }) => {
  const group = useRef()
  const [currentPosition, setCurrentPosition] = useState(position)
  const [isMoving, setIsMoving] = useState(false)
  
  try {
    const { scene, animations } = useGLTF(modelPath)
    const { actions } = useAnimations(animations, group)

    // Play animation based on movement
    useEffect(() => {
      if (actions && Object.keys(actions).length > 0) {
        const animationName = Object.keys(actions)[0]
        const action = actions[animationName]
        
        if (action) {
          action.reset()
          action.play()
          action.setLoop(2) // Loop infinitely
        }
      }
    }, [actions])

    // Handle movement from joystick
    useFrame((state, delta) => {
      const isCurrentlyMoving = movement.x !== 0 || movement.z !== 0
      
      if (isCurrentlyMoving !== isMoving) {
        setIsMoving(isCurrentlyMoving)
      }
      
      if (isCurrentlyMoving) {
        // Update position based on movement
        setCurrentPosition(prev => [
          Math.max(-3, Math.min(3, prev[0] + movement.x * delta * 2)), // Limit movement range
          prev[1],
          Math.max(-3, Math.min(1, prev[2] + movement.z * delta * 2))
        ])
        
        // Rotate model to face movement direction
        if (group.current) {
          const targetRotation = Math.atan2(movement.x, movement.z)
          group.current.rotation.y = targetRotation
        }
      }
    })

    return (
      <group ref={group} position={currentPosition} scale={scale}>
        <primitive object={scene.clone()} />
      </group>
    )
  } catch (error) {
    console.error('Error loading AR model:', error)
    return (
      <mesh position={currentPosition} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
    )
  }
}

// Surface Detection Marker Component
const SurfaceMarker = ({ position, onClick, visible }) => {
  const markerRef = useRef()

  useFrame((state) => {
    if (markerRef.current && visible) {
      markerRef.current.rotation.z = state.clock.elapsedTime * 0.5
    }
  })

  if (!visible) return null

  return (
    <group position={position} onClick={onClick}>
      {/* Outer ring */}
      <mesh ref={markerRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.8} />
      </mesh>
      {/* Inner circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.3} />
      </mesh>
      {/* Center dot */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.1, 16]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

// Virtual Joystick Component
const VirtualJoystick = ({ onMove, visible }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [knobPosition, setKnobPosition] = useState({ x: 0, y: 0 })
  const joystickRef = useRef()

  const handleStart = (e) => {
    if (!visible) return
    setIsDragging(true)
    e.preventDefault()
    e.stopPropagation()
  }

  const handleMove = (e) => {
    if (!isDragging || !visible || !joystickRef.current) return
    
    e.preventDefault()
    e.stopPropagation()
    
    const rect = joystickRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY
    
    const deltaX = clientX - centerX
    const deltaY = clientY - centerY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
    const maxDistance = 35 // Reduced for better control
    
    let normalizedX = 0
    let normalizedY = 0
    
    if (distance <= maxDistance) {
      setKnobPosition({ x: deltaX, y: deltaY })
      normalizedX = deltaX / maxDistance
      normalizedY = deltaY / maxDistance
    } else {
      const angle = Math.atan2(deltaY, deltaX)
      const limitedX = Math.cos(angle) * maxDistance
      const limitedY = Math.sin(angle) * maxDistance
      setKnobPosition({ x: limitedX, y: limitedY })
      normalizedX = limitedX / maxDistance
      normalizedY = limitedY / maxDistance
    }
    
    // Send movement data
    onMove({ x: normalizedX, z: normalizedY })
  }

  const handleEnd = (e) => {
    if (!visible) return
    e.preventDefault()
    e.stopPropagation()
    
    setIsDragging(false)
    setKnobPosition({ x: 0, y: 0 })
    onMove({ x: 0, z: 0 })
  }

  useEffect(() => {
    const handleMouseMove = (e) => handleMove(e)
    const handleMouseUp = (e) => handleEnd(e)
    const handleTouchMove = (e) => handleMove(e)
    const handleTouchEnd = (e) => handleEnd(e)

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false })
      document.addEventListener('mouseup', handleMouseUp, { passive: false })
      document.addEventListener('touchmove', handleTouchMove, { passive: false })
      document.addEventListener('touchend', handleTouchEnd, { passive: false })
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchmove', handleTouchMove)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [isDragging, visible])

  if (!visible) return null

  return (
    <div
      ref={joystickRef}
      style={{
        position: 'absolute',
        bottom: '30px',
        left: '30px',
        width: '90px',
        height: '90px',
        borderRadius: '50%',
        background: 'rgba(0, 0, 0, 0.6)',
        border: '3px solid rgba(255, 255, 255, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 5,
        pointerEvents: 'auto',
        touchAction: 'none',
        userSelect: 'none'
      }}
      onMouseDown={handleStart}
      onTouchStart={handleStart}
    >
      <div
        style={{
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          background: isDragging 
            ? 'rgba(139, 92, 246, 1)' 
            : 'rgba(139, 92, 246, 0.8)',
          border: '2px solid white',
          transform: `translate(${knobPosition.x}px, ${knobPosition.y}px)`,
          transition: isDragging ? 'none' : 'transform 0.2s ease',
          cursor: isDragging ? 'grabbing' : 'grab',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
        }}
      />
    </div>
  )
}

// AR Experience Phases
const AR_PHASES = {
  SURFACE_DETECTION: 'surface_detection',
  MARKER_PLACEMENT: 'marker_placement',
  MODEL_SPAWNED: 'model_spawned'
}

// Camera AR Experience Component
const CameraARExperience = ({ selectedModel, onModelSwitch, models }) => {
  const videoRef = useRef()
  const [cameraError, setCameraError] = useState(null)
  const [cameraStarted, setCameraStarted] = useState(false)
  const [arPhase, setArPhase] = useState(AR_PHASES.SURFACE_DETECTION)
  const [markerPosition, setMarkerPosition] = useState([0, -1, -2])
  const [modelMovement, setModelMovement] = useState({ x: 0, z: 0 })
  const [surfaceDetectionProgress, setSurfaceDetectionProgress] = useState(0)
  const [detectedSurfaces, setDetectedSurfaces] = useState([])

  // Model-specific scales to normalize sizes
  const getModelScale = (modelName) => {
    switch(modelName) {
      case 'indominus':
        return [0.3, 0.3, 0.3] // Indominus is large, scale down
      case 'velociraptor':
        return [0.8, 0.8, 0.8] // Velociraptor is small, scale up
      case 'trex':
        return [0.4, 0.4, 0.4] // T-Rex is large, scale down
      default:
        return [0.5, 0.5, 0.5]
    }
  }

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'environment',
            width: { ideal: 1280 },
            height: { ideal: 720 }
          }
        })
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.play()
          setCameraStarted(true)
          
          // Simulate surface detection process
          simulateSurfaceDetection()
        }
      } catch (error) {
        console.error('Camera access error:', error)
        setCameraError(error.message)
      }
    }

    startCamera()

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks()
        tracks.forEach(track => track.stop())
      }
    }
  }, [])

  const simulateSurfaceDetection = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += Math.random() * 15 + 5 // Random progress between 5-20%
      setSurfaceDetectionProgress(Math.min(progress, 100))
      
      // Simulate finding surfaces at different progress points
      if (progress > 30 && detectedSurfaces.length === 0) {
        setDetectedSurfaces([{ id: 1, confidence: 0.6, position: [1, -1, -2] }])
      }
      if (progress > 60 && detectedSurfaces.length === 1) {
        setDetectedSurfaces(prev => [...prev, { id: 2, confidence: 0.8, position: [-0.5, -1, -1.5] }])
      }
      if (progress > 85 && detectedSurfaces.length === 2) {
        setDetectedSurfaces(prev => [...prev, { id: 3, confidence: 0.9, position: [0, -1, -2] }])
      }
      
      if (progress >= 100) {
        clearInterval(interval)
        // Find the best surface (highest confidence)
        const bestSurface = detectedSurfaces.reduce((best, current) => 
          current.confidence > best.confidence ? current : best, 
          detectedSurfaces[0] || { position: [0, -1, -2] }
        )
        setMarkerPosition(bestSurface.position)
        setTimeout(() => setArPhase(AR_PHASES.MARKER_PLACEMENT), 500)
      }
    }, 200)
  }

  const handleMarkerClick = () => {
    setArPhase(AR_PHASES.MODEL_SPAWNED)
  }

  const handleJoystickMove = (movement) => {
    setModelMovement(movement)
  }

  if (cameraError) {
    return (
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        color: 'white',
        background: 'rgba(0, 0, 0, 0.8)',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '300px'
      }}>
        <Camera size={48} style={{ marginBottom: '15px', opacity: 0.7 }} />
        <h3 style={{ marginBottom: '10px' }}>Camera Access Required</h3>
        <p style={{ fontSize: '14px', lineHeight: '1.4', marginBottom: '15px' }}>
          Please allow camera access to use the AR feature.
        </p>
        <p style={{ fontSize: '12px', opacity: 0.7 }}>
          Error: {cameraError}
        </p>
      </div>
    )
  }

  return (
    <>
      {/* Camera Video Background */}
      <video
        ref={videoRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 1
        }}
        playsInline
        muted
      />

      {/* 3D Canvas Overlay */}
      {cameraStarted && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 2,
          pointerEvents: arPhase === AR_PHASES.MARKER_PLACEMENT ? 'auto' : 'none'
        }}>
          <Canvas
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ background: 'transparent' }}
          >
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.2} />
            <pointLight position={[-10, -10, -5]} intensity={0.6} />
            
            {/* Surface Detection Markers (multiple) */}
            {arPhase === AR_PHASES.SURFACE_DETECTION && detectedSurfaces.map(surface => (
              <mesh 
                key={surface.id}
                position={surface.position} 
                rotation={[-Math.PI / 2, 0, 0]}
              >
                <ringGeometry args={[0.3, 0.4, 16]} />
                <meshBasicMaterial 
                  color="#ffff00" 
                  transparent 
                  opacity={surface.confidence * 0.6} 
                />
              </mesh>
            ))}
            
            {/* Main Surface Detection Marker */}
            <SurfaceMarker
              position={markerPosition}
              onClick={handleMarkerClick}
              visible={arPhase === AR_PHASES.MARKER_PLACEMENT}
            />
            
            {/* 3D Model */}
            {arPhase === AR_PHASES.MODEL_SPAWNED && (
              <Suspense fallback={null}>
                <ARDinosaurModel
                  modelPath={models[selectedModel]}
                  position={markerPosition}
                  scale={getModelScale(selectedModel)}
                  movement={modelMovement}
                />
              </Suspense>
            )}
          </Canvas>
        </div>
      )}

      {/* Phase-based Instructions */}
      {cameraStarted && (
        <div style={{
          position: 'absolute',
          bottom: arPhase === AR_PHASES.MODEL_SPAWNED ? '150px' : '120px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.8)',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '10px',
          textAlign: 'center',
          maxWidth: '320px',
          zIndex: 3
        }}>
          {arPhase === AR_PHASES.SURFACE_DETECTION && (
            <>
              <Search size={24} style={{ marginBottom: '10px' }} />
              <p style={{ margin: '0 0 10px 0', fontSize: '14px', lineHeight: '1.4' }}>
                Scanning for surfaces... Point your camera at flat areas.
              </p>
              <div style={{
                width: '100%',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '2px',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: `${surfaceDetectionProgress}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #00ff00, #8b5cf6)',
                  transition: 'width 0.3s ease'
                }} />
              </div>
              <p style={{ margin: '5px 0 0 0', fontSize: '12px', opacity: 0.8 }}>
                {Math.round(surfaceDetectionProgress)}% - {detectedSurfaces.length} surfaces found
              </p>
            </>
          )}
          
          {arPhase === AR_PHASES.MARKER_PLACEMENT && (
            <>
              <Target size={24} style={{ marginBottom: '10px' }} />
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                Surface detected! Tap the green marker to place your {selectedModel === 'trex' ? 'T-Rex' : selectedModel}.
              </p>
            </>
          )}
          
          {arPhase === AR_PHASES.MODEL_SPAWNED && (
            <>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
                {selectedModel === 'trex' ? 'T-Rex' : selectedModel} spawned! Use the joystick to move it around.
              </p>
            </>
          )}
        </div>
      )}

      {/* Virtual Joystick */}
      <VirtualJoystick
        onMove={handleJoystickMove}
        visible={arPhase === AR_PHASES.MODEL_SPAWNED}
      />
    </>
  )
}

const ARViewer = ({ isOpen, onClose }) => {
  const [selectedModel, setSelectedModel] = useState('indominus')

  const models = {
    indominus: '/assets/3d-models/walking_indominus_rex.glb',
    velociraptor: '/assets/3d-models/velociraptor_walk.glb',
    trex: '/assets/3d-models/t-rex_walk.glb'
  }

  const handleModelSwitch = (modelName) => {
    setSelectedModel(modelName)
  }

  if (!isOpen) return null

  return (
    <motion.div
      className="ar-viewer"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 9999,
        background: '#000'
      }}
    >
      {/* Camera AR Experience */}
      <CameraARExperience 
        selectedModel={selectedModel}
        onModelSwitch={handleModelSwitch}
        models={models}
      />

      {/* UI Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 4,
        pointerEvents: 'none'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            left: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            color: 'white',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'auto'
          }}
        >
          <X size={24} />
        </button>

        {/* Model Selection UI */}
        <div style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          pointerEvents: 'auto'
        }}>
          {Object.keys(models).map((modelName) => (
            <button
              key={modelName}
              onClick={() => handleModelSwitch(modelName)}
              style={{
                background: selectedModel === modelName 
                  ? 'rgba(139, 92, 246, 0.9)' 
                  : 'rgba(0, 0, 0, 0.7)',
                border: selectedModel === modelName 
                  ? '2px solid #8b5cf6' 
                  : '2px solid transparent',
                borderRadius: '10px',
                padding: '12px 16px',
                color: 'white',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                textTransform: 'capitalize',
                minWidth: '100px'
              }}
            >
              {modelName === 'trex' ? 'T-Rex' : modelName}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

// Preload models
Object.values({
  indominus: '/assets/3d-models/walking_indominus_rex.glb',
  velociraptor: '/assets/3d-models/velociraptor_walk.glb',
  trex: '/assets/3d-models/t-rex_walk.glb'
}).forEach(path => {
  try {
    useGLTF.preload(path)
  } catch (error) {
    console.error('Error preloading model:', path, error)
  }
})

export default ARViewer