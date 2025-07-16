import GUI from "lil-gui";

import {config} from "./config";
import { ambiantLight } from "./setupScene";
import { planets } from ".";

const gui = new GUI();

export function setupGUI() {


const configFolder = gui.addFolder("Configuration");

  // Rotation speed
  configFolder.add(config, "speed", 1, 500).name("Rotation Speed");

  // Show orbit lines for planets
  configFolder.add(config.showOrbitLines, "planets").name("Show Planet Orbits");

  // Show orbit lines for moons
  configFolder.add(config.showOrbitLines, "moons").name("Show Moon Orbits");

  // Play/Pause control
  configFolder.add(config, "isPlaying").name("Play Animation");

  // Bloom effect control
  configFolder.add(config, "isBloomEnabled").name("Enable Bloom Effect");

  // Ambient light intensity
  configFolder.add(ambiantLight, "intensity", 0, 150).name("Ambient Light Intensity");

  configFolder.open(); // optional: auto-expand the folder


addPlanetsSpeedControlers(planets);
}
function addPlanetsSpeedControlers(planets) {
  const planetsFolder = gui.addFolder("Planets Speed");
  planets.forEach((planet, index) => {  
    if (planet.group.name.includes("Sun")) return; // Skip the Sun
    planetsFolder
      .add(planet.group, "orbitSpeed", 0.01, 10)
      .name(`${planet.group.name} Orbit Speed`)
      .onChange((value) => {
        planet.group.orbitSpeed = value;
      });
  });
  planetsFolder.open();
}