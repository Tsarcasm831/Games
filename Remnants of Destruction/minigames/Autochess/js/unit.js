class Unit extends Phaser.GameObjects.Container {
    constructor(scene, type) {
        super(scene, 0, 0);
        this.type = unitTypes[type];
        this.stats = { ...this.type.stats };
        this.ability = { ...this.type.ability };
        this.currentHealth = this.stats.health;
        this.abilityReady = true;
        this.abilityCooldown = 0;
        this.statusEffects = new Set();
        
        this.createSprite();
        this.createHealthBar();
        this.createManaBar();
        scene.add.existing(this);
        
        this.setSize(gameConfig.hexSize * 0.8, gameConfig.hexSize * 0.8);
        this.setInteractive();
        scene.input.setDraggable(this);
    }

    createSprite() {
        // Create unit body
        const circle = this.scene.add.circle(0, 0, gameConfig.hexSize * 0.4, this.getUnitColor());
        this.add(circle);
        
        // Add species icon
        const speciesIcon = this.scene.add.text(0, 0, this.getSpeciesEmoji(), {
            fontSize: '32px'
        }).setOrigin(0.5);
        this.add(speciesIcon);
    }

    createHealthBar() {
        const width = gameConfig.hexSize * 0.8;
        const height = 6;
        
        const background = this.scene.add.rectangle(0, gameConfig.hexSize * 0.3, width, height, 0x000000);
        const healthBar = this.scene.add.rectangle(0, gameConfig.hexSize * 0.3, width, height, 0x00ff00);
        
        background.setOrigin(0.5);
        healthBar.setOrigin(0.5);
        
        this.add(background);
        this.add(healthBar);
        this.healthBar = healthBar;
    }

    createManaBar() {
        const width = gameConfig.hexSize * 0.8;
        const height = 4;
        
        const background = this.scene.add.rectangle(0, gameConfig.hexSize * 0.35, width, height, 0x000000);
        const manaBar = this.scene.add.rectangle(0, gameConfig.hexSize * 0.35, width, height, 0x0088ff);
        
        background.setOrigin(0.5);
        manaBar.setOrigin(0.5);
        manaBar.width = 0;
        
        this.add(background);
        this.add(manaBar);
        this.manaBar = manaBar;
    }

    getUnitColor() {
        switch(this.type.rarity) {
            case 'common': return 0x808080;
            case 'rare': return 0x0088ff;
            case 'epic': return 0xff00ff;
            default: return 0xffffff;
        }
    }

    getSpeciesEmoji() {
        switch(this.type.species) {
            case 'Anthromorph': return '🧑';
            case 'Avianos': return '🦅';
            case 'Chiropteran': return '🦇';
            case 'Dengar Charger': return '🐎';
            case 'Prometheus AI': return '🤖';
            case 'Talorian': return '🌐';
            case 'T\'ana\'Rhe': return '🌈';
            case 'Xithrian': return '👥';
            default: return '❓';
        }
    }

    update(time, delta) {
        this.updateCooldowns(delta);
        this.updateStatusEffects(delta);
        
        if (this.target && this.canAttack()) {
            this.attack(this.target);
        }
        
        if (this.abilityReady && this.target) {
            this.useAbility(this.target);
        }
    }

    updateCooldowns(delta) {
        if (this.abilityCooldown > 0) {
            this.abilityCooldown -= delta / 1000;
            if (this.abilityCooldown <= 0) {
                this.abilityReady = true;
            }
        }
    }

    updateStatusEffects(delta) {
        for (const effect of this.statusEffects) {
            effect.duration -= delta / 1000;
            if (effect.duration <= 0) {
                this.removeStatusEffect(effect);
            }
        }
    }

    attack(target) {
        const damage = this.calculateDamage();
        target.takeDamage(damage, 'physical');
        this.gainMana(10);
    }

    useAbility(target) {
        const ability = this.type.ability;
        let damage = ability.damage;
        
        // Apply spell power bonus if mage
        if (this.type.class === 'mage' && this.hasSynergy('mage')) {
            damage *= 1.25;
        }
        
        target.takeDamage(damage, ability.type);
        
        // Apply ability effects
        switch(ability.effect) {
            case 'freeze':
                target.addStatusEffect('frozen', ability.duration);
                break;
            case 'burn':
                target.addStatusEffect('burning', ability.duration);
                break;
            case 'teleport':
                this.teleportBehind(target);
                break;
        }
        
        this.abilityReady = false;
        this.abilityCooldown = ability.cooldown;
        this.manaBar.width = 0;
    }

    takeDamage(amount, type) {
        if (this.statusEffects.has('frozen')) return;
        
        const defense = type === 'physical' ? this.stats.armor : this.stats.magicResist;
        const damageReduction = 100 / (100 + defense);
        const finalDamage = amount * damageReduction;
        
        this.currentHealth -= finalDamage;
        this.updateHealthBar();
        
        // Show damage number
        this.showDamageNumber(finalDamage, type);
        
        if (this.currentHealth <= 0) {
            this.die();
            return true;
        }
        return false;
    }

    showDamageNumber(amount, type) {
        const color = type === 'physical' ? '#ff0000' : '#8800ff';
        const text = this.scene.add.text(this.x, this.y - 20, Math.round(amount), {
            fontSize: '20px',
            fill: color,
            stroke: '#000000',
            strokeThickness: 2
        }).setOrigin(0.5);
        
        this.scene.tweens.add({
            targets: text,
            y: text.y - 50,
            alpha: 0,
            duration: 1000,
            onComplete: () => text.destroy()
        });
    }

    addStatusEffect(effect, duration) {
        this.statusEffects.add({ type: effect, duration: duration });
        this.updateVisuals();
    }

    removeStatusEffect(effect) {
        this.statusEffects.delete(effect);
        this.updateVisuals();
    }

    updateHealthBar() {
        const width = gameConfig.hexSize * 0.8;
        const healthPercentage = this.currentHealth / this.stats.health;
        this.healthBar.width = width * healthPercentage;
    }

    gainMana(amount) {
        const width = gameConfig.hexSize * 0.8;
        this.manaBar.width = Math.min(this.manaBar.width + width * (amount / 100), width);
        
        if (this.manaBar.width >= width) {
            this.abilityReady = true;
        }
    }

    die() {
        // Create death animation
        const particles = this.scene.add.particles(this.x, this.y, 'pixel', {
            speed: 100,
            scale: { start: 1, end: 0 },
            blendMode: 'ADD',
            lifespan: 1000
        });
        
        this.scene.time.delayedCall(1000, () => {
            particles.destroy();
        });
        
        this.destroy();
    }

    hasSynergy(type) {
        return this.scene.getSynergy(type);
    }

    teleportBehind(target) {
        const angle = Phaser.Math.Angle.Between(target.x, target.y, this.x, this.y);
        const distance = gameConfig.hexSize * 1.5;
        
        this.x = target.x + Math.cos(angle) * distance;
        this.y = target.y + Math.sin(angle) * distance;
    }
}
