# Solar System Simulation

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Three.js](https://img.shields.io/badge/Three.js-black?style=flat&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vite](https://img.shields.io/badge/Vite-B73BFE?style=flat&logo=vite&logoColor=FFD62E)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)

An interactive 3D solar system simulation built with Three.js and Vite. This project allows you to explore our solar system with accurate planet scaling, textures, orbits, and interactive controls.

## ✨ Live Demo ✨

<div align="center">
  <a href="https://solar-system-mu-seven.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/EXPLORE_THE_UNIVERSE-4285F4?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" width="300"/>
  </a>
  <p><em>👆 Click the button above to experience the interactive Solar System 🪐</em></p>
</div>

## 🚀 Features

- **Realistic Planet Rendering**: All planets in our solar system with accurate textures
- **Interactive Controls**: Orbit around the solar system using mouse controls
- **Customizable Settings**: Control simulation speed, orbit visibility, and more
- **Visual Effects**: Bloom effect for celestial objects
- **Planet Information**: Details about each planet's characteristics
- **Responsive Design**: Works on desktop and mobile devices

## 📋 Prerequisites

- Node.js (version 14.x or higher)
- npm or yarn

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Dev-roxy/solar-system.git
   cd solar-system
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## 🎮 Usage and Controls

- **Orbit**: Click and drag to orbit around the solar system
- **Zoom**: Use mouse wheel to zoom in and out
- **GUI Controls**: 
  - Adjust rotation speed
  - Toggle planet and moon orbit visibility
  - Play/pause animation
  - Enable/disable bloom effect
  - Adjust ambient light intensity
  - Control individual planet orbit speeds

## 🧩 Project Structure

- `index.html` - Main HTML entry point
- `index.js` - JavaScript entry point
- `setupScene.js` - Three.js scene configuration
- `data.js` - Planet and solar system data
- `createPlanet.js` - Planet creation logic
- `animate.js` - Animation loop
- `gui.js` - User interface controls
- `config.js` - Configuration settings
- `utils/` - Utility functions
- `public/textures/` - Planet textures

## 🔧 Customization

Modify the `config.js` file to change default settings:

```javascript
export const config = {
  speed: 1, // Default speed for rotation and orbiting
  showOrbitLines: {
    planets: false, // Show planet orbits
    moons: false, // Show moon orbits
  },
  orbitlinesSize: 0.05, // Orbit line thickness
  isPlaying: true, // Play/pause animation state
  isBloomEnabled: true, // Bloom postprocessing effect toggle
};
```

## 🖥️ Technologies Used

- [Three.js](https://threejs.org/) - 3D graphics library
- [lil-gui](https://lil-gui.georgealways.com/) - UI controls
- [Vite](https://vitejs.dev/) - Frontend build tool

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- Planet textures from [Solar System Scope](https://www.solarsystemscope.com/)
- Three.js community for examples and documentation
- [NASA](https://www.nasa.gov/) for planetary data and inspiration

---

Created by [Dev-roxy](https://github.com/Dev-roxy) | &copy; 2025
