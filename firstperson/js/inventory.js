const inventory = {
    items: Array(36).fill(null),
    selectedSlot: 0,

    addItem: function(item) {
        const existingSlot = this.items.findIndex(slot => slot && slot.name === item && slot.count < 10);
        if (existingSlot !== -1) {
            this.items[existingSlot].count++;
        } else {
            const emptySlot = this.items.findIndex(slot => slot === null);
            if (emptySlot !== -1) {
                this.items[emptySlot] = { name: item, count: 1 };
            } else {
                return false;
            }
        }
        this.updateUI();
        updateInHandDisplay();
        return true;
    },

    removeItem: function(slot) {
        if (this.items[slot] !== null) {
            const item = this.items[slot].name;
            this.items[slot].count--;
            if (this.items[slot].count === 0) {
                this.items[slot] = null;
            }
            this.updateUI();
            updateInHandDisplay();
            return item;
        }
        return null;
    },

    updateUI: function() {
        const hotbar = document.getElementById('hotbar');
        const inventoryGrid = document.getElementById('inventory-grid');
        
        hotbar.innerHTML = '';
        inventoryGrid.innerHTML = '';

        for (let i = 0; i < 36; i++) {
            const slot = document.createElement('div');
            slot.className = 'inventory-slot';
            slot.setAttribute('data-slot', i);
            if (this.items[i]) {
                slot.textContent = this.items[i].name;
                const count = document.createElement('span');
                count.className = 'item-count';
                count.textContent = this.items[i].count;
                slot.appendChild(count);
            }
            slot.addEventListener('click', () => this.selectSlot(i));
            if (i === this.selectedSlot) slot.classList.add('selected');
            
            slot.draggable = true;
            slot.addEventListener('dragstart', this.dragStart.bind(this));
            slot.addEventListener('dragover', this.dragOver);
            slot.addEventListener('drop', this.drop.bind(this));

            if (i < 9) {
                hotbar.appendChild(slot);
            } else {
                inventoryGrid.appendChild(slot);
            }
        }
    },

    selectSlot: function(slot) {
        this.selectedSlot = slot;
        this.updateUI();
        updateInHandDisplay();
    },

    toggleInventoryAndCrafting: function() {
        const inventoryGrid = document.getElementById('inventory-grid');
        const craftingMenu = document.getElementById('crafting-menu');
        if (inventoryGrid.style.display === 'none') {
            inventoryGrid.style.display = 'grid';
            craftingMenu.style.display = 'flex';
            isPaused = true;
            document.exitPointerLock();
        } else {
            inventoryGrid.style.display = 'none';
            craftingMenu.style.display = 'none';
            isPaused = false;
            renderer.domElement.requestPointerLock();
        }
    },

    dragStart: function(e) {
        e.dataTransfer.setData('text/plain', e.target.getAttribute('data-slot'));
    },

    dragOver: function(e) {
        e.preventDefault();
    },

    drop: function(e) {
        e.preventDefault();
        const fromSlot = parseInt(e.dataTransfer.getData('text'));
        const toSlot = parseInt(e.target.getAttribute('data-slot'));
        
        if (fromSlot !== toSlot) {
            const temp = this.items[fromSlot];
            this.items[fromSlot] = this.items[toSlot];
            this.items[toSlot] = temp;
            this.updateUI();
            updateInHandDisplay();
        }
    },
    
    createItemMesh: function(item) {
        let geometry, material;
        switch (item) {
            case 'Stick':
                geometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
                material = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
                return new THREE.Mesh(geometry, material);
            case 'Cactus Spine':
                geometry = new THREE.ConeGeometry(0.05, 0.5, 8);
                material = new THREE.MeshPhongMaterial({ color: 0x2F4F4F });
                return new THREE.Mesh(geometry, material);
            case 'Stone':
                geometry = new THREE.DodecahedronGeometry(0.2, 0);
                material = new THREE.MeshPhongMaterial({ color: 0x808080 });
                return new THREE.Mesh(geometry, material);
            case 'Apple':
                geometry = new THREE.SphereGeometry(0.2, 16, 16);
                material = new THREE.MeshPhongMaterial({ color: 0xFF0000 });
                const apple = new THREE.Mesh(geometry, material);
                const stem = new THREE.Mesh(
                    new THREE.CylinderGeometry(0.02, 0.02, 0.1, 8),
                    new THREE.MeshPhongMaterial({ color: 0x8B4513 })
                );
                stem.position.y = 0.2;
                apple.add(stem);
                return apple;
            case 'String':
                geometry = new THREE.CylinderGeometry(0.02, 0.02, 1, 8);
                material = new THREE.MeshPhongMaterial({ color: 0xEEEEEE });
                return new THREE.Mesh(geometry, material);
            case 'Hammer':
                const hammerGroup = new THREE.Group();
                const handleGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8);
                const handleMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
                const handle = new THREE.Mesh(handleGeometry, handleMaterial);
                handle.rotation.z = Math.PI / 2;
                hammerGroup.add(handle);
                const headGeometry = new THREE.BoxGeometry(0.3, 0.2, 0.15);
                const headMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
                const head = new THREE.Mesh(headGeometry, headMaterial);
                head.position.x = 0.5;
                hammerGroup.add(head);
                return hammerGroup;
            case 'Coconut':
                geometry = new THREE.SphereGeometry(0.2, 16, 16);
                material = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
                return new THREE.Mesh(geometry, material);
            case 'Wooden Wall':
                geometry = new THREE.BoxGeometry(5, 3, 0.5);
                material = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
                return new THREE.Mesh(geometry, material);
            case 'Wooden Floor':
                geometry = new THREE.PlaneGeometry(5, 5);
                material = new THREE.MeshPhongMaterial({ color: 0xDEB887, side: THREE.DoubleSide });
                return new THREE.Mesh(geometry, material);
            case 'Wooden Door':
                const doorGroup = new THREE.Group();
                const doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
                const doorMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
                const door = new THREE.Mesh(doorGeometry, doorMaterial);
                door.position.y = 1;
                doorGroup.add(door);
                return doorGroup;
            case 'Stone Wall':
                geometry = new THREE.BoxGeometry(5, 3, 0.5);
                material = new THREE.MeshPhongMaterial({ color: 0x808080 });
                return new THREE.Mesh(geometry, material);
            case 'Stone Floor':
                geometry = new THREE.PlaneGeometry(5, 5);
                material = new THREE.MeshPhongMaterial({ color: 0xA9A9A9, side: THREE.DoubleSide });
                return new THREE.Mesh(geometry, material);
            default:
                geometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
                material = new THREE.MeshPhongMaterial({ color: 0xffffff });
                return new THREE.Mesh(geometry, material);
        }
    }
};