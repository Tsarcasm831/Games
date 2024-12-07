class Shop {
    constructor() {
        this.gold = 10;
        this.units = [];
        this.shopContainer = document.getElementById('units-shop');
        this.goldDisplay = document.getElementById('gold-amount');
        this.refreshButton = document.getElementById('refresh-shop');
        
        this.refreshButton.addEventListener('click', () => this.refreshShop());
        this.refreshShop();
    }

    refreshShop() {
        if (this.gold < 2) return;
        
        this.gold -= 2;
        this.updateGoldDisplay();
        
        this.shopContainer.innerHTML = '';
        const availableUnits = Object.keys(unitTypes);
        
        for (let i = 0; i < 6; i++) {
            const randomUnit = availableUnits[Math.floor(Math.random() * availableUnits.length)];
            const unitData = unitTypes[randomUnit];
            
            const unitElement = document.createElement('div');
            unitElement.className = 'shop-unit';
            unitElement.innerHTML = `
                <div>${unitData.name}</div>
                <div>HP: ${unitData.health}</div>
                <div>ATK: ${unitData.attack}</div>
                <div>Cost: ${unitData.cost}</div>
            `;
            
            unitElement.addEventListener('click', () => this.buyUnit(randomUnit));
            this.shopContainer.appendChild(unitElement);
        }
    }

    buyUnit(unitType) {
        const unit = unitTypes[unitType];
        if (this.gold >= unit.cost) {
            this.gold -= unit.cost;
            this.updateGoldDisplay();
            mainScene.createUnit(unitType);
        }
    }

    updateGoldDisplay() {
        this.goldDisplay.textContent = this.gold;
    }

    addGold(amount) {
        this.gold += amount;
        this.updateGoldDisplay();
    }
}
