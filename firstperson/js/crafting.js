const crafting = {
    grid: Array(4).fill(null),
    result: null,

    updateUI: function() {
        const craftingGrid = document.getElementById('crafting-grid');
        const craftingResult = document.getElementById('crafting-result');
        
        craftingGrid.innerHTML = '';
        for (let i = 0; i < 4; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            slot.setAttribute('data-slot', i);
            if (this.grid[i]) {
                slot.textContent = this.grid[i].name;
                const count = document.createElement('span');
                count.className = 'item-count';
                count.textContent = this.grid[i].count;
                slot.appendChild(count);
            }
            slot.addEventListener('click', () => this.onSlotClick(i));
            craftingGrid.appendChild(slot);
        }

        craftingResult.innerHTML = '';
        if (this.result) {
            craftingResult.textContent = this.result.name;
            const count = document.createElement('span');
            count.className = 'item-count';
            count.textContent = this.result.count;
            craftingResult.appendChild(count);
        }
    },

    onSlotClick: function(slot) {
        const selectedItem = inventory.items[inventory.selectedSlot];
        if (selectedItem) {
            if (this.grid[slot] && this.grid[slot].name === selectedItem.name) {
                this.grid[slot].count++;
            } else {
                this.grid[slot] = { name: selectedItem.name, count: 1 };
            }
            inventory.removeItem(inventory.selectedSlot);
        } else if (this.grid[slot]) {
            inventory.addItem(this.grid[slot].name);
            this.grid[slot] = null;
        }
        this.checkRecipe();
        this.updateUI();
        inventory.updateUI();
    },

    checkRecipe: function() {
        const recipes = [
            {
                ingredients: ['Stick', 'String', 'Stone', 'Stone'],
                result: { name: 'Hammer', count: 1 }
            }
        ];

        for (const recipe of recipes) {
            const flatGrid = this.grid.filter(item => item !== null).map(item => item.name);
            if (this.arraysEqual(flatGrid.sort(), recipe.ingredients.sort())) {
                this.result = recipe.result;
                return;
            }
        }
        this.result = null;
    },

    arraysEqual: function(a, b) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    },

    craft: function() {
        if (this.result) {
            inventory.addItem(this.result.name);
            this.grid = Array(4).fill(null);
            this.result = null;
            this.updateUI();
            inventory.updateUI();
            updateInHandDisplay();
        }
    }
};