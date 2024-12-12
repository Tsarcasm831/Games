class Shop {
    constructor() {
        this.gold = 10;
        this.units = [];
        this.shopContainer = document.getElementById('units-shop');
        this.goldDisplay = document.getElementById('gold-amount');
        this.refreshButton = document.getElementById('refresh-shop');
        this.championDetailsPopup = this.createChampionDetailsPopup();
        
        this.refreshButton.addEventListener('click', () => this.refreshShop());
        this.refreshShop();
    }

    createChampionDetailsPopup() {
        const popup = document.createElement('div');
        popup.id = 'champion-details-popup';
        popup.className = 'champion-details-popup hidden';
        popup.innerHTML = `
            <div class="popup-content">
                <span class="close-popup">&times;</span>
                <div id="champion-name"></div>
                
                <div class="popup-tabs">
                    <button class="tab-btn active" data-tab="stats">Stats</button>
                    <button class="tab-btn" data-tab="abilities">Abilities</button>
                    <button class="tab-btn" data-tab="details">Details</button>
                </div>
                
                <div class="popup-tab-content">
                    <div id="stats-tab" class="tab-content active">
                        <div id="champion-stats"></div>
                    </div>
                    <div id="abilities-tab" class="tab-content">
                        <div id="champion-abilities"></div>
                    </div>
                    <div id="details-tab" class="tab-content">
                        <div id="champion-class-origins"></div>
                    </div>
                </div>
                
                <div class="popup-buttons">
                    <button id="buy-champion-btn">Buy Champion</button>
                    <button id="close-champion-btn">Close</button>
                </div>
            </div>
        `;

        const closeBtn = popup.querySelector('.close-popup');
        const closeWindowBtn = popup.querySelector('#close-champion-btn');
        const tabButtons = popup.querySelectorAll('.tab-btn');
        
        closeBtn.addEventListener('click', () => this.hideChampionDetailsPopup());
        closeWindowBtn.addEventListener('click', () => this.hideChampionDetailsPopup());

        // Add tab switching functionality
        tabButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and tabs
                tabButtons.forEach(btn => btn.classList.remove('active'));
                popup.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
                
                // Add active class to clicked button and corresponding tab
                button.classList.add('active');
                const tabId = button.getAttribute('data-tab');
                popup.querySelector(`#${tabId}-tab`).classList.add('active');
            });
        });

        document.body.appendChild(popup);
        return popup;
    }

    showChampionDetailsPopup(unitType) {
        const unit = unitTypes[unitType];
        
        const nameElement = this.championDetailsPopup.querySelector('#champion-name');
        const statsElement = this.championDetailsPopup.querySelector('#champion-stats');
        const abilitiesElement = this.championDetailsPopup.querySelector('#champion-abilities');
        const classOriginsElement = this.championDetailsPopup.querySelector('#champion-class-origins');
        const buyButton = this.championDetailsPopup.querySelector('#buy-champion-btn');
        const popupContent = this.championDetailsPopup.querySelector('.popup-content');

        // Reset any previous active states
        this.championDetailsPopup.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        this.championDetailsPopup.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        
        // Activate first tab by default
        this.championDetailsPopup.querySelector('.tab-btn[data-tab="stats"]').classList.add('active');
        this.championDetailsPopup.querySelector('#stats-tab').classList.add('active');

        nameElement.textContent = unit.name;
        
        // Detailed stats
        statsElement.innerHTML = `
            <h3>Champion Stats</h3>
            <div class="stat-group">
                <div class="stat-item">
                    <span>Health</span>
                    <span>${unit.stats.health} ❤️</span>
                </div>
                <div class="stat-item">
                    <span>Attack Damage</span>
                    <span>${unit.stats.attackDamage} 🗡️</span>
                </div>
                <div class="stat-item">
                    <span>Attack Speed</span>
                    <span>${unit.stats.attackSpeed} ⚡</span>
                </div>
                <div class="stat-item">
                    <span>Armor</span>
                    <span>${unit.stats.armor} 🛡️</span>
                </div>
                <div class="stat-item">
                    <span>Magic Resist</span>
                    <span>${unit.stats.magicResist} ✨</span>
                </div>
                <div class="stat-item">
                    <span>Ability Power</span>
                    <span>${unit.stats.abilityPower} 🔮</span>
                </div>
                <div class="stat-item">
                    <span>Mana</span>
                    <span>${unit.stats.mana} 💧</span>
                </div>
            </div>
        `;
        
        // Abilities
        abilitiesElement.innerHTML = `
            <h3>Ability</h3>
            <div class="ability-card">
                <div class="ability-header">
                    <strong>${unit.ability.name}</strong>
                </div>
                <div class="ability-details">
                    <div class="ability-detail">
                        <span class="label">Type:</span>
                        <span class="value">${unit.ability.type}</span>
                    </div>
                    <div class="ability-detail">
                        <span class="label">Effect:</span>
                        <span class="value">${unit.ability.effect}</span>
                    </div>
                    <div class="ability-detail">
                        <span class="label">Damage:</span>
                        <span class="value">${unit.ability.damage}</span>
                    </div>
                    <div class="ability-detail">
                        <span class="label">Cooldown:</span>
                        <span class="value">${unit.ability.cooldown}s</span>
                    </div>
                    <div class="ability-detail">
                        <span class="label">Duration:</span>
                        <span class="value">${unit.ability.duration}s</span>
                    </div>
                </div>
            </div>
        `;
        
        // Species and Rarity
        classOriginsElement.innerHTML = `
            <h3>Species Information</h3>
            <div class="species-card">
                <div class="species-detail">
                    <span class="label">Species:</span>
                    <span class="value">${unit.species}</span>
                </div>
                <div class="species-detail">
                    <span class="label">Rarity:</span>
                    <span class="value">${unit.rarity.toUpperCase()}</span>
                </div>
                <div class="species-detail">
                    <span class="label">Cost:</span>
                    <span class="value">${unit.cost} 💰</span>
                </div>
            </div>
        `;

        // Reset previous buy button listener and add new one
        buyButton.onclick = () => this.buyUnit(unitType);

        // Show popup with animation
        this.championDetailsPopup.classList.remove('hidden');
        
        // Use setTimeout to ensure the element is in the DOM before adding the show class
        setTimeout(() => {
            popupContent.classList.add('show');
        }, 10);
    }

    hideChampionDetailsPopup() {
        const popupContent = this.championDetailsPopup.querySelector('.popup-content');
        
        // Remove show class first for animation
        popupContent.classList.remove('show');
        
        // Wait for animation to complete before hiding
        setTimeout(() => {
            this.championDetailsPopup.classList.add('hidden');
        }, 300);
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
                <div>HP: ${unitData.stats.health}</div>
                <div>ATK: ${unitData.stats.attackDamage}</div>
                <div>Cost: ${unitData.cost}</div>
            `;
            
            unitElement.addEventListener('click', () => this.showChampionDetailsPopup(randomUnit));
            this.shopContainer.appendChild(unitElement);
        }
    }

    buyUnit(unitType) {
        const unit = unitTypes[unitType];
        if (this.gold >= unit.cost) {
            this.gold -= unit.cost;
            this.updateGoldDisplay();
            mainScene.createUnit(unitType);
            this.hideChampionDetailsPopup(); // Close the popup after buying
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
