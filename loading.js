import { planetsData } from "./data.js";

function updateLoadingPercentage(percentage) {
  const loadingPercentage = document.getElementById("loading-percentage");
    if (loadingPercentage) {
        loadingPercentage.textContent = `${percentage}%`;
    }
}

  const textures = [];
  let loadedCount = 0;
  let totalCount ;
  const loadingScreen = document.querySelector(".loading-screen");

  function toggleLoadingScreen() {
    if (loadingScreen) {
      loadingScreen.style.display =
        loadingScreen.style.display === "none" ? "flex" : "none";
    }
  }

  //textures.push("/textures/space.jpg"); // Add the space texture to the list
  for (const planet of planetsData) {
    planet.texture && textures.push(planet.texture);
    if (planet.moons.length > 0) {
      for (const moon of planet.moons) {
        moon.texture && textures.push(moon.texture);
      }
    }
    if (planet.rings) {
      planet.rings.texture && textures.push(planet.rings.texture);
    }
  }
    totalCount = textures.length;
console.log(textures)
console.log(totalCount)

let loadingPromises = [];
  document.addEventListener("DOMContentLoaded", async () => {
    loadingScreen.style.display = "flex"; // Show the loading screen
    loadingPromises = textures
    .filter((texture) => texture !== undefined && texture !== null)
    .map((texture) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = texture;
        img.onload = () => {
            loadedCount++;
            updateLoadingPercentage(Math.floor((loadedCount / totalCount) * 100));
            resolve();
        };
        img.onerror = () => reject();
      });
    });

    try {
      await Promise.all(loadingPromises);
      toggleLoadingScreen();
    } catch {
      console.error("Error loading textures");
    }
  });


