import * as THREE from 'three';

class Player {
    /**
     * @param {Object} game - The main Game instance.
     * @param {Object} options - Optional configuration for player.
     */
    constructor(game, options = {}) {
        this.game = game;
        
        // Player Stats
        this.health = options.health || 100;
        this.maxHealth = options.maxHealth || 100;
        this.energy = options.energy || 1;
        this.maxEnergy = options.maxEnergy || 1;

        this.level = options.level || 1;
        this.experience = options.experience || 0;
        this.nextLevelExperience = options.nextLevelExperience || 100;
        this.strength = options.strength || 10;
        this.dexterity = options.dexterity || 10;
        this.vitality = options.vitality || 10;
        this.playerEnergyStat = options.playerEnergyStat || 10; // Renamed to avoid confusion with energy resource
        this.statPoints = options.statPoints || 0;

        this.isMoving = false;
        this.isAttacking = false;
        this.animationTime = 0;
        this.animationSpeed = 10.0;
        this.attackTime = 0;

        this.mesh = this.createHumanoidMesh(0x0000ff); // Blue color for player
        this.mesh.userData = {
            name: 'Player',
            type: 'player',
            health: this.health,
            dialogue: '...',
            weight: 1
        };

        // Add to scene
        this.game.scene.add(this.mesh);
    }

    createHumanoidMesh(color) {
        const group = new THREE.Group();

        const bodyMaterial = new THREE.MeshLambertMaterial({ color });
        const body = new THREE.Mesh(new THREE.BoxGeometry(5, 10, 2), bodyMaterial);
        body.position.y = 10;
        group.add(body);

        const head = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), bodyMaterial);
        head.position.y = 17;
        group.add(head);

        const armMaterial = new THREE.MeshLambertMaterial({ color });
        const leftArm = new THREE.Mesh(new THREE.BoxGeometry(1, 8, 1), armMaterial);
        leftArm.position.set(-3.5, 10, 0);
        group.add(leftArm);

        const rightArm = new THREE.Mesh(new THREE.BoxGeometry(1, 8, 1), armMaterial);
        rightArm.position.set(3.5, 10, 0);
        group.add(rightArm);

        const legMaterial = new THREE.MeshLambertMaterial({ color });
        const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(2, 10, 2), legMaterial);
        leftLeg.position.set(-1, 5, 0);
        group.add(leftLeg);
        const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(2, 10, 2), legMaterial);
        rightLeg.position.set(1, 5, 0);
        group.add(rightLeg);

        group.head = head;
        group.body = body;
        group.leftArm = leftArm;
        group.rightArm = rightArm;
        group.leftLeg = leftLeg;
        group.rightLeg = rightLeg;

        return group;
    }

    update(delta) {
        // Example: handle animations or movement here
        if (this.isAttacking) {
            this.handleAttackAnimation(delta);
        } else if (this.isMoving) {
            this.handleWalkAnimation(delta);
        } else {
            this.resetLimbs();
        }
    }

    handleWalkAnimation(delta) {
        this.animationTime += delta * this.animationSpeed;
        const angle = Math.sin(this.animationTime) * (Math.PI / 6);

        this.mesh.leftArm.rotation.x = angle;
        this.mesh.rightArm.rotation.x = -angle;
        this.mesh.leftLeg.rotation.x = -angle;
        this.mesh.rightLeg.rotation.x = angle;
    }

    handleAttackAnimation(delta) {
        this.attackTime += delta * this.animationSpeed;
        const angle = Math.sin(this.attackTime * 20) * (Math.PI / 4);
        this.mesh.rightArm.rotation.x = -angle;

        if (this.attackTime > 0.5) {
            this.mesh.rightArm.rotation.x = 0;
            this.isAttacking = false;
            this.attackTime = 0;
        }
    }

    resetLimbs() {
        this.mesh.leftArm.rotation.x = 0;
        this.mesh.rightArm.rotation.x = 0;
        this.mesh.leftLeg.rotation.x = 0;
        this.mesh.rightLeg.rotation.x = 0;
    }

    attack() {
        this.isAttacking = true;
        this.attackTime = 0;
    }

    takeDamage(amount) {
        this.health -= amount;
        if (this.health <= 0) {
            this.health = 0;
            // Handle death logic
            alert('You have been defeated!');
        }
        // Update UI if needed
    }

    addExperience(amount) {
        this.experience += amount;
        if (this.experience >= this.nextLevelExperience) {
            this.levelUp();
        }
        // Update UI
    }

    levelUp() {
        this.level++;
        this.experience -= this.nextLevelExperience;
        this.nextLevelExperience = Math.floor(this.nextLevelExperience * 1.5);
        this.statPoints += 5;
        alert('Level Up! You have reached level ' + this.level);
    }
}

export default Player;
