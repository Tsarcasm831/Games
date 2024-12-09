(function(window) {
    // Declare mobs as a global variable with better management
    window.mobs = {
        list: [],
        types: {
            ZOMBIE: 'zombie',
            SKELETON: 'skeleton',
            CREEPER: 'creeper'
        }
    };

    const MOB_STATES = {
        IDLE: 'idle',
        WANDERING: 'wandering',
        CHASING: 'chasing',
        ATTACKING: 'attacking',
        FLEEING: 'fleeing'
    };

    class Mob {
        constructor(position, type = window.mobs.types.ZOMBIE) {
            this.type = type;
            this.mesh = this.createMesh(type);
            this.state = MOB_STATES.IDLE;
            this.stateTimer = 0;
            this.aggroRange = 15;
            this.attackRange = 2;
            this.attackCooldown = 0;

            // Randomized mob attributes
            this.speed = 1 + Math.random(); // Varied speed
            this.health = 50 + Math.floor(Math.random() * 20); // Random health variation
            this.damage = 5 + Math.floor(Math.random() * 5); // Random damage variation

            // Use terrain height calculation from terrain.js
            const spawnHeight = getTerrainHeight(position.x, position.z);
            
            // Position mob slightly above terrain (like player)
            this.mesh.position.set(
                position.x, 
                spawnHeight + 0.5,  // Add small offset to prevent sinking
                position.z
            );
            
            scene.add(this.mesh);
            this.direction = new THREE.Vector3(
                (Math.random() - 0.5),
                0,
                (Math.random() - 0.5)
            ).normalize();
        }

        createMesh(type) {
            const mobGroup = new THREE.Group();
            
            // Color variations based on mob type
            const colorMap = {
                [window.mobs.types.ZOMBIE]: { skin: 0x00ff00, clothes: 0x333333 },
                [window.mobs.types.SKELETON]: { skin: 0xffffff, clothes: 0x888888 },
                [window.mobs.types.CREEPER]: { skin: 0x00aa00, clothes: 0x00ff00 }
            };

            const colors = colorMap[type] || colorMap[window.mobs.types.ZOMBIE];
            const skinMaterial = new THREE.MeshPhongMaterial({ color: colors.skin });
            const clothesMaterial = new THREE.MeshPhongMaterial({ color: colors.clothes });

            // Materials
            const hairMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });
            const shoeMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
            const eyeMaterial = new THREE.MeshPhongMaterial({ color: 0x000000 });

            // Torso
            const torsoGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
            const torso = new THREE.Mesh(torsoGeometry, clothesMaterial);
            torso.position.y = 1.75;
            mobGroup.add(torso);

            // Head
            const headGeometry = new THREE.SphereGeometry(0.4, 32, 32);
            const head = new THREE.Mesh(headGeometry, skinMaterial);
            head.position.y = 2.75;
            mobGroup.add(head);

            // Hair
            const hairGeometry = new THREE.SphereGeometry(0.42, 32, 32, 0, Math.PI);
            const hair = new THREE.Mesh(hairGeometry, hairMaterial);
            hair.position.y = 2.85;
            mobGroup.add(hair);

            // Left Arm
            const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1, 32);
            const leftArm = new THREE.Mesh(armGeometry, clothesMaterial);
            leftArm.position.set(-0.75, 1.5, 0);
            leftArm.rotation.z = Math.PI / 8;
            mobGroup.add(leftArm);

            // Right Arm
            const rightArm = new THREE.Mesh(armGeometry, clothesMaterial);
            rightArm.position.set(0.75, 1.5, 0);
            rightArm.rotation.z = -Math.PI / 8;
            mobGroup.add(rightArm);

            // Left Leg
            const legGeometry = new THREE.CylinderGeometry(0.15, 0.15, 1.5, 32);
            const leftLeg = new THREE.Mesh(legGeometry, clothesMaterial);
            leftLeg.position.set(-0.3, 0.75, 0);
            mobGroup.add(leftLeg);

            // Right Leg
            const rightLeg = new THREE.Mesh(legGeometry, clothesMaterial);
            rightLeg.position.set(0.3, 0.75, 0);
            mobGroup.add(rightLeg);

            // Shoes
            const shoeGeometry = new THREE.BoxGeometry(0.3, 0.1, 0.5);
            const leftShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
            leftShoe.position.set(-0.3, 0, 0.25);
            mobGroup.add(leftShoe);

            const rightShoe = new THREE.Mesh(shoeGeometry, shoeMaterial);
            rightShoe.position.set(0.3, 0, 0.25);
            mobGroup.add(rightShoe);

            // Eyes
            const eyeGeometry = new THREE.SphereGeometry(0.05, 16, 16);
            const leftEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
            leftEye.position.set(-0.15, 2.8, 0.39);
            mobGroup.add(leftEye);

            const rightEye = new THREE.Mesh(eyeGeometry, eyeMaterial);
            rightEye.position.set(0.15, 2.8, 0.39);
            mobGroup.add(rightEye);

            // Set initial scale if needed
            mobGroup.scale.set(1, 1, 1);

            // Enable casting and receiving shadows for all parts
            mobGroup.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                }
            });

            return mobGroup;
        }

        update(delta) {
            this.stateTimer += delta;
            this.attackCooldown = Math.max(0, this.attackCooldown - delta);

            const currentX = this.mesh.position.x;
            const currentZ = this.mesh.position.z;
            
            // Get current terrain height
            const terrainHeight = getTerrainHeight(currentX, currentZ);
            
            // Maintain consistent height above terrain
            this.mesh.position.y = terrainHeight + 0.5;

            const distanceToPlayer = this.mesh.position.distanceTo(player.position);

            // Advanced state machine
            switch (this.state) {
                case MOB_STATES.IDLE:
                    if (this.stateTimer > 3) {
                        this.state = MOB_STATES.WANDERING;
                        this.stateTimer = 0;
                    }
                    break;

                case MOB_STATES.WANDERING:
                    const moveDistance = this.speed * delta;
                    const movement = this.direction.clone().multiplyScalar(moveDistance);
                    
                    // Predict next position's terrain height
                    const nextX = currentX + movement.x;
                    const nextZ = currentZ + movement.z;
                    const nextTerrainHeight = getTerrainHeight(nextX, nextZ);
                    
                    // Limit movement on steep terrain
                    const heightDifference = Math.abs(nextTerrainHeight - terrainHeight);
                    if (heightDifference <= 1) {  // Allow small height variations
                        this.mesh.position.x = nextX;
                        this.mesh.position.z = nextZ;
                    } else {
                        // Change direction if terrain is too steep
                        this.direction.negate();
                    }

                    // Randomize direction
                    if (Math.random() < 0.02) {
                        this.direction.set(
                            (Math.random() - 0.5),
                            0,
                            (Math.random() - 0.5)
                        ).normalize();
                    }

                    if (distanceToPlayer < this.aggroRange) {
                        this.state = MOB_STATES.CHASING;
                    }

                    if (this.stateTimer > 5) {
                        this.state = MOB_STATES.IDLE;
                        this.stateTimer = 0;
                    }
                    break;

                case MOB_STATES.CHASING:
                    const chaseDirection = new THREE.Vector3()
                        .subVectors(player.position, this.mesh.position)
                        .normalize();
                    
                    const chaseDistance = this.speed * delta * 1.5;
                    const chaseMovement = chaseDirection.multiplyScalar(chaseDistance);
                    
                    const chaseNextX = currentX + chaseMovement.x;
                    const chaseNextZ = currentZ + chaseMovement.z;
                    const chaseNextTerrainHeight = getTerrainHeight(chaseNextX, chaseNextZ);
                    
                    // Limit chase on steep terrain
                    const chaseHeightDifference = Math.abs(chaseNextTerrainHeight - terrainHeight);
                    if (chaseHeightDifference <= 1) {
                        this.mesh.position.x = chaseNextX;
                        this.mesh.position.z = chaseNextZ;
                    }

                    if (distanceToPlayer <= this.attackRange) {
                        this.state = MOB_STATES.ATTACKING;
                    }

                    if (distanceToPlayer > this.aggroRange * 1.5) {
                        this.state = MOB_STATES.WANDERING;
                    }
                    break;

                case MOB_STATES.ATTACKING:
                    if (this.attackCooldown <= 0) {
                        this.attackPlayer();
                        this.attackCooldown = 1; // 1 second cooldown
                    }

                    if (distanceToPlayer > this.attackRange) {
                        this.state = MOB_STATES.CHASING;
                    }
                    break;
            }
        }

        attackPlayer() {
            if (player.health !== undefined) {
                player.health = Math.max(0, player.health - this.damage);
                updateStatusBars();
                
                // Optional: Add screen shake or visual feedback
                if (window.cameraShake) {
                    window.cameraShake(0.2);
                }
            }
        }

        takeDamage(amount) {
            this.health -= amount;
            
            if (this.health <= 0) {
                this.die();
            } else {
                // Optional: Add hit reaction or fleeing logic
                if (this.health < 20) {
                    this.state = MOB_STATES.FLEEING;
                }
            }
        }

        die() {
            scene.remove(this.mesh);
            window.mobs.list = window.mobs.list.filter(mob => mob !== this);
            
            // Optional: Drop loot, play death animation
            this.dropLoot();
        }

        dropLoot() {
            // Placeholder for loot system
            if (Math.random() < 0.3) {
                // Create a loot item
                console.log('Mob dropped loot');
            }
        }
    }

    window.spawnMobs = function(count = 10, spawnRadius = 50) {
        const mobTypes = Object.values(window.mobs.types);

        for (let i = 0; i < count; i++) {
            const x = (Math.random() - 0.5) * spawnRadius * 2;
            const z = (Math.random() - 0.5) * spawnRadius * 2;
            const y = getTerrainHeight(x, z);
            
            const randomType = mobTypes[Math.floor(Math.random() * mobTypes.length)];
            const mobPosition = new THREE.Vector3(x, y, z);
            const mob = new Mob(mobPosition, randomType);
            
            window.mobs.list.push(mob);
        }
    };

    function updateMobs(delta) {
        // Performance optimization: Use traditional for loop
        for (let i = 0; i < window.mobs.list.length; i++) {
            window.mobs.list[i].update(delta);
        }
    }

    function getTerrainHeight(x, z) {
        const baseNoise = simplex.noise2D(x / 500, z / 500);
        const detailNoise = simplex.noise2D(x / 100, z / 100) * 0.5;
        const combinedNoise = (baseNoise + detailNoise) / 1.5;
        return combinedNoise * settings.terrainHeight;
    }

    function updateStatusBars() {
        document.querySelector('#health-bar .bar-fill').style.width = `${health}%`;
        document.querySelector('#hunger-bar .bar-fill').style.width = `${hunger}%`;
    }

    const player = {
        position: new THREE.Vector3(0, 0, 0),
        health: 100
    };

    const settings = {
        chunkSize: 100,
        renderDistance: 5,
        gravity: 9.81, 
        terrainHeight: 10,
        waterLevel: 0.5
    };

    window.updateMobs = updateMobs;
})(window);