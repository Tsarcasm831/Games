const biomes = {
    PLAINS: { color: 0x555555, treeColor: 0x333333, treeFrequency: 0.02 },
    FOREST: { color: 0x444444, treeColor: 0x222222, treeFrequency: 0.01 },
    DENSE_FOREST: { color: 0x333333, treeColor: 0x111111, treeFrequency: 0.005 },
    DESERT: { color: 0x777777, treeColor: 0x555555, treeFrequency: 0.005 },
    TUNDRA: { color: 0x999999, treeColor: 0x666666, treeFrequency: 0.01 },
    JUNGLE: { color: 0x666666, treeColor: 0x333333, treeFrequency: 0.005 },
    GROVE: { color: 0x888888, treeColor: 0x444444, treeFrequency: 0.01 },
    BEACH: { color: 0x666666, treeColor: 0x333333, treeFrequency: 0.005 }
};

function getBiome(x, z) {
    const temperature = simplex.noise2D(x / 1000, z / 1000);
    const moisture = simplex.noise2D(x / 1000 + 1000, z / 1000 + 1000);
    const denseForestNoise = simplex.noise2D(x / 500, z / 500);
    const groveNoise = simplex.noise2D(x / 300, z / 300);
    const beachNoise = simplex.noise2D(x / 200, z / 200);

    const terrainHeight = getTerrainHeight(x, z);
    const waterSurfaceHeight = settings.terrainHeight * settings.waterLevel - 10;
    const nearWater = Math.abs(terrainHeight - waterSurfaceHeight) < 5;

    if (temperature < -0.5) return biomes.TUNDRA;
    if (temperature > 0.5 && moisture < -0.3) return biomes.DESERT;
    if (moisture > 0.3) return biomes.JUNGLE;
    if (moisture > 0 || temperature > 0) {
        if (denseForestNoise > 0.2) return biomes.DENSE_FOREST;
        if (groveNoise > 0.3) return biomes.GROVE;
        if (nearWater && beachNoise > 0.6 && temperature > 0) return biomes.BEACH;
        return biomes.FOREST;
    }
    return biomes.PLAINS;
}

function getCurrentBiome() {
    return getBiome(player.position.x, player.position.z);
}

function updateBiomeInfo() {
    const currentBiome = getCurrentBiome();
    const biomeNames = {
        [biomes.PLAINS]: "Plains",
        [biomes.FOREST]: "Forest",
        [biomes.DENSE_FOREST]: "Dense Forest",
        [biomes.DESERT]: "Desert",
        [biomes.TUNDRA]: "Tundra",
        [biomes.JUNGLE]: "Jungle",
        [biomes.GROVE]: "Grove",
        [biomes.BEACH]: "Beach"
    };
    const biomeName = biomeNames[currentBiome] || "Unknown";
    document.getElementById('biome-info').textContent = `Current Biome: ${biomeName}`;
}