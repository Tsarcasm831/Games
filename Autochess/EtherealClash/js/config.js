const config = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: 1200,
    height: 800,
    backgroundColor: '#2c3e50',
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    }
};

const gameConfig = {
    hexSize: 60,
    gridWidth: 8,
    gridHeight: 8,
    boardOffsetX: 200,
    boardOffsetY: 100,
    preparationTime: 30,
    playerHealth: 100,
    startingGold: 10,
    rerollCost: 2
};

const origins = {
    frostborn: {
        name: 'Frostborn',
        thresholds: [3],
        effects: ['Freezes enemies for 1.5 seconds on critical hits']
    },
    infernal: {
        name: 'Infernal',
        thresholds: [3],
        effects: ['Abilities deal additional 5% burn damage over 3 seconds']
    },
    celestial: {
        name: 'Celestial',
        thresholds: [2],
        effects: ['Heals 10% of ability damage dealt']
    }
};

const classes = {
    warrior: {
        name: 'Warrior',
        thresholds: [2, 4],
        effects: ['Gains +10 armor for each allied Warrior']
    },
    mage: {
        name: 'Mage',
        thresholds: [3],
        effects: ['Increases spell power by 25%']
    },
    assassin: {
        name: 'Assassin',
        thresholds: [2],
        effects: ['Gains +30% critical hit chance when attacking from behind']
    }
};

const unitTypes = {
    frostKnight: {
        name: 'Frost Knight',
        class: 'warrior',
        origin: 'frostborn',
        rarity: 'common',
        cost: 1,
        stats: {
            health: 750,
            attackDamage: 50,
            attackSpeed: 0.8,
            armor: 20,
            magicResist: 20
        },
        ability: {
            name: 'Frozen Slash',
            damage: 150,
            type: 'magic',
            cooldown: 8,
            effect: 'freeze',
            duration: 1.5
        }
    },
    infernalPyromancer: {
        name: 'Infernal Pyromancer',
        class: 'mage',
        origin: 'infernal',
        rarity: 'common',
        cost: 1,
        stats: {
            health: 550,
            attackDamage: 30,
            attackSpeed: 0.9,
            armor: 15,
            magicResist: 15
        },
        ability: {
            name: 'Flame Wave',
            damage: 200,
            type: 'magic',
            cooldown: 6,
            effect: 'burn',
            duration: 3
        }
    },
    shadowAssassin: {
        name: 'Shadow Assassin',
        class: 'assassin',
        origin: 'celestial',
        rarity: 'rare',
        cost: 2,
        stats: {
            health: 600,
            attackDamage: 70,
            attackSpeed: 1.2,
            armor: 10,
            magicResist: 10
        },
        ability: {
            name: 'Void Strike',
            damage: 250,
            type: 'physical',
            cooldown: 7,
            effect: 'teleport',
            duration: 0
        }
    }
};

const rarityProbabilities = {
    common: 0.6,
    rare: 0.3,
    epic: 0.1
};
