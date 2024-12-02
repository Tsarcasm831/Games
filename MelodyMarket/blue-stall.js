function createBlueStall(scene, THREE) {
    const stallInfo = { x: -10, z: 10, color: 0x0000ff, music: 'https://file.garden/Zy7B0LkdIVpGyzA1/music3.mp3' };

    // Outer stall geometry (with proper vertex generation)
    const stallGeometry = new THREE.BufferGeometry();
    
    const positions = [
        // Top face
        -3, 2.25, -3,
        -3, 2.25, 3,
        3, 2.25, 3,
        3, 2.25, -3,
        // Side faces (front)
        -3, -2.25, -3,
        -3, 2.25, -3,
        3, 2.25, -3,
        3, -2.25, -3,
        // Side faces (right)
        3, -2.25, -3,
        3, 2.25, -3,
        3, 2.25, 3,
        3, -2.25, 3,
        // Side faces (back)
        3, -2.25, 3,
        3, 2.25, 3,
        -3, 2.25, 3,
        -3, -2.25, 3,
        // Side faces (left)
        -3, -2.25, 3,
        -3, 2.25, 3,
        -3, 2.25, -3,
        -3, -2.25, -3
    ];

    const indices = [
        // Top face
        0, 1, 2,
        0, 2, 3,
        // Side faces
        4, 5, 6,
        4, 6, 7,
        8, 9, 10,
        8, 10, 11,
        12, 13, 14,
        12, 14, 15,
        16, 17, 18,
        16, 18, 19
    ];

    stallGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    stallGeometry.setIndex(indices);
    
    // Compute normals for proper lighting
    stallGeometry.computeVertexNormals();

    // Create a group for the stall to add multiple meshes
    const stallGroup = new THREE.Group();

    // External texture for walls
    const wallTexture = new THREE.TextureLoader().load('https://file.garden/Zy7B0LkdIVpGyzA1/Leave%20While%20I%27m%20Still%20Friendly.png');

    // Outer stall material with texture
    const stallMaterial = new THREE.MeshStandardMaterial({ 
        map: wallTexture,
        side: THREE.DoubleSide,  // Render both sides of the material
        transparent: true,
        opacity: 0.8  // Slightly transparent to see internal structure
    });

    // Create the main stall mesh
    const stall = new THREE.Mesh(stallGeometry, stallMaterial);
    stall.position.set(stallInfo.x, 2.25, stallInfo.z);
    stallGroup.add(stall);

    // Add internal walls
    const wallThickness = 0.1;
    const wallHeight = 2.5;
    
    // Create internal wall materials with the same texture
    const internalWallMaterials = [
        new THREE.MeshStandardMaterial({ 
            map: wallTexture,
            side: THREE.DoubleSide 
        }),
        new THREE.MeshStandardMaterial({ 
            map: wallTexture,
            side: THREE.DoubleSide 
        })
    ];

    // Internal wall along x-axis
    const xWallGeometry = new THREE.BoxGeometry(6, wallHeight, wallThickness);
    const xWall1 = new THREE.Mesh(xWallGeometry, internalWallMaterials[0]);
    xWall1.position.set(stallInfo.x, 2.25, stallInfo.z + 3);
    const xWall2 = new THREE.Mesh(xWallGeometry, internalWallMaterials[1]);
    xWall2.position.set(stallInfo.x, 2.25, stallInfo.z - 3);

    // Internal wall along z-axis
    const zWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, 6);
    const zWall1 = new THREE.Mesh(zWallGeometry, internalWallMaterials[0]);
    zWall1.position.set(stallInfo.x + 3, 2.25, stallInfo.z);
    const zWall2 = new THREE.Mesh(zWallGeometry, internalWallMaterials[1]);
    zWall2.position.set(stallInfo.x - 3, 2.25, stallInfo.z);

    // Create a counter
    const counterGeometry = new THREE.BoxGeometry(3, 1, 0.5);
    const counterMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,  // Wooden brown color
        side: THREE.DoubleSide 
    });
    const counter = new THREE.Mesh(counterGeometry, counterMaterial);
    counter.position.set(stallInfo.x, 0.5, stallInfo.z);
    counter.rotation.y = Math.PI / 4;  // Rotate slightly for visual interest

    // Add internal walls and counter to the group
    stallGroup.add(xWall1, xWall2, zWall1, zWall2, counter);

    // Improved sound loading with AudioContext handling
    const sound = new Howl({
        src: [stallInfo.music],
        loop: true,
        volume: 0,
        onloaderror: (id, err) => {
            console.warn(`Failed to load music ${stallInfo.music}:`, err);
        },
        onload: () => {
            console.log(`Music ${stallInfo.music} loaded successfully`);
            // Defer playing until user interaction
            sound.pause();
        }
    });

    stallGroup.userData = {
        music: stallInfo.music,
        sound: sound
    };

    scene.add(stallGroup);
    return stallGroup;
}

// Export the function if using modules, otherwise it will be a global function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = createBlueStall;
}
