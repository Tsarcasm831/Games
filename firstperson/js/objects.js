// Materials and base geometries used for objects
const terrainGeometry = new THREE.PlaneGeometry(settings.chunkSize, settings.chunkSize, settings.chunkResolution, settings.chunkResolution);
terrainGeometry.rotateX(-Math.PI / 2);
const terrainMaterial = new THREE.MeshStandardMaterial({
    vertexColors: true,
    flatShading: true
});

const trunkGeometry = new THREE.CylinderGeometry(1, 1.5, 10, 8);
const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
const leafGeometry = new THREE.ConeGeometry(8, 4, 8);

let mouseDown = false;
let mouseDownTime = 0;
const breakTime = 1000;

function createCactus() {
    // ... same code from original script ...
    // (For brevity, copy the original cactus code from your script here)
    // Remember to push interactable objects as in original code.
    // ...
    const cactusGroup = new THREE.Group();
    const cactusGeometry = new THREE.BoxGeometry(2, 10, 2);
    const cactusMaterial = new THREE.MeshPhongMaterial({ color: 0x2E8B57 });
    const cactus = new THREE.Mesh(cactusGeometry, cactusMaterial);
    cactus.position.y = 5;
    cactusGroup.add(cactus);

    const armGeometry = new THREE.BoxGeometry(1.5, 4, 1.5);
    const leftArm = new THREE.Mesh(armGeometry, cactusMaterial);
    leftArm.position.set(-1.75, 3, 0);
    leftArm.rotation.z = Math.PI / 4;
    cactusGroup.add(leftArm);

    const rightArm = new THREE.Mesh(armGeometry, cactusMaterial);
    rightArm.position.set(1.75, 5, 0);
    rightArm.rotation.z = -Math.PI / 4;
    cactusGroup.add(rightArm);

    const spineGeometry = new THREE.ConeGeometry(0.1, 1, 8);
    const spineMaterial = new THREE.MeshPhongMaterial({ color: 0x2F4F4F });
    for (let i = 0; i < 20; i++) {
        const spine = new THREE.Mesh(spineGeometry, spineMaterial);
        spine.position.set((Math.random() - 0.5) * 2, Math.random() * 10, (Math.random() - 0.5) * 2);
        spine.rotation.set(Math.random() * Math.PI, 0, Math.random() * Math.PI);
        cactusGroup.add(spine);
        interactableObjects.push({ mesh: spine, type: 'cactus_spine', health: 10 });
    }

    cactusGroup.castShadow = true;
    cactusGroup.receiveShadow = true;
    return cactusGroup;
}

function createAppleTree() {
    // ... original apple tree code ...
    const treeGroup = createStylizedTree(0x228B22);
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 5;
    treeGroup.add(trunk);

    const appleGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const appleMaterial = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
    for (let i = 0; i < 10; i++) {
        const apple = new THREE.Mesh(appleGeometry, appleMaterial);
        apple.position.set((Math.random() - 0.5) * 6, 10 + Math.random() * 5, (Math.random() - 0.5) * 6);
        const stem = new THREE.Mesh(
            new THREE.CylinderGeometry(0.05, 0.05, 0.2, 8),
            new THREE.MeshPhongMaterial({ color: 0x8B4513 })
        );
        stem.position.y = 0.5;
        apple.add(stem);
        treeGroup.add(apple);
        interactableObjects.push({ mesh: apple, type: 'apple', health: 5 });
    }
    return treeGroup;
}

function createPalmTree() {
    // ... original palm tree code ...
    // Similar approach as in original script
    const treeGroup = new THREE.Group();
    const trunkGeometry = new THREE.CylinderGeometry(0.5, 0.7, 10, 8);
    const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 5;
    treeGroup.add(trunk);

    const leafGeometry = new THREE.ConeGeometry(4, 6, 4);
    const leafMaterial = new THREE.MeshPhongMaterial({ color: 0x228B22 });
    for (let i = 0; i < 5; i++) {
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.y = 10;
        leaf.rotation.x = Math.PI / 6;
        leaf.rotation.y = (i / 5) * Math.PI * 2;
        treeGroup.add(leaf);
    }

    const coconutGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const coconutMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    for (let i = 0; i < 3; i++) {
        const coconut = new THREE.Mesh(coconutGeometry, coconutMaterial);
        coconut.position.set((Math.random() - 0.5) * 2, 10 + Math.random() * 2, (Math.random() - 0.5) * 2);
        treeGroup.add(coconut);
        interactableObjects.push({ mesh: coconut, type: 'coconut', health: 5 });
    }

    treeGroup.castShadow = true;
    treeGroup.receiveShadow = true;
    return treeGroup;
}

