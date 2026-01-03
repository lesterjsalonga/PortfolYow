import { useState } from 'react'
import ARInstructions from './ARInstructions'
import './ARViewer.css'

const ARLauncher = () => {
  const handleARClick = () => {
    // Open AR with business card marker
    window.open('/ar.html', '_blank', 'width=800,height=600')
  }

  const handleARDualClick = () => {
    // Open AR with both business card and Hiro markers
    window.open('/ar-dual.html', '_blank', 'width=800,height=600')
  }

  const handleARSamePage = () => {
    // Navigate to AR page in same window
    window.location.href = '/ar.html'
  }

  return (
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
        onClick={handleARDualClick}
        style={{ fontSize: '12px', padding: '6px 12px', background: 'linear-gradient(135deg, #28a745 0%, #20c997 100%)' }}
      >
        🎯 Dual Markers
      </button>
      
      <button 
        className="ar-button" 
        onClick={handleARSamePage}
        style={{ fontSize: '12px', padding: '6px 12px', background: 'linear-gradient(135deg, #6c757d 0%, #495057 100%)' }}
      >
        📱 Same Page
      </button>
    </div>
  )
}

export default ARLauncher