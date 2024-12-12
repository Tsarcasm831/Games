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
    shopOffsetX: 1000,
    shopOffsetY: 600,
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
    },
    shadow: {
        name: 'Shadow',
        thresholds: [3],
        effects: ['Increases movement speed by 15% when near allied Shadows']
    },
    nature: {
        name: 'Nature',
        thresholds: [2],
        effects: ['Regenerates 5% health per second when out of combat']
    },
    arcane: {
        name: 'Arcane',
        thresholds: [3],
        effects: ['Increases ability power by 10% for each allied Arcane']
    },
    beast: {
        name: 'Beast',
        thresholds: [2],
        effects: ['Grants +20% attack speed when three or more allied Beasts are present']
    },
    elemental: {
        name: 'Elemental',
        thresholds: [3],
        effects: ['Abilities have a 20% chance to trigger an additional elemental effect']
    },
    demon: {
        name: 'Demon',
        thresholds: [2],
        effects: ['Gains +5% lifesteal for each allied Demon']
    },
    divine: {
        name: 'Divine',
        thresholds: [2],
        effects: ['Allied Divines receive a 10% damage boost']
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
    },
    ranger: {
        name: 'Ranger',
        thresholds: [3],
        effects: ['Increases attack range by 20% for each allied Ranger']
    },
    tank: {
        name: 'Tank',
        thresholds: [2],
        effects: ['Gains +15% damage reduction for each allied Tank']
    },
    support: {
        name: 'Support',
        thresholds: [3],
        effects: ['Provides a 5% mana regeneration boost to all allied Supports']
    },
    bard: {
        name: 'Bard',
        thresholds: [2],
        effects: ['Allied Bards gain +5% movement speed']
    },
    necromancer: {
        name: 'Necromancer',
        thresholds: [3],
        effects: ['Raises 10% more undead minions when three or more Necromancers are present']
    },
    paladin: {
        name: 'Paladin',
        thresholds: [2],
        effects: ['Allied Paladins receive a 10% shield strength boost']
    },
    sorcerer: {
        name: 'Sorcerer',
        thresholds: [3],
        effects: ['Reduces ability cooldowns by 5% for each allied Sorcerer']
    }
};

const rarityProbabilities = {
    common: 0.6,
    rare: 0.25,  // Adjusted to accommodate additional rarities if needed
    epic: 0.1,
    legendary: 0.04,   // Optional: Introduce higher rarity levels
    mythic: 0.01       // Optional: Introduce top-tier rarity
};
