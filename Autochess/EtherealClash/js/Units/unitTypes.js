const unitTypes = {
    // Frostborn (1-10)
    champion1: { // Warrior - common
        name: "Arvid the Glacier Blade",
        class: "warrior",
        origin: "frostborn",
        rarity: "common",
        cost: 1,
        stats: {health:1400, armor:45, magicResist:25, attackDamage:110, attackSpeed:1.05, abilityPower:60, mana:200},
        ability: {name:"Glacial Cleave", damage:220, type:"physical", effect:"slow", cooldown:13, duration:2}
    },
    champion2: { // Mage - rare
        name: "Freya the Ice Scholar",
        class: "mage",
        origin: "frostborn",
        rarity: "rare",
        cost: 2,
        stats: {health:950, armor:25, magicResist:55, attackDamage:85, attackSpeed:1.0, abilityPower:160, mana:320},
        ability: {name:"Frost Rune", damage:250, type:"magic", effect:"freeze", cooldown:12, duration:2.5}
    },
    champion3: { // Assassin - epic
        name: "Kara Snowstalker",
        class: "assassin",
        origin: "frostborn",
        rarity: "epic",
        cost: 3,
        stats: {health:850, armor:18, magicResist:35, attackDamage:135, attackSpeed:1.7, abilityPower:90, mana:230},
        ability: {name:"Icy Ambush", damage:240, type:"physical", effect:"stealth", cooldown:10, duration:2}
    },
    champion4: { // Ranger - common
        name: "Vega the Winter Hunter",
        class: "ranger",
        origin: "frostborn",
        rarity: "common",
        cost: 1,
        stats: {health:950, armor:22, magicResist:30, attackDamage:115, attackSpeed:1.2, abilityPower:65, mana:210},
        ability: {name:"Arrow of Frost", damage:180, type:"physical", effect:"slow", cooldown:11, duration:1.5}
    },
    champion5: { // Tank - rare
        name: "Brynjar the Ice Shield",
        class: "tank",
        origin: "frostborn",
        rarity: "rare",
        cost: 2,
        stats: {health:1500, armor:50, magicResist:30, attackDamage:95, attackSpeed:0.95, abilityPower:50, mana:220},
        ability: {name:"Frozen Bulwark", damage:0, type:"physical", effect:"shield", cooldown:16, duration:3}
    },
    champion6: { // Support - epic
        name: "Eirlys the Snow Healer",
        class: "support",
        origin: "frostborn",
        rarity: "epic",
        cost: 3,
        stats: {health:900, armor:25, magicResist:45, attackDamage:80, attackSpeed:1.05, abilityPower:130, mana:300},
        ability: {name:"Frigid Blessing", damage:0, type:"magic", effect:"heal", cooldown:14, duration:3}
    },
    champion7: { // Bard - common
        name: "Nordri the Frost Bard",
        class: "bard",
        origin: "frostborn",
        rarity: "common",
        cost: 1,
        stats: {health:920, armor:20, magicResist:45, attackDamage:80, attackSpeed:1.05, abilityPower:100, mana:250},
        ability: {name:"Chilling Chant", damage:0, type:"magic", effect:"buff", cooldown:12, duration:4}
    },
    champion8: { // Necromancer - rare
        name: "Svana the Frozen Crypt",
        class: "necromancer",
        origin: "frostborn",
        rarity: "rare",
        cost: 2,
        stats: {health:930, armor:22, magicResist:50, attackDamage:85, attackSpeed:1.0, abilityPower:155, mana:330},
        ability: {name:"Rimebound Minions", damage:0, type:"magic", effect:"summon", cooldown:15, duration:4}
    },
    champion9: { // Paladin - epic
        name: "Kjell the Glacial Guardian",
        class: "paladin",
        origin: "frostborn",
        rarity: "epic",
        cost: 3,
        stats: {health:1350, armor:45, magicResist:35, attackDamage:100, attackSpeed:1.1, abilityPower:80, mana:220},
        ability: {name:"Frosted Aegis", damage:0, type:"physical", effect:"shield", cooldown:18, duration:3.5}
    },
    champion10: { // Sorcerer - common
        name: "Miri the Snow Sorceress",
        class: "sorcerer",
        origin: "frostborn",
        rarity: "common",
        cost: 1,
        stats: {health:950, armor:23, magicResist:50, attackDamage:90, attackSpeed:1.0, abilityPower:165, mana:320},
        ability: {name:"Blizzard Burst", damage:260, type:"magic", effect:"freeze", cooldown:13, duration:2}
    },

    // Infernal (11-20)
    champion11: { // Warrior - rare
        name: "Ardan the Flame Blade",
        class: "warrior",
        origin: "infernal",
        rarity: "rare",
        cost: 2,
        stats: {health:1400, armor:46, magicResist:20, attackDamage:115, attackSpeed:1.05, abilityPower:60, mana:190},
        ability: {name:"Inferno Cleave", damage:220, type:"physical", effect:"burn", cooldown:13, duration:2}
    },
    champion12: { // Mage - epic
        name: "Salindra the Fire Scholar",
        class: "mage",
        origin: "infernal",
        rarity: "epic",
        cost: 3,
        stats: {health:970, armor:28, magicResist:55, attackDamage:85, attackSpeed:1.0, abilityPower:170, mana:330},
        ability: {name:"Flame Rune", damage:280, type:"magic", effect:"burn", cooldown:12, duration:3}
    },
    champion13: { // Assassin - common
        name: "Draz the Ash Stalker",
        class: "assassin",
        origin: "infernal",
        rarity: "common",
        cost: 1,
        stats: {health:880, armor:18, magicResist:30, attackDamage:140, attackSpeed:1.7, abilityPower:90, mana:220},
        ability: {name:"Ember Ambush", damage:250, type:"physical", effect:"stealth", cooldown:11, duration:1.8}
    },
    champion14: { // Ranger - rare
        name: "Seraphine the Flame Archer",
        class: "ranger",
        origin: "infernal",
        rarity: "rare",
        cost: 2,
        stats: {health:980, armor:24, magicResist:28, attackDamage:120, attackSpeed:1.15, abilityPower:65, mana:210},
        ability: {name:"Fiery Arrow", damage:200, type:"physical", effect:"burn", cooldown:12, duration:2}
    },
    champion15: { // Tank - epic
        name: "Gorak the Blazing Shield",
        class: "tank",
        origin: "infernal",
        rarity: "epic",
        cost: 3,
        stats: {health:1550, armor:52, magicResist:30, attackDamage:95, attackSpeed:0.95, abilityPower:50, mana:225},
        ability: {name:"Molten Bulwark", damage:0, type:"physical", effect:"shield", cooldown:17, duration:3}
    },
    champion16: { // Support - common
        name: "Anora the Ember Healer",
        class: "support",
        origin: "infernal",
        rarity: "common",
        cost: 1,
        stats: {health:900, armor:26, magicResist:45, attackDamage:80, attackSpeed:1.05, abilityPower:130, mana:290},
        ability: {name:"Ember's Embrace", damage:0, type:"magic", effect:"heal", cooldown:14, duration:3}
    },
    champion17: { // Bard - rare
        name: "Cadmus the Fiery Lute",
        class: "bard",
        origin: "infernal",
        rarity: "rare",
        cost: 2,
        stats: {health:930, armor:21, magicResist:40, attackDamage:82, attackSpeed:1.05, abilityPower:100, mana:250},
        ability: {name:"Burning Ballad", damage:0, type:"magic", effect:"buff", cooldown:12, duration:4}
    },
    champion18: { // Necromancer - epic
        name: "Mortessa the Flame Caller",
        class: "necromancer",
        origin: "infernal",
        rarity: "epic",
        cost: 3,
        stats: {health:940, armor:23, magicResist:50, attackDamage:85, attackSpeed:1.0, abilityPower:160, mana:340},
        ability: {name:"Ashen Revenants", damage:0, type:"magic", effect:"summon", cooldown:15, duration:4}
    },
    champion19: { // Paladin - common
        name: "Therion the Blazing Aegis",
        class: "paladin",
        origin: "infernal",
        rarity: "common",
        cost: 1,
        stats: {health:1380, armor:48, magicResist:30, attackDamage:105, attackSpeed:1.1, abilityPower:80, mana:220},
        ability: {name:"Flare Shield", damage:0, type:"physical", effect:"shield", cooldown:18, duration:3.5}
    },
    champion20: { // Sorcerer - rare
        name: "Ilyria the Flame Sorceress",
        class: "sorcerer",
        origin: "infernal",
        rarity: "rare",
        cost: 2,
        stats: {health:990, armor:26, magicResist:56, attackDamage:90, attackSpeed:1.0, abilityPower:175, mana:340},
        ability: {name:"Firestorm Burst", damage:300, type:"magic", effect:"burn", cooldown:13, duration:2.5}
    },

    // Celestial (21-30)
    champion21: { // Warrior - epic
        name: "Arthion the Star Blade",
        class: "warrior",
        origin: "celestial",
        rarity: "epic",
        cost: 3,
        stats: {health:1450, armor:48, magicResist:30, attackDamage:110, attackSpeed:1.05, abilityPower:70, mana:210},
        ability: {name:"Starlit Cleave", damage:230, type:"physical", effect:"stun", cooldown:13, duration:2}
    },
    champion22: { // Mage - common
        name: "Selena the Light Scholar",
        class: "mage",
        origin: "celestial",
        rarity: "common",
        cost: 1,
        stats: {health:940, armor:24, magicResist:55, attackDamage:85, attackSpeed:1.0, abilityPower:165, mana:310},
        ability: {name:"Lunar Rune", damage:260, type:"magic", effect:"burn(light)", cooldown:12, duration:2.5}
    },
    champion23: { // Assassin - rare
        name: "Zareth the Heaven Stalker",
        class: "assassin",
        origin: "celestial",
        rarity: "rare",
        cost: 2,
        stats: {health:860, armor:16, magicResist:35, attackDamage:140, attackSpeed:1.7, abilityPower:95, mana:225},
        ability: {name:"Cosmic Ambush", damage:270, type:"physical", effect:"stealth", cooldown:10, duration:2}
    },
    champion24: { // Ranger - epic
        name: "Elora the Star Archer",
        class: "ranger",
        origin: "celestial",
        rarity: "epic",
        cost: 3,
        stats: {health:980, armor:25, magicResist:35, attackDamage:120, attackSpeed:1.2, abilityPower:70, mana:220},
        ability: {name:"Meteor Arrow", damage:210, type:"physical", effect:"stun", cooldown:11, duration:2}
    },
    champion25: { // Tank - common
        name: "Lumion the Heavenly Shield",
        class: "tank",
        origin: "celestial",
        rarity: "common",
        cost: 1,
        stats: {health:1520, armor:50, magicResist:30, attackDamage:90, attackSpeed:0.95, abilityPower:50, mana:210},
        ability: {name:"Divine Bulwark", damage:0, type:"physical", effect:"shield", cooldown:16, duration:3}
    },
    champion26: { // Support - rare
        name: "Astra the Dawn Healer",
        class: "support",
        origin: "celestial",
        rarity: "rare",
        cost: 2,
        stats: {health:920, armor:25, magicResist:50, attackDamage:75, attackSpeed:1.05, abilityPower:135, mana:300},
        ability: {name:"Dawn's Grace", damage:0, type:"magic", effect:"heal", cooldown:14, duration:3}
    },
    champion27: { // Bard - epic
        name: "Aurin the Star Harpist",
        class: "bard",
        origin: "celestial",
        rarity: "epic",
        cost: 3,
        stats: {health:930, armor:21, magicResist:45, attackDamage:82, attackSpeed:1.1, abilityPower:105, mana:260},
        ability: {name:"Celestial Hymn", damage:0, type:"magic", effect:"buff", cooldown:12, duration:4}
    },
    champion28: { // Necromancer - common
        name: "Esari the Moon Crypt",
        class: "necromancer",
        origin: "celestial",
        rarity: "common",
        cost: 1,
        stats: {health:920, armor:23, magicResist:50, attackDamage:85, attackSpeed:1.0, abilityPower:160, mana:320},
        ability: {name:"Astral Undead", damage:0, type:"magic", effect:"summon", cooldown:15, duration:4}
    },
    champion29: { // Paladin - rare
        name: "Torian the Radiant Aegis",
        class: "paladin",
        origin: "celestial",
        rarity: "rare",
        cost: 2,
        stats: {health:1380, armor:45, magicResist:35, attackDamage:100, attackSpeed:1.1, abilityPower:85, mana:220},
        ability: {name:"Holy Shield", damage:0, type:"physical", effect:"shield", cooldown:18, duration:3.5}
    },
    champion30: { // Sorcerer - epic
        name: "Meloria the Cosmic Sage",
        class: "sorcerer",
        origin: "celestial",
        rarity: "epic",
        cost: 3,
        stats: {health:980, armor:26, magicResist:55, attackDamage:90, attackSpeed:1.0, abilityPower:170, mana:330},
        ability: {name:"Nova Burst", damage:280, type:"magic", effect:"burn(light)", cooldown:13, duration:2.5}
    },

    // Shadow (31-40)
    champion31: { // Warrior - common
        name: "Dareth the Dusk Blade",
        class: "warrior",
        origin: "shadow",
        rarity: "common",
        cost: 1,
        stats: {health:1350, armor:45, magicResist:25, attackDamage:110, attackSpeed:1.05, abilityPower:60, mana:200},
        ability: {name:"Umbral Cleave", damage:220, type:"physical", effect:"slow", cooldown:13, duration:2}
    },
    champion32: { // Mage - rare
        name: "Mistria the Night Scholar",
        class: "mage",
        origin: "shadow",
        rarity: "rare",
        cost: 2,
        stats: {health:950, armor:25, magicResist:55, attackDamage:85, attackSpeed:1.0, abilityPower:160, mana:320},
        ability: {name:"Ebon Rune", damage:250, type:"magic", effect:"silence", cooldown:12, duration:2.5}
    },
    champion33: { // Assassin - epic
        name: "Vox the Midnight Stalker",
        class: "assassin",
        origin: "shadow",
        rarity: "epic",
        cost: 3,
        stats: {health:850, armor:17, magicResist:35, attackDamage:140, attackSpeed:1.75, abilityPower:90, mana:230},
        ability: {name:"Shadow Ambush", damage:260, type:"physical", effect:"stealth", cooldown:10, duration:2}
    },
    champion34: { // Ranger - common
        name: "Seren the Moon Hunter",
        class: "ranger",
        origin: "shadow",
        rarity: "common",
        cost: 1,
        stats: {health:950, armor:22, magicResist:30, attackDamage:115, attackSpeed:1.2, abilityPower:60, mana:200},
        ability: {name:"Gloom Arrow", damage:190, type:"physical", effect:"slow", cooldown:11, duration:1.5}
    },
    champion35: { // Tank - rare
        name: "Korvan the Shade Shield",
        class: "tank",
        origin: "shadow",
        rarity: "rare",
        cost: 2,
        stats: {health:1500, armor:50, magicResist:30, attackDamage:90, attackSpeed:0.95, abilityPower:50, mana:210},
        ability: {name:"Umbral Bulwark", damage:0, type:"physical", effect:"shield", cooldown:16, duration:3}
    },
    champion36: { // Support - epic
        name: "Isarys the Dark Healer",
        class: "support",
        origin: "shadow",
        rarity: "epic",
        cost: 3,
        stats: {health:900, armor:25, magicResist:45, attackDamage:80, attackSpeed:1.05, abilityPower:125, mana:290},
        ability: {name:"Twilight Mend", damage:0, type:"magic", effect:"heal", cooldown:14, duration:3}
    },
    champion37: { // Bard - common
        name: "Lyven the Silent Harp",
        class: "bard",
        origin: "shadow",
        rarity: "common",
        cost: 1,
        stats: {health:920, armor:20, magicResist:45, attackDamage:78, attackSpeed:1.05, abilityPower:95, mana:250},
        ability: {name:"Whispered Melody", damage:0, type:"magic", effect:"buff", cooldown:12, duration:4}
    },
    champion38: { // Necromancer - rare
        name: "Morath the Dark Crypt",
        class: "necromancer",
        origin: "shadow",
        rarity: "rare",
        cost: 2,
        stats: {health:930, armor:22, magicResist:50, attackDamage:85, attackSpeed:1.0, abilityPower:155, mana:320},
        ability: {name:"Shadow Wraiths", damage:0, type:"magic", effect:"summon", cooldown:15, duration:4}
    },
    champion39: { // Paladin - epic
        name: "Zavor the Twilight Aegis",
        class: "paladin",
        origin: "shadow",
        rarity: "epic",
        cost: 3,
        stats: {health:1350, armor:45, magicResist:35, attackDamage:100, attackSpeed:1.1, abilityPower:75, mana:220},
        ability: {name:"Night Shield", damage:0, type:"physical", effect:"shield", cooldown:18, duration:3.5}
    },
    champion40: { // Sorcerer - common
        name: "Elandra the Gloom Sage",
        class: "sorcerer",
        origin: "shadow",
        rarity: "common",
        cost: 1,
        stats: {health:950, armor:23, magicResist:50, attackDamage:85, attackSpeed:1.0, abilityPower:165, mana:320},
        ability: {name:"Umbral Burst", damage:260, type:"magic", effect:"silence", cooldown:13, duration:2}
    },

    // Nature (41-50)
    champion41: { // Warrior - rare
        name: "Taron the Oak Blade",
        class: "warrior",
        origin: "nature",
        rarity: "rare",
        cost: 2,
        stats: {health:1420, armor:46, magicResist:25, attackDamage:110, attackSpeed:1.05, abilityPower:60, mana:200},
        ability: {name:"Verdant Cleave", damage:220, type:"physical", effect:"slow", cooldown:13, duration:2}
    },
    champion42: { // Mage - epic
        name: "Lirielle the Leaf Scholar",
        class: "mage",
        origin: "nature",
        rarity: "epic",
        cost: 3,
        stats: {health:980, armor:25, magicResist:55, attackDamage:85, attackSpeed:1.0, abilityPower:170, mana:330},
        ability: {name:"Bloom Rune", damage:250, type:"magic", effect:"heal", cooldown:12, duration:2.5}
    },
    champion43: { // Assassin - common
        name: "Fendris the Thorn Stalker",
        class: "assassin",
        origin: "nature",
        rarity: "common",
        cost: 1,
        stats: {health:880, armor:18, magicResist:30, attackDamage:135, attackSpeed:1.7, abilityPower:85, mana:210},
        ability: {name:"Briar Ambush", damage:240, type:"physical", effect:"stealth", cooldown:10, duration:2}
    },
    champion44: { // Ranger - rare
        name: "Marielle the Grove Archer",
        class: "ranger",
        origin: "nature",
        rarity: "rare",
        cost: 2,
        stats: {health:960, armor:23, magicResist:30, attackDamage:120, attackSpeed:1.2, abilityPower:60, mana:210},
        ability: {name:"Thorn Arrow", damage:190, type:"physical", effect:"slow", cooldown:11, duration:1.5}
    },
    champion45: { // Tank - epic
        name: "Hrothgar the Forest Shield",
        class: "tank",
        origin: "nature",
        rarity: "epic",
        cost: 3,
        stats: {health:1550, armor:52, magicResist:30, attackDamage:95, attackSpeed:0.95, abilityPower:50, mana:220},
        ability: {name:"Rooted Bulwark", damage:0, type:"physical", effect:"shield", cooldown:16, duration:3}
    },
    champion46: { // Support - common
        name: "Evana the Bloom Healer",
        class: "support",
        origin: "nature",
        rarity: "common",
        cost: 1,
        stats: {health:900, armor:25, magicResist:45, attackDamage:80, attackSpeed:1.05, abilityPower:130, mana:300},
        ability: {name:"Floral Grace", damage:0, type:"magic", effect:"heal", cooldown:14, duration:3}
    },
    champion47: { // Bard - rare
        name: "Telden the Sylvan Lute",
        class: "bard",
        origin: "nature",
        rarity: "rare",
        cost: 2,
        stats: {health:930, armor:20, magicResist:45, attackDamage:80, attackSpeed:1.05, abilityPower:100, mana:250},
        ability: {name:"Nature's Melody", damage:0, type:"magic", effect:"buff", cooldown:12, duration:4}
    },
    champion48: { // Necromancer - epic
        name: "Norath the Green Crypt",
        class: "necromancer",
        origin: "nature",
        rarity: "epic",
        cost: 3,
        stats: {health:950, armor:22, magicResist:50, attackDamage:85, attackSpeed:1.0, abilityPower:160, mana:330},
        ability: {name:"Mossy Minions", damage:0, type:"magic", effect:"summon", cooldown:15, duration:4}
    },
    champion49: { // Paladin - common
        name: "Durian the Verdant Aegis",
        class: "paladin",
        origin: "nature",
        rarity: "common",
        cost: 1,
        stats: {health:1320, armor:42, magicResist:30, attackDamage:100, attackSpeed:1.1, abilityPower:75, mana:210},
        ability: {name:"Leaf Shield", damage:0, type:"physical", effect:"shield", cooldown:18, duration:3.5}
    },
    champion50: { // Sorcerer - rare
        name: "Melora the Grove Sage",
        class: "sorcerer",
        origin: "nature",
        rarity: "rare",
        cost: 2,
        stats: {health:960, armor:25, magicResist:55, attackDamage:90, attackSpeed:1.0, abilityPower:170, mana:320},
        ability: {name:"Vine Burst", damage:270, type:"magic", effect:"root", cooldown:13, duration:2.5}
    },

    // Arcane (51-60)
    champion51: { // Warrior - epic
        name: "Rothgar the Rune Blade",
        class: "warrior",
        origin: "arcane",
        rarity: "epic",
        cost: 3,
        stats: {health:1450, armor:46, magicResist:25, attackDamage:115, attackSpeed:1.05, abilityPower:70, mana:210},
        ability: {name:"Arcane Cleave", damage:230, type:"physical", effect:"slow", cooldown:13, duration:2}
    },
    champion52: { // Mage - common
        name: "Elandra the Mystic Scholar",
        class: "mage",
        origin: "arcane",
        rarity: "common",
        cost: 1,
        stats: {health:940, armor:25, magicResist:60, attackDamage:85, attackSpeed:1.05, abilityPower:160, mana:320},
        ability: {name:"Arcane Rune", damage:260, type:"magic", effect:"silence", cooldown:12, duration:2.5}
    },
    champion53: { // Assassin - rare
        name: "Jardek the Runic Stalker",
        class: "assassin",
        origin: "arcane",
        rarity: "rare",
        cost: 2,
        stats: {health:870, armor:18, magicResist:35, attackDamage:140, attackSpeed:1.7, abilityPower:95, mana:230},
        ability: {name:"Runeblade Ambush", damage:250, type:"physical", effect:"stealth", cooldown:10, duration:2}
    },
    champion54: { // Ranger - epic
        name: "Alarria the Spellbow",
        class: "ranger",
        origin: "arcane",
        rarity: "epic",
        cost: 3,
        stats: {health:980, armor:22, magicResist:35, attackDamage:115, attackSpeed:1.2, abilityPower:70, mana:220},
        ability: {name:"Mystic Arrow", damage:210, type:"physical", effect:"silence", cooldown:11, duration:2}
    },
    champion55: { // Tank - common
        name: "Baldric the Arcane Shield",
        class: "tank",
        origin: "arcane",
        rarity: "common",
        cost: 1,
        stats: {health:1510, armor:50, magicResist:30, attackDamage:95, attackSpeed:0.95, abilityPower:50, mana:220},
        ability: {name:"Runic Bulwark", damage:0, type:"physical", effect:"shield", cooldown:16, duration:3}
    },
    champion56: { // Support - rare
        name: "Serella the Rune Healer",
        class: "support",
        origin: "arcane",
        rarity: "rare",
        cost: 2,
        stats: {health:920, armor:25, magicResist:50, attackDamage:80, attackSpeed:1.05, abilityPower:135, mana:310},
        ability: {name:"Arcane Mend", damage:0, type:"magic", effect:"heal", cooldown:14, duration:3}
    },
    champion57: { // Bard - epic
        name: "Ulvion the Spell Harp",
        class: "bard",
        origin: "arcane",
        rarity: "epic",
        cost: 3,
        stats: {health:940, armor:22, magicResist:48, attackDamage:82, attackSpeed:1.05, abilityPower:105, mana:260},
        ability: {name:"Runic Melody", damage:0, type:"magic", effect:"buff", cooldown:12, duration:4}
    },
    champion58: { // Necromancer - common
        name: "Feyrun the Arcane Crypt",
        class: "necromancer",
        origin: "arcane",
        rarity: "common",
        cost: 1,
        stats: {health:930, armor:24, magicResist:50, attackDamage:86, attackSpeed:1.0, abilityPower:160, mana:320},
        ability: {name:"Runed Minions", damage:0, type:"magic", effect:"summon", cooldown:15, duration:4}
    },
    champion59: { // Paladin - rare
        name: "Korvath the Spell Aegis",
        class: "paladin",
        origin: "arcane",
        rarity: "rare",
        cost: 2,
        stats: {health:1360, armor:45, magicResist:35, attackDamage:102, attackSpeed:1.1, abilityPower:80, mana:220},
        ability: {name:"Runic Shield", damage:0, type:"physical", effect:"shield", cooldown:18, duration:3.5}
    },
    champion60: { // Sorcerer - epic
        name: "Meliora the Rune Sage",
        class: "sorcerer",
        origin: "arcane",
        rarity: "epic",
        cost: 3,
        stats: {health:990, armor:27, magicResist:55, attackDamage:90, attackSpeed:1.0, abilityPower:175, mana:340},
        ability: {name:"Arcane Burst", damage:290, type:"magic", effect:"silence", cooldown:13, duration:2.5}
    },

    // Beast (61-70)
    champion61: { // Warrior - common
        name: "Fangar the Claw Blade",
        class: "warrior",
        origin: "beast",
        rarity: "common",
        cost: 1,
        stats: {health:1380, armor:45, magicResist:25, attackDamage:110, attackSpeed:1.05, abilityPower:60, mana:200},
        ability: {name:"Savage Cleave", damage:220, type:"physical", effect:"bleed", cooldown:13, duration:2}
    },
    champion62: { // Mage - rare
        name: "Lyssia the Wild Scholar",
        class: "mage",
        origin: "beast",
        rarity: "rare",
        cost: 2,
        stats: {health:960, armor:25, magicResist:55, attackDamage:86, attackSpeed:1.0, abilityPower:165, mana:320},
        ability: {name:"Primal Rune", damage:260, type:"magic", effect:"slow", cooldown:12, duration:2.5}
    },
    champion63: { // Assassin - epic
        name: "Krell the Fang Stalker",
        class: "assassin",
        origin: "beast",
        rarity: "epic",
        cost: 3,
        stats: {health:890, armor:19, magicResist:35, attackDamage:140, attackSpeed:1.75, abilityPower:90, mana:230},
        ability: {name:"Ferocious Ambush", damage:250, type:"physical", effect:"stealth", cooldown:10, duration:2}
    },
    champion64: { // Ranger - common
        name: "Marrox the Wild Hunter",
        class: "ranger",
        origin: "beast",
        rarity: "common",
        cost: 1,
        stats: {health:970, armor:23, magicResist:30, attackDamage:115, attackSpeed:1.2, abilityPower:65, mana:210},
        ability: {name:"Bestial Arrow", damage:190, type:"physical", effect:"bleed", cooldown:11, duration:1.5}
    },
    champion65: { // Tank - rare
        name: "Goral the Feral Shield",
        class: "tank",
        origin: "beast",
        rarity: "rare",
        cost: 2,
        stats: {health:1560, armor:52, magicResist:30, attackDamage:95, attackSpeed:0.95, abilityPower:50, mana:220},
        ability: {name:"Beast Bulwark", damage:0, type:"physical", effect:"shield", cooldown:16, duration:3}
    },
    champion66: { // Support - epic
        name: "Evrin the Pack Healer",
        class: "support",
        origin: "beast",
        rarity: "epic",
        cost: 3,
        stats: {health:920, armor:25, magicResist:45, attackDamage:80, attackSpeed:1.05, abilityPower:130, mana:310},
        ability: {name:"Howling Mend", damage:0, type:"magic", effect:"heal", cooldown:14, duration:3}
    },
    champion67: { // Bard - common
        name: "Talokk the Beast Bard",
        class: "bard",
        origin: "beast",
        rarity: "common",
        cost: 1,
        stats: {health:930, armor:20, magicResist:45, attackDamage:82, attackSpeed:1.05, abilityPower:95, mana:240},
        ability: {name:"Wailing Melody", damage:0, type:"magic", effect:"buff", cooldown:12, duration:4}
    },
    champion68: { // Necromancer - rare
        name: "Zorn the Wild Crypt",
        class: "necromancer",
        origin: "beast",
        rarity: "rare",
        cost: 2,
        stats: {health:940, armor:22, magicResist:50, attackDamage:85, attackSpeed:1.0, abilityPower:155, mana:320},
        ability: {name:"Primal Undead", damage:0, type:"magic", effect:"summon", cooldown:15, duration:4}
    },
    champion69: { // Paladin - epic
        name: "Harrok the Claw Aegis",
        class: "paladin",
        origin: "beast",
        rarity: "epic",
        cost: 3,
        stats: {health:1400, armor:48, magicResist:35, attackDamage:102, attackSpeed:1.1, abilityPower:80, mana:220},
        ability: {name:"Beast Shield", damage:0, type:"physical", effect:"shield", cooldown:18, duration:3.5}
    },
    champion70: { // Sorcerer - common
        name: "Ravella the Fang Sage",
        class: "sorcerer",
        origin: "beast",
        rarity: "common",
        cost: 1,
        stats: {health:960, armor:23, magicResist:50, attackDamage:90, attackSpeed:1.0, abilityPower:165, mana:320},
        ability: {name:"Savage Burst", damage:270, type:"magic", effect:"bleed", cooldown:13, duration:2.5}
    },

    // Elemental (71-80)
    champion71: { // Warrior - rare
        name: "Strom the Storm Blade",
        class: "warrior",
        origin: "elemental",
        rarity: "rare",
        cost: 2,
        stats: {health:1410, armor:46, magicResist:25, attackDamage:110, attackSpeed:1.05, abilityPower:60, mana:200},
        ability: {name:"Thunder Cleave", damage:230, type:"physical", effect:"stun", cooldown:13, duration:2}
    },
    champion72: { // Mage - epic
        name: "Isera the Spark Scholar",
        class: "mage",
        origin: "elemental",
        rarity: "epic",
        cost: 3,
        stats: {health:990, armor:25, magicResist:55, attackDamage:86, attackSpeed:1.05, abilityPower:170, mana:330},
        ability: {name:"Lightning Rune", damage:280, type:"magic", effect:"stun", cooldown:12, duration:2.5}
    },
    champion73: { // Assassin - common
        name: "Qor the Ember Stalker",
        class: "assassin",
        origin: "elemental",
        rarity: "common",
        cost: 1,
        stats: {health:890, armor:19, magicResist:30, attackDamage:140, attackSpeed:1.7, abilityPower:90, mana:220},
        ability: {name:"Voltaic Ambush", damage:250, type:"physical", effect:"stealth", cooldown:10, duration:2}
    },
    champion74: { // Ranger - rare
        name: "Elira the Wind Archer",
        class: "ranger",
        origin: "elemental",
        rarity: "rare",
        cost: 2,
        stats: {health:970, armor:23, magicResist:30, attackDamage:115, attackSpeed:1.2, abilityPower:65, mana:210},
        ability: {name:"Gale Arrow", damage:200, type:"physical", effect:"knockback", cooldown:11, duration:1.5}
    },
    champion75: { // Tank - epic
        name: "Raggor the Earth Shield",
        class: "tank",
        origin: "elemental",
        rarity: "epic",
        cost: 3,
        stats: {health:1570, armor:53, magicResist:30, attackDamage:95, attackSpeed:0.95, abilityPower:50, mana:230},
        ability: {name:"Stone Bulwark", damage:0, type:"physical", effect:"shield", cooldown:16, duration:3}
    },
    champion76: { // Support - common
        name: "Ventri the Hydro Healer",
        class: "support",
        origin: "elemental",
        rarity: "common",
        cost: 1,
        stats: {health:920, armor:25, magicResist:45, attackDamage:80, attackSpeed:1.05, abilityPower:130, mana:300},
        ability: {name:"Water's Embrace", damage:0, type:"magic", effect:"heal", cooldown:14, duration:3}
    },
    champion77: { // Bard - rare
        name: "Sirok the Spark Lyre",
        class: "bard",
        origin: "elemental",
        rarity: "rare",
        cost: 2,
        stats: {health:930, armor:21, magicResist:45, attackDamage:82, attackSpeed:1.05, abilityPower:100, mana:250},
        ability: {name:"Elemental Melody", damage:0, type:"magic", effect:"buff", cooldown:12, duration:4}
    },
    champion78: { // Necromancer - epic
        name: "Volrath the Primordial Crypt",
        class: "necromancer",
        origin: "elemental",
        rarity: "epic",
        cost: 3,
        stats: {health:950, armor:22, magicResist:50, attackDamage:85, attackSpeed:1.0, abilityPower:160, mana:330},
        ability: {name:"Elemental Undead", damage:0, type:"magic", effect:"summon", cooldown:15, duration:4}
    },
    champion79: { // Paladin - common
        name: "Therak the Earthen Aegis",
        class: "paladin",
        origin: "elemental",
        rarity: "common",
        cost: 1,
        stats: {health:1400, armor:48, magicResist:35, attackDamage:105, attackSpeed:1.1, abilityPower:80, mana:220},
        ability: {name:"Crystalline Shield", damage:0, type:"physical", effect:"shield", cooldown:18, duration:3.5}
    },
    champion80: { // Sorcerer - rare
        name: "Zelandra the Storm Sage",
        class: "sorcerer",
        origin: "elemental",
        rarity: "rare",
        cost: 2,
        stats: {health:1000, armor:28, magicResist:55, attackDamage:90, attackSpeed:1.0, abilityPower:175, mana:340},
        ability: {name:"Tempest Burst", damage:290, type:"magic", effect:"stun", cooldown:13, duration:2.5}
    },

    // Demon (81-90)
    champion81: { // Warrior - epic
        name: "Gorthak the Hell Blade",
        class: "warrior",
        origin: "demon",
        rarity: "epic",
        cost: 3,
        stats: {health:1450, armor:48, magicResist:25, attackDamage:120, attackSpeed:1.05, abilityPower:70, mana:210},
        ability: {name:"Hellish Cleave", damage:240, type:"physical", effect:"burn", cooldown:13, duration:2}
    },
    champion82: { // Mage - common
        name: "Malora the Fiend Scholar",
        class: "mage",
        origin: "demon",
        rarity: "common",
        cost: 1,
        stats: {health:950, armor:25, magicResist:55, attackDamage:85, attackSpeed:1.0, abilityPower:165, mana:320},
        ability: {name:"Infernal Rune", damage:270, type:"magic", effect:"burn", cooldown:12, duration:2.5}
    },
    champion83: { // Assassin - rare
        name: "Xarn the Torment Stalker",
        class: "assassin",
        origin: "demon",
        rarity: "rare",
        cost: 2,
        stats: {health:880, armor:18, magicResist:35, attackDamage:145, attackSpeed:1.8, abilityPower:95, mana:230},
        ability: {name:"Demonic Ambush", damage:260, type:"physical", effect:"stealth", cooldown:10, duration:2}
    },
    champion84: { // Ranger - epic
        name: "Velira the Infernal Archer",
        class: "ranger",
        origin: "demon",
        rarity: "epic",
        cost: 3,
        stats: {health:980, armor:24, magicResist:30, attackDamage:120, attackSpeed:1.2, abilityPower:70, mana:220},
        ability: {name:"Hell Arrow", damage:220, type:"physical", effect:"burn", cooldown:11, duration:2}
    },
    champion85: { // Tank - common
        name: "Brugath the Hell Shield",
        class: "tank",
        origin: "demon",
        rarity: "common",
        cost: 1,
        stats: {health:1530, armor:52, magicResist:30, attackDamage:95, attackSpeed:0.95, abilityPower:50, mana:210},
        ability: {name:"Infernal Bulwark", damage:0, type:"physical", effect:"shield", cooldown:16, duration:3}
    },
    champion86: { // Support - rare
        name: "Zerina the Imp Healer",
        class: "support",
        origin: "demon",
        rarity: "rare",
        cost: 2,
        stats: {health:930, armor:25, magicResist:50, attackDamage:80, attackSpeed:1.05, abilityPower:135, mana:310},
        ability: {name:"Fiendish Mend", damage:0, type:"magic", effect:"heal", cooldown:14, duration:3}
    },
    champion87: { // Bard - epic
        name: "Rakkor the Hell Harp",
        class: "bard",
        origin: "demon",
        rarity: "epic",
        cost: 3,
        stats: {health:940, armor:22, magicResist:45, attackDamage:85, attackSpeed:1.1, abilityPower:105, mana:260},
        ability: {name:"Infernal Melody", damage:0, type:"magic", effect:"buff", cooldown:12, duration:4}
    },
    champion88: { // Necromancer - common
        name: "Vorath the Hell Crypt",
        class: "necromancer",
        origin: "demon",
        rarity: "common",
        cost: 1,
        stats: {health:930, armor:22, magicResist:50, attackDamage:85, attackSpeed:1.0, abilityPower:160, mana:330},
        ability: {name:"Fiendish Minions", damage:0, type:"magic", effect:"summon", cooldown:15, duration:4}
    },
    champion89: { // Paladin - rare
        name: "Cravos the Infernal Aegis",
        class: "paladin",
        origin: "demon",
        rarity: "rare",
        cost: 2,
        stats: {health:1400, armor:46, magicResist:35, attackDamage:100, attackSpeed:1.1, abilityPower:85, mana:220},
        ability: {name:"Demonic Shield", damage:0, type:"physical", effect:"shield", cooldown:18, duration:3.5}
    },
    champion90: { // Sorcerer - epic
        name: "Lilora the Hell Sage",
        class: "sorcerer",
        origin: "demon",
        rarity: "epic",
        cost: 3,
        stats: {health:1000, armor:28, magicResist:55, attackDamage:90, attackSpeed:1.05, abilityPower:175, mana:350},
        ability: {name:"Infernal Burst", damage:300, type:"magic", effect:"burn", cooldown:13, duration:2.5}
    },

    // Divine (91-100)
    champion91: { // Warrior - common
        name: "Alarion the Holy Blade",
        class: "warrior",
        origin: "divine",
        rarity: "common",
        cost: 1,
        stats: {health:1420, armor:50, magicResist:30, attackDamage:110, attackSpeed:1.05, abilityPower:60, mana:200},
        ability: {name:"Sacred Cleave", damage:220, type:"physical", effect:"stun", cooldown:13, duration:2}
    },
    champion92: { // Mage - rare
        name: "Seraphia the Angelic Scholar",
        class: "mage",
        origin: "divine",
        rarity: "rare",
        cost: 2,
        stats: {health:960, armor:25, magicResist:60, attackDamage:85, attackSpeed:1.0, abilityPower:170, mana:330},
        ability: {name:"Holy Rune", damage:270, type:"magic", effect:"heal", cooldown:12, duration:2.5}
    },
    champion93: { // Assassin - epic
        name: "Zelius the Seraph Stalker",
        class: "assassin",
        origin: "divine",
        rarity: "epic",
        cost: 3,
        stats: {health:890, armor:20, magicResist:35, attackDamage:145, attackSpeed:1.8, abilityPower:95, mana:240},
        ability: {name:"Angelic Ambush", damage:270, type:"physical", effect:"stealth", cooldown:10, duration:2}
    },
    champion94: { // Ranger - common
        name: "Ilyen the Blessed Archer",
        class: "ranger",
        origin: "divine",
        rarity: "common",
        cost: 1,
        stats: {health:980, armor:25, magicResist:35, attackDamage:120, attackSpeed:1.15, abilityPower:65, mana:210},
        ability: {name:"Holy Arrow", damage:210, type:"physical", effect:"stun", cooldown:11, duration:2}
    },
    champion95: { // Tank - rare
        name: "Thorus the Radiant Shield",
        class: "tank",
        origin: "divine",
        rarity: "rare",
        cost: 2,
        stats: {health:1560, armor:55, magicResist:35, attackDamage:95, attackSpeed:0.95, abilityPower:50, mana:230},
        ability: {name:"Blessed Bulwark", damage:0, type:"physical", effect:"shield", cooldown:16, duration:3}
    },
    champion96: { // Support - epic
        name: "Avenia the Holy Healer",
        class: "support",
        origin: "divine",
        rarity: "epic",
        cost: 3,
        stats: {health:950, armor:25, magicResist:50, attackDamage:80, attackSpeed:1.1, abilityPower:140, mana:320},
        ability: {name:"Seraphic Mend", damage:0, type:"magic", effect:"heal", cooldown:14, duration:3}
    },
    champion97: { // Bard - common
        name: "Calen the Angelic Lute",
        class: "bard",
        origin: "divine",
        rarity: "common",
        cost: 1,
        stats: {health:930, armor:20, magicResist:45, attackDamage:80, attackSpeed:1.05, abilityPower:100, mana:250},
        ability: {name:"Divine Melody", damage:0, type:"magic", effect:"buff", cooldown:12, duration:4}
    },
    champion98: { // Necromancer - rare
        name: "Elrath the Holy Crypt",
        class: "necromancer",
        origin: "divine",
        rarity: "rare",
        cost: 2,
        stats: {health:940, armor:24, magicResist:50, attackDamage:85, attackSpeed:1.0, abilityPower:160, mana:330},
        ability: {name:"Sacred Undead", damage:0, type:"magic", effect:"summon", cooldown:15, duration:4}
    },
    champion99: { // Paladin - epic
        name: "Jorian the Divine Aegis",
        class: "paladin",
        origin: "divine",
        rarity: "epic",
        cost: 3,
        stats: {health:1400, armor:50, magicResist:40, attackDamage:105, attackSpeed:1.1, abilityPower:85, mana:230},
        ability: {name:"Holy Shield", damage:0, type:"physical", effect:"shield", cooldown:18, duration:3.5}
    },
    champion100: { // Sorcerer - common
        name: "Merial the Angelic Sage",
        class: "sorcerer",
        origin: "divine",
        rarity: "common",
        cost: 1,
        stats: {health:990, armor:28, magicResist:60, attackDamage:90, attackSpeed:1.0, abilityPower:180, mana:350},
        ability: {name:"Seraphic Burst", damage:300, type:"magic", effect:"heal", cooldown:13, duration:2.5}
    },
    champion101: { // Ultimate Warrior
        name: "Zara the Worldbreaker",
        class: "warrior",
        origin: "primordial",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1800, armor: 60, magicResist: 40, attackDamage: 140, attackSpeed: 1.1, abilityPower: 90, mana: 250},
        ability: {name: "Cosmic Cleave", damage: 300, type: "physical", effect: "stun", cooldown: 15, duration: 2.5}
    },
    champion102: { // Ultimate Mage
        name: "Aetheron the Archmage",
        class: "mage",
        origin: "arcane",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1200, armor: 30, magicResist: 70, attackDamage: 100, attackSpeed: 1.0, abilityPower: 220, mana: 400},
        ability: {name: "Reality Warp", damage: 350, type: "magic", effect: "silence", cooldown: 16, duration: 3}
    },
    champion103: { // Ultimate Assassin
        name: "Shadowmere the Eternal Blade",
        class: "assassin",
        origin: "shadow",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1100, armor: 25, magicResist: 45, attackDamage: 180, attackSpeed: 2.0, abilityPower: 110, mana: 280},
        ability: {name: "Void Ambush", damage: 320, type: "physical", effect: "stealth", cooldown: 12, duration: 3}
    },
    champion104: { // Ultimate Ranger
        name: "Lyra the Starshot",
        class: "ranger",
        origin: "celestial",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1300, armor: 35, magicResist: 40, attackDamage: 150, attackSpeed: 1.3, abilityPower: 85, mana: 240},
        ability: {name: "Cosmic Arrow", damage: 280, type: "physical", effect: "stun", cooldown: 13, duration: 2}
    },
    champion105: { // Ultimate Tank
        name: "Gorgath the Immovable",
        class: "tank",
        origin: "earth",
        rarity: "legendary",
        cost: 4,
        stats: {health: 2200, armor: 70, magicResist: 50, attackDamage: 110, attackSpeed: 0.8, abilityPower: 60, mana: 260},
        ability: {name: "Titan's Bulwark", damage: 0, type: "physical", effect: "shield", cooldown: 20, duration: 4}
    },
    champion106: { // Ultimate Support
        name: "Seraphina the Lifebinder",
        class: "support",
        origin: "divine",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1250, armor: 35, magicResist: 60, attackDamage: 90, attackSpeed: 1.1, abilityPower: 190, mana: 350},
        ability: {name: "Celestial Restoration", damage: 0, type: "magic", effect: "heal", cooldown: 16, duration: 4}
    },
    champion107: { // Ultimate Bard
        name: "Orpheus the Cosmic Harmonist",
        class: "bard",
        origin: "astral",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1150, armor: 30, magicResist: 55, attackDamage: 95, attackSpeed: 1.2, abilityPower: 150, mana: 300},
        ability: {name: "Universal Melody", damage: 0, type: "magic", effect: "buff", cooldown: 15, duration: 5}
    },
    champion108: { // Ultimate Necromancer
        name: "Mortis the Eternal Summoner",
        class: "necromancer",
        origin: "void",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1300, armor: 35, magicResist: 55, attackDamage: 100, attackSpeed: 1.0, abilityPower: 200, mana: 380},
        ability: {name: "Cosmic Resurrection", damage: 0, type: "magic", effect: "summon", cooldown: 18, duration: 5}
    },
    champion109: { // Ultimate Paladin
        name: "Solarius the Radiant Protector",
        class: "paladin",
        origin: "light",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1700, armor: 60, magicResist: 45, attackDamage: 120, attackSpeed: 1.2, abilityPower: 100, mana: 240},
        ability: {name: "Aegis of Eternity", damage: 0, type: "physical", effect: "shield", cooldown: 20, duration: 4}
    },
    champion110: { // Ultimate Sorcerer
        name: "Nexus the Reality Weaver",
        class: "sorcerer",
        origin: "chaos",
        rarity: "legendary",
        cost: 4,
        stats: {health: 1250, armor: 35, magicResist: 65, attackDamage: 110, attackSpeed: 1.0, abilityPower: 210, mana: 400},
        ability: {name: "Dimensional Burst", damage: 350, type: "magic", effect: "silence", cooldown: 15, duration: 3}
    }
};