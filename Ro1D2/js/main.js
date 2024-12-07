const clock = new THREE.Clock(); // Create a new Three.js clock
let mapScene, mapCamera, mapRenderer; // Create a new Three.js scene, camera, and renderer for the fullscreen map.
let scene, camera, renderer; // Create a new Three.js scene, camera, and renderer
let player, ground, safeZoneGround; // Player, ground, and safe zone
let inventoryOpen = false; // Inventory state
let statsOpen = false; // Character stats state
let destination = null; // Destination for teleportation
let speed = 1.0; // Player movement speed
let minimapCamera; // Minimap camera
let enemies = []; // List of enemies
let gold = 0; // Gold amount
let bestiary = {}; // Bestiary data
const safeZoneRadius = 200; // Radius of the safe zone
const townRadius = 200; // Radius of the town
let quadrupeds = []; // List of quadrupeds
let walls = []; // List of walls
let friendlies = []; // List of friendlies
let helpWindowOpen = false; // Add this variable for help window
let isTeleporting = false; // Add this variable for teleportation
let adminConsoleOpen = false; // Add this variable for admin console
let teleportProgress = 0; // Add this variable for teleportation
let teleportationDuration = 3; // Duration in seconds
let previousPosition = null; // Add this variable for teleportation
let structures = []; // Add this variable for structures
let cameraAngle = 0;    // Add this variable for camera angle
let enemyWalls = []; // Walls that affect only enemies
let npcPopupOpen = false; // Track NPC popup state
let npcAdminEnabled = false; // Track NPC admin state
let currentNpc = null; // Track current NPC
let currentOpenedChest = null; // Added to address the popup issue
let treasureChests = []; // Added to keep track of treasure chests
let isAdminLoggedIn = false; // Add this variable for admin login
let questLogOpen = false; // Add this variable for quest log
let isMouseDown = false; // Add this variable for mouse down
let mouseDestination = null; // Add this variable for mouse down
let cameraTargetAngle = 0; // Add this variable for camera target angle
let currentCameraAngle = 0; // Add this variable for current camera angle
const cameraRotationSpeed = 0.05; // Adjust for smoother or faster rotation
let rotateLeft = false; // Add this variable for rotation
let currentStructure = null; // Implement Structure Admin Functions
let rotateRight = false; // Add this variable for rotation
let globalEnemySpeed = 0.7; // Global variable for enemy speed
let activeDamageIntervals = new Map(); // Keep track of active damage intervals

let playerInventory = []; // Player inventory
const npcData = [
    { name: 'Elder Thoran', dialogue: 'Greetings, adventurer. May your journey be safe.' },
    { name: 'Merchant Lila', dialogue: 'Looking to trade? I have wares you might like.' },
    { name: 'Blacksmith Brom', dialogue: 'Need your weapons sharpened?' },
    { name: 'Farmer Finn', dialogue: 'These crops won\'t tend themselves.' },
    { name: 'Guard Greta', dialogue: 'Stay vigilant out there.' },
    // Add more NPCs as desired
];

// Player health and energy
let playerHealth = 100;
const playerMaxHealth = 100;
let playerEnergy = 1;
const playerMaxEnergy = 1;

// Invulnerability variable
let playerInvulnerable = false;

// Looting variables
let isLooting = false;
let lootProgress = 0;
const lootDuration = 2; // Duration in seconds
let lootedItems = [];
let currentLootingEnemy = null;

// Initialize Character Stats
let characterStats = {
    level: 1,
    experience: 0,
    nextLevelExperience: 100,
    strength: 10,
    dexterity: 10,
    vitality: 10,
    energy: 10,
    statPoints: 0
};

// Skill Tree Data Structure
let skillTreeData = {
    strength: {
        name: 'Strength Boost',
        description: 'Increase your strength by 5.',
        cost: 1,
        learned: false
    },
    dexterity: {
        name: 'Dexterity Boost',
        description: 'Increase your dexterity by 5.',
        cost: 1,
        learned: false
    },
    vitality: {
        name: 'Vitality Boost',
        description: 'Increase your vitality by 5.',
        cost: 1,
        learned: false
    },
    energy: {
        name: 'Energy Boost',
        description: 'Increase your energy by 5.',
        cost: 1,
        learned: false
    }
    // Add more skills as needed
};

// Tooltip Element
const tooltip = document.getElementById('tooltip');

//--------------------------------------------Essential Functions------------------------------------------------------------------------------------------------------------------

function init() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(event) {
        event.preventDefault();
    }, false);

    const canvas = document.getElementById('gameCanvas');
    renderer = new THREE.WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.autoClear = false;
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
    minimapCamera = new THREE.OrthographicCamera(-200, 200, 200, -200, 0.1, 10000);
    minimapCamera.position.set(0, 500, 0);
    minimapCamera.up.set(0, 0, -1);
    minimapCamera.lookAt(0, 0, 0);
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 100, 0);
    scene.add(directionalLight);
    addQuadrupeds();



    // Help Window Open on Start
    helpWindowOpen = true;
    document.getElementById('helpWindow').style.display = 'block';

    // Populate Bestiary with NPCs
    bestiary = {
        goblin: {
            name: 'Goblin',
            description: 'A small, green creature known for its mischievous behavior.'
        },
        orc: {
            name: 'Orc',
            description: 'A large, brutish humanoid with immense strength.'
        },
        dragon: {
            name: 'Dragon',
            description: 'A massive, fire-breathing reptile that soars through the skies.'
        },
        troll: {
            name: 'Troll',
            description: 'A hulking beast with regenerative abilities and a fierce temper.'
        },
        elderThoran: {
            name: 'Elder Thoran',
            description: 'The wise elder of the village, offering guidance to travelers.'
        },
        merchantLila: {
            name: 'Merchant Lila',
            description: 'A traveling merchant with a variety of goods for sale.'
        }
        // Add more unique NPCs as needed
    };


    const groundShape = new THREE.Shape();
    groundShape.moveTo(-5000, -5000);
    groundShape.lineTo(5000, -5000);
    groundShape.lineTo(5000, 5000);
    groundShape.lineTo(-5000, 5000);
    groundShape.lineTo(-5000, -5000);

    const safeZoneSize = 300;
    const holePath = new THREE.Path();
    holePath.moveTo(-safeZoneSize, -safeZoneSize);
    holePath.lineTo(-safeZoneSize, safeZoneSize);
    holePath.lineTo(safeZoneSize, safeZoneSize);
    holePath.lineTo(safeZoneSize, -safeZoneSize);
    holePath.lineTo(-safeZoneSize, -safeZoneSize);
    groundShape.holes.push(holePath);

    const groundGeometry = new THREE.ShapeGeometry(groundShape);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x228B22 });
    ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.name = 'ground';
    scene.add(ground);

    const safeZoneGroundGeometry = new THREE.PlaneGeometry(600, 600);
    const safeZoneGroundMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
    safeZoneGround = new THREE.Mesh(safeZoneGroundGeometry, safeZoneGroundMaterial);
    safeZoneGround.rotation.x = -Math.PI / 2;
    safeZoneGround.position.y = 0.1;
    scene.add(safeZoneGround);

    const safeZoneBarrierGeometry = new THREE.BoxGeometry(600, 50, 600);
    const safeZoneBarrierMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0 });
    const safeZoneBarrier = new THREE.Mesh(safeZoneBarrierGeometry, safeZoneBarrierMaterial);
    safeZoneBarrier.position.set(0, 25, 0);
    scene.add(safeZoneBarrier);
    enemyWalls.push(safeZoneBarrier);

    createSettlementWalls();

    const shrineGroup = new THREE.Group();

    const floorGeometry = new THREE.CircleGeometry(20, 32);
    const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x808080 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.1;
    shrineGroup.add(floor);

    const teleportPadGeometry = new THREE.CircleGeometry(5, 32);
    const teleportPadMaterial = new THREE.MeshBasicMaterial({ color: 0x00ffff });
    teleportPad = new THREE.Mesh(teleportPadGeometry, teleportPadMaterial);
    teleportPad.rotation.x = -Math.PI / 2;
    teleportPad.position.y = 0.11;
    teleportPad.name = 'teleportPad';
    shrineGroup.add(teleportPad);

    shrineGroup.position.set(0, 0, 0);
    scene.add(shrineGroup);

    // Spawn Red Enemies (Regular)
    for (let i = 0; i < 10; i++) {
        let position = getRandomPositionOutsideTown(300, 1000);
        let enemy = createEnemy(position.x, 0, position.z, 'red');
        enemies.push(enemy);
        scene.add(enemy);
    }

    // Spawn Blue Enemies
    for (let i = 0; i < 3; i++) { // Adjust the number as desired
        let position = getRandomPositionOutsideTown(300, 1000);
        let blueEnemy = createEnemy(position.x, 0, position.z, 'blue');
        enemies.push(blueEnemy);
        scene.add(blueEnemy);
    }

    const structurePositions = [
        { x: 150, z: 150 },
        { x: -150, z: 150 },
        { x: 150, z: -150 },
        { x: -150, z: -150 },
        { x: 0, z: 200 },
    ];

    structurePositions.forEach(pos => {
        const structure = createStructure();
        structure.position.set(pos.x, 0, pos.z);
        scene.add(structure);
        walls.push(...structure.userData.walls);
        structures.push(structure);

        // Select a random NPC from npcData
        const npcInfo = npcData[Math.floor(Math.random() * npcData.length)];

        // Create the NPC with the selected data
        const npc = createFriendlyNPC(0x00ff00, npcInfo.name, npcInfo.dialogue);

        // Position the NPC at the structure's position
        npc.position.copy(structure.position);

        // Add the NPC to the scene and friendlies array
        scene.add(npc);
        friendlies.push(npc);
    });

    player = createHumanoid(0x0000ff);
    player.position.y = 0;
    scene.add(player);

    function checkEnemiesInSafeZone() {
        enemies.forEach((enemy) => {
            if (enemy.userData.isDead) return;

            const distanceFromCenter = enemy.position.length(); // Equivalent to sqrt(x^2 + z^2)

            if (distanceFromCenter < safeZoneRadius) {
                // Calculate direction away from center
                const directionAway = enemy.position.clone().normalize();
                const pushBackDistance = 5; // Distance to push the enemy out per frame
                enemy.position.add(directionAway.multiplyScalar(pushBackDistance));

                // Optional: Stop the enemy's movement
                enemy.isMoving = false;
            }
        });
    }

    // Add a Purple Structure a Little Ways Away from Town
    const purpleStructure = createPurpleStructure();
    purpleStructure.position.set(800, 0, -800); // Adjust position as desired
    scene.add(purpleStructure);

    // Function to add diverse plants to the terrain
    function addPlantsToTerrain() {
        const numElements = 3000; // Total number of natural elements

        const elementTypes = [
            {
                // Tree
                geometry: new THREE.ConeGeometry(20, 200, 20),
                material: new THREE.MeshLambertMaterial({ color: 0x228B22 }),
                yOffset: 5,
            },
            {
                geometry: new THREE.CylinderGeometry(0.5, 0.5, 5, 8),
                material: new THREE.MeshLambertMaterial({ color: 0x8B4513 }),
                yOffset: 2.5,
            },
            {
                geometry: new THREE.SphereGeometry(3, 8, 8),
                material: new THREE.MeshLambertMaterial({ color: 0x006400 }),
                yOffset: 3,
            },
            {
                //Large Bush
                geometry: new THREE.SphereGeometry(4, 12, 13),
                material: new THREE.MeshLambertMaterial({ color: 0x006400 }),
                yOffset: 3,
            },
            {
                //Rock
                geometry: new THREE.DodecahedronGeometry(3, 2),
                material: new THREE.MeshLambertMaterial({ color: 0x808080 }),
                yOffset: 3,
            },
        ];

        for (let i = 0; i < numElements; i++) {
            const typeIndex = Math.floor(Math.random() * elementTypes.length);
            const element = new THREE.Mesh(
                elementTypes[typeIndex].geometry,
                elementTypes[typeIndex].material
            );

            // Random position within the terrain bounds, avoiding the safe zone
            let x = Math.random() * 10000 - 5000;
            let z = Math.random() * 10000 - 5000;
            while (Math.sqrt(x * x + z * z) < 400) { // Ensure elements are not in the safe zone
                x = Math.random() * 10000 - 5000;
                z = Math.random() * 10000 - 5000;
            }

            element.position.set(x, elementTypes[typeIndex].yOffset, z);
            element.rotation.y = Math.random() * Math.PI * 2; // Random rotation
            scene.add(element);
        }
    }

    addPlantsToTerrain(); // Call the function to add plants and rocks

    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
    canvas.addEventListener('mousedown', onDocumentMouseDown, false);
    canvas.addEventListener('mouseup', onDocumentMouseUp, false);

}

