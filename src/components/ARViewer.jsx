import { useEffect, useRef, useState } from 'react'
import './ARViewer.css'

const ARViewer = ({ isActive, onClose }) => {
  const containerRef = useRef()
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!isActive) return

    setIsLoading(true)
    setError(null)

    const initAR = () => {
      try {
        // Create AR scene HTML with fixed camera parameters
        const arHTML = `
          <a-scene
            vr-mode-ui="enabled: false"
            arjs="sourceType: webcam; debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3; trackingMethod: best;"
            renderer="logarithmicDepthBuffer: true; antialias: true;"
            embedded
            style="height: 100vh; width: 100vw; position: relative;"
          >
            <a-assets>
              <a-asset-item id="dinosaur" src="/assets/3d-models/walking_indominus_rex.glb"></a-asset-item>
            </a-assets>

            <a-marker 
              preset="hiro"
              id="marker"
              smooth="true" 
              smoothCount="10" 
              smoothTolerance="0.01" 
              smoothThreshold="5"
            >
              <a-entity
                id="dinosaur-model"
                gltf-model="#dinosaur"
                position="0 0 0"
                scale="1.5 1.5 1.5"
                rotation="0 0 0"
                animation-mixer="clip: *; loop: repeat; crossFadeDuration: 0.3"
              ></a-entity>
            </a-marker>

            <a-entity camera></a-entity>
          </a-scene>
        `

        if (containerRef.current) {
          containerRef.current.innerHTML = arHTML
          
          // Better event handling for AR initialization
          setTimeout(() => {
            const scene = containerRef.current.querySelector('a-scene')
            if (scene) {
              // Listen for AR.js specific events
              scene.addEventListener('arjs-video-loaded', (event) => {
                console.log('AR video loaded successfully')
                setIsLoading(false)
              })
              
              scene.addEventListener('loaded', () => {
                console.log('A-Frame scene loaded')
                // Fallback if arjs-video-loaded doesn't fire
                setTimeout(() => setIsLoading(false), 3000)
              })
              
              scene.addEventListener('camera-error', (event) => {
                console.error('Camera error:', event.detail)
                setError('Camera access failed. Please refresh and allow camera permissions.')
                setIsLoading(false)
              })
            }
          }, 1000)
          
          // Final fallback to stop loading
          setTimeout(() => {
            if (isLoading) {
              console.log('Fallback: stopping loading state')
              setIsLoading(false)
            }
          }, 10000)
        }
      } catch (err) {
        console.error('AR initialization failed:', err)
        setError(err.message)
        setIsLoading(false)
      }
    }

    // Load scripts with better conflict prevention
    const loadScripts = async () => {
      try {
        // Clear any existing A-Frame instances to prevent conflicts
        if (window.AFRAME && containerRef.current) {
          containerRef.current.innerHTML = ''
        }

        // Load A-Frame only if not already loaded
        if (!window.AFRAME) {
          console.log('Loading A-Frame...')
          await new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js'
            script.onload = () => {
              console.log('A-Frame loaded successfully')
              resolve()
            }
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        // Load AR.js only if not already loaded
        if (!document.querySelector('script[src*="aframe-ar"]')) {
          console.log('Loading AR.js...')
          await new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.5/aframe/build/aframe-ar.js'
            script.onload = () => {
              console.log('AR.js loaded successfully')
              resolve()
            }
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        // Wait longer for scripts to initialize properly
        setTimeout(initAR, 3000)
      } catch (err) {
        setError('Failed to load AR libraries. Please refresh the page.')
        setIsLoading(false)
        console.error('Script loading error:', err)
      }
    }

    loadScripts()

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
      setIsLoading(false)
      setError(null)
    }
  }, [isActive, isLoading])

  if (!isActive) return null

  return (
    <div className="ar-viewer">
      <div className="ar-overlay">
        <button className="ar-close-btn" onClick={onClose}>
          ✕
        </button>
        
        {isLoading && (
          <div className="ar-loading">
            <p>Initializing AR camera...</p>
            <div className="ar-spinner"></div>
            <p><small>This may take a moment on first load</small></p>
          </div>
        )}
        
        {!isLoading && !error && (
          <div className="ar-instructions">
            <p>Point your camera at the Hiro marker to see the AR dinosaur!</p>
            <p><small>Download Hiro marker: <a href="https://ar-js-org.github.io/AR.js/data/images/hiro.png" target="_blank" rel="noopener noreferrer">here</a></small></p>
            <p><small>💡 If camera doesn't show, try the "Debug Camera" option</small></p>
          </div>
        )}
        
        {error && (
          <div className="ar-error">
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()}>Refresh Page</button>
          </div>
        )}
      </div>
      
      <div 
        ref={containerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 1000,
          backgroundColor: 'black'
        }}
      />
    </div>
  )
}

export default ARViewer