function getTerrainHeight(x, z) {
    const baseNoise = simplex.noise2D(x / 500, z / 500);
    const detailNoise = simplex.noise2D(x / 100, z / 100) * 0.5;
    const combinedNoise = (baseNoise + detailNoise) / 1.5;
    return combinedNoise * settings.terrainHeight;
}

function generateChunkTerrain(chunkX, chunkZ) {
    const chunkKey = `${chunkX},${chunkZ}`;
    if (chunks.has(chunkKey)) return chunks.get(chunkKey);

    const geometry = terrainGeometry.clone();
    const vertices = geometry.attributes.position.array;
    const colors = new Float32Array(vertices.length);

    for (let i = 0; i < vertices.length; i += 3) {
        const x = vertices[i] + chunkX * settings.chunkSize;
        const z = vertices[i + 2] + chunkZ * settings.chunkSize;

        const baseNoise = simplex.noise2D(x / 500, z / 500);
        const detailNoise = simplex.noise2D(x / 100, z / 100) * 0.5;
        const combinedNoise = (baseNoise + detailNoise) / 1.5;

        vertices[i + 1] = combinedNoise * settings.terrainHeight;

        const biome = getBiome(x, z);
        const color = new THREE.Color(biome.color);
        colors[i] = color.r;
        colors[i + 1] = color.g;
        colors[i + 2] = color.b;
    }

    geometry.computeVertexNormals();
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const terrain = new THREE.Mesh(geometry, terrainMaterial);
    terrain.receiveShadow = true;
    terrain.castShadow = true;

    const chunkGroup = new THREE.Group();
    chunkGroup.add(terrain);

    // Add trees, rocks, boulders, spider_webs as in original code
    const waterSurfaceHeight = settings.terrainHeight * settings.waterLevel - 10;

    for (let i = 0; i < settings.treeCount; i++) {
        const x = Math.random() * settings.chunkSize;
        const z = Math.random() * settings.chunkSize;
        const worldX = x + chunkX * settings.chunkSize;
        const worldZ = z + chunkZ * settings.chunkSize;
        const y = getTerrainHeight(worldX, worldZ);
        const biome = getBiome(worldX, worldZ);

        if (y > waterSurfaceHeight && Math.random() < biome.treeFrequency) {
            let object;
            let objectType;
            if (biome === biomes.DESERT) {
                object = createCactus();
                objectType = 'cactus';
            } else if (biome === biomes.GROVE) {
                object = createAppleTree();
                objectType = 'apple_tree';
            } else if (biome === biomes.BEACH) {
                object = createPalmTree();
                objectType = 'palm_tree';
            } else {
                object = createStylizedTree(biome.treeColor);
                objectType = 'tree';
            }
            object.position.set(x, y, z);
            chunkGroup.add(object);
            interactableObjects.push({ mesh: object, type: objectType, health: 50 });
        }
    }

    const rockCount = 5;
    for (let i = 0; i < rockCount; i++) {
        const x = Math.random() * settings.chunkSize;
        const z = Math.random() * settings.chunkSize;
        const worldX = x + chunkX * settings.chunkSize;
        const worldZ = z + chunkZ * settings.chunkSize;
        const y = getTerrainHeight(worldX, worldZ);

        if (y > waterSurfaceHeight) {
            const rock = createRock();
            rock.position.set(x, y, z);
            chunkGroup.add(rock);
            interactableObjects.push({ mesh: rock, type: 'rock', health: 25 });
        }
    }

    const boulderCount = 2;
    for (let i = 0; i < boulderCount; i++) {
        const x = Math.random() * settings.chunkSize;
        const z = Math.random() * settings.chunkSize;
        const worldX = x + chunkX * settings.chunkSize;
        const worldZ = z + chunkZ * settings.chunkSize;
        const y = getTerrainHeight(worldX, worldZ);

        if (y > waterSurfaceHeight) {
            const boulder = createBoulder();
            boulder.position.set(x, y, z);
            chunkGroup.add(boulder);
            interactableObjects.push({ mesh: boulder, type: 'boulder', health: 50 });
        }
    }

    const webCount = 3; 
    for (let i = 0; i < webCount; i++) {
        const x = Math.random() * settings.chunkSize;
        const z = Math.random() * settings.chunkSize;
        const worldX = x + chunkX * settings.chunkSize;
        const worldZ = z + chunkZ * settings.chunkSize;
        const y = getTerrainHeight(worldX, worldZ);
        const biome = getBiome(worldX, worldZ);

        if (biome === biomes.DESERT && y > waterSurfaceHeight) {
            const web = createSpiderWeb();
            web.position.set(x, y + 1, z); 
            chunkGroup.add(web);
            interactableObjects.push({ mesh: web, type: 'spider_web', health: 10 });
        }
    }

    chunkGroup.position.set(chunkX * settings.chunkSize, 0, chunkZ * settings.chunkSize);
    scene.add(chunkGroup);
    chunks.set(chunkKey, chunkGroup);
    return chunkGroup;
}

function updateChunks() {
    const playerChunkX = Math.floor(player.position.x / settings.chunkSize);
    const playerChunkZ = Math.floor(player.position.z / settings.chunkSize);

    for (let x = -settings.renderDistance; x <= settings.renderDistance; x++) {
        for (let z = -settings.renderDistance; z <= settings.renderDistance; z++) {
            const chunkX = playerChunkX + x;
            const chunkZ = playerChunkZ + z;
            generateChunkTerrain(chunkX, chunkZ);
        }
    }

    for (const [key, chunk] of chunks.entries()) {
        const [chunkX, chunkZ] = key.split(',').map(Number);
        const distance = Math.max(Math.abs(chunkX - playerChunkX), Math.abs(chunkZ - playerChunkZ));
        chunk.visible = distance <= settings.renderDistance;
    }

    updateBiomeInfo();
}