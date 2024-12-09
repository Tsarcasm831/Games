// Global constants and variables
const PARTICLE_POOL_SIZE = 15000;
const particlePool = [];

let scene, camera, renderer, player, water, breakingIndicator;
let moveForward = false, moveBackward = false, moveLeft = false, moveRight = false, jump = false;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();
let isLocked = false;
let raycaster, interactableObjects = [];
let canJump = true;
let breakingObject = null;
let isPaused = false;

const settings = {
    chunkSize: 400,
    chunkResolution: 100,
    terrainHeight: 25,
    waterLevel: 0.02,
    treeCount: 5,
    renderDistance: 2,
    gravity: -20,
    jumpForce: 10,
    swimForce: 3,
    swimDrag: 0.9
};

const chunks = new Map();
const simplex = new SimplexNoise();
const mobs = [];
const clock = new THREE.Clock();

let currentWeather = 'clear';
let rainParticles, snowParticles;
let rainClouds = [];

let health = 100;
let hunger = 100;