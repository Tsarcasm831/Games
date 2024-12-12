const unitTypes = {
    // Anthromorph Species
    anthromorph_hunterGatherers: { // Hunter-Gatherers – common
        name: "Hunter-Gatherers",
        species: "Anthromorph",
        rarity: "common",
        cost: 1,
        stats: {
            health: 1000,
            armor: 30,
            magicResist: 20,
            attackDamage: 90,
            attackSpeed: 1.1,
            abilityPower: 50,
            mana: 150
        },
        ability: {
            name: "Survival Instinct",
            damage: 150,
            type: "physical",
            effect: "heal",
            cooldown: 10,
            duration: 2
        }
    },
    anthromorph_shamans: { // Shamans – rare
        name: "Shamans",
        species: "Anthromorph",
        rarity: "rare",
        cost: 3,
        stats: {
            health: 900,
            armor: 25,
            magicResist: 40,
            attackDamage: 80,
            attackSpeed: 1.0,
            abilityPower: 140,
            mana: 300
        },
        ability: {
            name: "Nature's Bond",
            damage: 0,
            type: "magic",
            effect: "buff",
            cooldown: 12,
            duration: 3
        }
    },
    anthromorph_warriors: { // Warriors – epic
        name: "Warriors",
        species: "Anthromorph",
        rarity: "epic",
        cost: 4,
        stats: {
            health: 1500,
            armor: 50,
            magicResist: 30,
            attackDamage: 120,
            attackSpeed: 0.9,
            abilityPower: 60,
            mana: 200
        },
        ability: {
            name: "Clan Protector",
            damage: 200,
            type: "physical",
            effect: "shield",
            cooldown: 15,
            duration: 3
        }
    },
    anthromorph_artisans: { // Artisans – uncommon
        name: "Artisans",
        species: "Anthromorph",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 850,
            armor: 20,
            magicResist: 35,
            attackDamage: 100,
            attackSpeed: 1.05,
            abilityPower: 80,
            mana: 220
        },
        ability: {
            name: "Intricate Craft",
            damage: 0,
            type: "magic",
            effect: "trap",
            cooldown: 14,
            duration: 2
        }
    },
    anthromorph_nomads: { // Nomads – common
        name: "Nomads",
        species: "Anthromorph",
        rarity: "common",
        cost: 1,
        stats: {
            health: 950,
            armor: 22,
            magicResist: 25,
            attackDamage: 95,
            attackSpeed: 1.2,
            abilityPower: 65,
            mana: 210
        },
        ability: {
            name: "Seasonal Adapt",
            damage: 0,
            type: "magic",
            effect: "speed boost",
            cooldown: 10,
            duration: 2
        }
    },

    // Avianos Species
    avianos_skyguardians: { // Skyguardians – common
        name: "Skyguardians",
        species: "Avianos",
        rarity: "common",
        cost: 1,
        stats: {
            health: 1100,
            armor: 28,
            magicResist: 22,
            attackDamage: 105,
            attackSpeed: 1.2,
            abilityPower: 60,
            mana: 190
        },
        ability: {
            name: "Aerial Strike",
            damage: 160,
            type: "physical",
            effect: "slow",
            cooldown: 11,
            duration: 2
        }
    },
    avianos_windcallers: { // Windcallers – rare
        name: "Windcallers",
        species: "Avianos",
        rarity: "rare",
        cost: 3,
        stats: {
            health: 950,
            armor: 24,
            magicResist: 38,
            attackDamage: 90,
            attackSpeed: 1.05,
            abilityPower: 150,
            mana: 320
        },
        ability: {
            name: "Wind Manipulation",
            damage: 200,
            type: "magic",
            effect: "freeze",
            cooldown: 13,
            duration: 2.5
        }
    },
    avianos_songweavers: { // Songweavers – epic
        name: "Songweavers",
        species: "Avianos",
        rarity: "epic",
        cost: 4,
        stats: {
            health: 900,
            armor: 26,
            magicResist: 40,
            attackDamage: 85,
            attackSpeed: 1.0,
            abilityPower: 160,
            mana: 330
        },
        ability: {
            name: "Melodic Tale",
            damage: 0,
            type: "magic",
            effect: "story buff",
            cooldown: 14,
            duration: 3
        }
    },
    avianos_nestbuilders: { // Nestbuilders – uncommon
        name: "Nestbuilders",
        species: "Avianos",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 1000,
            armor: 30,
            magicResist: 25,
            attackDamage: 95,
            attackSpeed: 1.1,
            abilityPower: 70,
            mana: 240
        },
        ability: {
            name: "Fortification",
            damage: 0,
            type: "magic",
            effect: "build shelter",
            cooldown: 12,
            duration: 2
        }
    },
    avianos_scouts: { // Scouts – common
        name: "Scouts",
        species: "Avianos",
        rarity: "common",
        cost: 1,
        stats: {
            health: 850,
            armor: 20,
            magicResist: 20,
            attackDamage: 80,
            attackSpeed: 1.3,
            abilityPower: 55,
            mana: 180
        },
        ability: {
            name: "Intelligence Gathering",
            damage: 0,
            type: "magic",
            effect: "reveal",
            cooldown: 8,
            duration: 0
        }
    },

    // Behemoth Species
    behemoth_terraguards: { // Terraguards – epic
        name: "Terraguards",
        species: "Behemoth",
        rarity: "epic",
        cost: 4,
        stats: {
            health: 2000,
            armor: 60,
            magicResist: 35,
            attackDamage: 120,
            attackSpeed: 0.9,
            abilityPower: 70,
            mana: 250
        },
        ability: {
            name: "Earth Shield",
            damage: 0,
            type: "physical",
            effect: "shield",
            cooldown: 15,
            duration: 3
        }
    },
    behemoth_ravagers: { // Ravagers – common
        name: "Ravagers",
        species: "Behemoth",
        rarity: "common",
        cost: 1,
        stats: {
            health: 1300,
            armor: 35,
            magicResist: 25,
            attackDamage: 130,
            attackSpeed: 1.0,
            abilityPower: 65,
            mana: 210
        },
        ability: {
            name: "Destructive Force",
            damage: 180,
            type: "physical",
            effect: "knockback",
            cooldown: 10,
            duration: 1.5
        }
    },
    behemoth_earthshapers: { // Earthshapers – uncommon
        name: "Earthshapers",
        species: "Behemoth",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 1600,
            armor: 45,
            magicResist: 30,
            attackDamage: 110,
            attackSpeed: 1.0,
            abilityPower: 75,
            mana: 230
        },
        ability: {
            name: "Land Modification",
            damage: 0,
            type: "magic",
            effect: "create barrier",
            cooldown: 14,
            duration: 3
        }
    },
    behemoth_solitaryTitans: { // Solitary Titans – legendary
        name: "Solitary Titans",
        species: "Behemoth",
        rarity: "legendary",
        cost: 5,
        stats: {
            health: 3000,
            armor: 80,
            magicResist: 50,
            attackDamage: 200,
            attackSpeed: 0.8,
            abilityPower: 100,
            mana: 400
        },
        ability: {
            name: "Wandering Fury",
            damage: 300,
            type: "physical",
            effect: "stun",
            cooldown: 20,
            duration: 2
        }
    },
    behemoth_primordialAncients: { // Primordial Ancients – legendary
        name: "Primordial Ancients",
        species: "Behemoth",
        rarity: "legendary",
        cost: 5,
        stats: {
            health: 3500,
            armor: 90,
            magicResist: 60,
            attackDamage: 220,
            attackSpeed: 0.7,
            abilityPower: 150,
            mana: 500
        },
        ability: {
            name: "Ancient Wisdom",
            damage: 0,
            type: "magic",
            effect: "mass heal",
            cooldown: 25,
            duration: 5
        }
    },

    // Chiropteran Species
    chiropteran_nightstalkers: { // Nightstalkers – epic
        name: "Nightstalkers",
        species: "Chiropteran",
        rarity: "epic",
        cost: 4,
        stats: {
            health: 900,
            armor: 25,
            magicResist: 35,
            attackDamage: 110,
            attackSpeed: 1.4,
            abilityPower: 85,
            mana: 220
        },
        ability: {
            name: "Shadow Ambush",
            damage: 200,
            type: "physical",
            effect: "stealth",
            cooldown: 12,
            duration: 2
        }
    },
    chiropteran_echoSeers: { // Echo Seers – rare
        name: "Echo Seers",
        species: "Chiropteran",
        rarity: "rare",
        cost: 3,
        stats: {
            health: 800,
            armor: 20,
            magicResist: 30,
            attackDamage: 90,
            attackSpeed: 1.2,
            abilityPower: 120,
            mana: 300
        },
        ability: {
            name: "Echolocation",
            damage: 0,
            type: "magic",
            effect: "reveal",
            cooldown: 10,
            duration: 0
        }
    },
    chiropteran_bloodbinders: { // Bloodbinders – legendary
        name: "Bloodbinders",
        species: "Chiropteran",
        rarity: "legendary",
        cost: 5,
        stats: {
            health: 950,
            armor: 22,
            magicResist: 40,
            attackDamage: 100,
            attackSpeed: 1.3,
            abilityPower: 200,
            mana: 350
        },
        ability: {
            name: "Blood Magic",
            damage: 250,
            type: "magic",
            effect: "toxin",
            cooldown: 20,
            duration: 3
        }
    },
    chiropteran_cavekeepers: { // Cavekeepers – uncommon
        name: "Cavekeepers",
        species: "Chiropteran",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 850,
            armor: 18,
            magicResist: 25,
            attackDamage: 85,
            attackSpeed: 1.1,
            abilityPower: 70,
            mana: 180
        },
        ability: {
            name: "Tunnel Defense",
            damage: 0,
            type: "magic",
            effect: "trap",
            cooldown: 12,
            duration: 2
        }
    },
    chiropteran_wingblades: { // Wingblades – common
        name: "Wingblades",
        species: "Chiropteran",
        rarity: "common",
        cost: 1,
        stats: {
            health: 800,
            armor: 15,
            magicResist: 20,
            attackDamage: 95,
            attackSpeed: 1.5,
            abilityPower: 60,
            mana: 160
        },
        ability: {
            name: "Blade Flurry",
            damage: 130,
            type: "physical",
            effect: "bleed",
            cooldown: 8,
            duration: 1.5
        }
    },

    // Dengar Charger Species
    dengarCharger_battleRams: { // Battle Rams – common
        name: "Battle Rams",
        species: "Dengar Charger",
        rarity: "common",
        cost: 1,
        stats: {
            health: 1200,
            armor: 35,
            magicResist: 20,
            attackDamage: 100,
            attackSpeed: 1.0,
            abilityPower: 50,
            mana: 180
        },
        ability: {
            name: "Charge",
            damage: 150,
            type: "physical",
            effect: "knockback",
            cooldown: 10,
            duration: 2
        }
    },
    dengarCharger_ironbacks: { // Ironbacks – uncommon
        name: "Ironbacks",
        species: "Dengar Charger",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 1400,
            armor: 50,
            magicResist: 25,
            attackDamage: 90,
            attackSpeed: 0.9,
            abilityPower: 60,
            mana: 200
        },
        ability: {
            name: "Living Shield",
            damage: 0,
            type: "physical",
            effect: "shield allies",
            cooldown: 14,
            duration: 3
        }
    },
    dengarCharger_groundShakers: { // Groundshakers – rare
        name: "Groundshakers",
        species: "Dengar Charger",
        rarity: "rare",
        cost: 3,
        stats: {
            health: 1600,
            armor: 40,
            magicResist: 30,
            attackDamage: 110,
            attackSpeed: 1.0,
            abilityPower: 70,
            mana: 220
        },
        ability: {
            name: "Tremor",
            damage: 180,
            type: "physical",
            effect: "disrupt enemy formation",
            cooldown: 16,
            duration: 2
        }
    },
    dengarCharger_warHerds: { // War Herds – epic
        name: "War Herds",
        species: "Dengar Charger",
        rarity: "epic",
        cost: 4,
        stats: {
            health: 1800,
            armor: 45,
            magicResist: 35,
            attackDamage: 140,
            attackSpeed: 1.1,
            abilityPower: 80,
            mana: 250
        },
        ability: {
            name: "Herd Assault",
            damage: 220,
            type: "physical",
            effect: "overwhelm enemies",
            cooldown: 18,
            duration: 3
        }
    },
    dengarCharger_rampagers: { // Rampagers – legendary
        name: "Rampagers",
        species: "Dengar Charger",
        rarity: "legendary",
        cost: 5,
        stats: {
            health: 2000,
            armor: 55,
            magicResist: 40,
            attackDamage: 160,
            attackSpeed: 1.2,
            abilityPower: 100,
            mana: 300
        },
        ability: {
            name: "Berserk Fury",
            damage: 300,
            type: "physical",
            effect: "unrelenting attack",
            cooldown: 25,
            duration: 4
        }
    },

    // Kilrathi Species
    kilrathi_bladeclaws: { // Bladeclaws – epic
        name: "Bladeclaws",
        species: "Kilrathi",
        rarity: "epic",
        cost: 4,
        stats: {
            health: 1100,
            armor: 35,
            magicResist: 25,
            attackDamage: 140,
            attackSpeed: 1.3,
            abilityPower: 80,
            mana: 210
        },
        ability: {
            name: "Swift Strike",
            damage: 250,
            type: "physical",
            effect: "critical hit",
            cooldown: 12,
            duration: 2
        }
    },
    kilrathi_honorGuards: { // Honor Guards – legendary
        name: "Honor Guards",
        species: "Kilrathi",
        rarity: "legendary",
        cost: 5,
        stats: {
            health: 1600,
            armor: 50,
            magicResist: 35,
            attackDamage: 130,
            attackSpeed: 1.0,
            abilityPower: 90,
            mana: 250
        },
        ability: {
            name: "Noble Defense",
            damage: 0,
            type: "physical",
            effect: "shield allies",
            cooldown: 20,
            duration: 4
        }
    },
    kilrathi_shadowStrikers: { // Shadow Strikers – rare
        name: "Shadow Strikers",
        species: "Kilrathi",
        rarity: "rare",
        cost: 3,
        stats: {
            health: 800,
            armor: 18,
            magicResist: 22,
            attackDamage: 100,
            attackSpeed: 1.5,
            abilityPower: 65,
            mana: 180
        },
        ability: {
            name: "Infiltrate",
            damage: 180,
            type: "physical",
            effect: "sabotage",
            cooldown: 10,
            duration: 2
        }
    },
    kilrathi_beastTamers: { // Beast Tamers – uncommon
        name: "Beast Tamers",
        species: "Kilrathi",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 900,
            armor: 20,
            magicResist: 25,
            attackDamage: 95,
            attackSpeed: 1.1,
            abilityPower: 70,
            mana: 190
        },
        ability: {
            name: "Tame Beast",
            damage: 0,
            type: "magic",
            effect: "summon ally",
            cooldown: 14,
            duration: 3
        }
    },
    kilrathi_warChiefs: { // War Chiefs – legendary
        name: "War Chiefs",
        species: "Kilrathi",
        rarity: "legendary",
        cost: 5,
        stats: {
            health: 1500,
            armor: 45,
            magicResist: 30,
            attackDamage: 160,
            attackSpeed: 1.0,
            abilityPower: 110,
            mana: 300
        },
        ability: {
            name: "Battle Command",
            damage: 300,
            type: "physical",
            effect: "army buff",
            cooldown: 25,
            duration: 5
        }
    },

    // Prometheus AI Species
    prometheus_sentinels: { // Sentinels – common
        name: "Sentinels",
        species: "Prometheus AI",
        rarity: "common",
        cost: 1,
        stats: {
            health: 800,
            armor: 25,
            magicResist: 20,
            attackDamage: 90,
            attackSpeed: 1.2,
            abilityPower: 50,
            mana: 150
        },
        ability: {
            name: "Perimeter Defense",
            damage: 100,
            type: "physical",
            effect: "taunt",
            cooldown: 8,
            duration: 2
        }
    },
    prometheus_harvesters: { // Harvesters – uncommon
        name: "Harvesters",
        species: "Prometheus AI",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 900,
            armor: 30,
            magicResist: 25,
            attackDamage: 100,
            attackSpeed: 1.1,
            abilityPower: 60,
            mana: 180
        },
        ability: {
            name: "Resource Extraction",
            damage: 0,
            type: "magic",
            effect: "gain resources",
            cooldown: 12,
            duration: 0
        }
    },
    prometheus_warMachines: { // War Machines – epic
        name: "War Machines",
        species: "Prometheus AI",
        rarity: "epic",
        cost: 4,
        stats: {
            health: 1500,
            armor: 50,
            magicResist: 35,
            attackDamage: 180,
            attackSpeed: 0.8,
            abilityPower: 80,
            mana: 220
        },
        ability: {
            name: "Massive Assault",
            damage: 300,
            type: "physical",
            effect: "area damage",
            cooldown: 20,
            duration: 2
        }
    },
    prometheus_logicCoders: { // Logic Coders – rare
        name: "Logic Coders",
        species: "Prometheus AI",
        rarity: "rare",
        cost: 3,
        stats: {
            health: 850,
            armor: 28,
            magicResist: 30,
            attackDamage: 95,
            attackSpeed: 1.0,
            abilityPower: 130,
            mana: 250
        },
        ability: {
            name: "System Upgrade",
            damage: 0,
            type: "magic",
            effect: "buff",
            cooldown: 15,
            duration: 3
        }
    },
    prometheus_constructors: { // Constructors – uncommon
        name: "Constructors",
        species: "Prometheus AI",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 900,
            armor: 35,
            magicResist: 28,
            attackDamage: 100,
            attackSpeed: 1.05,
            abilityPower: 70,
            mana: 200
        },
        ability: {
            name: "Build Fortification",
            damage: 0,
            type: "magic",
            effect: "construct",
            cooldown: 14,
            duration: 3
        }
    },

    // Tal’Ehn Species
    talehn_techsmiths: { // Techsmiths – uncommon
        name: "Techsmiths",
        species: "Tal’Ehn",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 850,
            armor: 25,
            magicResist: 20,
            attackDamage: 90,
            attackSpeed: 1.1,
            abilityPower: 80,
            mana: 200
        },
        ability: {
            name: "Weapon Crafting",
            damage: 0,
            type: "magic",
            effect: "enhance weapons",
            cooldown: 12,
            duration: 3
        }
    },
    talehn_starfarers: { // Starfarers – rare
        name: "Starfarers",
        species: "Tal’Ehn",
        rarity: "rare",
        cost: 3,
        stats: {
            health: 900,
            armor: 28,
            magicResist: 25,
            attackDamage: 100,
            attackSpeed: 1.2,
            abilityPower: 90,
            mana: 220
        },
        ability: {
            name: "Galaxy Navigation",
            damage: 0,
            type: "magic",
            effect: "teleport",
            cooldown: 15,
            duration: 0
        }
    },
    talehn_cybermancers: { // Cybermancers – epic
        name: "Cybermancers",
        species: "Tal’Ehn",
        rarity: "epic",
        cost: 4,
        stats: {
            health: 950,
            armor: 30,
            magicResist: 30,
            attackDamage: 110,
            attackSpeed: 1.0,
            abilityPower: 160,
            mana: 300
        },
        ability: {
            name: "Reality Warp",
            damage: 250,
            type: "magic",
            effect: "alter reality",
            cooldown: 20,
            duration: 3
        }
    },
    talehn_archivists: { // Archivists – uncommon
        name: "Archivists",
        species: "Tal’Ehn",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 800,
            armor: 20,
            magicResist: 22,
            attackDamage: 85,
            attackSpeed: 1.0,
            abilityPower: 100,
            mana: 180
        },
        ability: {
            name: "Knowledge Shield",
            damage: 0,
            type: "magic",
            effect: "shield",
            cooldown: 10,
            duration: 2
        }
    },
    talehn_voidwalkers: { // Voidwalkers – legendary
        name: "Voidwalkers",
        species: "Tal’Ehn",
        rarity: "legendary",
        cost: 5,
        stats: {
            health: 1200,
            armor: 35,
            magicResist: 30,
            attackDamage: 150,
            attackSpeed: 1.3,
            abilityPower: 180,
            mana: 350
        },
        ability: {
            name: "Stealth Strike",
            damage: 300,
            type: "physical",
            effect: "invisibility",
            cooldown: 25,
            duration: 3
        }
    },

    // Talorian Species
    talorian_diplomaticEnvoys: { // Diplomatic Envoys – rare
        name: "Diplomatic Envoys",
        species: "Talorian",
        rarity: "rare",
        cost: 3,
        stats: {
            health: 900,
            armor: 22,
            magicResist: 25,
            attackDamage: 90,
            attackSpeed: 1.0,
            abilityPower: 130,
            mana: 220
        },
        ability: {
            name: "Peace Treaty",
            damage: 0,
            type: "magic",
            effect: "calm enemies",
            cooldown: 15,
            duration: 3
        }
    },
    talorian_skyArchitects: { // Sky Architects – uncommon
        name: "Sky Architects",
        species: "Talorian",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 850,
            armor: 20,
            magicResist: 22,
            attackDamage: 85,
            attackSpeed: 1.05,
            abilityPower: 90,
            mana: 200
        },
        ability: {
            name: "Floating City",
            damage: 0,
            type: "magic",
            effect: "build floating structure",
            cooldown: 14,
            duration: 3
        }
    },
    talorian_chronomancers: { // Chronomancers – legendary
        name: "Chronomancers",
        species: "Talorian",
        rarity: "legendary",
        cost: 5,
        stats: {
            health: 1000,
            armor: 25,
            magicResist: 30,
            attackDamage: 120,
            attackSpeed: 1.0,
            abilityPower: 200,
            mana: 400
        },
        ability: {
            name: "Time Warp",
            damage: 0,
            type: "magic",
            effect: "control time",
            cooldown: 25,
            duration: 5
        }
    },
    talorian_etherealKnights: { // Ethereal Knights – epic
        name: "Ethereal Knights",
        species: "Talorian",
        rarity: "epic",
        cost: 4,
        stats: {
            health: 1300,
            armor: 40,
            magicResist: 35,
            attackDamage: 160,
            attackSpeed: 0.9,
            abilityPower: 120,
            mana: 250
        },
        ability: {
            name: "Energy Shield",
            damage: 0,
            type: "magic",
            effect: "shield",
            cooldown: 18,
            duration: 3
        }
    },
    talorian_lorekeepers: { // Lorekeepers – uncommon
        name: "Lorekeepers",
        species: "Talorian",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 800,
            armor: 18,
            magicResist: 20,
            attackDamage: 80,
            attackSpeed: 1.1,
            abilityPower: 100,
            mana: 180
        },
        ability: {
            name: "Historical Insight",
            damage: 0,
            type: "magic",
            effect: "reveal enemy weaknesses",
            cooldown: 10,
            duration: 2
        }
    },

    // T’ana’Rhe Species
    tanaRhe_skyDancers: { // Sky Dancers – uncommon
        name: "Sky Dancers",
        species: "T’ana’Rhe",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 850,
            armor: 20,
            magicResist: 22,
            attackDamage: 85,
            attackSpeed: 1.3,
            abilityPower: 75,
            mana: 200
        },
        ability: {
            name: "Inspiring Movement",
            damage: 0,
            type: "magic",
            effect: "buff allies",
            cooldown: 12,
            duration: 3
        }
    },
    tanaRhe_psionicWielders: { // Psionic Wielders – legendary
        name: "Psionic Wielders",
        species: "T’ana’Rhe",
        rarity: "legendary",
        cost: 5,
        stats: {
            health: 1000,
            armor: 25,
            magicResist: 25,
            attackDamage: 100,
            attackSpeed: 1.0,
            abilityPower: 200,
            mana: 350
        },
        ability: {
            name: "Mental Manipulation",
            damage: 250,
            type: "magic",
            effect: "control enemy",
            cooldown: 25,
            duration: 3
        }
    },
    tanaRhe_flockleaders: { // Flockleaders – epic
        name: "Flockleaders",
        species: "T’ana’Rhe",
        rarity: "epic",
        cost: 4,
        stats: {
            health: 900,
            armor: 22,
            magicResist: 25,
            attackDamage: 95,
            attackSpeed: 1.2,
            abilityPower: 110,
            mana: 220
        },
        ability: {
            name: "Coordinated Strike",
            damage: 180,
            type: "physical",
            effect: "group attack",
            cooldown: 15,
            duration: 2
        }
    },
    tanaRhe_aetherOracles: { // Aether Oracles – rare
        name: "Aether Oracles",
        species: "T’ana’Rhe",
        rarity: "rare",
        cost: 3,
        stats: {
            health: 800,
            armor: 18,
            magicResist: 20,
            attackDamage: 80,
            attackSpeed: 1.1,
            abilityPower: 90,
            mana: 180
        },
        ability: {
            name: "Fate Glimpse",
            damage: 0,
            type: "magic",
            effect: "foresee enemy moves",
            cooldown: 10,
            duration: 2
        }
    },
    tanaRhe_feathercladScouts: { // Featherclad Scouts – common
        name: "Featherclad Scouts",
        species: "T’ana’Rhe",
        rarity: "common",
        cost: 1,
        stats: {
            health: 750,
            armor: 15,
            magicResist: 18,
            attackDamage: 75,
            attackSpeed: 1.4,
            abilityPower: 60,
            mana: 160
        },
        ability: {
            name: "Silent Observation",
            damage: 0,
            type: "magic",
            effect: "reveal",
            cooldown: 8,
            duration: 0
        }
    },

    // Vyraxus Species
    vyraxus_ashwalkers: { // Ashwalkers – common
        name: "Ashwalkers",
        species: "Vyraxus",
        rarity: "common",
        cost: 1,
        stats: {
            health: 900,
            armor: 20,
            magicResist: 15,
            attackDamage: 85,
            attackSpeed: 1.1,
            abilityPower: 50,
            mana: 170
        },
        ability: {
            name: "Survive Ash",
            damage: 0,
            type: "magic",
            effect: "damage reduction",
            cooldown: 8,
            duration: 2
        }
    },
    vyraxus_flameborne: { // Flameborne – rare
        name: "Flameborne",
        species: "Vyraxus",
        rarity: "rare",
        cost: 3,
        stats: {
            health: 1000,
            armor: 25,
            magicResist: 20,
            attackDamage: 100,
            attackSpeed: 1.0,
            abilityPower: 80,
            mana: 220
        },
        ability: {
            name: "Fire Resistance",
            damage: 0,
            type: "magic",
            effect: "immune to fire",
            cooldown: 12,
            duration: 3
        }
    },
    vyraxus_voidcallers: { // Voidcallers – epic
        name: "Voidcallers",
        species: "Vyraxus",
        rarity: "epic",
        cost: 4,
        stats: {
            health: 1100,
            armor: 28,
            magicResist: 25,
            attackDamage: 110,
            attackSpeed: 1.05,
            abilityPower: 120,
            mana: 250
        },
        ability: {
            name: "Void Connection",
            damage: 200,
            type: "magic",
            effect: "void blast",
            cooldown: 15,
            duration: 2
        }
    },
    vyraxus_sandstormers: { // Sandstormers – uncommon
        name: "Sandstormers",
        species: "Vyraxus",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 950,
            armor: 22,
            magicResist: 18,
            attackDamage: 95,
            attackSpeed: 1.2,
            abilityPower: 70,
            mana: 200
        },
        ability: {
            name: "Sand Blast",
            damage: 150,
            type: "physical",
            effect: "blind",
            cooldown: 10,
            duration: 2
        }
    },
    vyraxus_fossilbinders: { // Fossilbinders – uncommon
        name: "Fossilbinders",
        species: "Vyraxus",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 950,
            armor: 25,
            magicResist: 20,
            attackDamage: 90,
            attackSpeed: 1.0,
            abilityPower: 75,
            mana: 210
        },
        ability: {
            name: "Ancient Guard",
            damage: 0,
            type: "magic",
            effect: "summon guardian",
            cooldown: 14,
            duration: 3
        }
    },

    // Xithrian Species
    xithrian_morphblades: { // Morphblades – epic
        name: "Morphblades",
        species: "Xithrian",
        rarity: "epic",
        cost: 4,
        stats: {
            health: 1000,
            armor: 30,
            magicResist: 25,
            attackDamage: 130,
            attackSpeed: 1.3,
            abilityPower: 90,
            mana: 220
        },
        ability: {
            name: "Shape Shift",
            damage: 200,
            type: "physical",
            effect: "adapt form",
            cooldown: 15,
            duration: 2
        }
    },
    xithrian_facewalkers: { // Facewalkers – legendary
        name: "Facewalkers",
        species: "Xithrian",
        rarity: "legendary",
        cost: 5,
        stats: {
            health: 1200,
            armor: 35,
            magicResist: 30,
            attackDamage: 140,
            attackSpeed: 1.2,
            abilityPower: 150,
            mana: 300
        },
        ability: {
            name: "Infiltrate",
            damage: 250,
            type: "physical",
            effect: "take enemy form",
            cooldown: 25,
            duration: 3
        }
    },
    xithrian_chameleons: { // Chameleons – uncommon
        name: "Chameleons",
        species: "Xithrian",
        rarity: "uncommon",
        cost: 2,
        stats: {
            health: 850,
            armor: 20,
            magicResist: 18,
            attackDamage: 85,
            attackSpeed: 1.1,
            abilityPower: 65,
            mana: 180
        },
        ability: {
            name: "Blend In",
            damage: 0,
            type: "magic",
            effect: "invisibility",
            cooldown: 10,
            duration: 2
        }
    },
    xithrian_echoforms: { // Echoforms – rare
        name: "Echoforms",
        species: "Xithrian",
        rarity: "rare",
        cost: 3,
        stats: {
            health: 900,
            armor: 22,
            magicResist: 20,
            attackDamage: 95,
            attackSpeed: 1.2,
            abilityPower: 80,
            mana: 200
        },
        ability: {
            name: "Create Decoy",
            damage: 0,
            type: "magic",
            effect: "summon decoy",
            cooldown: 12,
            duration: 3
        }
    },
    xithrian_mimicLords: { // Mimic Lords – legendary
        name: "Mimic Lords",
        species: "Xithrian",
        rarity: "legendary",
        cost: 5,
        stats: {
            health: 1500,
            armor: 40,
            magicResist: 35,
            attackDamage: 160,
            attackSpeed: 1.0,
            abilityPower: 200,
            mana: 350
        },
        ability: {
            name: "Ultimate Shapeshift",
            damage: 300,
            type: "physical",
            effect: "full transformation",
            cooldown: 30,
            duration: 5
        }
    }
    // Add remaining units following the same pattern...
};
