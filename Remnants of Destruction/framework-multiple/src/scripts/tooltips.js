// tooltips.js

// Create a tooltip element
const entityTooltip = document.createElement('div');
entityTooltip.id = 'entityTooltip';
entityTooltip.style.position = 'absolute';
entityTooltip.style.pointerEvents = 'none';
entityTooltip.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
entityTooltip.style.color = '#fff';
entityTooltip.style.padding = '5px 10px';
entityTooltip.style.borderRadius = '5px';
entityTooltip.style.fontSize = '14px';
entityTooltip.style.display = 'none';
entityTooltip.style.zIndex = '1000'; // Ensure tooltip is above other elements
document.body.appendChild(entityTooltip);

// Helper function to find the ancestor with userData.name
function getEntityWithName(object) {
    while (object) {
        if (object.userData && object.userData.name) {
            return object;
        }
        object = object.parent;
    }
    return null;
}

// Function to handle mouse move and show tooltip for entities
function onMouseMove(event) {
    const rect = renderer.domElement.getBoundingClientRect();
    const mouse = new THREE.Vector2(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
    );

    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(mouse, camera);

    // Separate checks for different entity types
    const enemyIntersects = raycaster.intersectObjects(enemies, true);
    const friendlyIntersects = raycaster.intersectObjects(friendlies, true);
    const quadrupedIntersects = raycaster.intersectObjects(quadrupeds, true);

    // Display tooltip based on the first intersected object
    if (enemyIntersects.length > 0) {
        const intersectedObject = enemyIntersects[0].object;
        const enemy = getEntityWithName(intersectedObject);
        entityTooltip.innerHTML = `<strong>${(enemy && enemy.userData.name) || 'Enemy'}</strong>`;
        entityTooltip.style.left = `${event.clientX + 10}px`;
        entityTooltip.style.top = `${event.clientY + 10}px`;
        entityTooltip.style.display = 'block';
    } else if (friendlyIntersects.length > 0) {
        const intersectedObject = friendlyIntersects[0].object;
        const friendly = getEntityWithName(intersectedObject);
        entityTooltip.innerHTML = `<strong>${(friendly && friendly.userData.name) || 'Friendly NPC'}</strong>`;
        entityTooltip.style.left = `${event.clientX + 10}px`;
        entityTooltip.style.top = `${event.clientY + 10}px`;
        entityTooltip.style.display = 'block';
    } else if (quadrupedIntersects.length > 0) {
        const intersectedObject = quadrupedIntersects[0].object;
        const quadruped = getEntityWithName(intersectedObject);
        entityTooltip.innerHTML = `<strong>${(quadruped && quadruped.userData.name) || 'Creature'}</strong>`;
        entityTooltip.style.left = `${event.clientX + 10}px`;
        entityTooltip.style.top = `${event.clientY + 10}px`;
        entityTooltip.style.display = 'block';
    } else {
        entityTooltip.style.display = 'none';
    }
}

// Function to handle tooltips for inventory items
function onInventoryItemHover(event) {
    const itemSlot = event.target; // The inventory slot being hovered over
    const itemName = itemSlot.getAttribute('data-name');
    const itemDescription = itemSlot.getAttribute('data-description');
    const itemStats = itemSlot.getAttribute('data-stats');
    const itemRarity = itemSlot.getAttribute('data-rarity');

    if (itemName) {
        entityTooltip.innerHTML = `
            <strong>${itemName}</strong><br>
            <em>${itemRarity || 'Common'}</em><br>
            ${itemDescription || 'No description available.'}<br>
            ${itemStats || 'No stats available.'}
        `;
        entityTooltip.style.left = `${event.clientX + 10}px`;
        entityTooltip.style.top = `${event.clientY + 10}px`;
        entityTooltip.style.display = 'block';
    } else {
        entityTooltip.style.display = 'none';
    }
}

// Add event listener for mouse move on inventory items
function setupInventoryTooltips() {
    const inventorySlots = document.querySelectorAll('.inventory-slot');
    inventorySlots.forEach(slot => {
        slot.addEventListener('mouseenter', onInventoryItemHover);
        slot.addEventListener('mousemove', onInventoryItemHover);
        slot.addEventListener('mouseleave', () => {
            entityTooltip.style.display = 'none';
        });
    });
}

// Add event listeners for mouse move in the game world
renderer.domElement.addEventListener('mousemove', onMouseMove, false);
renderer.domElement.addEventListener('mouseleave', () => {
    entityTooltip.style.display = 'none';
}, false);

// Function to Show Tooltip
function showTooltip(event) {
    const name = this.getAttribute('data-name');
    const description = this.getAttribute('data-description');
    tooltip.innerHTML = `<strong>${name}</strong><br>${description}`;
    tooltip.style.display = 'block';
}

// Function to Move Tooltip with Mouse
function moveTooltip(event) {
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;

    let x = event.clientX + 10;
    let y = event.clientY + 10;

    // Prevent tooltip from going off-screen
    if (x + tooltipWidth > pageWidth) {
        x = event.clientX - tooltipWidth - 10;
    }
    if (y + tooltipHeight > pageHeight) {
        y = event.clientY - tooltipHeight - 10;
    }

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

// Function to Hide Tooltip
function hideTooltip() {
    tooltip.style.display = 'none';
    tooltip.innerHTML = '';
}