function createStylizedTree(treeColor) {
    // ... original stylized tree code ...
    const treeGroup = new THREE.Group();

    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = 5;
    treeGroup.add(trunk);

    const leafMaterial = new THREE.MeshPhongMaterial({ color: treeColor });
    for (let i = 0; i < 3; i++) {
        const leaf = new THREE.Mesh(leafGeometry, leafMaterial);
        leaf.position.y = 10 + i * 2;
        leaf.scale.setScalar(1 - i * 0.2);
        treeGroup.add(leaf);
    }

    const branchGeometry = new THREE.CylinderGeometry(0.2, 0.1, 3, 8);
    const branchMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    for (let i = 0; i < 5; i++) {
        const branch = new THREE.Mesh(branchGeometry, branchMaterial);
        branch.position.set((Math.random() - 0.5) * 4, 8 + Math.random() * 4, (Math.random() - 0.5) * 4);
        branch.rotation.set(Math.random() * Math.PI / 2, 0, Math.random() * Math.PI * 2);
        treeGroup.add(branch);
        interactableObjects.push({ mesh: branch, type: 'tree_branch', health: 15 });
    }

    treeGroup.castShadow = true;
    treeGroup.receiveShadow = true;
    return treeGroup;
}

function createRock() {
    const geometry = new THREE.DodecahedronGeometry(Math.random() * 0.5 + 0.5, 0);
    const material = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const rock = new THREE.Mesh(geometry, material);
    rock.castShadow = true;
    rock.receiveShadow = true;
    return rock;
}

function createBoulder() {
    const geometry = new THREE.DodecahedronGeometry(Math.random() * 2 + 2, 1);
    const material = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const boulder = new THREE.Mesh(geometry, material);
    boulder.castShadow = true;
    boulder.receiveShadow = true;
    return boulder;
}

function createSpiderWeb() {
    const webGeometry = new THREE.CircleGeometry(2, 6);
    const webMaterial = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide
    });
    const web = new THREE.Mesh(webGeometry, webMaterial);
    web.rotation.x = -Math.PI / 2; 
    return web;
}

function createWoodenFloor() {
    const geometry = new THREE.PlaneGeometry(5, 5);
    const material = new THREE.MeshPhongMaterial({ color: 0xDEB887, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    return floor;
}

function createWoodenWall() {
    const geometry = new THREE.BoxGeometry(5, 3, 0.5);
    const material = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const wall = new THREE.Mesh(geometry, material);
    wall.position.y = 1.5;
    return wall;
}

function createWoodenDoor() {
    const doorGroup = new THREE.Group();
    const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
    const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.y = 1;
    doorGroup.add(door);
    return doorGroup;
}

function createStoneWall() {
    const geometry = new THREE.BoxGeometry(5, 3, 0.5);
    const material = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const wall = new THREE.Mesh(geometry, material);
    wall.position.y = 1.5;
    return wall;
}

function createStoneFloor() {
    const geometry = new THREE.PlaneGeometry(5, 5);
    const material = new THREE.MeshPhongMaterial({ color: 0xA9A9A9, side: THREE.DoubleSide });
    const floor = new THREE.Mesh(geometry, material);
    floor.rotation.x = -Math.PI / 2;
    return floor;
}

function spawnObject(objectType) {
    let object;
    switch (objectType) {
        case 'tree':
            object = createStylizedTree(0x228B22);
            break;
        case 'rock':
            object = createRock();
            break;
        case 'boulder':
            object = createBoulder();
            break;
        case 'apple_tree':
            object = createAppleTree();
            break;
        case 'cactus':
            object = createCactus();
            break;
        case 'palm_tree':
            object = createPalmTree();
            break;
        case 'spider_web':
            object = createSpiderWeb();
            break;
        case 'wooden_wall':
            object = createWoodenWall();
            objectType = 'wooden_wall';
            break;
        case 'wooden_floor':
            object = createWoodenFloor();
            objectType = 'wooden_floor';
            break;
        case 'wooden_door':
            object = createWoodenDoor();
            objectType = 'wooden_door';
            break;
        case 'stone_wall':
            object = createStoneWall();
            objectType = 'stone_wall';
            break;
        case 'stone_floor':
            object = createStoneFloor();
            objectType = 'stone_floor';
            break;
        default:
            console.warn('Unknown object type:', objectType);
            return;
    }
    if (object) {
        const forward = new THREE.Vector3();
        camera.getWorldDirection(forward);
        object.position.copy(player.position).add(forward.multiplyScalar(5));
        scene.add(object);
        interactableObjects.push({ mesh: object, type: objectType, health: 50 });
    }
}