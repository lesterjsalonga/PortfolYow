# AR Marker Setup for Business Card

## Creating a Custom Marker Pattern

To use your actual business card as an AR marker, you need to create a pattern file:

### Method 1: Using AR.js Marker Training Tool
1. Go to https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
2. Upload a clear, high-contrast image of your business card
3. Download the generated `.patt` file
4. Replace `business-card-pattern.patt` with your generated file

### Method 2: Using AR.js Pattern Marker Generator
1. Visit https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
2. Upload your business card image (should be square, high contrast)
3. Download the pattern file
4. Save it as `business-card-pattern.patt` in this directory

### Business Card Image Requirements:
- High contrast between foreground and background
- Square aspect ratio (crop if needed)
- Clear, sharp image
- Avoid reflective surfaces
- Good lighting when photographed

### Testing:
- For initial testing, the current setup uses the Hiro marker
- Print the Hiro marker from: https://ar-js-org.github.io/AR.js/data/images/hiro.png
- Once you have your custom pattern, update the ARViewer.jsx to use:
  ```jsx
  <a-marker 
    type="pattern" 
    url="/assets/ar-markers/business-card-pattern.patt"
    // ... other props
  >
  ```

### Tips for Better Tracking:
- Ensure good lighting when using AR
- Keep the marker flat and visible
- Avoid shadows on the marker
- Use a marker size of at least 3x3 inches for better detection