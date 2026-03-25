# Shader Background Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace fluid simulation with brand-colored aurora shader background

**Architecture:** Three.js WebGL shader rendering with custom fragment shader, autonomous animation, brand color palette

**Tech Stack:** Vanilla JavaScript, Three.js, WebGL fragment shaders

---

## File Structure

**Files to Create:**
- `frontend/assets/js/shader-background.js` - New shader implementation

**Files to Modify:**
- `frontend/index.html:337` - Change script src

**Files to Delete:**
- `frontend/assets/js/fluid-autonomous.js` - Old fluid simulation

---

## Task 1: Create Shader Background Script

**Files:**
- Create: `frontend/assets/js/shader-background.js`

- [ ] **Step 1: Create file with Three.js setup**

```javascript
/*
Aurora Shader Background
Brand-colored autonomous animation
*/

"use strict";

console.log("🎨 Shader background loading...");

// Get canvas element
const canvas = document.getElementById("fluidCanvas");
if (!canvas) {
  console.error("Canvas element not found!");
}
console.log("🎨 Canvas found:", canvas);

// Three.js scene setup
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
const renderer = new THREE.WebGLRenderer({ 
  canvas: canvas,
  antialias: true,
  alpha: true
});

// Set initial size
renderer.setSize(window.innerWidth, window.innerHeight);
console.log("🎨 Renderer initialized:", window.innerWidth, "x", window.innerHeight);
```

- [ ] **Step 2: Verify file created**

Check: File exists at `frontend/assets/js/shader-background.js`

- [ ] **Step 3: Commit**

```bash
git add frontend/assets/js/shader-background.js
git commit -m "feat: Create shader background script with Three.js setup"
```

---

## Task 2: Add Shader Material

**Files:**
- Modify: `frontend/assets/js/shader-background.js`

- [ ] **Step 1: Add shader material after renderer setup**

```javascript
// Shader material with brand colors
const material = new THREE.ShaderMaterial({
  uniforms: {
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) }
  },
  vertexShader: `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float iTime;
    uniform vec2 iResolution;

    #define NUM_OCTAVES 3

    // Noise function
    float rand(vec2 n) {
      return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
    }

    float noise(vec2 p) {
      vec2 ip = floor(p);
      vec2 u = fract(p);
      u = u * u * (3.0 - 2.0 * u);
      
      float res = mix(
        mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
        mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
        u.y
      );
      return res * res;
    }

    // Fractal Brownian Motion
    float fbm(vec2 x) {
      float v = 0.0;
      float a = 0.3;
      vec2 shift = vec2(100);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      
      for (int i = 0; i < NUM_OCTAVES; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.4;
      }
      return v;
    }

    void main() {
      // Normalized coordinates
      vec2 p = (gl_FragCoord.xy - iResolution.xy * 0.5) / iResolution.y;
      p *= mat2(6.0, -4.0, 4.0, 6.0);
      
      vec4 color = vec4(0.0);
      float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;
      
      // Aurora wave effect
      for (float i = 0.0; i < 35.0; i++) {
        vec2 v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5;
        
        // Brand colors: cyan (#00FFB2) and purple (#7B5EFF)
        vec3 cyan = vec3(0.0, 1.0, 0.7);    // #00FFB2
        vec3 purple = vec3(0.48, 0.37, 1.0); // #7B5EFF
        
        float wave = sin(i * 0.2 + iTime * 0.4) * 0.5 + 0.5;
        vec3 mixedColor = mix(cyan, purple, wave);
        
        vec4 contribution = vec4(mixedColor, 1.0) * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
        
        float thinness = smoothstep(0.0, 1.0, i / 35.0) * 0.6;
        color += contribution * thinness;
      }
      
      // Tone mapping
      color = tanh(pow(color / 100.0, vec4(1.6)));
      gl_FragColor = color * 1.5;
    }
  `
});

console.log("🎨 Shader material created");
```

- [ ] **Step 2: Verify shader compiles**

Check: No console errors about shader compilation

- [ ] **Step 3: Commit**

```bash
git add frontend/assets/js/shader-background.js
git commit -m "feat: Add shader material with brand colors"
```

---

## Task 3: Add Geometry and Animation Loop

**Files:**
- Modify: `frontend/assets/js/shader-background.js`

- [ ] **Step 1: Add geometry and mesh after material**

```javascript
// Create plane geometry
const geometry = new THREE.PlaneGeometry(2, 2);
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

console.log("🎨 Mesh added to scene");

// Animation loop
let frameId;
const animate = () => {
  material.uniforms.iTime.value += 0.016; // ~60 FPS
  renderer.render(scene, camera);
  frameId = requestAnimationFrame(animate);
};

console.log("🎨 Starting animation loop...");
animate();
```

- [ ] **Step 2: Verify animation starts**

Check: Console shows "Starting animation loop..."

- [ ] **Step 3: Commit**