function initMap() {
    const mapCanvas = document.getElementById('mapCanvas');
    mapRenderer = new THREE.WebGLRenderer({ canvas: mapCanvas, alpha: true });
    mapRenderer.setSize(window.innerWidth, window.innerHeight);
    mapScene = new THREE.Scene();

    const aspect = window.innerWidth / window.innerHeight;
    const d = 5000; // Adjust based on your game world's size
    mapCamera = new THREE.OrthographicCamera(-d * aspect, d * aspect, d, -d, 1, 10000);
    mapCamera.position.set(0, 1000, 0); // High above the game world
    mapCamera.up.set(0, 0, -1); // Adjust to match the game world's orientation
    mapCamera.lookAt(new THREE.Vector3(0, 0, 0));

    const ambientLight = new THREE.AmbientLight(0x404040);
    mapScene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(0, 100, 0);
    mapScene.add(directionalLight);
}

function updateGoldDisplay() {
    document.getElementById('goldAmount').innerText = gold;
}

function updateHealthDisplay() {
    document.getElementById('lifeValue').innerText = `${playerHealth}/${playerMaxHealth}`;
    let healthPercent = (playerHealth / playerMaxHealth) * 100;
    document.getElementById('lifeFill').style.height = `${healthPercent}%`;
}

function updateEnergyDisplay() {
    document.getElementById('energyValue').innerText = `${playerEnergy}/${playerMaxEnergy}`;
    let energyPercent = (playerEnergy / playerMaxEnergy) * 100;
    document.getElementById('energyOrb').style.clipPath = `inset(${100 - energyPercent}% 0 0 0)`;
}

function onDocumentMouseUp(event) {
    isMouseDown = false;
    mouseDestination = null;
}

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    if (isMouseDown && mouseDestination) {
        destination = mouseDestination.clone();
    }

    if (destination) {
        movePlayerTowardsDestination();
    } else {
        player.isMoving = false;
    }
    try {
        checkEnemiesInSafeZone();
    } catch (error) {
        console.error('Error in checkEnemiesInSafeZone:', error);
    }
    maintainEnemyCount();

    animateHumanoid(player, delta);
    moveEnemies(delta);
    animateDeadEnemies(delta);
    moveQuadrupeds(delta);

    quadrupeds.forEach(quadruped => {
        animateQuadruped(quadruped, delta);
    });

    updateTeleportation(delta);
    updateLooting(delta);

    if (rotateLeft) {
        cameraTargetAngle -= cameraRotationSpeed;
    }
    if (rotateRight) {
        cameraTargetAngle += cameraRotationSpeed;
    }

    currentCameraAngle += (cameraTargetAngle - currentCameraAngle) * 0.1;


    const cameraRadius = 100;
    const cameraHeight = 50;

    const cameraOffset = new THREE.Vector3(
        Math.sin(currentCameraAngle) * cameraRadius,
        cameraHeight,
        Math.cos(currentCameraAngle) * cameraRadius
    );

    camera.position.copy(player.position).add(cameraOffset);
    camera.lookAt(player.position);

    renderer.clear();
    renderer.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.setScissor(0, 0, window.innerWidth, window.innerHeight);
    renderer.setScissorTest(false);
    renderer.render(scene, camera);


    minimapCamera.position.x = player.position.x;
    minimapCamera.position.z = player.position.z;

    const minimapContainer = document.getElementById('minimapContainer');
    const mapWidth = minimapContainer.clientWidth;
    const mapHeight = minimapContainer.clientHeight;
    const minimapRect = minimapContainer.getBoundingClientRect();
    const canvasRect = renderer.domElement.getBoundingClientRect();
    const minimapX = minimapRect.left - canvasRect.left;
    const minimapY = minimapRect.top - canvasRect.top;

    renderer.setViewport(minimapX, canvasRect.height - minimapY - mapHeight, mapWidth, mapHeight);
    renderer.setScissor(minimapX, canvasRect.height - minimapY - mapHeight, mapWidth, mapHeight);
    renderer.setScissorTest(true);
    renderer.render(scene, minimapCamera);

    const fullscreenMap = document.getElementById('fullscreenMap');
    if (fullscreenMap.style.display === 'block') {
        renderMap();
    }
}

