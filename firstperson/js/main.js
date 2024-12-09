function createBreakingIndicator() {
    const geometry = new THREE.RingGeometry(0.5, 0.7, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
    const indicator = new THREE.Mesh(geometry, material);
    indicator.rotation.x = -Math.PI / 2;
    indicator.visible = false;
    scene.add(indicator);
    return indicator;
}

function createSun() {
    const sunGeometry = new THREE.SphereGeometry(50, 32, 32);
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
    const sun = new THREE.Mesh(sunGeometry, sunMaterial);
    sun.name = 'sun';
    sun.position.set(0, 500, 0);
    scene.add(sun);
    return sun;
}

function createWater() {
    const waterGeometry = new THREE.PlaneGeometry(10000, 10000);
    const waterMaterial = new THREE.MeshPhongMaterial({
        color: 0x0077be,
        transparent: true,
        opacity: 0.6
    });
    water = new THREE.Mesh(waterGeometry, waterMaterial);
    water.rotation.x = -Math.PI / 2;
    water.position.y = settings.terrainHeight * settings.waterLevel - 10;
    scene.add(water);
}

function initInventory() {
    for (let i = 0; i < 3; i++) {
        inventory.addItem('Apple');
    }
    inventory.updateUI();
    document.addEventListener('keydown', (event) => {
        if (event.code === 'KeyE') {
            inventory.toggleInventoryAndCrafting();
        } else if (event.code >= 'Digit1' && event.code <= 'Digit9') {
            inventory.selectSlot(parseInt(event.code.charAt(5)) - 1);
            updateInHandDisplay();
        } else if (event.code === 'KeyP') { 
            togglePause();
        }
        if (event.code === 'Backquote') {
            toggleAdminConsole();
        }
    });

    document.getElementById('craft-button').addEventListener('click', () => crafting.craft());
    document.getElementById('spawn-button').addEventListener('click', () => {
        const selectedObject = document.getElementById('spawn-object-menu').value;
        spawnObject(selectedObject);
    });

    document.getElementById('set-time-button').addEventListener('click', () => {
        const timeOfDay = document.getElementById('time-of-day').value;
        setTimeOfDay(timeOfDay);
    });

    document.getElementById('set-weather-button').addEventListener('click', () => {
        const weather = document.getElementById('weather').value;
        setWeather(weather);
    });

    document.getElementById('set-health-button').addEventListener('click', () => {
        const newHealth = parseInt(document.getElementById('player-health').value);
        health = Math.max(0, Math.min(100, newHealth));
        updateStatusBars();
    });

    document.getElementById('set-hunger-button').addEventListener('click', () => {
        const newHunger = parseInt(document.getElementById('player-hunger').value);
        hunger = Math.max(0, Math.min(100, newHunger));
        updateStatusBars();
    });

    document.getElementById('give-item-button').addEventListener('click', () => {
        const selectedItem = document.getElementById('give-item').value;
        if (!inventory.addItem(selectedItem)) {
            console.log("Inventory is full or item cannot be added.");
        } else {
            console.log(`${selectedItem} added to inventory.`);
        }
    });

    document.getElementById('set-gravity-button').addEventListener('click', () => {
        const newGravity = parseFloat(document.getElementById('gravity').value);
        settings.gravity = newGravity;
        console.log(`Gravity set to ${newGravity}.`);
    });

    document.getElementById('set-jump-force-button').addEventListener('click', () => {
        const newJumpForce = parseFloat(document.getElementById('jump-force').value);
        settings.jumpForce = newJumpForce;
        console.log(`Jump force set to ${newJumpForce}.`);
    });

    document.getElementById('spawn-mob-button').addEventListener('click', () => {
        const x = player.position.x + (Math.random() - 0.5) * 20;
        const z = player.position.z + (Math.random() - 0.5) * 20;
        const y = getTerrainHeight(x, z) + 1;
        const mob = new Mob(new THREE.Vector3(x, y, z));
        mobs.push(mob);
        console.log("Mob spawned.");
    });

    document.getElementById('remove-mobs-button').addEventListener('click', () => {
        for (let mob of mobs) {
            scene.remove(mob.mesh);
        }
        mobs.length = 0;
        console.log("All mobs removed.");
    });

    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            button.classList.add('active');
            const tabId = 'tab-' + button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}

function toggleAdminConsole() {
    const adminConsole = document.getElementById('admin-console');
    if (adminConsole.style.display === 'none') {
        adminConsole.style.display = 'block';
        isPaused = true;
        document.exitPointerLock();
    } else {
        adminConsole.style.display = 'none';
        isPaused = false;
        renderer.domElement.requestPointerLock();
    }
}

function breakObject(object) {
    let itemToAdd;
    let count = 1;
    switch (object.type) {
        case 'tree_branch':
            itemToAdd = 'Stick';
            break;
        case 'cactus_spine':
            itemToAdd = 'Cactus Spine';
            break;
        case 'rock':
            itemToAdd = 'Stone';
            break;
        case 'boulder':
            itemToAdd = 'Stone';
            count = 3;
            break;
        case 'apple':
            itemToAdd = 'Apple';
            break;
        case 'spider_web':
            itemToAdd = 'String';
            break;
        case 'coconut':
            itemToAdd = 'Coconut';
            break;
        case 'mob':
            object.health -= 25;
            if (object.health <= 0) {
                scene.remove(object.mesh);
                const index = interactableObjects.indexOf(object);
                if (index > -1) {
                    interactableObjects.splice(index, 1);
                }
                const mobIndex = mobs.indexOf(object);
                if (mobIndex > -1) {
                    mobs.splice(mobIndex, 1);
                }
            }
            return;
    }

    for (let i = 0; i < count; i++) {
        if (!inventory.addItem(itemToAdd)) {
            break;
        }
    }

    const index = interactableObjects.indexOf(object);
    if (index > -1) {
        interactableObjects.splice(index, 1);
        object.mesh.parent.remove(object.mesh);
    }
    updateInHandDisplay();
}

function decreaseHunger() {
    if (isLocked && !isPaused) {
        hunger = Math.max(0, hunger - 0.01);  
        if (hunger === 0) {
            health = Math.max(0, health - 0.01);  
        }
        updateStatusBars();
    }
}

function animate() {
    requestAnimationFrame(animate);

    if (!isPaused) {
        const delta = clock.getDelta();

        // Update mobs if they exist
        if (window.mobs && window.mobs.length > 0) {
            window.mobs.forEach(mob => mob.update(delta));
        }

        if (isLocked) {
            velocity.x -= velocity.x * 10.0 * delta;
            velocity.z -= velocity.z * 10.0 * delta;

            direction.z = Number(moveForward) - Number(moveBackward);
            direction.x = Number(moveRight) - Number(moveLeft);
            direction.normalize();

            if (moveForward || moveBackward) velocity.z -= direction.z * 400.0 * delta;
            if (moveLeft || moveRight) velocity.x -= direction.x * 400.0 * delta;

            const terrainHeight = getTerrainHeight(player.position.x, player.position.z);
            const waterSurfaceHeight = settings.terrainHeight * settings.waterLevel - 10;

            if (jump && canJump && player.position.y <= terrainHeight + 2) {
                velocity.y = settings.jumpForce;
                canJump = false;
                setTimeout(() => { canJump = true; }, 250); // Reduced cooldown
            }

            velocity.y += settings.gravity * delta;

            if (player.position.y < terrainHeight + 2) {
                player.position.y = terrainHeight + 2;
                velocity.y = Math.max(0, velocity.y); // Prevent sinking
                canJump = true;
            }

            player.translateX(-velocity.x * delta);
            player.translateZ(velocity.z * delta);
            player.position.y += velocity.y * delta;

            if (player.position.y < terrainHeight + 2) {
                player.position.y = terrainHeight + 2;
                velocity.y = 0;
                canJump = true;
            }

            water.position.x = camera.position.x;
            water.position.z = camera.position.z;

            camera.getWorldDirection(direction);

            decreaseHunger();

            if (typeof updateMobs === 'function') {
                updateMobs(delta);
            }

            if (health <= 0) {
                console.log("Game Over");
                isLocked = false;
                document.exitPointerLock();
            }
        }

        const sunRotationSpeed = 0.1;
        const sun = scene.getObjectByName('sun');
        if (sun) {
            sun.position.x = 1000 * Math.cos(sunRotationSpeed * Date.now() / 1000);
            sun.position.y = 500 * Math.sin(sunRotationSpeed * Date.now() / 1000) + 500;
            sun.position.z = 1000 * Math.sin(sunRotationSpeed * Date.now() / 1000);
        }

        updateChunks();
        updateWeather();
        renderer.render(scene, camera);
    }
}

function togglePause() {
    isPaused = !isPaused;
    const pauseScreen = document.getElementById('pause-screen');
    if (isPaused) {
        pauseScreen.style.display = 'flex';
        document.exitPointerLock();
    } else {
        pauseScreen.style.display = 'none';
        renderer.domElement.requestPointerLock();
    }
}

function init() {
    // Ensure the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initGame);
    } else {
        initGame();
    }
}

