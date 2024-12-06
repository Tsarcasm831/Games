class InventoryManager {
    constructor(game) {
        this.game = game;
        this.items = [];
    }

    init() {
        // Initialize inventory, load items, set up UI hooks if needed
    }

    addItem(item) {
        this.items.push(item);
        // Update UI if inventory is open
    }

    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    }

    // Add more inventory-related functions
}

export default InventoryManager;
