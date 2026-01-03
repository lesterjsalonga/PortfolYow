# AR Dinosaur - Size & Animation Guide

## ✅ Changes Made

### **Size Improvements:**
- **Default size**: Increased from `0.5` to `1.8` (3.6x bigger)
- **Interactive controls**: Small, Medium, Large, Huge buttons
- **Better positioning**: Adjusted Y position to keep dinosaur grounded

### **Animation Fixes:**
- **Enhanced animation-mixer**: Added `loop: repeat` and `crossFadeDuration`
- **Auto-start**: Animations should start automatically when model loads
- **Better lighting**: Added ambient and directional lights for visibility

## 🎮 How to Use Size Controls

In the AR view, you'll see buttons at the top:
- **Small**: 1x scale (original size)
- **Medium**: 1.5x scale 
- **Large**: 2x scale
- **Huge**: 3x scale (massive!)

## 🦕 Animation Troubleshooting

### If animations still don't play:

1. **Check GLB file**: Ensure your `walking_indominus_rex.glb` has embedded animations
2. **Browser console**: Look for animation-related errors
3. **Model format**: Some GLB files need specific animation names

### Animation Properties Used:
```html
animation-mixer="clip: *; loop: repeat; crossFadeDuration: 0.3; timeScale: 1"
```

- `clip: *` - Plays all animations in the file
- `loop: repeat` - Loops animations continuously  
- `crossFadeDuration: 0.3` - Smooth transitions between animations
- `timeScale: 1` - Normal animation speed

## 🔧 Custom Animation Names

If your GLB has specific animation names, you can target them:
```html
animation-mixer="clip: WalkingAnimation; loop: repeat"
```

## 📱 Testing

1. **Deploy changes** to Vercel
2. **Open AR page** via the "View AR Dinosaur" button
3. **Point at Hiro marker** - dinosaur should appear larger and animated
4. **Try size buttons** to adjust scale
5. **Check browser console** for any animation errors

The dinosaur should now be much more visible and the walking animation should play automatically when it appears!