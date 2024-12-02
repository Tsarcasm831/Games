function createMusicStage(scene, THREE) {
    // Ensure CSS3DRenderer is available before proceeding
    if (typeof THREE.CSS3DRenderer === 'undefined') {
        console.warn('CSS3DRenderer not available. Falling back to texture-based viewscreens.');
        
        // Fallback to original texture-based viewscreens
        const viewscreenTextures = [
            'https://file.garden/Zy7B0LkdIVpGyzA1/viewscreen1.png',
            'https://file.garden/Zy7B0LkdIVpGyzA1/viewscreen2.png',
            'https://file.garden/Zy7B0LkdIVpGyzA1/viewscreen3.png'
        ];

        return createTextureViewscreens(scene, THREE, viewscreenTextures);
    }

    // Music stage positioned 200 units back and 6 times larger
    const stageInfo = { x: 15, z: 200, color: 0x800080, music: 'music/performance1.mp3' };

    // Outer stage geometry (with proper vertex generation)
    const stageGeometry = new THREE.BufferGeometry();
    
    const positions = [
        // Top face (6 times larger than stalls, 20% shorter)
        -18, 10.8, -18,
        -18, 10.8, 18,
        18, 10.8, 18,
        18, 10.8, -18,
        // Side faces (front)
        -18, 0, -18,
        -18, 10.8, -18,
        18, 10.8, -18,
        18, 0, -18,
        // Side faces (right)
        18, 0, -18,
        18, 10.8, -18,
        18, 10.8, 18,
        18, 0, 18,
        // Side faces (back)
        18, 0, 18,
        18, 10.8, 18,
        -18, 10.8, 18,
        -18, 0, 18,
        // Side faces (left)
        -18, 0, 18,
        -18, 10.8, 18,
        -18, 10.8, -18,
        -18, 0, -18
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

    stageGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    stageGeometry.setIndex(indices);
    
    // Compute normals for proper lighting
    stageGeometry.computeVertexNormals();

    // Create a group for the stage to add multiple meshes
    const stageGroup = new THREE.Group();

    // External texture for stage walls
    const wallTexture = new THREE.TextureLoader().load('https://file.garden/Zy7B0LkdIVpGyzA1/stage-backdrop.png');

    // Outer stage material with texture
    const stageMaterial = new THREE.MeshStandardMaterial({ 
        map: wallTexture,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.8
    });

    // Create the main stage mesh
    const stage = new THREE.Mesh(stageGeometry, stageMaterial);
    stage.position.set(stageInfo.x, 0, stageInfo.z);
    stageGroup.add(stage);

    // Add 3 Viewscreens with YouTube video
    const videoId = 'yJ7R3jxSF_g';  // YouTube video ID from Hyper project

    // Create a function to create a YouTube video viewscreen
    function createYouTubeViewscreen(index) {
        // Create an iframe element
        const iframe = document.createElement('iframe');
        iframe.width = '640';
        iframe.height = '360';
        iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
        iframe.frameBorder = '0';
        iframe.allow = 'autoplay; encrypted-media';
        
        // Create a CSS3D object for the iframe
        const videoElement = new THREE.CSS3DObject(iframe);
        videoElement.scale.set(0.02, 0.02, 0.02);  // Scale down to fit stage dimensions
        
        // Position viewscreens across the back of the stage
        const xOffset = (index - 1) * 15;
        videoElement.position.set(
            stageInfo.x + xOffset, 
            8,  // Adjusted for shorter stage
            stageInfo.z + 18.1  // Just behind the stage
        );
        videoElement.rotation.y = Math.PI;  // Face towards the audience
        
        stageGroup.add(videoElement);
    }

    // Create 3 YouTube video viewscreens
    [0, 1, 2].forEach(createYouTubeViewscreen);

    // Add Spotlights
    const spotlightColors = [0xFFFFFF, 0xFFFF00, 0xFF00FF];
    spotlightColors.forEach((color, index) => {
        const spotlight = new THREE.SpotLight(color, 1);
        spotlight.position.set(
            stageInfo.x + (index - 1) * 20,  // Spread across the stage
            30,  // High up
            stageInfo.z - 10  // Angled towards the stage
        );
        spotlight.target = stage;
        spotlight.angle = Math.PI / 4;
        spotlight.penumbra = 0.2;
        spotlight.castShadow = true;
        
        stageGroup.add(spotlight);
        stageGroup.add(spotlight.target);
    });

    // Create a performance platform
    const platformGeometry = new THREE.BoxGeometry(20, 2, 15);
    const platformMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,  // Wooden brown color
        side: THREE.DoubleSide 
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(stageInfo.x, 1, stageInfo.z);

    // Add platform to the group
    stageGroup.add(platform);

    // Improved sound loading with Howler
    const sound = new Howl({
        src: [stageInfo.music],
        loop: true,
        volume: 0,
        onloaderror: (id, err) => {
            console.warn(`Failed to load performance music ${stageInfo.music}:`, err);
        },
        onload: () => {
            console.log(`Performance music ${stageInfo.music} loaded successfully`);
            sound.pause();
        }
    });

    stageGroup.userData = {
        music: stageInfo.music,
        sound: sound
    };

    scene.add(stageGroup);
    return stageGroup;
}

// Fallback function to create texture-based viewscreens
function createTextureViewscreens(scene, THREE, viewscreenTextures) {
    const stageInfo = { x: 15, z: 200 };
    const stageGroup = new THREE.Group();

    viewscreenTextures.forEach((textureUrl, index) => {
        const viewscreenTexture = new THREE.TextureLoader().load(textureUrl);
        const viewscreenMaterial = new THREE.MeshStandardMaterial({ 
            map: viewscreenTexture,
            side: THREE.DoubleSide 
        });
        
        const viewscreenGeometry = new THREE.PlaneGeometry(12, 8);
        const viewscreen = new THREE.Mesh(viewscreenGeometry, viewscreenMaterial);
        
        // Position viewscreens across the back of the stage
        const xOffset = (index - 1) * 15;
        viewscreen.position.set(
            stageInfo.x + xOffset, 
            8,  // Adjusted for shorter stage
            stageInfo.z + 18.1  // Just behind the stage
        );
        viewscreen.rotation.y = Math.PI;  // Face towards the audience
        
        stageGroup.add(viewscreen);
    });

    scene.add(stageGroup);
    return stageGroup;
}

// Export the function if using modules, otherwise it will be a global function
if (typeof module !== 'undefined' && module.exports) {
    module.exports = createMusicStage;
}