function onDocumentKeyDown(event) {
    if (inventoryOpen || statsOpen || adminConsoleOpen) {
        if (inventoryOpen && (event.key.toLowerCase() === 'i' || event.key.toLowerCase() === 'b')) {
            inventoryOpen = false;
            document.getElementById('inventory').style.display = 'none';
        } else if (statsOpen && event.key.toLowerCase() === 'c') {
            statsOpen = false;
            document.getElementById('stats').style.display = 'none';
        } else if (adminConsoleOpen && event.key === '`') {
            closeAdminConsole();
        }
        return;

    }

    if (event.key === 'Escape') { // Handle Esc key
        closeAllMenus();
        return;
    }

    if (event.key.toLowerCase() === 'y') {
        openBestiary();
        return;
    }

    if (event.key.toLowerCase() === 'i' || event.key.toLowerCase() === 'b') {
        inventoryOpen = !inventoryOpen;
        document.getElementById('inventory').style.display = inventoryOpen ? 'block' : 'none';
        return;
    }

    if (event.key.toLowerCase() === 'c') {
        statsOpen = !statsOpen;
        document.getElementById('stats').style.display = statsOpen ? 'block' : 'none';
        return;
    }

    if (event.key === '`') {
        if (adminConsoleOpen) {
            closeAdminConsole();
        } else {
            openAdminConsole();
        }
        return;
    }

    if (event.key === '`') {
        if (!isAdminLoggedIn) {
            openAdminConsole();
        } else {
            closeAdminConsole();
        }
        return;
    }

    if (event.key.toLowerCase() === 'h') {
        helpWindowOpen = !helpWindowOpen;
        document.getElementById('helpWindow').style.display = helpWindowOpen ? 'block' : 'none';
        return;
    }

    if (event.key.toLowerCase() === 'a') {
        rotateLeft = true;
        return;
    }
    if (event.key.toLowerCase() === 'd') {
        rotateRight = true;
        return;
    }

    if (isTeleporting || isLooting) return;

    if (event.key.toLowerCase() === 't') {
        if (!isTeleporting) {
            startTeleportation();
        }
    }

    if (event.key.toLowerCase() === 'q') {
        questLogOpen = !questLogOpen;
        document.getElementById('questLog').style.display = questLogOpen ? 'block' : 'none';
        return;
    }

    if (event.key.toLowerCase() === 'k') {
        if (document.getElementById('skillTree').style.display === 'block') {
            closeSkillTree();
        } else {
            openSkillTree();
        }
        return;
    }
}

function onDocumentKeyUp(event) {
    if (event.key.toLowerCase() === 'a') {
        rotateLeft = false;
        return;
    }
    if (event.key.toLowerCase() === 'd') {
        rotateRight = false;
        return;
    }
}

document.addEventListener('keyup', onDocumentKeyUp, false);

function onDocumentMouseDown(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    const chestIntersects = raycaster.intersectObjects(treasureChests, true);
    if (chestIntersects.length > 0) {
        const chestObject = chestIntersects[0].object;
        openChestPopup(chestObject);
        return;
    }

    if (inventoryOpen || statsOpen || adminConsoleOpen || isTeleporting || isLooting || helpWindowOpen) return;

    const objects = [ground, safeZoneGround, teleportPad, ...enemies, ...friendlies];
    const intersects = raycaster.intersectObjects([ground, safeZoneGround, teleportPad, ...enemies, ...friendlies], true);

    if (intersects.length > 0) {
        const intersectedObject = intersects[0].object;
        const parent = intersectedObject.parent;

        if (intersectedObject === ground || intersectedObject === safeZoneGround) {
            const point = intersects[0].point;
            mouseDestination = new THREE.Vector3(point.x, player.position.y, point.z);
            destination = new THREE.Vector3(point.x, player.position.y, point.z);
        } else if (intersectedObject === teleportPad) {
            if (previousPosition) {
                player.position.copy(previousPosition);
                destination = null;
                previousPosition = null;
                alert('Teleported back to your previous location.');
            } else {
                alert('No previous location to teleport to.');
            }
        } else if (parent.userData && parent.userData.type === 'hostile') {
            if (parent.userData.isDead) {
                lootEnemy(parent);
            } else {
                attackEnemy(parent);
            }
        } else if (friendlies.includes(parent)) {
            if (npcAdminEnabled) {
                openNpcAdminPopup(parent);
                return;
            }
            openNpcPopup(parent);
        } else if (parent.userData && parent.userData.type === 'nonHostile') {
            alert('You see a peaceful creature.');
        } else if (npcAdminEnabled) {
            if (structures.includes(parent)) {
                openStructureAdminPopup(parent);
                return;
            }
            if (settlementWalls.includes(intersectedObject)) {
                openSettlementWallAdminPopup(intersectedObject);
                return;
            }
        } else if (friendlies.includes(parent)) {
            if (npcAdminEnabled) {
                openNpcAdminPopup(parent);
                return;
            }
            openNpcPopup(parent);
        }
    }
}


function updateStatsDisplay() {
    document.getElementById('level').innerText = characterStats.level;
    document.getElementById('experience').innerText = characterStats.experience;
    document.getElementById('nextLevelExperience').innerText = characterStats.nextLevelExperience;
    document.getElementById('strength').innerText = characterStats.strength;
    document.getElementById('dexterity').innerText = characterStats.dexterity;
    document.getElementById('vitality').innerText = characterStats.vitality;
    document.getElementById('energy').innerText = characterStats.energy;
    document.getElementById('statPoints').innerText = characterStats.statPoints;
}

function generateInventorySlots() {
    for (let i = 1; i <= 6; i++) {
        const grid = document.getElementById('inventoryGridTab' + i);
        grid.innerHTML = '';
        for (let j = 0; j < 56; j++) {
            const slot = document.createElement('div');
            slot.classList.add('inventory-slot');
            grid.appendChild(slot);
        }
    }
}

function populateInventoryGrid(gridElement, items) {
    const slots = gridElement.querySelectorAll('.inventory-slot');
    slots.forEach((slot, index) => {
        slot.innerHTML = '';
        if (items[index]) {
            slot.innerText = items[index].name;
            slot.setAttribute('data-name', items[index].name);
            slot.setAttribute('data-description', items[index].description || 'No description available.');
            slot.addEventListener('mouseenter', showTooltip);
            slot.addEventListener('mousemove', moveTooltip);
            slot.addEventListener('mouseleave', hideTooltip);
        }
    });
}

function showTooltip(event) {
    const name = this.getAttribute('data-name');
    const description = this.getAttribute('data-description');
    tooltip.innerHTML = `<strong>${name}</strong><br>${description}`;
    tooltip.style.display = 'block';
}

