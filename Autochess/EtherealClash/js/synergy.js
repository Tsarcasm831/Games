class SynergyManager {
    constructor(scene) {
        this.scene = scene;
        this.activeUnits = new Set();
        this.synergyCounts = {
            classes: {},
            origins: {}
        };
        this.activeSynergies = {
            classes: new Set(),
            origins: new Set()
        };
    }

    addUnit(unit) {
        this.activeUnits.add(unit);
        this.updateSynergies();
    }

    removeUnit(unit) {
        this.activeUnits.delete(unit);
        this.updateSynergies();
    }

    updateSynergies() {
        // Reset counts
        this.synergyCounts = {
            classes: {},
            origins: {}
        };
        
        // Count all classes and origins
        for (const unit of this.activeUnits) {
            const unitClass = unit.type.class;
            const unitOrigin = unit.type.origin;
            
            this.synergyCounts.classes[unitClass] = (this.synergyCounts.classes[unitClass] || 0) + 1;
            this.synergyCounts.origins[unitOrigin] = (this.synergyCounts.origins[unitOrigin] || 0) + 1;
        }
        
        // Check class synergies
        this.activeSynergies.classes.clear();
        for (const [className, count] of Object.entries(this.synergyCounts.classes)) {
            const classData = classes[className];
            for (const threshold of classData.thresholds) {
                if (count >= threshold) {
                    this.activeSynergies.classes.add({
                        type: className,
                        level: threshold,
                        effect: classData.effects[classData.thresholds.indexOf(threshold)]
                    });
                }
            }
        }
        
        // Check origin synergies
        this.activeSynergies.origins.clear();
        for (const [originName, count] of Object.entries(this.synergyCounts.origins)) {
            const originData = origins[originName];
            for (const threshold of originData.thresholds) {
                if (count >= threshold) {
                    this.activeSynergies.origins.add({
                        type: originName,
                        level: threshold,
                        effect: originData.effects[originData.thresholds.indexOf(threshold)]
                    });
                }
            }
        }
        
        this.updateSynergyDisplay();
    }

    updateSynergyDisplay() {
        const synergyContainer = document.getElementById('synergy-container');
        if (!synergyContainer) return;
        
        synergyContainer.innerHTML = '';
        
        // Display class synergies
        for (const synergy of this.activeSynergies.classes) {
            const synergyElement = document.createElement('div');
            synergyElement.className = 'synergy-item';
            synergyElement.innerHTML = `
                <div class="synergy-header">
                    <span class="synergy-icon">${this.getSynergyIcon(synergy.type)}</span>
                    <span class="synergy-name">${classes[synergy.type].name}</span>
                    <span class="synergy-count">${this.synergyCounts.classes[synergy.type]}</span>
                </div>
                <div class="synergy-effect">${synergy.effect}</div>
            `;
            synergyContainer.appendChild(synergyElement);
        }
        
        // Display origin synergies
        for (const synergy of this.activeSynergies.origins) {
            const synergyElement = document.createElement('div');
            synergyElement.className = 'synergy-item';
            synergyElement.innerHTML = `
                <div class="synergy-header">
                    <span class="synergy-icon">${this.getSynergyIcon(synergy.type)}</span>
                    <span class="synergy-name">${origins[synergy.type].name}</span>
                    <span class="synergy-count">${this.synergyCounts.origins[synergy.type]}</span>
                </div>
                <div class="synergy-effect">${synergy.effect}</div>
            `;
            synergyContainer.appendChild(synergyElement);
        }
    }

    getSynergyIcon(type) {
        switch(type) {
            // Classes
            case 'warrior': return '⚔️';
            case 'mage': return '🔮';
            case 'assassin': return '🗡️';
            // Origins
            case 'frostborn': return '❄️';
            case 'infernal': return '🔥';
            case 'celestial': return '✨';
            default: return '❓';
        }
    }

    hasSynergy(type) {
        return [...this.activeSynergies.classes, ...this.activeSynergies.origins]
            .some(synergy => synergy.type === type);
    }

    getSynergyLevel(type) {
        const synergy = [...this.activeSynergies.classes, ...this.activeSynergies.origins]
            .find(synergy => synergy.type === type);
        return synergy ? synergy.level : 0;
    }
}
