// Tree Population Script for MelodyMarket

function createTree(scene) {
    // Create tree geometry
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.5, 3, 8);
    const leafGeometry = new THREE.SphereGeometry(1, 8, 6);

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
    
    // Create leaves
    const leaves = new THREE.Mesh(leafGeometry, leavesMaterial);
    leaves.position.y = 2; // Position leaves on top of trunk

    // Create a group for the tree
    const tree = new THREE.Group();
    tree.add(trunk);
    tree.add(leaves);

    // Randomize tree position and rotation
    tree.position.x = (Math.random() - 0.5) * 20;  // Spread across x-axis
    tree.position.z = (Math.random() - 0.5) * 20;  // Spread across z-axis
    tree.rotation.y = Math.random() * Math.PI * 2;  // Random y rotation

    // Randomize tree scale slightly
    const scale = 0.5 + Math.random();
    tree.scale.set(scale, scale, scale);

    // Add tree to scene
    scene.add(tree);

    return tree;
}

function populateTreeArea(scene, treeCount = 10) {
    // Array to keep track of trees
    const trees = [];

    // Create multiple trees
    for (let i = 0; i < treeCount; i++) {
        const tree = createTree(scene);
        trees.push(tree);
    }

    return trees;
}

// This function can be called after scene setup to populate trees
function initializeTrees(scene) {
    return populateTreeArea(scene);
}
