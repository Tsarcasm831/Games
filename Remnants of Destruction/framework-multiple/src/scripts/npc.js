// npc.js
function openNpcPopup(npc) {
    if (npcPopupOpen) {
        closeNpcPopup();
        return;
    }
    document.getElementById('npcPopup').querySelector('h2').innerText = npc.userData.name || 'Friendly NPC';
    document.getElementById('npcPopup').querySelector('p').innerText = npc.userData.dialogue || 'Hello, traveler! Stay awhile and listen...';
    document.getElementById('npcPopup').style.display = 'block';
    
    // Assign Trade Button to open trade interface
    document.getElementById('tradeButton').onclick = () => openTradeInterface(npc.userData.inventory || generateRandomItems(10), npc.userData.gold || Math.floor(Math.random() * 500 + 100));
    
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

    // Check if each part exists before accessing its color
    if (npc.head && npc.head.material && npc.head.material.color) {
        document.getElementById('npcHeadColorInput').value = '#' + npc.head.material.color.getHexString();
    }
    if (npc.body && npc.body.material && npc.body.material.color) {
        document.getElementById('npcBodyColorInput').value = '#' + npc.body.material.color.getHexString();
    }
    if (npc.leftArm && npc.leftArm.material && npc.leftArm.material.color) {
        document.getElementById('npcArmColorInput').value = '#' + npc.leftArm.material.color.getHexString();
    }
    if (npc.leftLeg && npc.leftLeg.material && npc.leftLeg.material.color) {
        document.getElementById('npcLegColorInput').value = '#' + npc.leftLeg.material.color.getHexString();
    }

    document.getElementById('npcAdminPopup').style.display = 'block';
}


function closeNpcAdminPopup() {
    document.getElementById('npcAdminPopup').style.display = 'none';
    currentNpc = null;
}

function createFriendlyNPC(color = 0x00ff00, name = 'Friendly NPC', dialogue = 'Hello!') {
    const npc = createHumanoid(color);
    npc.userData.type = 'friendly';
    npc.userData.name = name;
    npc.userData.dialogue = dialogue;
    return npc;
}

function saveNpcChanges() {
	if (currentNpc) {
		currentNpc.userData.name = document.getElementById('npcNameInput').value;
		currentNpc.userData.health = parseInt(document.getElementById('npcHealthInput').value) || 100;
		currentNpc.userData.dialogue = document.getElementById('npcDialogueInput').value;

		// Update colors
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

function openTradeInterface(npcInventory, npcGold) {
    const tradeWindow = document.getElementById('tradeWindow');
    tradeWindow.style.display = 'block';
    tradeWindow.style.visibility = 'visible'; // Ensure full visibility
    tradeWindow.style.opacity = '1'; // Make fully opaque
    tradeWindow.style.maxWidth = '90%';
    tradeWindow.style.margin = '0 auto';
    tradeWindow.style.overflow = 'auto';

    // Create a close button for the trade window
    const closeButton = document.createElement('button');
    closeButton.innerText = 'Close';
    closeButton.onclick = handleCloseButton; // Wire up the close button
    tradeWindow.appendChild(closeButton);

    // Create trade grid sections with more detailed layout
    const tradeContainer = document.createElement('div');
    tradeContainer.className = 'trade-container';
    tradeContainer.style.maxWidth = '100%';
    tradeContainer.style.boxSizing = 'border-box';
    tradeContainer.innerHTML = `
        <div class="trade-section npc-trade-section">
            <h3>NPC Inventory</h3>
            <div id="npcInventoryGrid" class="inventory-grid"></div>
            <div class="npc-gold">Gold: ${npcGold}</div>
        </div>
        <div class="trade-section trade-slots">
            <div class="trade-grid">
                <div id="sellSlot" class="trade-slot sell-slot">
                    <span>Sell Items Here</span>
                </div>
                <div id="buySlot" class="trade-slot buy-slot">
                    <span>Buy Items Here</span>
                </div>
            </div>
            <button id="confirmTradeButton" class="trade-confirm-button">Confirm Trade</button>
            <button id="cancelTradeButton" class="trade-cancel-button">Cancel Trade</button>
        </div>
        <div class="trade-section player-trade-section">
            <h3>Your Inventory</h3>
            <div id="playerInventoryGrid" class="inventory-grid"></div>
            <div class="player-gold">Your Gold: ${playerGold}</div>
        </div>
    `;

    // Clear existing content and add new trade container
    tradeWindow.innerHTML = '';
    tradeWindow.appendChild(closeButton);
    tradeWindow.appendChild(tradeContainer);

    // Populate inventories
    populateInventoryGrid(document.getElementById('npcInventoryGrid'), npcInventory, 'npc');
    populateInventoryGrid(document.getElementById('playerInventoryGrid'), playerInventory, 'player');

    // Setup drag and drop functionality
    setupDragAndDropTrade();

    // Confirm trade button logic
    document.getElementById('confirmTradeButton').addEventListener('click', confirmTrade);
    
    // Cancel trade button logic
    document.getElementById('cancelTradeButton').addEventListener('click', closeTradeInterface);
}

function populateInventoryGrid(gridElement, items, owner) {
    gridElement.innerHTML = ''; // Clear existing grid
    items.forEach((item, index) => {
        const itemSlot = document.createElement('div');
        itemSlot.className = 'inventory-slot';
        itemSlot.draggable = true;
        itemSlot.dataset.itemIndex = index;
        itemSlot.dataset.owner = owner;

        const itemIcon = document.createElement('img');
        itemIcon.src = item.icon || 'default-item-icon.png';
        itemIcon.alt = item.name;
        
        const itemTooltip = document.createElement('div');
        itemTooltip.className = 'item-tooltip';
        itemTooltip.innerHTML = `
            <strong>${item.name}</strong>
            <p>${item.description || 'No description'}</p>
            <p>Value: ${item.value} gold</p>
        `;

        itemSlot.appendChild(itemIcon);
        itemSlot.appendChild(itemTooltip);
        gridElement.appendChild(itemSlot);
    });
}

function setupDragAndDropTrade() {
    const sellSlot = document.getElementById('sellSlot');
    const buySlot = document.getElementById('buySlot');
    const inventorySlots = document.querySelectorAll('.inventory-slot');

    inventorySlots.forEach(slot => {
        slot.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', JSON.stringify({
                index: e.target.dataset.itemIndex,
                owner: e.target.dataset.owner
            }));
        });
    });

    [sellSlot, buySlot].forEach(slot => {
        slot.addEventListener('dragover', (e) => {
            e.preventDefault(); // Allow dropping
        });

        slot.addEventListener('drop', (e) => {
            e.preventDefault();
            const droppedItemData = JSON.parse(e.dataTransfer.getData('text/plain'));
            const sourceOwner = droppedItemData.owner;
            const itemIndex = droppedItemData.index;

            // Logic for moving items between inventories
            if (sourceOwner === 'player' && slot === sellSlot) {
                // Move item from player inventory to sell slot
                const item = playerInventory.splice(itemIndex, 1)[0];
                updateInventoryGrids();
            } else if (sourceOwner === 'npc' && slot === buySlot) {
                // Move item from NPC inventory to buy slot
                const item = npcInventory.splice(itemIndex, 1)[0];
                updateInventoryGrids();
            }
        });
    });
}

