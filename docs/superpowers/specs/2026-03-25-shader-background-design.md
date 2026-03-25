# Shader Background Replacement Design

**Date:** 2026-03-25  
**Status:** Approved  
**Goal:** Replace current fluid simulation with brand-colored shader background

---

## Overview

Replace the existing WebGL fluid simulation (`fluid-autonomous.js`) with a new aurora-style shader background that uses the brand's cyan/green color palette. The new shader will be fully autonomous (no user interaction) and more performant than the current fluid physics simulation.

---

## Requirements

### Functional Requirements
- ✅ Autonomous animation (no mouse/touch interaction)
- ✅ Continuous smooth movement
- ✅ Responsive to window resize
- ✅ 60 FPS performance target
- ✅ Works on same canvas element (`#fluidCanvas`)

### Visual Requirements
- ✅ Brand colors: Primary #00FFB2 (cyan), Secondary #7B5EFF (purple)
- ✅ Aurora/wave effect style
- ✅ Smooth flowing animation
- ✅ Subtle glow/shimmer effects
- ✅ Black background base

### Technical Requirements
- ✅ Vanilla JavaScript (no React/TypeScript)
- ✅ Three.js for WebGL rendering
- ✅ Fragment shader for GPU acceleration
- ✅ Proper cleanup on unmount

---

## Architecture

### Component Structure
```
frontend/
├── index.html
│   └── <canvas id="fluidCanvas">
│   └── <script src="assets/js/shader-background.js">
└── assets/js/
    └── shader-background.js (NEW)
```

### Data Flow
1. Script loads after DOM ready
2. Gets canvas element by ID
3. Initializes Three.js scene + camera + renderer
4. Creates shader material with custom fragment shader
5. Starts animation loop
6. Updates time uniform each frame
7. Renders to canvas

---

## Shader Design

### Vertex Shader
- Simple passthrough (no vertex manipulation)
- Outputs full-screen quad

### Fragment Shader
- **Noise Function:** Fractal Brownian Motion (FBM) for organic movement
- **Color Calculation:** Mix of cyan (#00FFB2) and purple (#7B5EFF)
- **Animation:** Time-based wave movement
- **Effects:** Exponential glow, smoothstep blending

### Shader Parameters
- `iTime`: Animation time (increments each frame)
- `iResolution`: Canvas dimensions (for aspect ratio)
- `NUM_OCTAVES`: 3 (balance between quality and performance)

---

## Color Palette Adaptation

**Original React Component Colors:**
- Multi-color aurora (red, green, blue mix)

**Adapted Brand Colors:**
```glsl
// Primary cyan/green
vec3 color1 = vec3(0.0, 1.0, 0.7); // #00FFB2

// Secondary purple
vec3 color2 = vec3(0.48, 0.37, 1.0); // #7B5EFF

// Blend based on position and time
vec3 finalColor = mix(color1, color2, wave);
```

---

## Performance Considerations

### Optimizations
- Reduced octaves (3 instead of 5) for FBM
- Simplified noise calculations
- GPU-accelerated via fragment shader
- No CPU-heavy physics calculations

### Expected Performance
- **Current fluid:** ~60-70% GPU usage
- **New shader:** ~30-40% GPU usage
- **Frame rate:** Solid 60 FPS on modern hardware
- **Mobile:** Graceful degradation (lower resolution)

---

## Implementation Steps

1. Create `shader-background.js` with Three.js setup
2. Implement fragment shader with brand colors
3. Add animation loop and time updates
4. Handle window resize
5. Add proper cleanup
6. Update `index.html` to use new script
7. Delete old `fluid-autonomous.js`
8. Test on multiple browsers/devices

---

## Testing Strategy

### Visual Testing
- ✅ Colors match brand (#00FFB2, #7B5EFF)
- ✅ Smooth animation at 60 FPS
- ✅ No flickering or artifacts
- ✅ Proper aspect ratio on all screen sizes

### Functional Testing
- ✅ Loads without errors
- ✅ Animates continuously
- ✅ Responds to window resize
- ✅ Cleans up properly (no memory leaks)

### Browser Testing
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers

---

## Migration Plan

### Before
```html
<script src="assets/js/fluid-autonomous.js"></script>
```

### After
```html
<script src="assets/js/shader-background.js"></script>
```

### Rollback Plan
If issues arise, revert commit and restore `fluid-autonomous.js`.

---

## Success Criteria

- ✅ Shader renders with brand colors
- ✅ Animation is smooth and autonomous
- ✅ Performance is better than current fluid
- ✅ No console errors
- ✅ Works on all target browsers
- ✅ User approves visual appearance

---

## Future Enhancements (Out of Scope)

- Mouse interaction effects
- Multiple color themes
- Performance settings toggle
- Accessibility options (reduce motion)
