function createPlayer() {
    player = new THREE.Object3D();
    player.add(camera);
    camera.position.set(0, 2, 0);
    player.position.set(0, getTerrainHeight(0, 0) + 2, 0);
    scene.add(player);
}

function updateStatusBars() {
    document.querySelector('#health-bar .bar-fill').style.width = `${health}%`;
    document.querySelector('#hunger-bar .bar-fill').style.width = `${hunger}%`;
}

function updateInHandDisplay() {
    const canvas = document.getElementById('player-hand-canvas');
    const handRenderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    handRenderer.setSize(200, 200);
    const handCamera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
    const handScene = new THREE.Scene();

    const light = new THREE.PointLight(0xffffff, 1, 100);
    light.position.set(0, 0, 10);
    handScene.add(light);

    const handGeometry = new THREE.BoxGeometry(0.5, 0.8, 0.2);
    const handMaterial = new THREE.MeshPhongMaterial({ color: 0xffdbac });
    const hand = new THREE.Mesh(handGeometry, handMaterial);
    hand.position.set(0, -0.5, -1);
    hand.rotation.x = Math.PI / 6;
    handScene.add(hand);

    const selectedItem = inventory.items[inventory.selectedSlot];
    if (selectedItem) {
        const itemMesh = inventory.createItemMesh(selectedItem.name);
        itemMesh.position.set(0, 0, -1);
        itemMesh.rotation.set(Math.PI / 4, Math.PI / 4, 0);
        hand.add(itemMesh);
    }

    handRenderer.render(handScene, handCamera);
}