function updateInventoryGrids() {
    const npcInventoryGrid = document.getElementById('npcInventoryGrid');
    const playerInventoryGrid = document.getElementById('playerInventoryGrid');
    
    // Repopulate NPC inventory grid
    populateInventoryGrid(npcInventoryGrid, npcInventory, 'npc');
    
    // Repopulate player inventory grid
    populateInventoryGrid(playerInventoryGrid, playerInventory, 'player');
    
    // Reattach drag and drop functionality
    setupDragAndDropTrade();
}

function confirmTrade() {
    const sellSlot = document.getElementById('sellSlot');
    const buySlot = document.getElementById('buySlot');

    // Collect items in sell and buy slots
    const sellItems = sellSlot.querySelectorAll('.inventory-slot');
    const buyItems = buySlot.querySelectorAll('.inventory-slot');

    let playerSellValue = 0;
    let playerBuyValue = 0;

    // Calculate sell value (items player wants to sell)
    sellItems.forEach(item => {
        const itemIndex = item.dataset.itemIndex;
        const itemToSell = playerInventory[itemIndex];
        if (itemToSell) {
            playerSellValue += itemToSell.value;
        }
    });

    // Calculate buy value (items player wants to buy)
    buyItems.forEach(item => {
        const itemIndex = item.dataset.itemIndex;
        const itemToBuy = npcInventory[itemIndex];
        if (itemToBuy) {
            playerBuyValue += itemToBuy.value;
        }
    });

    // Check if player has enough gold to buy items
    if (playerGold >= playerBuyValue) {
        // Perform trade
        sellItems.forEach(item => {
            const itemIndex = item.dataset.itemIndex;
            const itemToSell = playerInventory.splice(itemIndex, 1)[0];
            npcInventory.push(itemToSell);
            playerGold += itemToSell.value;
        });

        buyItems.forEach(item => {
            const itemIndex = item.dataset.itemIndex;
            const itemToBuy = npcInventory.splice(itemIndex, 1)[0];
            playerInventory.push(itemToBuy);
            playerGold -= itemToBuy.value;
        });

        // Update gold display
        document.querySelector('.player-gold').textContent = `Your Gold: ${playerGold}`;
        document.querySelector('.npc-gold').textContent = `Gold: ${npcGold}`;

        // Update inventory grids
        updateInventoryGrids();

        alert('Trade successful!');
    } else {
        alert('Not enough gold to complete the trade!');
    }
}

function closeTradeInterface() {
    const tradeWindow = document.getElementById('tradeWindow');
    tradeWindow.style.display = 'none';
    tradeWindow.innerHTML = ''; // Clear trade window contents
}

// Function to handle close button functionality
function handleCloseButton() {
    closeAllMenus(); // Call to close all menus
    closeTradeInterface(); // Close the trade window if it's open
}

// Setup trade event listeners for slots
function setupTradeSlotEventListeners(playerGrid, playerItems, npcItems, npcGrid) {
    // Player's inventory click events
    setupInventorySlotEventListeners(playerGrid, playerItems, npcItems, npcGrid);

    // NPC's inventory click events
    setupInventorySlotEventListeners(npcGrid, npcItems, playerItems, playerGrid);
}

// Open trade interface when clicking the "Trade" button in NPC popup
document.getElementById('tradeButton').addEventListener('click', () => {
    if (currentTradeNPC) {
        openTradeInterface(currentTradeNPC.userData.inventory);
    } else {
        console.error('No NPC selected for trading.');
    }
});
