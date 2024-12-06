import * as THREE from 'three';

class Enemy {
    /**
     * @param {Object} game - The main Game instance.
     * @param {Object} options - Configuration for the enemy (position, type, color, etc.)
     */
    constructor(game, options = {}) {
        this.game = game;
        
        this.type = options.type || 'red'; // Could be 'red' or 'blue'
        this.color = (this.type === 'blue') ? 0x0000ff : 0xff0000;
        this.damageRate = (this.type === 'blue') ? 4 : 2;

        this.position = options.position || { x: 0, y: 0, z: 0 };
        this.isDead = false;
        this.hasBeenLooted = false;
        this.deathTime = 0; 
        this.isMoving = true;
        this.animationTime = 0;
        this.animationSpeed = 10.0;
        
        // Direction for random wandering
        const randomAngle = Math.random() * Math.PI * 2;
        this.direction = new THREE.Vector3(Math.cos(randomAngle), 0, Math.sin(randomAngle));

        this.mesh = this.createHumanoidMesh(this.color);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);
        this.mesh.userData = {
            type: 'hostile',
            isDead: this.isDead,
            hasBeenLooted: this.hasBeenLooted,
            deathTime: this.deathTime,
            damageRate: this.damageRate
        };

        this.game.scene.add(this.mesh);
    }

    createHumanoidMesh(color) {
        const group = new THREE.Group();
        const material = new THREE.MeshLambertMaterial({ color });

        const body = new THREE.Mesh(new THREE.BoxGeometry(5, 10, 2), material);
        body.position.y = 10;
        group.add(body);

        const head = new THREE.Mesh(new THREE.BoxGeometry(3,3,3), material);
        head.position.y = 17;
        group.add(head);

        const leftArm = new THREE.Mesh(new THREE.BoxGeometry(1,8,1), material);
        leftArm.position.set(-3.5, 10, 0);
        group.add(leftArm);

        const rightArm = new THREE.Mesh(new THREE.BoxGeometry(1,8,1), material);
        rightArm.position.set(3.5, 10, 0);
        group.add(rightArm);

        const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(2,10,2), material);
        leftLeg.position.set(-1,5,0);
        group.add(leftLeg);

        const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(2,10,2), material);
        rightLeg.position.set(1,5,0);
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
        if (this.isDead) {
            this.handleDeathAnimation(delta);
            return;
        }

        // Move logic: either wander or chase the player if in range
        this.move(delta);

        // Animate the enemy if moving
        if (this.isMoving) {
            this.animateMovement(delta);
        } else {
            this.resetLimbs();
        }
    }

    move(delta) {
        const playerPos = this.game.player.mesh.position;
        const enemyPos = this.mesh.position.clone();
        const directionToPlayer = new THREE.Vector3().subVectors(playerPos, enemyPos);
        const distanceToPlayer = directionToPlayer.length();

        const threatRange = 100;
        const attackRange = 10;
        const enemySpeed = this.game.globalEnemySpeed || 0.7;

        if (distanceToPlayer <= attackRange) {
            // Attack player
            this.isMoving = false;
            this.attackPlayer(delta);
        } else if (distanceToPlayer <= threatRange) {
            // Move towards player
            directionToPlayer.normalize();
            const oldPosition = this.mesh.position.clone();
            this.mesh.position.add(directionToPlayer.multiplyScalar(enemySpeed));

            if (this.checkCollisions()) {
                this.mesh.position.copy(oldPosition);
                this.isMoving = false;
            } else {
                this.isMoving = true;
                const angle = Math.atan2(directionToPlayer.x, directionToPlayer.z);
                this.mesh.rotation.y = angle;
            }
        } else {
            // Wander around
            const oldPosition = this.mesh.position.clone();
            const moveVector = this.direction.clone().multiplyScalar(0.5);
            this.mesh.position.add(moveVector);

            if (this.checkCollisions()) {
                this.mesh.position.copy(oldPosition);
                // Change direction randomly
                const newAngle = Math.random() * Math.PI * 2;
                this.direction.set(Math.cos(newAngle), 0, Math.sin(newAngle));
                this.isMoving = false;
            } else {
                this.isMoving = true;
                const angle = Math.atan2(moveVector.x, moveVector.z);
                this.mesh.rotation.y = angle;
            }
        }
    }

    checkCollisions() {
        // Check collisions with walls or enemyWalls from the game
        const enemyBox = new THREE.Box3().setFromObject(this.mesh);
        for (let wall of this.game.walls) {
            const wallBox = new THREE.Box3().setFromObject(wall);
            if (enemyBox.intersectsBox(wallBox)) return true;
        }

        for (let wall of this.game.enemyWalls) {
            const wallBox = new THREE.Box3().setFromObject(wall);
            if (enemyBox.intersectsBox(wallBox)) return true;
        }

        return false;
    }

    attackPlayer(delta) {
        if (this.isDead || this.game.playerInvulnerable) return;
        // Damage based on damageRate and delta
        const damage = this.damageRate * delta;
        const actualDamage = Math.max(0, damage - (this.game.characterStats.vitality / 10));
        this.game.player.takeDamage(actualDamage);
    }

    handleDeathAnimation(delta) {
        this.deathTime += delta;
        if (this.deathTime < 1) {
            this.mesh.rotation.x = -Math.PI/2 * (this.deathTime / 1);
        } else {
            this.mesh.rotation.x = -Math.PI / 2;
            // Optionally create a blood pool or perform other actions
            // This can be done by the main game or here if you have a reference method
        }
    }

    animateMovement(delta) {
        this.animationTime += delta * this.animationSpeed;
        const angle = Math.sin(this.animationTime) * (Math.PI / 6);

        this.mesh.leftArm.rotation.x = angle;
        this.mesh.rightArm.rotation.x = -angle;
        this.mesh.leftLeg.rotation.x = -angle;
        this.mesh.rightLeg.rotation.x = angle;
    }

    resetLimbs() {
        this.mesh.leftArm.rotation.x = 0;
        this.mesh.rightArm.rotation.x = 0;
        this.mesh.leftLeg.rotation.x = 0;
        this.mesh.rightLeg.rotation.x = 0;
    }

    defeat() {
        this.isMoving = false;
        this.isDead = true;
        this.deathTime = 0;
        this.mesh.userData.isDead = true;
        // The player can gain experience/gold from here or from outside logic
    }
}

export default Enemy;
