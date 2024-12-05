// Tree Population Script for MelodyMarket

// Optimized grid-based tree placement parameters
const GRID_SIZE = 5;  // Consistent grid size
const WORLD_SIZE = 300;  // World dimensions
const GRID_ROWS = Math.floor(WORLD_SIZE / GRID_SIZE);
const GRID_COLS = Math.floor(WORLD_SIZE / GRID_SIZE);

// Instanced rendering for trees
function createTreeInstancedMesh(scene) {
    // Shared geometry and materials
    const trunkGeometry = new THREE.CylinderGeometry(0.1, 0.2, 2, 12);
    const leafGeometry = new THREE.SphereGeometry(0.5, 8, 6);
    
    const barkTexture = generateTreeBarkTexture();
    const leavesTexture = generateLeavesTexture();

    const trunkMaterial = new THREE.MeshStandardMaterial({ 
        map: barkTexture,
        roughness: 0.7,
        metalness: 0.1
    });

    const leavesMaterial = new THREE.MeshStandardMaterial({ 
        map: leavesTexture,
        transparent: true,
        opacity: 0.9
    });

    // Create instanced meshes
    const trunkInstancedMesh = new THREE.InstancedMesh(trunkGeometry, trunkMaterial, 3000);
    const leavesInstancedMesh = new THREE.InstancedMesh(leafGeometry, leavesMaterial, 3000);

    // Temporary matrix for positioning
    const matrix = new THREE.Matrix4();
    
    return { trunkInstancedMesh, leavesInstancedMesh, matrix };
}

function createTree(instancedData, x, z, index) {
    const { trunkInstancedMesh, leavesInstancedMesh, matrix } = instancedData;

    // Random scale and rotation
    const scale = 0.5 + Math.random() * 0.5;
    
    // Position trunk
    matrix.compose(
        new THREE.Vector3(x, 0, z),
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.random() * Math.PI * 2),
        new THREE.Vector3(scale, scale, scale)
    );
    trunkInstancedMesh.setMatrixAt(index, matrix);

    // Position leaves with slight offset
    matrix.compose(
        new THREE.Vector3(x, scale, z),
        new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), Math.random() * Math.PI * 2),
        new THREE.Vector3(scale * 0.8, scale * 0.8, scale * 0.8)
    );
    leavesInstancedMesh.setMatrixAt(index, matrix);
}

function isPointNearMusicStage(x, z, expandAmount = 5) {
    if (!window.musicStage) return false;

    const musicStageBox = new THREE.Box3().setFromObject(window.musicStage);
    const expandedBox = musicStageBox.clone();
    expandedBox.expandByScalar(expandAmount);

    const checkPoint = new THREE.Vector3(x, 0, z);
    return expandedBox.containsPoint(checkPoint);
}

function checkTreeCollision(treeGrid, x, z, treeRadius = 1) {
    const gridX = Math.floor((x + WORLD_SIZE / 2) / GRID_SIZE);
    const gridZ = Math.floor((z + WORLD_SIZE / 2) / GRID_SIZE);

    // Check music stage proximity
    if (isPointNearMusicStage(x, z)) {
        return true;
    }

    // Check grid-based collision
    for (let dx = -1; dx <= 1; dx++) {
        for (let dz = -1; dz <= 1; dz++) {
            const checkX = gridX + dx;
            const checkZ = gridZ + dz;

            if (checkX >= 0 && checkX < GRID_ROWS && 
                checkZ >= 0 && checkZ < GRID_COLS) {
                if (treeGrid[checkX][checkZ]) {
                    return true;
                }
            }
        }
    }

    return false;
}

function populateTreeArea(scene, treeCount = 1000) {
    // Create instanced meshes for efficient rendering
    const instancedData = createTreeInstancedMesh(scene);
    const { trunkInstancedMesh, leavesInstancedMesh } = instancedData;

    // Create a grid to track tree placement
    const treeGrid = new Array(GRID_ROWS).fill(null).map(() => 
        new Array(GRID_COLS).fill(false)
    );

    // Efficient tree placement
    let placedTrees = 0;
    let attempts = 0;
    const MAX_ATTEMPTS = 3000;  // Prevent infinite loop

    while (placedTrees < treeCount && attempts < MAX_ATTEMPTS) {
        // Select a random grid cell
        const gridX = Math.floor(Math.random() * GRID_ROWS);
        const gridZ = Math.floor(Math.random() * GRID_COLS);

        // Calculate world coordinates
        const x = (gridX - GRID_ROWS / 2) * GRID_SIZE + (Math.random() * GRID_SIZE - GRID_SIZE / 2);
        const z = (gridZ - GRID_COLS / 2) * GRID_SIZE + (Math.random() * GRID_SIZE - GRID_SIZE / 2);

        // Check for collisions
        if (!checkTreeCollision(treeGrid, x, z)) {
            // Create tree using instanced mesh
            createTree(instancedData, x, z, placedTrees);

            // Mark grid cell as occupied
            treeGrid[gridX][gridZ] = true;
            placedTrees++;
        }

        attempts++;
    }

    // Update matrices for instanced meshes
    trunkInstancedMesh.instanceMatrix.needsUpdate = true;
    leavesInstancedMesh.instanceMatrix.needsUpdate = true;

    // Add instanced meshes to scene
    scene.add(trunkInstancedMesh);
    scene.add(leavesInstancedMesh);

    console.log(`Placed ${placedTrees} trees out of ${treeCount} attempts`);
    return { trunkInstancedMesh, leavesInstancedMesh };
}

function initializeTrees(scene) {
    // Populate trees with instanced rendering
    return populateTreeArea(scene, 1000);  // Reduced from 3000 to 1000
}
