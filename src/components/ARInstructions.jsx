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
            <h3>AR Business Card Experience</h3>
            <p>Experience an interactive 3D dinosaur using your business card as an AR marker!</p>
            
            <h4>How to use:</h4>
            <ol>
              <li>Click the "View AR Dinosaur" button</li>
              <li>Allow camera access when prompted</li>
              <li>Point your camera at your business card</li>
              <li>Watch the animated dinosaur appear on your card!</li>
            </ol>
            
            <h4>For best results:</h4>
            <ul>
              <li>Use bright, even lighting</li>
              <li>Keep your business card flat and clean</li>
              <li>Hold your device steady</li>
              <li>Ensure the entire card is visible in the camera</li>
              <li>Avoid shadows on the card</li>
              <li>Keep the card 1-3 feet from the camera</li>
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