function initWeatherEffects() {
    const rainGeometry = new THREE.BufferGeometry();
    const rainVertices = [];
    for (let i = 0; i < PARTICLE_POOL_SIZE; i++) {
        const x = Math.random() * 1000 - 500;
        const y = Math.random() * 500;
        const z = Math.random() * 1000 - 500;
        rainVertices.push(x, y, z);
    }
    rainGeometry.setAttribute('position', new THREE.Float32BufferAttribute(rainVertices, 3));
    const rainMaterial = new THREE.PointsMaterial({
        color: 0xaaaaaa,
        size: 0.1,
        transparent: true
    });
    rainParticles = new THREE.Points(rainGeometry, rainMaterial);
    scene.add(rainParticles);
    rainParticles.visible = false;

    const snowGeometry = new THREE.BufferGeometry();
    const snowVertices = [];
    for (let i = 0; i < PARTICLE_POOL_SIZE; i++) {
        const x = Math.random() * 1000 - 500;
        const y = Math.random() * 500;
        const z = Math.random() * 1000 - 500;
        snowVertices.push(x, y, z);
    }
    snowGeometry.setAttribute('position', new THREE.Float32BufferAttribute(snowVertices, 3));
    const snowMaterial = new THREE.PointsMaterial({
        color: 0xffffff,
        size: 0.2,
        transparent: true
    });
    snowParticles = new THREE.Points(snowGeometry, snowMaterial);
    scene.add(snowParticles);
    snowParticles.visible = false;
}

function createRainClouds() {
    const cloudGeometry = new THREE.SphereGeometry(50, 32, 32);
    const cloudMaterial = new THREE.MeshPhongMaterial({
        color: 0x8a8a8a,
        transparent: true,
        opacity: 0.8
    });

    for (let i = 0; i < 5; i++) {
        const cloud = new THREE.Mesh(cloudGeometry, cloudMaterial);
        cloud.position.set(
            Math.random() * 1000 - 500,
            200 + Math.random() * 100,
            Math.random() * 1000 - 500
        );
        cloud.scale.set(1 + Math.random() * 0.5, 0.5 + Math.random() * 0.3, 1 + Math.random() * 0.5);
        scene.add(cloud);
        rainClouds.push(cloud);
    }
}

function updateWeather() {
    const biome = getBiome(player.position.x, player.position.z);
    let newWeather = 'clear';

    if (biome === biomes.TUNDRA) {
        newWeather = Math.random() < 0.4 ? 'snow' : 'clear';
    } else if (biome === biomes.JUNGLE || biome === biomes.FOREST || biome === biomes.DENSE_FOREST) {
        newWeather = Math.random() < 0.3 ? 'rain' : 'clear';
    }

    if (newWeather !== currentWeather) {
        currentWeather = newWeather;
        rainParticles.visible = currentWeather === 'rain';
        snowParticles.visible = currentWeather === 'snow';
    }

    if (currentWeather === 'rain') {
        const positions = rainParticles.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] -= 2;
            if (positions[i] < 0) positions[i] = 500;
        }
        rainParticles.geometry.attributes.position.needsUpdate = true;

        rainClouds.forEach(cloud => {
            cloud.position.x += Math.sin(Date.now() * 0.001) * 0.5;
            cloud.position.z += Math.cos(Date.now() * 0.001) * 0.5;
        });
    } else if (currentWeather === 'snow') {
        const positions = snowParticles.geometry.attributes.position.array;
        for (let i = 1; i < positions.length; i += 3) {
            positions[i] -= 0.1;
            if (positions[i] < 0) positions[i] = 500;
        }
        snowParticles.geometry.attributes.position.needsUpdate = true;
    }
}

function setTimeOfDay(timeOfDay) {
    switch (timeOfDay) {
        case 'day':
            scene.background = new THREE.Color(0x87CEEB);
            scene.fog.color = new THREE.Color(0x87CEEB);
            break;
        case 'sunset':
            scene.background = new THREE.Color(0xFF4500);
            scene.fog.color = new THREE.Color(0xFF4500);
            break;
        case 'night':
            scene.background = new THREE.Color(0x000022);
            scene.fog.color = new THREE.Color(0x000022);
            break;
        case 'sunrise':
            scene.background = new THREE.Color(0xFFD700);
            scene.fog.color = new THREE.Color(0xFFD700);
            break;
    }
}

function setWeather(weather) {
    currentWeather = weather;
    rainParticles.visible = weather === 'rain';
    snowParticles.visible = weather === 'snow';

    rainClouds.forEach(cloud => {
        cloud.visible = weather === 'rain' || weather === 'snow';
    });
}