function moveTooltip(event) {
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;

    let x = event.clientX + 10;
    let y = event.clientY + 10;

    if (x + tooltipWidth > pageWidth) {
        x = event.clientX - tooltipWidth - 10;
    }
    if (y + tooltipHeight > pageHeight) {
        y = event.clientY - tooltipHeight - 10;
    }

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

function hideTooltip() {
    tooltip.style.display = 'none';
    tooltip.innerHTML = '';
}

function openQuestLog() {
    questLogOpen = true;
    document.getElementById('questLog').style.display = 'block';
}

function closeQuestLog() {
    questLogOpen = false;
    document.getElementById('questLog').style.display = 'none';
}

function openSkillTree() {
    const skillTreeDiv = document.getElementById('skillTree');
    skillTreeDiv.style.display = 'block';
    populateSkillTree();
}

function closeSkillTree() {
    const skillTreeDiv = document.getElementById('skillTree');
    skillTreeDiv.style.display = 'none';
}

function populateSkillTree() {
    const skillsContainer = document.getElementById('skillsContainer');
    skillsContainer.innerHTML = ''; 
    for (const key in skillTreeData) {
        if (skillTreeData.hasOwnProperty(key)) {
            const skill = skillTreeData[key];
            const skillDiv = document.createElement('div');
            skillDiv.classList.add('skill');
            if (skill.learned) {
                skillDiv.classList.add('learned');
            }
            skillDiv.innerHTML = `<strong>${skill.name}</strong><br>${skill.description}<br>Cost: ${skill.cost} XP`;

            skillDiv.addEventListener('click', () => {
                if (!skill.learned && characterStats.experience >= skill.cost * 100) {
                    characterStats.experience -= skill.cost * 100;
                    characterStats[Object.keys(skillTreeData)[Object.keys(skillTreeData).indexOf(key)]] += 5; 
                    skill.learned = true;
                    updateStatsDisplay();
                    populateSkillTree();
                    alert(`You have learned ${skill.name}!`);
                } else if (skill.learned) {
                    alert('Skill already learned.');
                } else {
                    alert('Not enough experience to learn this skill.');
                }
            });

            if (!skill.learned && characterStats.experience < skill.cost * 100) {
                skillDiv.classList.add('unavailable');
            }

            skillsContainer.appendChild(skillDiv);
        }
    }
}

function openBestiary() {
    const bestiaryDiv = document.getElementById('bestiaryContent');
    bestiaryDiv.innerHTML = '';

    for (const key in bestiary) {
        if (bestiary.hasOwnProperty(key)) {
            const creature = bestiary[key];
            const creatureDiv = document.createElement('div');
            creatureDiv.innerHTML = `<h3>${creature.name}</h3><p>${creature.description}</p>`;
            bestiaryDiv.appendChild(creatureDiv);
        }
    }

    document.getElementById('bestiary').style.display = 'block';
}

function closeBestiary() {
    document.getElementById('bestiary').style.display = 'none';
}

function openStructureAdminPopup(structure) {
    currentStructure = structure;
    document.getElementById('structureScaleInput').value = structure.scale.x;
    document.getElementById('structureColorInput').value = '#' + structure.userData.color.getHexString();
    document.getElementById('structureAdminPopup').style.display = 'block';
}

function closeStructureAdminPopup() {
    document.getElementById('structureAdminPopup').style.display = 'none';
    currentStructure = null;
}

function saveStructureChanges() {
    if (currentStructure) {
        const scale = parseFloat(document.getElementById('structureScaleInput').value);
        const colorValue = document.getElementById('structureColorInput').value;
        const color = new THREE.Color(colorValue);

        currentStructure.scale.set(scale, scale, scale);

        currentStructure.traverse(child => {
            if (child.isMesh) {
                child.material.color.set(color);
            }
        });

        currentStructure.userData.color = color;

        alert('Structure changes saved.');
        closeStructureAdminPopup();
    }
}

function renderMap() {
    mapRenderer.render(mapScene, mapCamera);
    addMapMarkers();
}

function addMapMarkers() {
    mapScene.children = mapScene.children.filter(child => !child.userData.isMapMarker);

    const playerMarkerGeometry = new THREE.SphereGeometry(10, 16, 16);
    const playerMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
    const playerMarker = new THREE.Mesh(playerMarkerGeometry, playerMarkerMaterial);
    playerMarker.position.set(player.position.x, 0, player.position.z);
    playerMarker.userData.isMapMarker = true;
    mapScene.add(playerMarker);

    enemies.forEach(enemy => {
        if (!enemy.userData.isDead) {
            const enemyMarkerGeometry = new THREE.SphereGeometry(5, 8, 8);
            const enemyMarkerMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const enemyMarker = new THREE.Mesh(enemyMarkerGeometry, enemyMarkerMaterial);
            enemyMarker.position.set(enemy.position.x, 0, enemy.position.z);
            enemyMarker.userData.isMapMarker = true;
            mapScene.add(enemyMarker);
        }
    });
}

function createPurpleStructure() {
    const building = new THREE.Group();

    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x800080 });
    const wallThickness = 2;
    const wallHeight = 30;
    const wallLength = 50;

    const frontWallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness);
    const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
    frontWall.position.z = -wallLength / 2;
    building.add(frontWall);

    const backWall = frontWall.clone();
    backWall.position.z = wallLength / 2;
    building.add(backWall);

    const leftWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, wallLength);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.x = -wallLength / 2;
    leftWall.position.y = wallHeight / 2;
    building.add(leftWall);

    const rightWall = leftWall.clone();
    rightWall.position.x = wallLength / 2;
    building.add(rightWall);

    const roofGeometry = new THREE.ConeGeometry(35, 15, 4);
    const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x800080 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = wallHeight + 7.5;
    building.add(roof);

    building.userData.walls = [frontWall, backWall, leftWall, rightWall];

    const floorGeometry = new THREE.PlaneGeometry(50, 50);
    const floorMaterial = new THREE.MeshLambertMaterial({ color: 0x000000 });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = 0.1;
    building.add(floor);

    return building;
}

function playAttackAnimation() {
    player.isAttacking = true;
    player.attackTime = 0;
}

function addExperience(amount) {
    characterStats.experience += amount;
    if (characterStats.experience >= characterStats.nextLevelExperience) {
        levelUp();
    }
    updateStatsDisplay();
}

function openNpcPopup(npc) {
    if (npcPopupOpen) {
        closeNpcPopup();
        return;
    }
    document.getElementById('npcPopup').querySelector('h2').innerText = npc.userData.name || 'Friendly NPC';
    document.getElementById('npcPopup').querySelector('p').innerText = npc.userData.dialogue || 'Hello, traveler! Stay awhile and listen...';
    document.getElementById('npcPopup').style.display = 'block';
    npcPopupOpen = true;
}

function closeNpcPopup() {
    document.getElementById('npcPopup').style.display = 'none';
    npcPopupOpen = false;
}

function openNpcAdminPopup(npc) {
    currentNpc = npc;
    document.getElementById('npcNameInput').value = npc.userData.name || '';
    document.getElementById('npcHealthInput').value = npc.userData.health || 100;
    document.getElementById('npcDialogueInput').value = npc.userData.dialogue || '';

    document.getElementById('npcHeadColorInput').value = '#' + npc.head.material.color.getHexString();
    document.getElementById('npcBodyColorInput').value = '#' + npc.body.material.color.getHexString();
    document.getElementById('npcArmColorInput').value = '#' + npc.leftArm.material.color.getHexString();
    document.getElementById('npcLegColorInput').value = '#' + npc.leftLeg.material.color.getHexString();

    document.getElementById('npcAdminPopup').style.display = 'block';
}

function closeNpcAdminPopup() {
    document.getElementById('npcAdminPopup').style.display = 'none';
    currentNpc = null;
}

function saveNpcChanges() {
    if (currentNpc) {
        currentNpc.userData.name = document.getElementById('npcNameInput').value;
        currentNpc.userData.health = parseInt(document.getElementById('npcHealthInput').value) || 100;
        currentNpc.userData.dialogue = document.getElementById('npcDialogueInput').value;

        const headColor = new THREE.Color(document.getElementById('npcHeadColorInput').value);
        const bodyColor = new THREE.Color(document.getElementById('npcBodyColorInput').value);
        const armColor = new THREE.Color(document.getElementById('npcArmColorInput').value);
        const legColor = new THREE.Color(document.getElementById('npcLegColorInput').value);

        currentNpc.head.material.color.set(headColor);
        currentNpc.body.material.color.set(bodyColor);
        currentNpc.leftArm.material.color.set(armColor);
        currentNpc.rightArm.material.color.set(armColor);
        currentNpc.leftLeg.material.color.set(legColor);
        currentNpc.rightLeg.material.color.set(legColor);

        alert('NPC changes saved.');
        closeNpcAdminPopup();
    }
}

function damagePlayer(amount) {
    if (playerInvulnerable) return;
    const vitalityFactor = characterStats.vitality / 10;
    const actualDamage = Math.max(1, amount - vitalityFactor);
    playerHealth -= actualDamage;
    if (playerHealth <= 0) {
        playerHealth = 0;
        alert('You have been defeated!');
    }
    updateHealthDisplay();
}

function startTeleportation() {
    isTeleporting = true;
    teleportProgress = 0;
    document.getElementById('teleportationBarContainer').style.display = 'block';
}

function updateTeleportation(delta) {
    if (isTeleporting) {
        teleportProgress += delta;
        const progressBar = document.getElementById('teleportationBar');
        progressBar.style.width = (teleportProgress / teleportationDuration) * 100 + '%';
        if (teleportProgress >= teleportationDuration) {
            isTeleporting = false;
            document.getElementById('teleportationBarContainer').style.display = 'none';
            progressBar.style.width = '0%';
            teleportToSafeZone();
        }
    }
}

function teleportToSafeZone() {
    previousPosition = player.position.clone();
    player.position.set(0, 0, 0);
    destination = null;
}

function createQuadruped(color = 0x996633) {
    const group = new THREE.Group();
    const bodyMaterial = new THREE.MeshLambertMaterial({ color });
    const body = new THREE.Mesh(new THREE.BoxGeometry(10, 5, 5), bodyMaterial);
    body.position.y = 5;
    group.add(body);

    const headMaterial = new THREE.MeshLambertMaterial({ color });
    const head = new THREE.Mesh(new THREE.BoxGeometry(4, 4, 4), headMaterial);
    head.position.set(7, 7, 0);
    group.add(head);

    const legMaterial = new THREE.MeshLambertMaterial({ color });
    const legGeometry = new THREE.BoxGeometry(1, 5, 1);

    const frontLeftLeg = new THREE.Mesh(legGeometry, legMaterial);
    frontLeftLeg.position.set(4, 2.5, 2);
    group.add(frontLeftLeg);

    const frontRightLeg = frontLeftLeg.clone();
    frontRightLeg.position.z = -2;
    group.add(frontRightLeg);

    const backLeftLeg = frontLeftLeg.clone();
    backLeftLeg.position.x = -4;
    group.add(backLeftLeg);

    const backRightLeg = frontRightLeg.clone();
    backRightLeg.position.x = -4;
    group.add(backRightLeg);

    const tailMaterial = new THREE.MeshLambertMaterial({ color });
    const tail = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 5), tailMaterial);
    tail.position.set(-7, 6, 0);
    tail.rotation.y = Math.PI / 4;
    group.add(tail);

    group.isMoving = false;
    group.animationTime = 0;
    group.animationSpeed = 5.0;
    group.legs = [frontLeftLeg, frontRightLeg, backLeftLeg, backRightLeg];
    group.userData.direction = new THREE.Vector3();
    group.userData.type = 'nonHostile';
    group.userData.name = 'Quadruped';

    return group;
}

