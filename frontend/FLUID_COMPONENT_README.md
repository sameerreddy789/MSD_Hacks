# Autonomous WebGL Fluid Simulation

## Overview

This is a modified WebGL fluid simulation that moves **autonomously** using systematic mathematical patterns instead of reacting to mouse/audio input.

## Key Features

### 🎨 Autonomous Animation System
- **Lissajous Curves**: Multiple virtual cursors trace smooth parametric paths
- **Color Cycling**: Hue progresses gracefully through the spectrum
- **Rhythmic Splats**: Calculated bursts at regular intervals (not random)
- **No User Input**: Completely self-animating

### 🔮 Glassmorphic Design
- **Transparent Sections**: All content areas have opacity 0 or minimal background
- **Backdrop Blur**: Glass-like frosted effect on cards and navbar
- **Fluid as Hero**: The WebGL canvas is the standout visual element
- **Enhanced Readability**: Text shadows and glows for legibility

## Files

- `fluid-autonomous.html` - Main page with fluid background
- `assets/js/fluid-base.js` - Modified autonomous fluid simulation

## How It Works

### Virtual Cursors (Lissajous Curves)

```javascript
const virtualCursors = [
  { a: 3, b: 4, delta: 0, speed: 0.5, phase: 0 },
  { a: 5, b: 4, delta: Math.PI / 2, speed: 0.3, phase: Math.PI },
  { a: 2, b: 3, delta: Math.PI / 4, speed: 0.7, phase: Math.PI / 2 },
];
```

Each cursor follows the equation:
- `x = 0.5 + 0.4 * sin(a*t + delta)`
- `y = 0.5 + 0.4 * sin(b*t)`

### Color Cycle

```javascript
let hueOffset = 0;
const hueSpeed = 0.1; // degrees per frame

// In animation loop:
hueOffset += hueSpeed;
const hue = (hueOffset + index * 120) % 360;
```

### Rhythmic Splats

```javascript
let splatTimer = 0;
const splatInterval = 2.0; // seconds
const splatBurstSize = 5; // splats per burst

// In animation loop:
splatTimer += dt;
if (splatTimer >= splatInterval) {
  splatTimer = 0;
  multipleSplats(splatBurstSize);
}
```

## Modifications from Original

### Removed
- ❌ Mouse event listeners (`mousemove`, `mousedown`, `mouseup`)
- ❌ Touch event listeners (`touchstart`, `touchmove`, `touchend`)
- ❌ Audio listener (`livelyAudioListener`)
- ❌ Random splat timer
- ❌ Keyboard controls

### Added
- ✅ `tickAutonomousAnimation(dt)` - Main autonomous animation function
- ✅ Virtual cursor system with Lissajous curves
- ✅ Systematic color cycling
- ✅ Rhythmic splat bursts
- ✅ Full-screen canvas background
- ✅ Glassmorphic UI overlay

## Configuration

### Fluid Settings

```javascript
let config = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  DENSITY_DISSIPATION: 0.97,
  VELOCITY_DISSIPATION: 0.98,
  PRESSURE: 0.8,
  CURL: 30,
  SPLAT_RADIUS: 0.25,
  SPLAT_FORCE: 6000,
  TRANSPARENT: true, // Important for glassmorphic effect
  BLOOM: true,
  SUNRAYS: true,
};
```

### Animation Tuning

```javascript
// Adjust cursor speed
virtualCursors[0].speed = 0.5; // slower = smoother

// Adjust color cycle speed
const hueSpeed = 0.1; // lower = slower color changes

// Adjust splat frequency
const splatInterval = 2.0; // seconds between bursts
const splatBurstSize = 5; // splats per burst
```

## Glassmorphic CSS

```css
.glass-card {
  background: rgba(10, 10, 20, 0.15) !important;
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(0, 255, 178, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
}
```

## Browser Compatibility

- ✅ Chrome/Edge (WebGL 2.0)
- ✅ Firefox (WebGL 2.0)
- ✅ Safari (WebGL 1.0 fallback)
- ✅ Mobile browsers (reduced resolution)

## Performance

- **Desktop**: 60 FPS at 1920x1080
- **Mobile**: 30-60 FPS (auto-adjusts resolution)
- **GPU**: Uses WebGL hardware acceleration

## Customization Tips

### Make it Faster
```javascript
virtualCursors.forEach(c => c.speed *= 2);
const hueSpeed = 0.2;
const splatInterval = 1.0;
```

### Make it Calmer
```javascript
virtualCursors.forEach(c => c.speed *= 0.5);
const hueSpeed = 0.05;
const splatInterval = 4.0;
config.SPLAT_FORCE = 3000;
```

### Change Colors
```javascript
// Warmer colors
const hue = (hueOffset + 30) % 360; // shift towards orange/red

// Cooler colors
const hue = (hueOffset + 180) % 360; // shift towards blue/cyan
```

## Credits

- Original WebGL Fluid: Pavel Dobryakov
- Autonomous Modification: MSDHacks Team
- Glassmorphic Design: MSDHacks Team

## License

MIT License (see original fluid simulation license)
