import { useState } from 'react'
import ARViewer from './ARViewer'
import BasicARViewer from './BasicARViewer'
import DebugARViewer from './DebugARViewer'
import ARInstructions from './ARInstructions'
import './ARViewer.css'

const ARButton = () => {
  const [showAR, setShowAR] = useState(false)
  const [showBasicAR, setShowBasicAR] = useState(false)
  const [showDebugAR, setShowDebugAR] = useState(false)

  const handleARClick = () => {
    setShowAR(true)
  }

  const handleBasicARClick = () => {
    setShowBasicAR(true)
  }

  const handleDebugARClick = () => {
    setShowDebugAR(true)
  }

  const handleCloseAR = () => {
    setShowAR(false)
  }

  const handleCloseBasicAR = () => {
    setShowBasicAR(false)
  }

  const handleCloseDebugAR = () => {
    setShowDebugAR(false)
  }

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button className="ar-button" onClick={handleARClick}>
            <svg className="ar-icon" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            View AR Dinosaur
          </button>
          <ARInstructions />
        </div>
        
        <button 
          className="ar-button" 
          onClick={handleBasicARClick}
          style={{ fontSize: '12px', padding: '6px 12px', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' }}
        >
          🔧 Basic AR
        </button>
        
        <button 
          className="ar-button" 
          onClick={handleDebugARClick}
          style={{ fontSize: '12px', padding: '6px 12px', background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)' }}
        >
          🐛 Debug Camera
        </button>
      </div>
      
      <ARViewer isActive={showAR} onClose={handleCloseAR} />
      <BasicARViewer isActive={showBasicAR} onClose={handleCloseBasicAR} />
      <DebugARViewer isActive={showDebugAR} onClose={handleCloseDebugAR} />
    </>
  )
}

export default ARButton