# Generate Custom AR Marker for Business Card

## Steps to create your custom marker:

### 1. Prepare your business card image
- Take a clear, well-lit photo of your business card
- Crop it to be square (1:1 aspect ratio)
- Ensure high contrast between text/graphics and background
- Save as PNG or JPG

### 2. Generate the pattern file
Visit one of these online tools:

**Option A: AR.js Marker Training (Recommended)**
- Go to: https://ar-js-org.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
- Upload your business card image
- Download the generated `.patt` file

**Option B: Jerome Etienne's Generator**
- Go to: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html
- Upload your image
- Download the pattern

### 3. Replace the pattern file
- Save the downloaded file as `business-card-pattern.patt`
- Place it in `public/assets/ar-markers/`

### 4. Update the AR component
In `src/components/ARViewer.jsx`, change the marker from:
```jsx
<a-marker preset="hiro" ...>
```

To:
```jsx
<a-marker 
  type="pattern" 
  url="/assets/ar-markers/business-card-pattern.patt"
  ...>
```

### 5. Test your marker
- Print your business card or display it on another screen
- Use the AR feature to test tracking
- Adjust lighting and angle for best results

## Tips for better tracking:
- Use matte finish business cards (avoid glossy)
- Ensure good contrast in your design
- Test in various lighting conditions
- Keep the marker flat when using AR