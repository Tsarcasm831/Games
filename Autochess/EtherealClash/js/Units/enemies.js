const enemyTypes = {
    enemy1: { // Goblin - common
        name: "Goblin Raider",
        class: "warrior",
        origin: "goblin",
        rarity: "common",
        cost: 1,
        stats: {health:800, armor:20, magicResist:10, attackDamage:70, attackSpeed:1.2, abilityPower:0, mana:0},
        ability: {name:"Quick Slash", damage:100, type:"physical", effect:"none", cooldown:8, duration:0}
    },
    enemy2: { // Orc - rare
        name: "Orc Brute",
        class: "tank",
        origin: "orc",
        rarity: "rare",
        cost: 2,
        stats: {health:1200, armor:40, magicResist:20, attackDamage:90, attackSpeed:1.0, abilityPower:0, mana:0},
        ability: {name:"Smash", damage:150, type:"physical", effect:"stun", cooldown:10, duration:1}
    },
    enemy3: { // Dark Mage - epic
        name: "Dark Sorcerer",
        class: "mage",
        origin: "dark",
        rarity: "epic",
        cost: 3,
        stats: {health:900, armor:10, magicResist:50, attackDamage:110, attackSpeed:1.0, abilityPower:150, mana:300},
        ability: {name:"Shadow Bolt", damage:200, type:"magic", effect:"none", cooldown:12, duration:0}
    }
};

export default enemyTypes;
