import { useEffect, useState } from 'react'

const ModelTest = () => {
  const [fileExists, setFileExists] = useState(null)
  const [fileSize, setFileSize] = useState(null)

  useEffect(() => {
    // Test if the GLB file is accessible
    fetch('/assets/3d-models/walking_indominus_rex.glb')
      .then(response => {
        console.log('File fetch response:', response)
        if (response.ok) {
          setFileExists(true)
          const contentLength = response.headers.get('content-length')
          if (contentLength) {
            setFileSize(Math.round(parseInt(contentLength) / 1024 / 1024 * 100) / 100)
          }
        } else {
          setFileExists(false)
        }
      })
      .catch(error => {
        console.error('File fetch error:', error)
        setFileExists(false)
      })
  }, [])

  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'rgba(0,0,0,0.8)', 
      color: 'white', 
      padding: '10px',
      borderRadius: '5px',
      fontSize: '12px',
      zIndex: 1000
    }}>
      <div>GLB File Status:</div>
      <div>Exists: {fileExists === null ? 'Testing...' : fileExists ? 'Yes' : 'No'}</div>
      {fileSize && <div>Size: {fileSize} MB</div>}
    </div>
  )
}

export default ModelTest