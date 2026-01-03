import { useState } from 'react'
import ARViewer from './ARViewer'
import ARInstructions from './ARInstructions'
import './ARViewer.css'

const ARButton = () => {
  const [showAR, setShowAR] = useState(false)

  const handleARClick = () => {
    setShowAR(true)
  }

  const handleCloseAR = () => {
    setShowAR(false)
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <button className="ar-button" onClick={handleARClick}>
          <svg className="ar-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg>
          View AR Dinosaur
        </button>
        <ARInstructions />
      </div>
      
      <ARViewer isActive={showAR} onClose={handleCloseAR} />
    </>
  )
}

export default ARButton