```bash
git add frontend/assets/js/shader-background.js
git commit -m "feat: Add geometry and animation loop"
```

---

## Task 4: Add Window Resize Handler

**Files:**
- Modify: `frontend/assets/js/shader-background.js`

- [ ] **Step 1: Add resize handler after animate function**

```javascript
// Handle window resize
const handleResize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  
  renderer.setSize(width, height);
  material.uniforms.iResolution.value.set(width, height);
  
  console.log("🎨 Resized:", width, "x", height);
};

window.addEventListener('resize', handleResize);
console.log("🎨 Resize handler attached");
```

- [ ] **Step 2: Test resize**

Action: Resize browser window
Expected: Console shows "Resized: [width] x [height]"

- [ ] **Step 3: Commit**

```bash
git add frontend/assets/js/shader-background.js
git commit -m "feat: Add window resize handler"
```

---

## Task 5: Add Cleanup Function

**Files:**
- Modify: `frontend/assets/js/shader-background.js`

- [ ] **Step 1: Add cleanup at end of file**

```javascript
// Cleanup function (for page unload)
window.addEventListener('beforeunload', () => {
  console.log("🎨 Cleaning up shader background...");
  
  cancelAnimationFrame(frameId);
  window.removeEventListener('resize', handleResize);
  
  geometry.dispose();
  material.dispose();
  renderer.dispose();
  
  console.log("🎨 Cleanup complete");
});

console.log("🎨 Shader background initialized successfully!");
```

- [ ] **Step 2: Verify cleanup registered**

Check: Console shows "Shader background initialized successfully!"

- [ ] **Step 3: Commit**

```bash
git add frontend/assets/js/shader-background.js
git commit -m "feat: Add cleanup function for proper disposal"
```

---

## Task 6: Update HTML to Use New Script

**Files:**
- Modify: `frontend/index.html:337`

- [ ] **Step 1: Change script src**

Find line 337:
```html
<script src="assets/js/fluid-autonomous.js"></script>
```

Replace with:
```html
<script src="assets/js/shader-background.js"></script>
```

- [ ] **Step 2: Verify change**

Check: Line 337 now references `shader-background.js`

- [ ] **Step 3: Commit**

```bash
git add frontend/index.html
git commit -m "feat: Switch from fluid to shader background"
```

---

## Task 7: Remove Old Fluid Script

**Files:**
- Delete: `frontend/assets/js/fluid-autonomous.js`

- [ ] **Step 1: Delete old fluid script**

```bash
git rm frontend/assets/js/fluid-autonomous.js
```

- [ ] **Step 2: Verify deletion**

Check: File no longer exists in `frontend/assets/js/`

- [ ] **Step 3: Commit**

```bash
git commit -m "refactor: Remove old fluid simulation script"
```

---

## Task 8: Test in Browser

**Files:**
- Test: `frontend/index.html`

- [ ] **Step 1: Open in browser**

Action: Open `frontend/index.html` in browser
Expected: Page loads without errors

- [ ] **Step 2: Check console logs**

Expected console output:
```
🎨 Shader background loading...
🎨 Canvas found: <canvas>
🎨 Renderer initialized: [width] x [height]
🎨 Shader material created
🎨 Mesh added to scene
🎨 Starting animation loop...
🎨 Resize handler attached
🎨 Shader background initialized successfully!
```

- [ ] **Step 3: Verify visual appearance**

Check:
- ✅ Aurora waves visible
- ✅ Colors are cyan/green and purple
- ✅ Smooth animation at 60 FPS
- ✅ No flickering or artifacts

- [ ] **Step 4: Test resize**

Action: Resize browser window
Expected: Shader adapts to new size smoothly

- [ ] **Step 5: Document results**

If issues found: Note them for fixing
If all good: Proceed to final commit

---

## Task 9: Final Cleanup and Push

**Files:**
- All modified files

- [ ] **Step 1: Remove debug console logs (optional)**

If desired, remove console.log statements for production

- [ ] **Step 2: Final commit**

```bash
git add -A
git commit -m "feat: Complete shader background replacement

- Replaced fluid simulation with aurora shader
- Brand colors: cyan (#00FFB2) and purple (#7B5EFF)
- Autonomous animation, no user interaction
- Better performance than previous fluid
- Proper cleanup and resize handling"
```

- [ ] **Step 3: Push to remote**

```bash
git push origin main
```

- [ ] **Step 4: Verify on remote**

Check: Changes visible on GitHub/remote repository

---

## Success Criteria

- ✅ Shader renders with brand colors (cyan/purple)
- ✅ Animation is smooth and autonomous
- ✅ No console errors
- ✅ Responds to window resize
- ✅ All old fluid code removed
- ✅ Committed and pushed to repository

---

## Rollback Plan

If issues arise:
```bash
git revert HEAD~[number of commits]
git push origin main
```

Or restore from commit: `cbccbbb` (last working fluid version)
