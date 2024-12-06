import * as THREE from 'three';
import UIManager from './UIManager.js';
import Player from './player.js';
import Enemy from './Enemy.js';
// If you have NPC, InventoryManager, etc., import them too:
// import NPC from './NPC.js';
// import InventoryManager from './InventoryManager.js';

class Game {
    constructor() {
        // Three.js basics
        this.scene = new THREE.Scene();
        this.clock = new THREE.Clock();
        this.renderer = null;
        this.camera = null;
        this.minimapCamera = null;

        // Game entities
        this.player = null;
        this.enemies = [];
        this.friendlies = [];   // For NPCs
        this.structures = [];
        this.quadrupeds = [];
        this.walls = [];
        this.enemyWalls = [];
        this.treasureChests = [];

        // Game state variables
        this.globalEnemySpeed = 0.7;
        this.isTeleporting = false;
        this.teleportProgress = 0;
        this.teleportationDuration = 3;
        this.previousPosition = null;

        this.rotateLeft = false;
        this.rotateRight = false;
        this.cameraTargetAngle = 0;
        this.currentCameraAngle = 0;
        this.cameraRotationSpeed = 0.05;

        // UI Manager
        this.uiManager = new UIManager(this);

        // Other managers if you have them:
        // this.inventoryManager = new InventoryManager(this);

        // Call init after construction
        this.init();
    }

    init() {
        const canvas = document.getElementById('gameCanvas');
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.autoClear = false;

        // Set up main camera
        this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(0, 50, 100);
        this.camera.lookAt(new THREE.Vector3(0,0,0));

        // Set up minimap camera
        this.minimapCamera = new THREE.OrthographicCamera(-200, 200, 200, -200, 0.1, 10000);
        this.minimapCamera.position.set(0, 500, 0);
        this.minimapCamera.up.set(0,0,-1);
        this.minimapCamera.lookAt(0,0,0);

        // Basic lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
        directionalLight.position.set(0,100,0);
        this.scene.add(directionalLight);

        // Initialize UI
        this.uiManager.init();

        // Create player
        this.player = new Player(this);

        // You can spawn enemies or other entities as before:
        // let enemy = new Enemy(this, { position: {x:50,y:0,z:50}, type: 'red' });
        // this.enemies.push(enemy);

        // Add event listeners
        this.setupEventListeners();

        // If you have logic from your original code such as:
        // - createGround()
        // - createSafeZone()
        // - populateWorld()
        // - spawnInitialEnemies()
        // Just call them here as methods you define in this class.
        // Example:
        // this.createGround();
        // this.createSafeZone();
        // this.populateWorld();

        // Start animation loop
        this.animate();
    }

    setupEventListeners() {
        window.addEventListener('resize', () => this.onWindowResize());

        // Keyboard events
        document.addEventListener('keydown', (e) => this.onKeyDown(e));
        document.addEventListener('keyup', (e) => this.onKeyUp(e));

        // Mouse events if needed
        const canvas = this.renderer.domElement;
        canvas.addEventListener('mousedown', (e) => this.onMouseDown(e));
        canvas.addEventListener('mouseup', (e) => this.onMouseUp(e));
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    onKeyDown(event) {
        // Mirror key controls you had before:
        if (event.key.toLowerCase() === 'i') {
            this.uiManager.toggleInventory();
        }

        if (event.key.toLowerCase() === 'c') {
            this.uiManager.toggleStats();
        }

        if (event.key.toLowerCase() === 'h') {
            this.uiManager.toggleHelpWindow();
        }

        // Rotate camera
        if (event.key.toLowerCase() === 'a') {
            this.rotateLeft = true;
        }
        if (event.key.toLowerCase() === 'd') {
            this.rotateRight = true;
        }

        // Add more key controls as in your original code
    }

    onKeyUp(event) {
        if (event.key.toLowerCase() === 'a') {
            this.rotateLeft = false;
        }
        if (event.key.toLowerCase() === 'd') {
            this.rotateRight = false;
        }
    }

    onMouseDown(event) {
        // Implement selection logic or movement logic that was in your original code
        // Example: set a destination for the player if clicked on ground
    }

    onMouseUp(event) {
        // Stop movement or do something else
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        const delta = this.clock.getDelta();

        // Update player
        if (this.player) this.player.update(delta);

        // Update enemies
        this.enemies.forEach(enemy => enemy.update(delta));

        // Update NPCs, quadrupeds, etc.
        this.friendlies.forEach(npc => npc.update(delta));
        this.quadrupeds.forEach(quad => {
            // If you have quadruped logic, run it here
        });

        // Handle camera rotation
        if (this.rotateLeft) {
            this.cameraTargetAngle -= this.cameraRotationSpeed;
        }
        if (this.rotateRight) {
            this.cameraTargetAngle += this.cameraRotationSpeed;
        }

        this.currentCameraAngle += (this.cameraTargetAngle - this.currentCameraAngle)*0.1;

        const cameraRadius = 100;
        const cameraHeight = 50;
        const cameraOffset = new THREE.Vector3(
            Math.sin(this.currentCameraAngle)*cameraRadius,
            cameraHeight,
            Math.cos(this.currentCameraAngle)*cameraRadius
        );

        this.camera.position.copy(this.player.mesh.position).add(cameraOffset);
        this.camera.lookAt(this.player.mesh.position);

        // Render main scene
        this.renderer.clear();
        this.renderer.setScissorTest(false);
        this.renderer.render(this.scene, this.camera);

        // Render minimap
        this.renderMinimap();
    }

    renderMinimap() {
        const minimapContainer = document.getElementById('minimapContainer');
        if (!minimapContainer) return; 

        const mapWidth = minimapContainer.clientWidth;
        const mapHeight = minimapContainer.clientHeight;
        const minimapRect = minimapContainer.getBoundingClientRect();
        const canvasRect = this.renderer.domElement.getBoundingClientRect();
        const minimapX = minimapRect.left - canvasRect.left;
        const minimapY = minimapRect.top - canvasRect.top;

        this.minimapCamera.position.x = this.player.mesh.position.x;
        this.minimapCamera.position.z = this.player.mesh.position.z;

        this.renderer.setViewport(
            minimapX,
            canvasRect.height - minimapY - mapHeight,
            mapWidth,
            mapHeight
        );
        this.renderer.setScissor(
            minimapX,
            canvasRect.height - minimapY - mapHeight,
            mapWidth,
            mapHeight
        );
        this.renderer.setScissorTest(true);
        this.renderer.render(this.scene, this.minimapCamera);
    }

    // Add your additional methods that were originally in your huge script:
    // createGround(), createSafeZone(), populateWorld(),
    // spawnEnemies(), startTeleportation(), updateTeleportation(), etc.
    // Just ensure you integrate them cleanly and reference `this` where needed.

}

export default Game;