function createHumanoid(color) {
    const group = new THREE.Group();

    const bodyGeometry = new THREE.BoxGeometry(5, 10, 2);
    const bodyMaterial = new THREE.MeshLambertMaterial({ color });
    const body = new THREE.Mesh(new THREE.BoxGeometry(5, 10, 2), bodyMaterial);
    body.position.y = 10;
    group.add(body);

    const headGeometry = new THREE.BoxGeometry(3, 3, 3);
    const headMaterial = new THREE.MeshLambertMaterial({ color });
    const head = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), headMaterial);
    head.position.y = 17;
    group.add(head);

    const armGeometry = new THREE.BoxGeometry(1, 8, 1);
    const armMaterial = new THREE.MeshLambertMaterial({ color });
    const leftArm = new THREE.Mesh(armGeometry, armMaterial);
    leftArm.position.set(-3.5, 10, 0);
    group.add(leftArm);
    const rightArm = new THREE.Mesh(armGeometry, armMaterial);
    rightArm.position.set(3.5, 10, 0);
    group.add(rightArm);

    const legGeometry = new THREE.BoxGeometry(2, 10, 2);
    const legMaterial = new THREE.MeshLambertMaterial({ color });
    const leftLeg = new THREE.Mesh(legGeometry, legMaterial);
    leftLeg.position.set(-1, 5, 0);
    group.add(leftLeg);
    const rightLeg = new THREE.Mesh(legGeometry, legMaterial);
    rightLeg.position.set(1, 5, 0);
    group.add(rightLeg);

    group.head = head;
    group.body = body;
    group.leftArm = leftArm;
    group.rightArm = rightArm;
    group.leftLeg = leftLeg;
    group.rightLeg = rightLeg;

    group.animationTime = 0;
    group.animationSpeed = 10.0;
    group.isMoving = false;
    group.isAttacking = false;
    group.attackTime = 0;

    group.userData = {
        name: 'Friendly NPC',
        health: 100,
        dialogue: 'Hello!',
        weight: 1
    };

    return group;
}

function animateQuadruped(quadruped, delta) {
    if (quadruped.isMoving) {
        quadruped.animationTime += delta * quadruped.animationSpeed;
        const angle = Math.sin(quadruped.animationTime) * (Math.PI / 6);

        quadruped.legs[0].rotation.x = angle;
        quadruped.legs[3].rotation.x = angle;
        quadruped.legs[1].rotation.x = -angle;
        quadruped.legs[2].rotation.x = -angle;
    } else {
        quadruped.legs.forEach(leg => leg.rotation.x = 0);
    }
}

function animateHumanoid(humanoid, delta) {
    if (humanoid.isAttacking) {
        humanoid.attackTime += delta * humanoid.animationSpeed;
        const angle = Math.sin(humanoid.attackTime * 20) * (Math.PI / 4);
        humanoid.rightArm.rotation.x = -angle;
        if (humanoid.attackTime > 0.5) {
            humanoid.rightArm.rotation.x = 0;
            humanoid.isAttacking = false;
            humanoid.attackTime = 0;
        }
    } else if (humanoid.isMoving) {
        humanoid.animationTime += delta * humanoid.animationSpeed;
        const angle = Math.sin(humanoid.animationTime) * (Math.PI / 6);

        humanoid.leftArm.rotation.x = angle;
        humanoid.rightArm.rotation.x = -angle;
        humanoid.leftLeg.rotation.x = -angle;
        humanoid.rightLeg.rotation.x = angle;
    } else {
        humanoid.leftArm.rotation.x = 0;
        humanoid.rightArm.rotation.x = 0;
        humanoid.leftLeg.rotation.x = 0;
        humanoid.rightLeg.rotation.x = 0;
    }
}

function createTreasureChest(x, y, z) {
    const chestGeometry = new THREE.BoxGeometry(10, 10, 10);
    const chestMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const chest = new THREE.Mesh(chestGeometry, chestMaterial);
    chest.position.set(x, y + 5, z);

    chest.userData = {
        type: 'treasureChest',
        items: generateRandomItems(3),
        gold: Math.floor(Math.random() * 100) + 50
    };

    scene.add(chest);
    treasureChests.push(chest);
    return chest;
}

function createSettlementWalls() {
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const wallHeight = 30;
    const wallThickness = 2;
    const wallLength = 600;

    const northWallLeftGeometry = new THREE.BoxGeometry(wallLength / 2 - 50, wallHeight, wallThickness);
    const northWallLeft = new THREE.Mesh(northWallLeftGeometry, wallMaterial);
    northWallLeft.position.set(-wallLength / 4 - 25, wallHeight / 2, -300);
    scene.add(northWallLeft);
    walls.push(northWallLeft);

    const northWallRight = new THREE.Mesh(northWallLeftGeometry, wallMaterial);
    northWallRight.position.set(wallLength / 4 + 25, wallHeight / 2, -300);
    scene.add(northWallRight);
    walls.push(northWallRight);

    const gateBarrierGeometry = new THREE.BoxGeometry(100, wallHeight, wallThickness);
    const gateBarrierMaterial = new THREE.MeshLambertMaterial({ color: 0x000000, transparent: true, opacity: 0 });
    const northGateBarrier = new THREE.Mesh(gateBarrierGeometry, gateBarrierMaterial);
    northGateBarrier.position.set(0, wallHeight / 2, -300);
    scene.add(northGateBarrier);
    enemyWalls.push(northGateBarrier);

    const southWallLeft = northWallLeft.clone();
    southWallLeft.position.set(-wallLength / 4 - 25, wallHeight / 2, 300);
    scene.add(southWallLeft);
    walls.push(southWallLeft);

    const southWallRight = northWallRight.clone();
    southWallRight.position.set(wallLength / 4 + 25, wallHeight / 2, 300);
    scene.add(southWallRight);
    walls.push(southWallRight);

    const southGateBarrier = northGateBarrier.clone();
    southGateBarrier.position.set(0, wallHeight / 2, 300);
    scene.add(southGateBarrier);
    enemyWalls.push(southGateBarrier);

    const eastWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, wallLength);
    const eastWall = new THREE.Mesh(eastWallGeometry, wallMaterial);
    eastWall.position.set(300, wallHeight / 2, 0);
    scene.add(eastWall);
    walls.push(eastWall);

    const westWall = eastWall.clone();
    westWall.position.set(-300, wallHeight / 2, 0);
    scene.add(westWall);
    walls.push(westWall);

    const northGateWhiteWall = createWhiteWall();
    northGateWhiteWall.position.set(0, 15, -300);
    scene.add(northGateWhiteWall);

    const southGateWhiteWall = createWhiteWall();
    southGateWhiteWall.position.set(0, 15, 300);
    scene.add(southGateWhiteWall);

    walls.push(northGateWhiteWall);
    walls.push(southGateWhiteWall);
}

