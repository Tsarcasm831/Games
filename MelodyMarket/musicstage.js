function createMusicStage(scene, THREE) {
    // Stage configuration
    const stageInfo = { x: 15, z: 200, color: 0x800080, music: 'https://file.garden/Zy7B0LkdIVpGyzA1/music3.mp3' };

    // Create a group for the entire stage setup
    const stageGroup = new THREE.Group();

    // Backdrop
    const backdropTexture = new THREE.TextureLoader().load('https://file.garden/Zy7B0LkdIVpGyzA1/stage-backdrop.png');
    const backdropGeometry = new THREE.PlaneGeometry(60, 40);
    const backdropMaterial = new THREE.MeshStandardMaterial({ 
        map: backdropTexture, 
        side: THREE.DoubleSide 
    });
    const backdrop = new THREE.Mesh(backdropGeometry, backdropMaterial);
    backdrop.position.set(stageInfo.x, 15, stageInfo.z + 10);
    stageGroup.add(backdrop);

    // Performance Platform
    const platformGeometry = new THREE.BoxGeometry(30, 2, 20);
    const platformMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x8B4513,  // Wooden brown color
        side: THREE.DoubleSide 
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.set(stageInfo.x, 1, stageInfo.z);
    stageGroup.add(platform);

    // 3 Static Monitors (avoiding CSS3D complications)
    const monitorGeometry = new THREE.PlaneGeometry(16, 9);
    const monitorMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x888888,
        side: THREE.DoubleSide 
    });

    [0, 1, 2].forEach((index) => {
        const monitor = new THREE.Mesh(monitorGeometry, monitorMaterial);
        
        const xOffset = (index - 1) * 20;
        monitor.position.set(
            stageInfo.x + xOffset, 
            15 + Math.sin(index) * 5,  // Add some vertical variation
            stageInfo.z + 25
        );
        monitor.rotation.y = Math.PI;
        
        stageGroup.add(monitor);
    });

    // Spotlights
    const spotlightColors = [0xFFFFFF, 0xFFFF00, 0xFF00FF];
    spotlightColors.forEach((color, index) => {
        const spotlight = new THREE.SpotLight(color, 1);
        spotlight.position.set(
            stageInfo.x + (index - 1) * 20,
            30,
            stageInfo.z - 10
        );
        spotlight.target = platform;
        spotlight.angle = Math.PI / 4;
        spotlight.penumbra = 0.2;
        spotlight.castShadow = true;
        
        stageGroup.add(spotlight);
        stageGroup.add(spotlight.target);
    });

    // Simple Character (placeholder)
    const characterGeometry = new THREE.CylinderGeometry(2, 2, 6, 32);
    const characterMaterial = new THREE.MeshStandardMaterial({ color: 0xFF0000 });
    const character = new THREE.Mesh(characterGeometry, characterMaterial);
    character.position.set(stageInfo.x, 3, stageInfo.z + 10);
    stageGroup.add(character);

    // Use AudioManager for music
    stageGroup.userData = {
        music: stageInfo.music,
        playMusic: function() {
            // Lazy load and play stage music
            if (window.AudioManager) {
                window.AudioManager.loadSound('stageMusic', {
                    src: stageInfo.music,
                    loop: true,
                    volume: 0.5
                }).then(sound => sound.play());
            }
        }
    };

    scene.add(stageGroup);
    return stageGroup;
}

// Export the function if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = createMusicStage;
}
