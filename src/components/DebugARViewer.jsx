import { useEffect, useRef, useState } from 'react'
import './ARViewer.css'

const DebugARViewer = ({ isActive, onClose }) => {
  const videoRef = useRef()
  const canvasRef = useRef()
  const [stream, setStream] = useState(null)
  const [error, setError] = useState(null)
  const [cameraStatus, setCameraStatus] = useState('Not started')

  useEffect(() => {
    if (!isActive) return

    const startCamera = async () => {
      try {
        setCameraStatus('Requesting camera access...')
        
        const mediaStream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            width: { ideal: 1280 },
            height: { ideal: 720 },
            facingMode: 'environment'
          } 
        })
        
        setCameraStatus('Camera access granted')
        
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream
          setStream(mediaStream)
          setCameraStatus('Camera feed active')
        }
      } catch (err) {
        console.error('Camera access failed:', err)
        setError(`Camera failed: ${err.message}`)
        setCameraStatus('Camera access failed')
      }
    }

    startCamera()

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop())
        setCameraStatus('Camera stopped')
      }
    }
  }, [isActive, stream])

  if (!isActive) return null

  return (
    <div className="ar-viewer">
      <div className="ar-overlay">
        <button className="ar-close-btn" onClick={onClose}>
          ✕
        </button>
        
        <div className="ar-instructions">
          <h3>Camera Debug Mode</h3>
          <p><strong>Status:</strong> {cameraStatus}</p>
          {error && <p style={{color: 'red'}}><strong>Error:</strong> {error}</p>}
          <p>This tests basic camera access without AR.js</p>
        </div>
      </div>
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {stream && (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        )}
        
        {!stream && !error && (
          <div style={{ color: 'white', textAlign: 'center' }}>
            <p>Waiting for camera...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default DebugARViewer