function initGame() {
    initParticlePool();
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x343434);
    scene.fog = new THREE.Fog(0x343434, 50, 1000);
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 3000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Safely append renderer to body
    const body = document.body;
    if (body) {
        body.appendChild(renderer.domElement);
    } else {
        console.error('Could not find document.body to append renderer');
        return;
    }

    breakingIndicator = createBreakingIndicator();
    const sun = createSun();

    const light = new THREE.DirectionalLight(0xffffff, 0.5);
    light.position.set(100, 100, 100);
    light.castShadow = true;
    light.shadow.mapSize.width = 2048;
    light.shadow.mapSize.height = 2048;
    light.shadow.camera.near = 0.5;
    light.shadow.camera.far = 500;
    scene.add(light);

    scene.add(new THREE.AmbientLight(0x404040, 0.2));

    createWater();
    createPlayer();

    // Call global spawnMobs function
    if (typeof window.spawnMobs === 'function') {
        window.spawnMobs();
    } else {
        console.error('spawnMobs function not found');
    }

    initWeatherEffects();
    createRainClouds();
    initInventory();

    raycaster = new THREE.Raycaster();

    renderer.domElement.addEventListener('click', lockPointer);
    document.addEventListener('pointerlockchange', onPointerLockChange);

    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('mousemove', onMouseMove);
    window.addEventListener('resize', onWindowResize);

    updateInHandDisplay();
    updateStatusBars();
    crafting.updateUI();

    animate();
}

init();