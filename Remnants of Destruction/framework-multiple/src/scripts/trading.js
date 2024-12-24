// trading.js

// Track trade state
let tradeWindowOpen = false;
let currentTradeNPC = null;

// Initialize trade UI elements
function initializeTradeWindow() {
    const tradeContainer = document.createElement('div');
    tradeContainer.id = 'tradeWindow';
    tradeContainer.style.display = 'none';
    tradeContainer.innerHTML = `
        <h2 id="tradeNPCName">Trade with NPC</h2>
        <div id="npcInventoryGrid" class="inventoryGrid"></div>
        <div id="playerInventoryGrid" class="inventoryGrid"></div>
        <div>
            <button id="confirmTradeButton">Confirm Trade</button>
            <button onclick="closeTradeWindow()">Cancel</button>
        </div>
    `;
    document.body.appendChild(tradeContainer);

    // Set up event listeners
    document.getElementById('confirmTradeButton').addEventListener('click', confirmTrade);
}

// Open the trade window with a specified NPC
function openTradeWindow(npc) {
    if (tradeWindowOpen) {
        closeTradeWindow();
        return;
    }
    
    currentTradeNPC = npc;
    document.getElementById('tradeNPCName').innerText = `Trade with ${npc.userData.name}`;
    
    // Populate NPC and player inventories
    populateInventoryGrid(document.getElementById('npcInventoryGrid'), npc.userData.inventory || []);
    populateInventoryGrid(document.getElementById('playerInventoryGrid'), playerInventory);
    
    document.getElementById('tradeWindow').style.display = 'block';
    tradeWindowOpen = true;
}

// Populate inventory grids
function populateInventoryGrid(gridElement, items) {
    gridElement.innerHTML = '';
    items.forEach(item => {
        const slot = document.createElement('div');
        slot.classList.add('inventory-slot');
        
        // Create item details container
        const itemDetails = document.createElement('div');
        itemDetails.classList.add('item-details');
        
        // Item name
        const itemName = document.createElement('div');
        itemName.classList.add('item-name');
        itemName.innerText = item.name;
        
        // Item type and value
        const itemInfo = document.createElement('div');
        itemInfo.classList.add('item-info');
        itemInfo.innerText = `${item.type || 'Item'} | Value: ${item.value || 'N/A'}`;
        
        // Item icon (if available)
        const itemIcon = document.createElement('img');
        itemIcon.classList.add('item-icon');
        itemIcon.src = item.icon || 'path/to/default/icon.png';
        itemIcon.alt = item.name;
        
        // Assemble item details
        itemDetails.appendChild(itemIcon);
        itemDetails.appendChild(itemName);
        itemDetails.appendChild(itemInfo);
        
        slot.appendChild(itemDetails);
        
        // Add tooltip
        slot.setAttribute('data-tooltip', item.description || 'No description available');
        
        // Selection handling
        slot.addEventListener('click', () => selectItemForTrade(item, gridElement, slot));
        
        gridElement.appendChild(slot);
    });
}

// Close trade window
function closeTradeWindow() {
    document.getElementById('tradeWindow').style.display = 'none';
    tradeWindowOpen = false;
    currentTradeNPC = null;
}

// Enhanced item selection with visual feedback
function selectItemForTrade(item, gridElement, slotElement) {
    // Remove selection from all slots in this grid
    gridElement.querySelectorAll('.inventory-slot').forEach(slot => {
        slot.classList.remove('selected-for-trade');
    });
    
    // Add selection to clicked slot
    slotElement.classList.add('selected-for-trade');
    
    // Optional: Store selected item for trade
    gridElement.dataset.selectedItem = JSON.stringify(item);
}

// Improved trade confirmation
function confirmTrade() {
    const npcGrid = document.getElementById('npcInventoryGrid');
    const playerGrid = document.getElementById('playerInventoryGrid');
    
    const selectedNPCItem = npcGrid.dataset.selectedItem ? 
        JSON.parse(npcGrid.dataset.selectedItem) : null;
    const selectedPlayerItem = playerGrid.dataset.selectedItem ? 
        JSON.parse(playerGrid.dataset.selectedItem) : null;
    
    if (!selectedNPCItem && !selectedPlayerItem) {
        alert('Please select items to trade!');
        return;
    }
    
    // Simulate trade logic
    if (selectedNPCItem) {
        // Remove item from NPC inventory
        const npcInventory = currentTradeNPC.userData.inventory;
        const itemIndex = npcInventory.findIndex(i => i.name === selectedNPCItem.name);
        if (itemIndex !== -1) {
            npcInventory.splice(itemIndex, 1);
        }
        
        // Add to player inventory
        playerInventory.push(selectedNPCItem);
    }
    
    if (selectedPlayerItem) {
        // Remove item from player inventory
        const playerItemIndex = playerInventory.findIndex(i => i.name === selectedPlayerItem.name);
        if (playerItemIndex !== -1) {
            playerInventory.splice(playerItemIndex, 1);
        }
        
        // Add to NPC inventory
        currentTradeNPC.userData.inventory.push(selectedPlayerItem);
    }
    
    // Refresh inventories
    populateInventoryGrid(document.getElementById('npcInventoryGrid'), currentTradeNPC.userData.inventory);
    populateInventoryGrid(document.getElementById('playerInventoryGrid'), playerInventory);
    
    // Provide feedback
    const tradeConfirmation = document.createElement('div');
    tradeConfirmation.classList.add('trade-confirmation');
    tradeConfirmation.innerText = 'Trade Successful!';
    document.getElementById('tradeWindow').appendChild(tradeConfirmation);
    
    // Remove confirmation after 2 seconds
    setTimeout(() => {
        tradeConfirmation.remove();
    }, 2000);
}

// Initialize the trade window UI on load
document.addEventListener('DOMContentLoaded', initializeTradeWindow);

// Event listener to open trade with NPC on interaction
document.addEventListener('keydown', (event) => {
    if (event.key.toLowerCase() === 'e' && currentTradeNPC) {  // Assuming 'E' key to open trade when near NPC
        openTradeWindow(currentTradeNPC);
    }
});