function createStructure() {
    const building = new THREE.Group();
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
    const wallThickness = 2;
    const wallHeight = 30;
    const wallLength = 50;

    const frontWallShape = new THREE.Shape();
    frontWallShape.moveTo(-wallLength / 2, 0);
    frontWallShape.lineTo(wallLength / 2, 0);
    frontWallShape.lineTo(wallLength / 2, wallHeight);
    frontWallShape.lineTo(-wallLength / 2, wallHeight);
    frontWallShape.lineTo(-wallLength / 2, 0);

    const doorWidth = 10;
    const doorHeight = 20;
    const doorX = -doorWidth / 2;
    const doorY = 0;

    const doorHole = new THREE.Path();
    doorHole.moveTo(doorX, doorY);
    doorHole.lineTo(doorX + doorWidth, doorY);
    doorHole.lineTo(doorX + doorWidth, doorY + doorHeight);
    doorHole.lineTo(doorX, doorY + doorHeight);
    doorHole.lineTo(doorX, doorY);
    frontWallShape.holes.push(doorHole);

    const frontWallGeometry = new THREE.ShapeGeometry(frontWallShape);
    const frontWall = new THREE.Mesh(frontWallGeometry, wallMaterial);
    frontWall.position.z = -wallLength / 2;
    building.add(frontWall);

    const backWallGeometry = new THREE.BoxGeometry(wallLength, wallHeight, wallThickness);
    const backWall = new THREE.Mesh(backWallGeometry, wallMaterial);
    backWall.position.z = wallLength / 2;
    backWall.position.y = wallHeight / 2;
    building.add(backWall);

    const leftWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, wallLength);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.x = -wallLength / 2;
    leftWall.position.y = wallHeight / 2;
    building.add(leftWall);

    const rightWallGeometry = new THREE.BoxGeometry(wallThickness, wallHeight, wallLength);
    const rightWall = new THREE.Mesh(rightWallGeometry, wallMaterial);
    rightWall.position.x = wallLength / 2;
    rightWall.position.y = wallHeight / 2;
    building.add(rightWall);

    const roofGeometry = new THREE.ConeGeometry(35, 15, 4);
    const roofMaterial = new THREE.MeshLambertMaterial({ color: 0x654321 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.rotation.y = Math.PI / 4;
    roof.position.y = wallHeight + 7.5;
    building.add(roof);

    building.userData.walls = [frontWall, backWall, leftWall, rightWall];

    return building;
}

function createFriendlyNPC(color = 0x00ff00, name = 'Friendly NPC', dialogue = 'Hello!') {
    const npc = createHumanoid(color);
    npc.userData.type = 'friendly';
    npc.userData.name = name;
    npc.userData.dialogue = dialogue;
    return npc;
}

function getRandomPositionOutsideTown(minDistance, maxDistance) {
    let angle = Math.random() * 2 * Math.PI;
    let distance = minDistance + Math.random() * (maxDistance - minDistance);
    let x = Math.cos(angle) * distance;
    let z = Math.sin(angle) * distance;
    return { x: x, z: z };
}

function createEnemy(x, y, z, type = 'red') {
    let color;
    let damageRate;

    if (type === 'blue') {
        color = 0x0000ff;
        damageRate = 4;
    } else {
        color = 0xff0000;
        damageRate = 2;
    }

    const enemy = createHumanoid(color);
    enemy.position.set(x, 0, z);
    enemy.userData.type = 'hostile';
    enemy.userData.isDead = false;
    enemy.userData.hasBeenLooted = false;
    enemy.userData.deathTime = 0;
    enemy.userData.direction = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
    enemy.isMoving = true;
    enemy.userData.damageRate = damageRate;
    scene.add(enemy);
    return enemy;
}

function attackEnemy(enemy) {
    const attackRange = 20;

    const distance = player.position.distanceTo(enemy.position);

    if (distance <= attackRange) {
        playAttackAnimation();

        setTimeout(() => {
            defeatEnemy(enemy);
        }, 500);
    } else {
        alert('Enemy is too far away!');
    }
}

function enemyAttackPlayer(enemy, delta) {
    if (enemy.userData.isDead || playerInvulnerable) return;

    const damage = enemy.userData.damageRate * delta;
    const actualDamage = Math.max(0, damage - (characterStats.vitality / 10));

    playerHealth -= actualDamage;
    if (playerHealth <= 0) {
        playerHealth = 0;
        alert('You have been defeated!');
    }
    updateHealthDisplay();
}

function moveQuadrupeds(delta) {
    quadrupeds.forEach((quadruped) => {
        if (quadruped.isDead) return;

        if (!quadruped.isMoving) {
            if (Math.random() < 0.01) {
                quadruped.isMoving = true;
                const angle = Math.random() * 2 * Math.PI;
                quadruped.userData.direction.set(Math.cos(angle), 0, Math.sin(angle));
                quadruped.rotation.y = angle;
            }
        } else {
            const moveDistance = globalEnemySpeed * delta * 10;
            quadruped.position.add(quadruped.userData.direction.clone().multiplyScalar(moveDistance));

            let collided = false;
            for (let wall of walls) {
                const quadrupedBox = new THREE.Box3().setFromObject(quadruped);
                const wallBox = new THREE.Box3().setFromObject(wall);
                if (quadrupedBox.intersectsBox(wallBox)) {
                    collided = true;
                    break;
                }
            }

            for (let wall of enemyWalls) {
                const quadrupedBox = new THREE.Box3().setFromObject(quadruped);
                const wallBox = new THREE.Box3().setFromObject(wall);
                if (quadrupedBox.intersectsBox(wallBox)) {
                    collided = true;
                    break;
                }
            }

            if (collided) {
                quadruped.position.sub(quadruped.userData.direction.clone().multiplyScalar(moveDistance));
                quadruped.isMoving = false;
            } else {
                quadruped.isMoving = true;
            }

            if (Math.random() < 0.005) {
                quadruped.isMoving = false;
            }
        }

        animateQuadruped(quadruped, delta);
    });
}

function moveEnemies(delta) {
    enemies.forEach((enemy) => {
        if (enemy.userData.isDead) return;

        const threatRange = 100;
        const attackRange = 10;
        const enemySpeed = globalEnemySpeed;

        const directionToPlayer = new THREE.Vector3().subVectors(player.position, enemy.position);
        const distanceToPlayer = directionToPlayer.length();

        if (distanceToPlayer <= attackRange) {
            enemy.isMoving = false;
            enemyAttackPlayer(enemy);
        } else if (distanceToPlayer <= threatRange) {
            directionToPlayer.normalize();
            const oldPosition = enemy.position.clone();
            enemy.position.add(directionToPlayer.multiplyScalar(enemySpeed));

            let collided = false;
            for (let wall of walls) {
                const enemyBox = new THREE.Box3().setFromObject(enemy);
                const wallBox = new THREE.Box3().setFromObject(wall);
                if (enemyBox.intersectsBox(wallBox)) {
                    collided = true;
                    break;
                }
            }

            for (let wall of enemyWalls) {
                const enemyBox = new THREE.Box3().setFromObject(enemy);
                const wallBox = new THREE.Box3().setFromObject(wall);
                if (enemyBox.intersectsBox(wallBox)) {
                    collided = true;
                    break;
                }
            }

            if (collided) {
                enemy.position.copy(oldPosition);
                enemy.isMoving = false;
            } else {
                enemy.isMoving = true;
                const angle = Math.atan2(directionToPlayer.x, directionToPlayer.z);
                enemy.rotation.y = angle;
            }
        } else {
            const oldPosition = enemy.position.clone();
            const moveVector = enemy.userData.direction.clone().multiplyScalar(0.5);
            enemy.position.add(moveVector);

            let collided = false;
            for (let wall of walls) {
                const enemyBox = new THREE.Box3().setFromObject(enemy);
                const wallBox = new THREE.Box3().setFromObject(wall);
                if (enemyBox.intersectsBox(wallBox)) {
                    collided = true;
                    break;
                }
            }

            if (collided) {
                enemy.position.copy(oldPosition);
                enemy.userData.direction = new THREE.Vector3(Math.random() - 0.5, 0, Math.random() - 0.5).normalize();
                enemy.isMoving = false;
            } else {
                enemy.isMoving = true;
                const angle = Math.atan2(moveVector.x, moveVector.z);
                enemy.rotation.y = angle;
            }
        }

        animateHumanoid(enemy, delta);
    });
}

function toggleFullscreenMap() {
    const fullscreenMap = document.getElementById('fullscreenMap');
    if (fullscreenMap.style.display === 'none') {
        fullscreenMap.style.display = 'block';
        renderMap();
    } else {
        fullscreenMap.style.display = 'none';
    }
}

function closeFullscreenMap() {
    const fullscreenMap = document.getElementById('fullscreenMap');
    fullscreenMap.style.display = 'none';
}

function animateDeadEnemies(delta) {
    scene.children.forEach((object) => {
        if (object.userData && object.userData.isDead) {
            object.userData.deathTime += delta;
            if (object.userData.deathTime < 1) {
                object.rotation.x = -Math.PI / 2 * (object.userData.deathTime / 1);
            } else {
                object.rotation.x = -Math.PI / 2;
                if (!object.userData.bloodPoolCreated) {
                    createBloodPool(object.position);
                    object.userData.bloodPoolCreated = true;
                }
            }
        }
    });
}

function addQuadrupeds() {
    for (let i = 0; i < 5; i++) {
        let position = getRandomPositionOutsideTown(300, 1000);
        const quadruped = createQuadruped();
        quadruped.position.set(position.x, 0, position.z);
        quadrupeds.push(quadruped);
        scene.add(quadruped);
    }
}

function createBloodPool(position) {
    const geometry = new THREE.CircleGeometry(5, 32);
    const material = new THREE.MeshBasicMaterial({ color: 0x8B0000 });
    const bloodPool = new THREE.Mesh(geometry, material);
    bloodPool.rotation.x = -Math.PI / 2;
    bloodPool.position.set(position.x, 0.05, position.z);
    scene.add(bloodPool);
}

function movePlayerTowardsDestination() {
    const direction = new THREE.Vector3().subVectors(destination, player.position);
    const distance = direction.length();
    if (distance > 0.1) {
        direction.normalize();
        const moveDistance = Math.min(speed, distance);
        const oldPosition = player.position.clone();
        player.position.add(direction.multiplyScalar(moveDistance));

        let collided = false;
        for (let wall of walls) {
            const playerBox = new THREE.Box3().setFromObject(player);
            const wallBox = new THREE.Box3().setFromObject(wall);
            if (playerBox.intersectsBox(wallBox)) {
                collided = true;
                break;
            }
        }

        if (collided) {
            player.position.copy(oldPosition);
            destination = null;
            player.isMoving = false;
        } else {
            player.isMoving = true;
            player.rotation.y = Math.atan2(direction.x, direction.z);
        }
    } else {
        player.position.copy(destination);
        destination = null;
        player.isMoving = false;
    }
}

function createWhiteWall() {
    const wallGeometry = new THREE.BoxGeometry(10, 30, 2);
    const wallMaterial = new THREE.MeshLambertMaterial({ color: 0xffffff });
    const whiteWall = new THREE.Mesh(wallGeometry, wallMaterial);
    whiteWall.userData.isWhiteWall = true;
    return whiteWall;
}

function maintainEnemyCount() {
    const activeEnemies = enemies.filter(enemy => !enemy.userData.isDead).length;
    const enemiesToSpawn = 50 - activeEnemies;

    for (let i = 0; i < enemiesToSpawn; i++) {
        let position = getRandomPositionOutsideTown(300, 1000);
        let type = Math.random() < 0.1 ? 'blue' : 'red';
        let enemy = createEnemy(position.x, 0, position.z, type);
        enemies.push(enemy);
        scene.add(enemy);
    }
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    minimapCamera.left = -200;
    minimapCamera.right = 200;
    minimapCamera.top = 200;
    minimapCamera.bottom = -200;
    minimapCamera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function closeAllMenus() {
    if (inventoryOpen) {
        inventoryOpen = false;
        document.getElementById('inventory').style.display = 'none';
    }

    if (statsOpen) {
        statsOpen = false;
        document.getElementById('stats').style.display = 'none';
    }

    if (adminConsoleOpen) {
        closeAdminConsole();
    }

    if (questLogOpen) {
        questLogOpen = false;
        document.getElementById('questLog').style.display = 'none';
    }

    if (helpWindowOpen) {
        helpWindowOpen = false;
        document.getElementById('helpWindow').style.display = 'none';
    }

    if (isLooting) {
        isLooting = false;
        document.getElementById('lootBarContainer').style.display = 'none';
        document.getElementById('lootBar').style.width = '0%';
    }
    document.getElementById('lootPopup').style.display = 'none';

    if (npcPopupOpen) {
        closeNpcPopup();
    }

    if (currentOpenedChest) {
        closeChestPopup();
    }

    if (document.getElementById('skillTree').style.display === 'block') {
        closeSkillTree();
    }

    if (document.getElementById('fullscreenMap').style.display === 'block') {
        closeFullscreenMap();
    }
}

function lootEnemy(enemy) {
    if (enemy.userData.hasBeenLooted) {
        alert('This enemy has already been looted.');
        return;
    }

    isLooting = true;
    lootProgress = 0;
    currentLootingEnemy = enemy;
    document.getElementById('lootBarContainer').style.display = 'block';
}

function updateLooting(delta) {
    if (isLooting) {
        lootProgress += delta;
        const progressBar = document.getElementById('lootBar');
        progressBar.style.width = (lootProgress / lootDuration) * 100 + '%';
        if (lootProgress >= lootDuration) {
            isLooting = false;
            document.getElementById('lootBarContainer').style.display = 'none';
            openLootPopup();
        }
    }
}

function openLootPopup() {
    lootedItems = generateRandomItems(2);

    const lootItemsDiv = document.getElementById('lootItems');
    lootItemsDiv.innerHTML = '';
    lootedItems.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.innerText = item.name;
        lootItemsDiv.appendChild(itemDiv);
    });

    document.getElementById('lootPopup').style.display = 'block';
}

