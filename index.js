import { planetsData } from "./data.js";
import { createPlanet } from "./createPlanet.js";
import { solarSystem, controls, composer } from "./setupScene.js";
import { animate } from "./animate.js";
import { setupGUI } from "./gui.js";

export const planets = planetsData.map((data) => createPlanet(data, solarSystem));

animate(planets, controls, composer); // Pass planets, controls , composer to animate function

setupGUI(); // Initialize the GUI for user controls
