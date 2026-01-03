import { useState } from 'react'
import './ARViewer.css'

const ARInstructions = () => {
  const [showInstructions, setShowInstructions] = useState(false)

  return (
    <div className="ar-instructions-container">
      <button 
        className="ar-info-button"
        onClick={() => setShowInstructions(!showInstructions)}
        title="AR Instructions"
      >
        ℹ️
      </button>
      
      {showInstructions && (
        <div className="ar-instructions-modal">
          <div className="ar-instructions-content">
            <h3>AR Dinosaur Experience</h3>
            <p>Experience an interactive 3D dinosaur in augmented reality!</p>
            
            <h4>How to use:</h4>
            <ol>
              <li>Click the "View AR Dinosaur" button</li>
              <li>Allow camera access when prompted</li>
              <li>Print and point your camera at the <a href="https://ar-js-org.github.io/AR.js/data/images/hiro.png" target="_blank" rel="noopener noreferrer">Hiro marker</a></li>
              <li>Watch the animated dinosaur appear!</li>
            </ol>
            
            <h4>For best results:</h4>
            <ul>
              <li>Use good lighting</li>
              <li>Keep the marker flat and visible</li>
              <li>Hold your device steady</li>
              <li>Ensure the marker is fully in view</li>
            </ul>
            
            <button 
              className="ar-close-instructions"
              onClick={() => setShowInstructions(false)}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ARInstructions