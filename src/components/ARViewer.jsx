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
        // Create AR scene HTML with better camera settings
        const arHTML = `
          <a-scene
            vr-mode-ui="enabled: false"
            arjs="sourceType: webcam; debugUIEnabled: true; detectionMode: mono_and_matrix; matrixCodeType: 3x3;"
            renderer="logarithmicDepthBuffer: true;"
            embedded
            style="height: 100vh; width: 100vw;"
          >
            <a-assets>
              <a-asset-item id="dinosaur" src="/assets/3d-models/walking_indominus_rex.glb"></a-asset-item>
            </a-assets>

            <!-- Marker for business card - using Hiro for testing -->
            <a-marker 
              preset="hiro"
              id="marker"
              smooth="true" 
              smoothCount="10" 
              smoothTolerance=".01" 
              smoothThreshold="5"
            >
              <a-entity
                id="dinosaur-model"
                gltf-model="#dinosaur"
                position="0 0 0"
                scale="0.3 0.3 0.3"
                rotation="0 0 0"
                animation-mixer
              ></a-entity>
            </a-marker>

            <a-entity camera></a-entity>
          </a-scene>
        `

        if (containerRef.current) {
          containerRef.current.innerHTML = arHTML
          
          // Add event listeners to detect when camera loads
          setTimeout(() => {
            const scene = containerRef.current.querySelector('a-scene')
            if (scene) {
              scene.addEventListener('loaded', () => {
                console.log('AR scene loaded')
                setIsLoading(false)
              })
            }
          }, 500)
          
          // Fallback to stop loading after 5 seconds
          setTimeout(() => {
            setIsLoading(false)
          }, 5000)
        }
      } catch (err) {
        console.error('AR initialization failed:', err)
        setError(err.message)
        setIsLoading(false)
      }
    }

    // Load A-Frame and AR.js
    const loadScripts = async () => {
      try {
        // Load A-Frame
        if (!window.AFRAME) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://aframe.io/releases/1.4.0/aframe.min.js'
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        // Load AR.js
        if (!document.querySelector('script[src*="ar.js"]')) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.5/aframe/build/aframe-ar.js'
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        // Wait a bit for scripts to initialize
        setTimeout(initAR, 1000)
      } catch (err) {
        setError('Failed to load AR libraries. Try refreshing or use mobile device.')
        setIsLoading(false)
        console.error(err)
      }
    }

    loadScripts()

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ''
      }
    }
  }, [isActive])

  if (!isActive) return null

  return (
    <div className="ar-viewer">
      <div className="ar-overlay">
        <button className="ar-close-btn" onClick={onClose}>
          ✕
        </button>
        
        {isLoading && (
          <div className="ar-loading">
            <p>Loading camera...</p>
            <div className="ar-spinner"></div>
            <p><small>If this takes too long, try on mobile or allow camera permissions</small></p>
          </div>
        )}
        
        {!isLoading && (
          <div className="ar-instructions">
            <p>Point your camera at the Hiro marker to see the AR dinosaur!</p>
            <p><small>Download Hiro marker: <a href="https://ar-js-org.github.io/AR.js/data/images/hiro.png" target="_blank" rel="noopener noreferrer">here</a></small></p>
            <p><small>💡 Works better on mobile devices and HTTPS sites</small></p>
          </div>
        )}
        
        {error && (
          <div className="ar-error">
            <p>Error: {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
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
          zIndex: 1000
        }}
      />
    </div>
  )
}

export default ARViewer