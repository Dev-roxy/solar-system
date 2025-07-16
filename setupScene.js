import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { UnrealBloomPass } from "three/examples/jsm/Addons.js";
import { config } from "./config";
const canvas = document.getElementById("screen");

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 100;
scene.add(camera);

const solarSystem = new THREE.Group(); // create a group for the solar system
scene.add(solarSystem);

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Adjust pixel ratio for better quality

// composer is used for post-processing effects
const composer = new EffectComposer(renderer);
composer.addPass(new RenderPass(scene, camera));

// Ambient light for the scene
export const ambiantLight = new THREE.AmbientLight(
  0x404040,
  5
); // Soft white light
scene.add(ambiantLight);

// OrbitControls for camera movement
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
controls.dampingFactor = 0.25; // Adjust the damping factor as needed
controls.enableZoom = true; // Enable zooming
controls.zoomSpeed = 1.0; // Adjust the zoom speed as needed

// Resize event listener to adjust the canvas and renderer size
document.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  composer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  composer.render();
});

// post-processing effects

// Create a bloom pass for post-processing effects
export const bloomPass = new UnrealBloomPass(
  new THREE.Vector2(window.innerWidth, window.innerHeight),
  0.2, // strength
  1, // radius
  0.4 // threshold
);
composer.addPass(bloomPass);

export { scene, camera, renderer, solarSystem, composer, controls, canvas };
