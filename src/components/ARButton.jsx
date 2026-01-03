import { useState } from 'react'
import ARViewer from './ARViewer'
import BasicARViewer from './BasicARViewer'
import DebugARViewer from './DebugARViewer'
import ARLauncher from './ARLauncher'
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
        {/* Main AR Launcher */}
        <ARLauncher />
        
        {/* Debug Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-end' }}>
          <button 
            className="ar-button" 
            onClick={handleARClick}
            style={{ fontSize: '11px', padding: '4px 8px', background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)' }}
          >
            🔧 Embedded AR
          </button>
          
          <button 
            className="ar-button" 
            onClick={handleBasicARClick}
            style={{ fontSize: '11px', padding: '4px 8px', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' }}
          >
            🔧 Basic AR
          </button>
          
          <button 
            className="ar-button" 
            onClick={handleDebugARClick}
            style={{ fontSize: '11px', padding: '4px 8px', background: 'linear-gradient(135deg, #ffc107 0%, #fd7e14 100%)' }}
          >
            🐛 Debug Camera
          </button>
        </div>
      </div>
      
      <ARViewer isActive={showAR} onClose={handleCloseAR} />
      <BasicARViewer isActive={showBasicAR} onClose={handleCloseBasicAR} />
      <DebugARViewer isActive={showDebugAR} onClose={handleCloseDebugAR} />
    </>
  )
}

export default ARButton