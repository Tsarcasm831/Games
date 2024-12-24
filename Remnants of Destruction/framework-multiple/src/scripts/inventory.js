// Inventory State
let inventoryLoaded = false;
let playerInventory = [];

// Initialize Inventory
function initializeInventory() {
    setupInventory();
    setupEventListeners();
    updateInventoryDisplay();
    renderComponents();
}

// Function to dynamically populate inventory slots
function populateInventoryGrid(gridElement, items) {
    gridElement.innerHTML = ''; // Clear previous slots

    const totalSlots = 50; // Define a fixed grid size
    items.forEach((item, index) => {
        if (index >= totalSlots) return; // Prevent overflow

        const slot = document.createElement('div');
        slot.classList.add('inventory-slot');

        // Add item attributes
        slot.setAttribute('data-name', item.name || 'Unknown Item');
        slot.setAttribute('data-description', item.description || 'No description available.');
        slot.setAttribute('data-rarity', item.rarity || 'Common');

        // Add item icon
        if (item.icon) {
            const icon = document.createElement('img');
            icon.src = item.icon;
            icon.alt = item.name || 'Item';
            icon.style.width = '100%';
            icon.style.height = '100%';
            icon.style.objectFit = 'contain';
            slot.appendChild(icon);
        }

        // Add hover effect for tooltip
        slot.addEventListener('mouseenter', onSlotHover);
        slot.addEventListener('mouseleave', hideTooltip);

        gridElement.appendChild(slot);
    });

    // Fill remaining slots with empty placeholders
    for (let i = items.length; i < totalSlots; i++) {
        const emptySlot = document.createElement('div');
        emptySlot.classList.add('inventory-slot', 'empty-slot');
        gridElement.appendChild(emptySlot);
    }
}

// Function to update inventory display
function updateInventoryDisplay() {
    const gridElement = document.querySelector('.inventory-grid');
    populateInventoryGrid(gridElement, playerInventory);
}

// Tooltip handling
function onSlotHover(event) {
    const slot = event.target;
    const tooltip = document.getElementById('tooltip') || createTooltip();

    const name = slot.getAttribute('data-name');
    const description = slot.getAttribute('data-description');
    const rarity = slot.getAttribute('data-rarity');

    tooltip.innerHTML = `
        <div style="color: ${getRarityColor(rarity)}; font-weight: bold;">${name}</div>
        <div style="color: #aaa; font-size: 12px; margin-bottom: 5px;">${rarity}</div>
        <div>${description}</div>
    `;

    positionTooltip(event, tooltip);
    tooltip.style.display = 'block';
}

function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    if (tooltip) tooltip.style.display = 'none';
}

// Helper function to create a tooltip if it doesn't exist
function createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.id = 'tooltip';
    tooltip.classList.add('tooltip');
    document.body.appendChild(tooltip);
    return tooltip;
}

// Position tooltip near cursor
function positionTooltip(event, tooltip) {
    const tooltipWidth = tooltip.offsetWidth;
    const tooltipHeight = tooltip.offsetHeight;
    const pageWidth = window.innerWidth;
    const pageHeight = window.innerHeight;

    let x = event.pageX + 15;
    let y = event.pageY + 15;

    if (x + tooltipWidth > pageWidth) x = event.pageX - tooltipWidth - 15;
    if (y + tooltipHeight > pageHeight) y = event.pageY - tooltipHeight - 15;

    tooltip.style.left = `${x}px`;
    tooltip.style.top = `${y}px`;
}

// Helper to get rarity color
function getRarityColor(rarity) {
    const colors = {
        'Common': '#ffffff',
        'Uncommon': '#1eff00',
        'Rare': '#0070dd',
        'Epic': '#a335ee',
        'Legendary': '#ff8000',
    };
    return colors[rarity] || '#ffffff';
}

// Setup inventory grid and tabs
function setupInventory() {
    const inventoryElement = document.getElementById('inventory');
    if (!inventoryElement) {
        console.error('Inventory element not found.');
        return;
    }

    // Initialize empty slots
    const gridElement = document.querySelector('.inventory-grid');
    if (gridElement) populateInventoryGrid(gridElement, []);
}

// Add global event listeners
function setupEventListeners() {
    document.addEventListener('keydown', (event) => {
        if (event.key === 'i' || event.key === 'I') toggleInventoryDisplay();
    });

    const closeButton = document.querySelector('.close-button');
    if (closeButton) closeButton.addEventListener('click', closeInventory);
}

// Add items to inventory
function addItemToInventory(item) {
    playerInventory.push(item);
    updateInventoryDisplay();
}

function addItemsToInventory(items) {
    playerInventory.push(...items);
    updateInventoryDisplay();
}

// Open/Close Inventory
function toggleInventoryDisplay() {
    const inventoryElement = document.getElementById('inventory');
    if (inventoryElement.style.display === 'none' || !inventoryElement.style.display) {
        inventoryElement.style.display = 'block';
    } else {
        inventoryElement.style.display = 'none';
    }
}

function closeInventory() {
    const inventoryElement = document.getElementById('inventory');
    inventoryElement.style.display = 'none';
}

import EquipmentSlots from './components/EquipmentSlots';
import PotionRow from './components/PotionRow';
import ItemGrid from './components/ItemGrid';

// Render components within the inventory
function renderComponents() {
    const inventoryContainer = document.getElementById('inventory-container');
    if (inventoryContainer) {
        inventoryContainer.innerHTML = `
            <div class="inventory-header">
                <h2>Inventory</h2>
            </div>
            <div class="inventory-content">
                ${EquipmentSlots()}
                ${PotionRow()}
                ${ItemGrid()}
            </div>
        `;
    }
}

// Initialize inventory on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeInventory);

// Example: Adding test items
document.addEventListener('DOMContentLoaded', () => {
    addItemsToInventory([
        { name: 'Sword of Valor', description: 'A legendary sword.', rarity: 'Legendary', icon: 'path/to/sword-icon.png' },
        { name: 'Helmet of Wisdom', description: 'A rare helmet.', rarity: 'Rare', icon: 'path/to/helmet-icon.png' },
        { name: 'Healing Potion', description: 'Restores health.', rarity: 'Common', icon: 'path/to/potion-icon.png' },
    ]);
});
