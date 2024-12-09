const legendaryUnitTypes = {
    // Legendary Units - 4 cost
    champion1: { // Ultimate Warrior
        name: "Zara the Worldbreaker",
        class: "warrior",
        origin: "primordial",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1800, armor: 60, magicResist: 40, attackDamage: 140, attackSpeed: 1.1, abilityPower: 90, mana: 250},
        ability: {name: "Cosmic Cleave", damage: 300, type: "physical", effect: "stun", cooldown: 15, duration: 2.5}
    },
    champion2: { // Ultimate Mage
        name: "Aetheron the Archmage",
        class: "mage",
        origin: "arcane",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1200, armor: 30, magicResist: 70, attackDamage: 100, attackSpeed: 1.0, abilityPower: 220, mana: 400},
        ability: {name: "Reality Warp", damage: 350, type: "magic", effect: "silence", cooldown: 16, duration: 3}
    },
    champion3: { // Ultimate Assassin
        name: "Shadowmere the Eternal Blade",
        class: "assassin",
        origin: "shadow",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1100, armor: 25, magicResist: 45, attackDamage: 180, attackSpeed: 2.0, abilityPower: 110, mana: 280},
        ability: {name: "Void Ambush", damage: 320, type: "physical", effect: "stealth", cooldown: 12, duration: 3}
    },
    champion4: { // Ultimate Ranger
        name: "Lyra the Starshot",
        class: "ranger",
        origin: "celestial",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1300, armor: 35, magicResist: 40, attackDamage: 150, attackSpeed: 1.3, abilityPower: 85, mana: 240},
        ability: {name: "Cosmic Arrow", damage: 280, type: "physical", effect: "stun", cooldown: 13, duration: 2}
    },
    champion5: { // Ultimate Tank
        name: "Gorgath the Immovable",
        class: "tank",
        origin: "earth",
        rarity: "legendary",
        cost: 4,
        stats: {health: 2200, armor: 70, magicResist: 50, attackDamage: 110, attackSpeed: 0.8, abilityPower: 60, mana: 260},
        ability: {name: "Titan's Bulwark", damage: 0, type: "physical", effect: "shield", cooldown: 20, duration: 4}
    },
    champion6: { // Ultimate Support
        name: "Seraphina the Lifebinder",
        class: "support",
        origin: "divine",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1250, armor: 35, magicResist: 60, attackDamage: 90, attackSpeed: 1.1, abilityPower: 190, mana: 350},
        ability: {name: "Celestial Restoration", damage: 0, type: "magic", effect: "heal", cooldown: 16, duration: 4}
    },
    champion7: { // Ultimate Bard
        name: "Orpheus the Cosmic Harmonist",
        class: "bard",
        origin: "astral",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1150, armor: 30, magicResist: 55, attackDamage: 95, attackSpeed: 1.2, abilityPower: 150, mana: 300},
        ability: {name: "Universal Melody", damage: 0, type: "magic", effect: "buff", cooldown: 15, duration: 5}
    },
    champion8: { // Ultimate Necromancer
        name: "Mortis the Eternal Summoner",
        class: "necromancer",
        origin: "void",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1300, armor: 35, magicResist: 55, attackDamage: 100, attackSpeed: 1.0, abilityPower: 200, mana: 380},
        ability: {name: "Cosmic Resurrection", damage: 0, type: "magic", effect: "summon", cooldown: 18, duration: 5}
    },
    champion9: { // Ultimate Paladin
        name: "Solarius the Radiant Protector",
        class: "paladin",
        origin: "light",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1700, armor: 60, magicResist: 45, attackDamage: 120, attackSpeed: 1.2, abilityPower: 100, mana: 240},
        ability: {name: "Aegis of Eternity", damage: 0, type: "physical", effect: "shield", cooldown: 20, duration: 4}
    },
    champion10: { // Ultimate Sorcerer
        name: "Nexus the Reality Weaver",
        class: "sorcerer",
        origin: "chaos",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1250, armor: 35, magicResist: 65, attackDamage: 110, attackSpeed: 1.0, abilityPower: 210, mana: 400},
        ability: {name: "Dimensional Burst", damage: 350, type: "magic", effect: "silence", cooldown: 15, duration: 3}
    }
};

export default legendaryUnitTypes;
