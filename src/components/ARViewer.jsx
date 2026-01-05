import { useState, useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { XR, ARButton } from '@react-three/xr'
import { useGLTF, useAnimations, Text } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Camera } from 'lucide-react'

// AR Dinosaur Model Component
const ARDinosaurModel = ({ modelPath, position = [0, 0, 0], scale = [0.5, 0.5, 0.5] }) => {
  const group = useRef()
  
  try {
    const { scene, animations } = useGLTF(modelPath)
    const { actions } = useAnimations(animations, group)

    // Play animation if available
    if (actions && Object.keys(actions).length > 0) {
      const firstAnimation = Object.keys(actions)[0]
      if (actions[firstAnimation]) {
        actions[firstAnimation].play()
      }
    }

    return (
      <group ref={group} position={position} scale={scale}>
        <primitive object={scene.clone()} />
      </group>
    )
  } catch (error) {
    console.error('Error loading AR model:', error)
    return (
      <mesh position={position} scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="#8b5cf6" />
      </mesh>
    )
  }
}

// Surface Detection Marker
const SurfaceMarker = ({ position, onClick, visible }) => {
  const markerRef = useRef()

  if (!visible) return null

  return (
    <group position={position} onClick={onClick}>
      <mesh ref={markerRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.8, 1, 32]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.8, 32]} />
        <meshBasicMaterial color="#00ff00" transparent opacity={0.2} />
      </mesh>
    </group>
  )
}

// AR Instructions Component
const ARInstructions = ({ visible }) => {
  if (!visible) return null

  return (
    <Text
      position={[0, 2, -2]}
      fontSize={0.3}
      color="#ffffff"
      anchorX="center"
      anchorY="middle"
    >
      Scan your surroundings and look for a flat surface.{'\n'}
      Tap the circular marker to place the model.
    </Text>
  )
}

const ARViewer = ({ isOpen, onClose }) => {
  const [selectedModel, setSelectedModel] = useState('indominus')
  const [modelPlaced, setModelPlaced] = useState(false)
  const [modelPosition, setModelPosition] = useState([0, 0, -2])
  const [showInstructions, setShowInstructions] = useState(true)
  const [isARSupported, setIsARSupported] = useState(false)

  const models = {
    indominus: '/assets/3d-models/walking_indominus_rex.glb',
    velociraptor: '/assets/3d-models/velociraptor_walk.glb',
    trex: '/assets/3d-models/t-rex_walk.glb'
  }

  // Check AR support
  useEffect(() => {
    const checkARSupport = async () => {
      if (typeof navigator !== 'undefined' && navigator.xr) {
        try {
          const supported = await navigator.xr.isSessionSupported('immersive-ar')
          console.log('AR Support:', supported)
          setIsARSupported(supported)
        } catch (error) {
          console.error('AR Support Check Error:', error)
          setIsARSupported(false)
        }
      } else {
        console.log('WebXR not available')
        setIsARSupported(false)
      }
    }
    
    checkARSupport()
  }, [])

  const handleMarkerClick = (event) => {
    setModelPosition([event.point.x, event.point.y, event.point.z])
    setModelPlaced(true)
    setShowInstructions(false)
  }

  const handleModelSwitch = (modelName) => {
    setSelectedModel(modelName)
  }

  if (!isOpen) return null

  // Fallback for non-AR devices or AR initialization issues
  if (!isARSupported) {
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
          background: 'rgba(0, 0, 0, 0.9)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          color: 'white',
          textAlign: 'center',
          padding: '20px'
        }}
      >
        <Camera size={64} style={{ marginBottom: '20px', opacity: 0.5 }} />
        <h2 style={{ marginBottom: '10px', fontSize: '24px' }}>AR Experience</h2>
        <p style={{ marginBottom: '20px', maxWidth: '400px', lineHeight: '1.5', fontSize: '16px' }}>
          WebXR AR is not supported on this device. This feature works best on mobile devices with AR capabilities using Chrome or Safari.
        </p>
        <p style={{ marginBottom: '30px', maxWidth: '400px', lineHeight: '1.5', fontSize: '14px', opacity: 0.7 }}>
          Try opening this site on a mobile device with ARCore (Android) or ARKit (iOS) support.
        </p>
        <button
          onClick={onClose}
          style={{
            background: '#8b5cf6',
            border: 'none',
            borderRadius: '25px',
            padding: '12px 24px',
            color: 'white',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </motion.div>
    )
  }

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
        background: 'transparent'
      }}
    >
      {/* AR Canvas */}
      <Canvas>
        <XR>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          {/* AR Instructions */}
          <ARInstructions visible={showInstructions} />
          
          {/* Surface Detection Marker */}
          <SurfaceMarker
            position={[0, -1, -2]}
            onClick={handleMarkerClick}
            visible={!modelPlaced}
          />
          
          {/* 3D Model */}
          {modelPlaced && (
            <Suspense fallback={null}>
              <ARDinosaurModel
                modelPath={models[selectedModel]}
                position={modelPosition}
                scale={[0.3, 0.3, 0.3]}
              />
            </Suspense>
          )}
          
        </XR>
      </Canvas>

      {/* UI Overlay */}
      <div className="ar-ui-overlay">
        {/* Close Button */}
        <button
          className="ar-close-btn"
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
            justifyContent: 'center'
          }}
        >
          <X size={24} />
        </button>

        {/* Model Selection UI */}
        <div
          className="ar-model-selector"
          style={{
            position: 'absolute',
            right: '20px',
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}
        >
          {Object.keys(models).map((modelName) => (
            <button
              key={modelName}
              onClick={() => handleModelSwitch(modelName)}
              className={`ar-model-btn ${selectedModel === modelName ? 'active' : ''}`}
              style={{
                background: selectedModel === modelName 
                  ? 'rgba(139, 92, 246, 0.8)' 
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

        {/* Instructions Text */}
        {showInstructions && (
          <div
            className="ar-instructions"
            style={{
              position: 'absolute',
              bottom: '100px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(0, 0, 0, 0.8)',
              color: 'white',
              padding: '20px',
              borderRadius: '10px',
              textAlign: 'center',
              maxWidth: '300px'
            }}
          >
            <Camera size={32} style={{ marginBottom: '10px' }} />
            <p style={{ margin: 0, fontSize: '16px', lineHeight: '1.4' }}>
              Scan your surroundings and look for a flat surface. 
              Tap the circular marker to place the model.
            </p>
          </div>
        )}
      </div>

      {/* AR Button */}
      <ARButton
        style={{
          position: 'absolute',
          bottom: '30px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#8b5cf6',
          border: 'none',
          borderRadius: '25px',
          padding: '15px 30px',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer'
        }}
      />
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