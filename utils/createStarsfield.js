import * as THREE from 'three';

export async function createStarField(count) {
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.1,
        sizeAttenuation: true,
    });

    // Generate random positions for stars
    const positions = getStarPositions(count);
    starGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Create the star field
    const stars = new THREE.Points(starGeometry, starMaterial);
    return stars;
}
function getStarPositions(count) {
    const positions = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
        // Use spherical coordinates for a proper sphere distribution
        const radius = 100 * Math.random() + 400; // Using cbrt for uniform distribution
        const theta = Math.random() * Math.PI * 2; // Azimuthal angle
        const phi = Math.acos(2 * Math.random() - 1); // Polar angle
        
        // Convert spherical to cartesian coordinates
        positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
        positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
}
