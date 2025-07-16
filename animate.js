import * as THREE from "three"; // Importing Three.js library
import { config } from "./config.js"; // Import speed from config.js
import { camera, renderer, scene } from "./setupScene.js"; // Import solarSystem from setupScene.js

const clock = new THREE.Clock();

export function animate(planets, controls, composer) {
  // Animation loop function to update the scene
  function animationLoop() {
    if (config.isPlaying) {
      controls.update(); // Update controls for smooth interaction
      if (config.isBloomEnabled) {
        composer.passes[0].enabled = true; // Enable bloom effect if configured
        composer.render(); // Render the scene with post-processing effects
      } else {
        composer.passes[0].enabled = false; // Disable bloom effect if not configured
        renderer.render(scene, camera);
      }

      const elapsedTime = clock.getDelta(); // Get the total elapsed time

      for (const { group, planet } of planets) {
        planet.rotation.y += elapsedTime * planet.rotationSpeed * config.speed;
        group.rotation.y += elapsedTime * group.orbitSpeed * config.speed;

        if (group.children[0].name.includes("ring")) {
          const orbitRing = group.children[0];
          orbitRing.innerRadius =
            planet.distanceFromSun - config.orbitlinesSize;
          orbitRing.outerRadius =
            planet.distanceFromSun + config.orbitlinesSize;
          orbitRing.visible = config.showOrbitLines.planets; // Toggle visibility based on config
        } else {
          const sun = group.children.find((child) => child.name === "Sun");
          if (!config.isBloomEnabled) {
            sun.material.emissive = new THREE.Color(0x000000); // Disable emissive color if bloom is not enabled
            sun.material.emissiveIntensity = 0; // Disable emissive intensity if bloom is not enabled
          } else {
            sun.material.emissive = new THREE.Color("rgb(255, 223, 34)"); // Sun's emissive color
            sun.material.emissiveIntensity = 5; // Adjust the intensity of the emissive light
          }
        }

        if (group.moons) {
          group.moons.forEach(({ moonGroup, moonMesh, isRotating }) => {
            moonGroup.rotation.y +=
              elapsedTime * moonGroup.orbitSpeed * config.speed; // Rotate the moon around the planet

            const orbitRing = moonGroup.children.find((child) =>
              child.name.includes("orbit-ring")
            );
            if (orbitRing) {
              orbitRing.innerRadius =
                planet.distanceFromSun - config.orbitlinesSize;
              orbitRing.outerRadius =
                planet.distanceFromSun + config.orbitlinesSize;
              orbitRing.visible = config.showOrbitLines.moons; // Toggle visibility based on config
            }

            if (isRotating) {
              moonMesh.rotation.y +=
                elapsedTime * moonGroup.rotationSpeed * config.speed; // Rotate the moon around its own axis
            }
          });
        }
      }
    }
    requestAnimationFrame(animationLoop); // Continue the animation loop if playing
  }
  animationLoop(); // Start the animation loop
}
