import { useEffect, useRef, useState } from 'react'
import './ARViewer.css'

const BasicARViewer = ({ isActive, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isActive) return

    setIsLoading(true)
    setError(null)

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
        if (!document.querySelector('script[src*="aframe-ar"]')) {
          await new Promise((resolve, reject) => {
            const script = document.createElement('script')
            script.src = 'https://cdn.jsdelivr.net/gh/AR-js-org/AR.js@3.4.5/aframe/build/aframe-ar.js'
            script.onload = resolve
            script.onerror = reject
            document.head.appendChild(script)
          })
        }

        setTimeout(() => {
          setIsLoading(false)
        }, 2000)

      } catch (err) {
        setError('Failed to load AR libraries')
        setIsLoading(false)
        console.error(err)
      }
    }

    loadScripts()
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
            <p>Loading AR...</p>
            <div className="ar-spinner"></div>
          </div>
        )}
        
        {!isLoading && !error && (
          <div className="ar-instructions">
            <p>Point your camera at your business card!</p>
            <p><small>Keep the card flat and well-lit for best results</small></p>
          </div>
        )}
        
        {error && (
          <div className="ar-error">
            <p>Error: {error}</p>
          </div>
        )}
      </div>
      
      {!isLoading && !error && (
        <a-scene
          vr-mode-ui="enabled: false"
          arjs="sourceType: webcam; debugUIEnabled: false;"
          renderer="logarithmicDepthBuffer: true;"
          embedded
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            zIndex: 1000
          }}
        >
          <a-assets>
            <a-asset-item id="dinosaur" src="/assets/3d-models/walking_indominus_rex.glb"></a-asset-item>
          </a-assets>

          <a-marker type="pattern" url="/assets/ar-markers/business-card-pattern.patt">
            <a-entity
              gltf-model="#dinosaur"
              position="0 0 0"
              scale="1.5 1.5 1.5"
              animation-mixer="clip: *; loop: repeat; crossFadeDuration: 0.3"
            ></a-entity>
          </a-marker>

          <a-entity camera></a-entity>
        </a-scene>
      )}
    </div>
  )
}

export default BasicARViewer