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
              <li>Point your camera at your business card</li>
              <li>Watch the animated dinosaur appear!</li>
            </ol>
            
            <h4>For best results:</h4>
            <ul>
              <li>Use good lighting</li>
              <li>Keep your business card flat and visible</li>
              <li>Hold your device steady</li>
              <li>Ensure the entire card is in view</li>
              <li>Avoid shadows on the card</li>
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