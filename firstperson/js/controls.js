document.addEventListener('pointerlockerror', function(event) {
    console.error('Pointer lock error:', event);
    alert('Failed to lock the pointer. Please try again.');
});

function onPointerLockChange() {
    isLocked = document.pointerLockElement === renderer.domElement;
    console.log("Pointer lock changed. isLocked:", isLocked);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onKeyDown(event) {
    switch (event.code) {
        case 'KeyW': moveForward = true; break;
        case 'KeyS': moveBackward = true; break;
        case 'KeyA': moveLeft = true; break;
        case 'KeyD': moveRight = true; break;
        case 'Space': if (canJump) jump = true; break;
        case 'KeyP':
            togglePause(); 
            break;
    }
}

function onKeyUp(event) {
    switch (event.code) {
        case 'KeyW': moveForward = false; break;
        case 'KeyS': moveBackward = false; break;
        case 'KeyA': moveLeft = false; break;
        case 'KeyD': moveRight = false; break;
        case 'Space': jump = false; break;
    }
}

function onMouseDown(event) {
    if (isLocked) {
        mouseDown = true;
        mouseDownTime = Date.now();
        
        raycaster.setFromCamera(new THREE.Vector2(), camera);
        const intersects = raycaster.intersectObjects(interactableObjects.map(obj => obj.mesh));
        if (intersects.length > 0) {
            const object = interactableObjects.find(obj => obj.mesh === intersects[0].object);
            if (object) {
                if (object.type === 'mob') {
                    breakObject(object);
                    return;
                }
                const selectedItem = inventory.items[inventory.selectedSlot];
                if (object.type === 'boulder' && (!selectedItem || selectedItem.name !== 'Hammer')) {
                    console.log("You need a hammer to break this boulder!");
                    return;
                }
                breakingObject = object;
                breakingIndicator.position.copy(intersects[0].point);
                breakingIndicator.visible = true;
            }
        }

        const selectedItem = inventory.items[inventory.selectedSlot];
        if (selectedItem && selectedItem.name === 'Apple') {
            inventory.removeItem(inventory.selectedSlot);
            hunger = Math.min(100, hunger + 20);  
            updateStatusBars();
            updateInHandDisplay();
        }
        if (selectedItem && selectedItem.name === 'Coconut') {
            inventory.removeItem(inventory.selectedSlot);
            hunger = Math.min(100, hunger + 15);
            updateStatusBars();
            updateInHandDisplay();
        }
    }
}

function onMouseUp(event) {
    mouseDown = false;
    mouseDownTime = 0;
    breakingObject = null;
    breakingIndicator.visible = false;
}

function onMouseMove(event) {
    if (isLocked) {
        const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
        const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;

        player.rotation.y -= movementX * 0.002;
        camera.rotation.x -= movementY * 0.002;
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
    }
}

function lockPointer() {
    renderer.domElement.requestPointerLock();
}