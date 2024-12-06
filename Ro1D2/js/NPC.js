import * as THREE from 'three';

class NPC {
    /**
     * @param {Object} game - The main Game instance.
     * @param {Object} options - name, dialogue, color, position, etc.
     */
    constructor(game, options = {}) {
        this.game = game;
        this.name = options.name || 'Friendly NPC';
        this.dialogue = options.dialogue || 'Hello, traveler!';
        this.health = options.health || 100;
        this.color = options.color || 0x00ff00;
        this.position = options.position || { x:0, y:0, z:0 };

        this.mesh = this.createHumanoidMesh(this.color);
        this.mesh.position.set(this.position.x, this.position.y, this.position.z);

        // Store data in userData for reference elsewhere
        this.mesh.userData = {
            type: 'friendly',
            name: this.name,
            dialogue: this.dialogue,
            health: this.health
        };

        this.game.scene.add(this.mesh);
    }

    createHumanoidMesh(color) {
        const group = new THREE.Group();
        const material = new THREE.MeshLambertMaterial({ color });

        const body = new THREE.Mesh(new THREE.BoxGeometry(5, 10, 2), material);
        body.position.y = 10;
        group.add(body);

        const head = new THREE.Mesh(new THREE.BoxGeometry(3, 3, 3), material);
        head.position.y = 17;
        group.add(head);

        const leftArm = new THREE.Mesh(new THREE.BoxGeometry(1, 8, 1), material);
        leftArm.position.set(-3.5, 10, 0);
        group.add(leftArm);

        const rightArm = new THREE.Mesh(new THREE.BoxGeometry(1, 8, 1), material);
        rightArm.position.set(3.5, 10, 0);
        group.add(rightArm);

        const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(2, 10, 2), material);
        leftLeg.position.set(-1, 5, 0);
        group.add(leftLeg);

        const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(2, 10, 2), material);
        rightLeg.position.set(1, 5, 0);
        group.add(rightLeg);

        // Store references
        group.head = head;
        group.body = body;
        group.leftArm = leftArm;
        group.rightArm = rightArm;
        group.leftLeg = leftLeg;
        group.rightLeg = rightLeg;

        return group;
    }

    interact() {
        // Show NPC dialogue or use UI manager to show a popup
        alert(`${this.name} says: "${this.dialogue}"`);
    }

    update(delta) {
        // NPC could have idle animations or other behavior
        // For now, NPC stands still.
    }

    setDialogue(newDialogue) {
        this.dialogue = newDialogue;
        this.mesh.userData.dialogue = newDialogue;
    }

    setName(newName) {
        this.name = newName;
        this.mesh.userData.name = newName;
    }

    setColors(headColor, bodyColor, armColor, legColor) {
        // Update colors of each body part
        this.headColor = headColor;
        this.bodyColor = bodyColor;
        this.armColor = armColor;
        this.legColor = legColor;

        // Apply colors
        this.mesh.head.material.color.set(headColor);
        this.mesh.body.material.color.set(bodyColor);
        this.mesh.leftArm.material.color.set(armColor);
        this.mesh.rightArm.material.color.set(armColor);
        this.mesh.leftLeg.material.color.set(legColor);
        this.mesh.rightLeg.material.color.set(legColor);
    }
}

export default NPC;