function lootAllItems() {
    lootedItems.forEach(item => {
        addItemToInventory(item);
    });
    lootedItems = [];
    document.getElementById('lootPopup').style.display = 'none';

    if (currentLootingEnemy) {
        currentLootingEnemy.traverse(child => {
            if (child.isMesh) {
                child.material.color.set(0x000000);
            }
        });

        currentLootingEnemy.userData.hasBeenLooted = true;
        currentLootingEnemy = null;
    }

    isLooting = false;
    document.getElementById('lootBarContainer').style.display = 'none';
    document.getElementById('lootBar').style.width = '0%';
    alert('Items looted and added to your inventory.');
}

function generateRandomItems(count) {
    const items = [
        { name: 'Small Health Potion', description: 'Restores 50 health points.' },
        { name: 'Rusty Sword', description: 'A worn-out sword with minimal damage.' },
        { name: 'Old Shield', description: 'Provides basic protection against attacks.' },
        { name: 'Leather Boots', description: 'Increases movement speed slightly.' },
        { name: 'Cloth Armor', description: 'Offers minimal defense but allows easy movement.' },
        { name: 'Mana Potion', description: 'Restores 30 mana points.' },
        { name: 'Iron Helmet', description: 'Protects the head from minor attacks.' },
    ];
    const randomItems = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * items.length);
        randomItems.push({ ...items[randomIndex] });
    }
    return randomItems;
}

function addItemsToInventory(items) {
    console.log('Items added to inventory:', items);
    playerInventory.push(...items);
}

function openAdminConsole() {
    document.getElementById('adminConsole').style.display = 'block';
    adminConsoleOpen = true;

    if (isAdminLoggedIn) {
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminControls').style.display = 'block';
    } else {
        document.getElementById('adminLogin').style.display = 'block';
        document.getElementById('adminControls').style.display = 'none';
    }
}

function closeAdminConsole() {
    document.getElementById('adminConsole').style.display = 'none';
    adminConsoleOpen = false;
    isAdminLoggedIn = false;
    document.getElementById('adminControls').style.display = 'none';
    document.getElementById('adminLogin').style.display = 'block';
}

function checkAdminPassword() {
    const passwordInput = document.getElementById('adminPassword').value;
    if (passwordInput === 'ltwelcome1') {
        isAdminLoggedIn = true;
        document.getElementById('adminLogin').style.display = 'none';
        document.getElementById('adminControls').style.display = 'block';
        document.getElementById('adminPassword').value = '';

        if (!document.getElementById('npcAdminCheckbox').hasAttribute('data-listener')) {
            document.getElementById('npcAdminCheckbox').addEventListener('change', function() {
                npcAdminEnabled = this.checked;
                alert('NPC Admin Mode ' + (npcAdminEnabled ? 'Enabled' : 'Disabled'));
            });
            document.getElementById('npcAdminCheckbox').setAttribute('data-listener', 'true');
        }
    } else {
        alert('Incorrect password!');
    }
}

function updatePlayerOptions() {
    playerInvulnerable = document.getElementById('invulnerabilityCheckbox').checked;
    alert('Player options updated.');
}

function updatePlayerStats() {
    const healthInput = parseInt(document.getElementById('playerHealthInput').value);
    const goldInput = parseInt(document.getElementById('playerGoldInput').value);
    const experienceInput = parseInt(document.getElementById('playerExperienceInput').value);

    if (!isNaN(healthInput)) {
        playerHealth = Math.min(healthInput, playerMaxHealth);
        updateHealthDisplay();
    }
    if (!isNaN(goldInput)) {
        gold = goldInput;
        updateGoldDisplay();
    }
    if (!isNaN(experienceInput)) {
        characterStats.experience = experienceInput;
        if (characterStats.experience >= characterStats.nextLevelExperience) {
            levelUp();
        }
        updateStatsDisplay();
    }
    alert('Player stats updated.');
}

