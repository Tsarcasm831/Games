// Tree Population Script for MelodyMarket

// Grid-based tree placement parameters
const GRID_SIZE = 5;  // Reduced from 10 to increase density
const WORLD_SIZE = 300;  // Increased from 200 to expand coverage area
const GRID_ROWS = Math.floor(WORLD_SIZE / GRID_SIZE);
const GRID_COLS = Math.floor(WORLD_SIZE / GRID_SIZE);

function createTree(scene, x, z) {
    // Create tree geometry with more natural variation
    const trunkHeight = 2 + Math.random() * 3;  // Varying trunk height
    const trunkBottomRadius = 0.1 + Math.random() * 0.3;
    const trunkTopRadius = trunkBottomRadius * (0.6 + Math.random() * 0.4);  // Tapering effect
    const trunkGeometry = new THREE.CylinderGeometry(
        trunkTopRadius,  // Top radius 
        trunkBottomRadius,  // Bottom radius
        trunkHeight, 
        12  // Increased segments for smoother look
    );

    // Create multiple leaf sections for more natural tree shape
    const leafSections = [];
    const leafCount = 3 + Math.floor(Math.random() * 2);  // 3-4 leaf sections
    
    // Create materials using custom textures
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

    // Create trunk
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    
    // Create leaf sections with progressive size and positioning
    for (let i = 0; i < leafCount; i++) {
        const leafSize = 0.8 + Math.random() * 1.2 * (1 - i * 0.2);  // Decreasing size for top sections
        const leafGeometry = new THREE.SphereGeometry(leafSize, 8, 6);
        const leaves = new THREE.Mesh(leafGeometry, leavesMaterial);
        
        // Position leaves progressively up the trunk
        leaves.position.y = trunkHeight * (0.5 + i * 0.3);  
        
        // Slight random offset to make it more natural
        leaves.position.x += (Math.random() - 0.5) * 0.2;
        leaves.position.z += (Math.random() - 0.5) * 0.2;

        leafSections.push(leaves);
    }

    // Create a group for the tree
    const tree = new THREE.Group();
    tree.add(trunk);
    
    // Add all leaf sections to ensure connection
    leafSections.forEach(leaves => tree.add(leaves));

    // Position tree in the grid
    tree.position.x = x;
    tree.position.z = z;
    tree.rotation.y = Math.random() * Math.PI * 2;  // Random y rotation

    // More controlled scale variation
    const scale = 0.5 + Math.random() * 0.5;
    tree.scale.set(scale, scale, scale);

    // Create bounding box for collision
    const boundingBox = new THREE.Box3().setFromObject(tree);
    tree.boundingBox = boundingBox;

    // Add tree to scene
    scene.add(tree);

    return tree;
}

function isPointNearMusicStage(x, z, expandAmount = 5) {
    if (!window.musicStage) return false;

    const musicStageBox = new THREE.Box3().setFromObject(window.musicStage);
    const expandedBox = musicStageBox.clone();
    expandedBox.expandByScalar(expandAmount);

    const checkPoint = new THREE.Vector3(x, 0, z);
    return expandedBox.containsPoint(checkPoint);
}

function checkTreeCollision(scene, x, z, treeRadius = 1) {
    const checkPoint = new THREE.Vector3(x, 0, z);
    
    // Check if point is too close to music stage
    if (isPointNearMusicStage(x, z)) {
        return true;
    }

    // Check collision with other trees
    for (let child of scene.children) {
        if (child.boundingBox) {
            const treeBox = child.boundingBox;
            const expandedBox = treeBox.clone();
            expandedBox.expandByScalar(treeRadius);
            
            if (expandedBox.containsPoint(checkPoint)) {
                return true;
            }
        }
    }

    return false;
}

function populateTreeArea(scene, treeCount = 500) {
    // Create a grid to track tree placement
    const treeGrid = new Array(GRID_ROWS).fill(null).map(() => 
        new Array(GRID_COLS).fill(false)
    );

    // Array to keep track of trees
    const trees = [];

    // Create multiple trees across a grid
    let placedTrees = 0;
    let attempts = 0;
    const MAX_ATTEMPTS = 5000;  // Prevent infinite loop

    while (placedTrees < treeCount && attempts < MAX_ATTEMPTS) {
        // Select a random grid cell
        const gridX = Math.floor(Math.random() * GRID_ROWS);
        const gridZ = Math.floor(Math.random() * GRID_COLS);

        // Skip if this grid cell is already occupied
        if (treeGrid[gridX][gridZ]) {
            attempts++;
            continue;
        }

        // Calculate world coordinates for the grid cell
        const x = (gridX - GRID_ROWS / 2) * GRID_SIZE + (Math.random() * GRID_SIZE - GRID_SIZE / 2);
        const z = (gridZ - GRID_COLS / 2) * GRID_SIZE + (Math.random() * GRID_SIZE - GRID_SIZE / 2);

        // Check for collisions
        if (!checkTreeCollision(scene, x, z)) {
            // Create tree
            const tree = createTree(scene, x, z);
            trees.push(tree);

            // Mark grid cell as occupied
            treeGrid[gridX][gridZ] = true;
            placedTrees++;
        }

        attempts++;
    }

    console.log(`Placed ${placedTrees} trees out of ${treeCount} attempts`);
    return trees;
}

// This function can be called after scene setup to populate trees
function initializeTrees(scene) {
    // Populate trees with grid-based placement
    return populateTreeArea(scene, 3000);  // Tripled from 1000 to 3000 trees
}
