import * as THREE from "three";
import { textureLoader } from "./utils/textureLoader.js";
import { solarSystem, composer } from "./setupScene.js"; // Import solarSystem and composer from setupScene.js
import { config } from "./config.js";

export function createRing(orbitGroup, ringData, distanceFromSun, name) {
  const ringGeometry = new THREE.RingGeometry(
    ringData.innerRadius,
    ringData.outerRadius,
    64
  ).toNonIndexed();
  const pos = ringGeometry.attributes.position;
  const v3 = new THREE.Vector3();
  for (let i = 0; i < pos.count; i++) {
    v3.fromBufferAttribute(pos, i);
    const midpoint = (ringData.innerRadius + ringData.outerRadius) / 2;

    ringGeometry.attributes.uv.setXY(i, v3.length() < midpoint ? 0 : 1, 1);
  }

  const ringMaterial = new THREE.MeshStandardMaterial({
    map: textureLoader.load(ringData.texture, () => {}),
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9, // Adjust opacity for better visibility
    depthWrite: false, // Prevent depth writing for transparency
    roughness: 0.5,
    metalness: 0.5,
  });
  const ring = new THREE.Mesh(ringGeometry, ringMaterial);

  ring.position.x = distanceFromSun; // Position the ring at the center of the planet

  ring.rotation.set(
    ringData.inclination.x || 0, // Inclination in radians
    ringData.inclination.y || 0,
    ringData.inclination.z || 0
  ); // Rotate the ring to match the inclination
  ring.name = `${name}-ring`; // name the ring for easier identification
  ring.castShadow = true; // Rings can cast shadows
  ring.receiveShadow = true; // Rings can receive shadows
  ring.rotationSpeed = ringData.rotationSpeed || 0.01; // Default rotation speed if not specified

  orbitGroup.add(ring);
  return ring;
}

export function createOrbitRing(orbitGroup, distanceFromSun, name, show) {
  const orbitRing = new THREE.RingGeometry(
    distanceFromSun - config.orbitlinesSize,
    distanceFromSun + config.orbitlinesSize,
    64
  );
  const orbitMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.2, // Adjust opacity for better visibility
    depthWrite: false, // Prevent depth writing for transparency
  });
  const orbitMesh = new THREE.Mesh(orbitRing, orbitMaterial);
  orbitMesh.rotation.x = Math.PI / 2; // Rotate the ring to lie flat
  orbitMesh.name = `${name}-orbit-ring`; // name the orbit ring for easier identification
  orbitMesh.position.set(0, 0, 0); // Position the orbit ring at the center of
  orbitMesh.visible = show; // Show orbit lines for planets
  orbitGroup.add(orbitMesh); // Add the orbit ring to the orbit group
}

export function createMoon(moon, planet, orbitGroup, radius, showOrbit) {
  const moonGroup = new THREE.Group();
  const moonGeometry = new THREE.SphereGeometry(moon.radius, 32, 32);
  const moonTexture = textureLoader.load(moon.texture);
  const moonMaterial = new THREE.MeshStandardMaterial({
    color: "#ffffff", // Default color for moons
    map: moonTexture,
    side: THREE.DoubleSide,
    roughness: 0.5,
    metalness: 0.5,
  });
  const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);

  // Position the moon relative to the planet
  moonMesh.position.x = moon.distanceFromPlanet + radius; // Adjust position based on planet's distance from the sun and moon's distance from the planet
  moonMesh.castShadow = true; // Moons can cast shadows
  moonMesh.rotationSpeed = moon.rotationSpeed || 0.01; // Default rotation speed if not specified
  moonGroup.position.copy(planet.position); // Position the moon group at the planet's position

  moonGroup.name = `${planet.name}-${moon.name}-group`; // name the moon group for easier identification
  moonGroup.orbitSpeed = moon.orbitSpeed || 0.01; // Default orbit speed if not specified

  createOrbitRing(
    moonGroup,
    moon.distanceFromPlanet + radius,
    moon.name,
    showOrbit
  );
  moonGroup.add(moonMesh);
  orbitGroup.add(moonGroup);
  return {
    moonGroup,
    moonMesh,
    orbitSpeed: moon.orbitSpeed || 0.01,
    rotationSpeed: moon.rotationSpeed || 0.01,
    isRotating:  !moon.isTidalyLocked || false, // Default to false if not specified
  };
}

export function createPlanet(planetData, group) {
  const {
    radius,
    distanceFromSun,
    name,
    rotationSpeed,
    orbitSpeed,
    texture,
    moons = [],
    rings = [],
  } = planetData;

  const orbitGroup = new THREE.Group(); // for rotation around the sun

  const textureMap = textureLoader.load(texture, (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1, 1);
    texture.anisotropy = 16;
  });
  orbitGroup.name = `${name}-orbit`; // name the group for easier identification
  orbitGroup.orbitSpeed = orbitSpeed || 0.01; // Default orbit speed if not specified


  const geometry = new THREE.SphereGeometry(radius, 70, 32);
  const material = new THREE.MeshStandardMaterial({
    map: textureMap,
    side: THREE.DoubleSide,
    roughness: 0.5,
    metalness: 0.5,
  });

  if (name === "Sun") {
    // Create a point light for the Sun
    let sunLight = new THREE.PointLight("#ffffff", 150, 1000);
    sunLight.position.set(0, 0, 0);
    solarSystem.add(sunLight);
  } else {
    material.emissive = new THREE.Color(0x000000); // Other planets do not emit light
    material.emissiveIntensity = 0; // No emissive light for other planets

    // Create orbit ring for planets
    createOrbitRing(
      orbitGroup,
      distanceFromSun,
      name,
      config.showOrbitLines.planets
    );
  }

  const planet = new THREE.Mesh(geometry, material);
  planet.name = name; // name the planet for easier identification
  planet.position.x = distanceFromSun; // offset from orbit center
  planet.castShadow = true;
  planet.receiveShadow = true;
  planet.rotationSpeed = rotationSpeed || 0.01; // Default rotation speed if not specified
  orbitGroup.add(planet);

  if (moons.length > 0) {
    const moonsMeshes = planetData.moons.map((moon) =>
      createMoon(moon, planet, orbitGroup, radius, config.showOrbitLines.moons)
    );
    orbitGroup.moons = moonsMeshes; // Store moons in the orbitGroup for later use
  }

  if (rings.length > 0) {
    const ringMeshes = rings.map((ringData) =>
      createRing(orbitGroup, ringData, distanceFromSun, name)
    );
    orbitGroup.rings = ringMeshes; // Store rings in the orbitGroup for later use
  }
  group.add(orbitGroup); // instead of scene.add()
  return { group: orbitGroup, planet, rotationSpeed, orbitSpeed };
}