function spawnEntities() {
    const entityType = document.getElementById('entityTypeSelect').value;
    const quantity = parseInt(document.getElementById('entityQuantityInput').value);

    if (isNaN(quantity) || quantity <= 0) {
        alert('Invalid quantity!');
        return;
    }

    for (let i = 0; i < quantity; i++) {
        const offsetX = Math.random() * 50 - 25;
        const offsetZ = Math.random() * 50 - 25;
        const spawnPosition = {
            x: player.position.x + offsetX,
            y: player.position.y,
            z: player.position.z + offsetZ
        };

        if (entityType === 'enemy') {
            const enemy = createEnemy(spawnPosition.x, spawnPosition.y, spawnPosition.z);
            enemies.push(enemy);
            scene.add(enemy);
        } else if (entityType === 'friendlyNPC') {
            const npc = createFriendlyNPC();
            npc.position.set(spawnPosition.x, spawnPosition.y, spawnPosition.z);
            friendlies.push(npc);
            scene.add(npc);
        } else if (entityType === 'structure') {
            const structure = createStructure();
            structure.position.set(spawnPosition.x, spawnPosition.y, spawnPosition.z);
            scene.add(structure);
            walls.push(...structure.userData.walls);
        } else if (entityType === 'treasureChest') {
            createTreasureChest(spawnPosition.x, spawnPosition.y, spawnPosition.z);
            alert('Treasure Chest spawned.');
        } else if (entityType === 'settlement') {
            createSettlement(spawnPosition.x, spawnPosition.y, spawnPosition.z);
            alert('Settlement spawned.');
        } else if (entityType === 'quadruped') {
            const quadruped = createQuadruped();
            quadruped.position.set(spawnPosition.x, spawnPosition.y, spawnPosition.z);
            quadrupeds.push(quadruped);
            scene.add(quadruped);
            alert('Quadruped spawned.');
        }
    }
}

function updateGameSettings() {
    const enemySpeedInput = parseFloat(document.getElementById('enemySpeedInput').value);

    if (!isNaN(enemySpeedInput) && enemySpeedInput > 0) {
        globalEnemySpeed = enemySpeedInput;
        alert('Game settings updated.');
    } else {
        alert('Invalid enemy speed!');
    }
}

function teleportPlayer() {
    const x = parseFloat(document.getElementById('teleportXInput').value);
    const z = parseFloat(document.getElementById('teleportZInput').value);

    if (!isNaN(x) && !isNaN(z)) {
        player.position.set(x, player.position.y, z);
        destination = null;
        isTeleporting = false;
        document.getElementById('teleportationBarContainer').style.display = 'none';
        document.getElementById('teleportationBar').style.width = '0%';
        alert(`Player teleported to (${x}, ${z}).`);
    } else {
        alert('Invalid coordinates!');
    }
}

function levelUp() {
    characterStats.level++;
    characterStats.experience -= characterStats.nextLevelExperience;
    characterStats.nextLevelExperience = Math.floor(characterStats.nextLevelExperience * 1.5);
    characterStats.statPoints += 5;
    alert('Level Up! You have reached level ' + characterStats.level);
}

function defeatEnemy(enemy) {
    addExperience(20);
    gold += 10;
    updateGoldDisplay();
    alert('Enemy defeated! You gained 20 experience and 10 gold.');

    enemy.isMoving = false;
    enemy.userData.isDead = true;
    enemy.userData.deathTime = 0;
}

function increaseStat(stat) {
    if (characterStats.statPoints > 0) {
        characterStats[stat]++;
        characterStats.statPoints--;
        updateStatsDisplay();
    } else {
        alert('No available stat points!');
    }
}

function addItemToInventory(item) {
    playerInventory.push(item);
    updateInventoryDisplay();
}

function updateInventoryDisplay() {
    for (let i = 1; i <= 6; i++) {
        const grid = document.getElementById(`inventoryGridTab${i}`);
        grid.innerHTML = '';
        playerInventory.forEach((invItem, index) => {
            if (index < 56) {
                const slot = document.createElement('div');
                slot.classList.add('inventory-slot');
                slot.innerText = invItem.name;
                grid.appendChild(slot);
            }
        });
    }
}

function setupInventoryTabs() {
    const tabs = document.querySelectorAll('.inventory-tab');
    const tabContents = document.querySelectorAll('.inventory-tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(tc => tc.classList.remove('active'));

            tab.classList.add('active');
            const activeTabContent = document.getElementById(tab.dataset.tab);
            activeTabContent.classList.add('active');
        });
    });

    tabs[0].classList.add('active');
    tabContents[0].classList.add('active');
}

function generatePlayerInventoryGrid() {
    const grid = document.getElementById('playerInventoryGrid');
    grid.innerHTML = '';
    const numColumns = 7;
    const numRows = Math.ceil(playerInventory.length / numColumns);
    grid.style.gridTemplateColumns = `repeat(${numColumns}, 50px)`;
    for (let i = 0; i < numColumns * numRows; i++) {
        const slot = document.createElement('div');
        slot.classList.add('inventory-slot');
        grid.appendChild(slot);
    }
}

function openChestPopup(chest) {
    currentOpenedChest = chest;
    const chestPopup = document.getElementById('chestPopup');
    chestPopup.style.display = 'block';

    const chestInventoryGrid = document.getElementById('chestInventoryGrid');
    const playerInventoryGrid = document.getElementById('playerInventoryInChestGrid');

    const chestColumns = 7;
    const chestRows = 4;
    const playerColumns = 7;
    const playerRows = 8;

    generateInventoryGrid(chestInventoryGrid, chestColumns, chestRows);
    generateInventoryGrid(playerInventoryGrid, playerColumns, playerRows);

    if (!chest.userData.items) chest.userData.items = [];
    chest.userData.items.length = chestColumns * chestRows;

    populateInventoryGridChest(chestInventoryGrid, chest.userData.items);
    populateInventoryGridChest(playerInventoryGrid, playerInventory);

    setupInventorySlotEventListeners(chestInventoryGrid, chest.userData.items, playerInventory, playerInventoryGrid);
    setupInventorySlotEventListeners(playerInventoryGrid, playerInventory, chest.userData.items, chestInventoryGrid);
}

function generateInventoryGrid(gridElement, numColumns, numRows) {
    gridElement.style.gridTemplateColumns = `repeat(${numColumns}, 50px)`;
    gridElement.innerHTML = '';
    for (let i = 0; i < numColumns * numRows; i++) {
        const slot = document.createElement('div');
        slot.classList.add('inventory-slot');
        gridElement.appendChild(slot);
    }
}

function populateInventoryGridChest(gridElement, items) {
    gridElement.innerHTML = '';
    items.forEach((item, index) => {
        const slot = document.createElement('div');
        slot.classList.add('inventory-slot');
        slot.innerText = item ? item.name : '';

        if (item) {
            slot.setAttribute('data-name', item.name);
            slot.setAttribute('data-description', item.description || 'No description available.');
            slot.addEventListener('mouseenter', showTooltip);
            slot.addEventListener('mousemove', moveTooltip);
            slot.addEventListener('mouseleave', hideTooltip);
        }

        gridElement.appendChild(slot);
    });
}

function setupInventorySlotEventListeners(sourceGrid, sourceItems, targetItems, targetGrid) {
    const slots = sourceGrid.querySelectorAll('.inventory-slot');
    slots.forEach((slot, index) => {
        slot.addEventListener('click', () => {
            if (sourceItems[index]) {
                let emptyIndex = targetItems.findIndex(item => item == null);
                if (emptyIndex === -1) {
                    alert('No space in target inventory.');
                    return;
                }
                targetItems[emptyIndex] = sourceItems[index];
                sourceItems[index] = null;

                populateInventoryGrid(sourceGrid, sourceItems);
                populateInventoryGrid(targetGrid, targetItems);
            }
        });
    });
}

function closeChestPopup() {
    document.getElementById('chestPopup').style.display = 'none';
    currentOpenedChest = null;

    if (inventoryOpen) {
        populateInventoryGrid(document.getElementById('inventoryGridTab1'), playerInventory);
    }
}

function takeAllChestItems() {
    const chest = currentOpenedChest;
    chest.userData.items.forEach(item => {
        addItemToInventory(item);
    });
    chest.userData.items = [];
    gold += chest.userData.gold;
    updateGoldDisplay();
    chest.userData.gold = 0;

    scene.remove(chest);

    closeChestPopup();
}

function handleHotbarSelection(slotNumber) {
    const selectedSlot = document.querySelector(`.slot[data-slot="${slotNumber}"]`);
    if (selectedSlot) {
        document.querySelectorAll('.slot').forEach(slot => slot.style.borderColor = '#555');
        selectedSlot.style.borderColor = '#FFD700';
        console.log(`Hotbar slot ${slotNumber} selected.`);
    }
}

setupInventoryTabs();
initMap();
generateInventorySlots();
updateGoldDisplay();
updateHealthDisplay();
updateEnergyDisplay();
updateStatsDisplay();
init();
animate();