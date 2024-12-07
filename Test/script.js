const scene = new THREE.Scene(); // Added scene initialization
const moveSpeed = 0.2; // For player movement
const joystick = {
    active: false,
    touchId: null,
    baseX: 0,
    baseY: 0,
    knobX: 0,
    knobY: 0
};
let cameraRotation = 0; // New variable for camera rotation
let touchStartX = null; // Initialize touchStartX
let targetRotation = 0;

let playerCoins = 0;
let inventoryOpen = false;
let isPaused = false; // Added pause state

// Add day/night cycle
let dayNightCycle = 0;

// Create inventory panel
const inventoryPanel = document.createElement('div');
inventoryPanel.id = 'inventory-panel';
document.body.appendChild(inventoryPanel);

const inventoryGrid = document.createElement('div');
inventoryGrid.className = 'inventory-grid';
inventoryPanel.appendChild(inventoryGrid);

// Create inventory slots
for(let i = 0; i < 30; i++) {
    const slot = document.createElement('div');
    slot.className = 'inventory-slot';
    inventoryGrid.appendChild(slot);
}

// Add inventory toggle handler
document.getElementById('inventory-button').addEventListener('click', (e) => {
    e.preventDefault();
    inventoryOpen = !inventoryOpen;
    document.getElementById('inventory-panel').style.display = inventoryOpen ? 'block' : 'none';
    isPaused = inventoryOpen; // Pause the game when inventory is open
});

// Pause menu handling
const pauseButton = document.getElementById('pause-button');
const pauseMenu = document.getElementById('pause-menu');
const resumeButton = document.getElementById('resume-button');
const settingsButton = document.getElementById('settings-button');
const quitButton = document.getElementById('quit-button');

function togglePause() {
    isPaused = !isPaused;
    pauseMenu.style.display = isPaused ? 'block' : 'none';

    if (isPaused) {
        // Stop movement and interactions
        isMovingForward = false;
    }
}

pauseButton.addEventListener('click', togglePause);
resumeButton.addEventListener('click', togglePause);

settingsButton.addEventListener('click', () => {
    alert('Settings menu coming soon!');
});

quitButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to quit?')) {
        window.location.reload();
    }
});

// Update currency display
function updateCurrency(amount) {
    playerCoins += amount;
    document.querySelector('#currency-display span').textContent = playerCoins;
}

function checkHousePosition(position, existingPositions) {
    const minDistance = 15; // Minimum distance between houses

    for(let existingPosition of existingPositions) {
        const distance = position.distanceTo(existingPosition);
        if(distance < minDistance) {
            return true; // Too close to another house
        }
    }

    if(position.length() > 50) {
        return true; // Too far from center
    }

    return false; // Position is okay
}

function checkCollision(position, radius) {
    // Only check for houses now
    for (const house of houses) {
        const housePos = house.mesh.position;
        const distance = new THREE.Vector3(position.x, 0, position.z)
            .distanceTo(new THREE.Vector3(housePos.x, 0, housePos.z));
        if (distance < (4 + radius)) {
            return true;
        }
    }
    return false;
}

function createRandomGradient() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    const color1 = `hsl(${Math.random() * 360}, ${70 + Math.random() * 30}%, ${60 + Math.random() * 20}%)`;
    const color2 = `hsl(${Math.random() * 360}, ${70 + Math.random() * 30}%, ${60 + Math.random() * 20}%)`;

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, color1);
    gradient.addColorStop(1, color2);

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return canvas;
}

function addRandomPattern(canvas, color) {
    const ctx = canvas.getContext('2d');
    const patternType = Math.floor(Math.random() * 4);

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;

    switch(patternType) {
        case 0: // Stripes
            for(let i = 0; i < canvas.width; i += 10) {
                ctx.beginPath();
                ctx.moveTo(i, 0);
                ctx.lineTo(i, canvas.height);
                ctx.stroke();
            }
            break;
        case 1: // Dots
            for(let i = 0; i < 100; i++) {
                ctx.beginPath();
                ctx.arc(
                    Math.random() * canvas.width,
                    Math.random() * canvas.height,
                    2 + Math.random() * 4,
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            }
            break;
        case 2: // Zigzag
            ctx.beginPath();
            let x = 0;
            let y = 0;
            while(y < canvas.height) {
                x = x === 0 ? 20 : 0;
                y += 10;
                ctx.lineTo(x, y);
            }
            ctx.stroke();
            break;
        case 3: // Squares
            for(let i = 0; i < canvas.width; i += 20) {
                for(let j = 0; j < canvas.height; j += 20) {
                    if((i + j) % 40 === 0) {
                        ctx.fillRect(i, j, 10, 10);
                    }
                }
            }
            break;
    }
}

function generateRandomName() {
    const firstNames = [
        'Aria', 'Zephyr', 'Nova', 'Atlas', 'Luna', 'Phoenix', 'Echo', 'Orion',
        'Sage', 'Rain', 'Sky', 'River', 'Ash', 'Dawn', 'Storm', 'Vale', 
        'Raven', 'Wolf', 'Hawk', 'Fox', 'Bear', 'Fern', 'Oak', 'Pine'
    ];
    const lastNames = [
        'Moonweaver', 'Stormwind', 'Lightbringer', 'Shadowmend', 'Starweaver',
        'Dawnkeeper', 'Nightwalker', 'Cloudrunner', 'Earthshaper', 'Flamekeeper',
        'Frostweaver', 'Mistwalker', 'Rainmaker', 'Sunseeker', 'Thornguard'
    ];

    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
}

function createBarkTexture() {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#4a3728';
    ctx.fillRect(0, 0, 256, 256);

    for(let i = 0; i < 1000; i++) {
        ctx.beginPath();
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        ctx.moveTo(x, y);
        ctx.lineTo(x + (Math.random() - 0.5) * 20, y + Math.random() * 30);
        ctx.strokeStyle = `rgba(30, 20, 10, ${Math.random() * 0.5})`;
        ctx.lineWidth = 1 + Math.random() * 2;
        ctx.stroke();
    }

    return new THREE.CanvasTexture(canvas);
}

const houses = [];
const people = [];

class Person {
    constructor(position) {
        const personCanvas = createRandomGradient();
        addRandomPattern(personCanvas, new THREE.Color(Math.random(), Math.random(), Math.random()).getStyle());
        const personTexture = new THREE.CanvasTexture(personCanvas);

        const personMaterial = new THREE.MeshStandardMaterial({ map: personTexture });
        const personGeometry = new THREE.CylinderGeometry(0.3, 0.3, 1.5, 8);
        this.mesh = new THREE.Mesh(personGeometry, personMaterial);

        const headGeometry = new THREE.SphereGeometry(0.3, 16, 16);
        const head = new THREE.Mesh(headGeometry, personMaterial);
        head.position.y = 0.9;
        this.mesh.add(head);

        this.leftArm = new THREE.Group();
        this.rightArm = new THREE.Group();

        const armGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.6, 8);
        const leftArmMesh = new THREE.Mesh(armGeometry, personMaterial);
        const rightArmMesh = new THREE.Mesh(armGeometry, personMaterial);

        this.leftArm.add(leftArmMesh);
        this.rightArm.add(rightArmMesh);

        this.leftArm.position.set(-0.4, 0.5, 0);
        this.rightArm.position.set(0.4, 0.5, 0);

        this.mesh.add(this.leftArm);
        this.mesh.add(this.rightArm);

        const eyeGeometry = new THREE.SphereGeometry(0.05, 8, 8);
        const eyeTypes = [
            () => {
                const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const pupilMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(
                    Math.random() * 0.5,
                    Math.random() * 0.5 + 0.5,
                    Math.random()
                )});

                const leftEyeWhite = new THREE.Mesh(eyeGeometry, eyeMaterial);
                const rightEyeWhite = new THREE.Mesh(eyeGeometry, eyeMaterial);

                const pupilGeometry = new THREE.SphereGeometry(0.025, 8, 8);
                const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
                const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);

                leftPupil.position.z = 0.03;
                rightPupil.position.z = 0.03;

                this.leftEye = new THREE.Group();
                this.rightEye = new THREE.Group();
                this.leftEye.add(leftEyeWhite, leftPupil);
                this.rightEye.add(rightEyeWhite, rightPupil);
            },
            () => {
                const eyeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
                const pupilMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
                const highlightMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });

                const eyeShape = new THREE.Shape();
                eyeShape.moveTo(0, 0);
                eyeShape.bezierCurveTo(0.05, 0.05, 0.1, 0.05, 0.15, 0);
                eyeShape.bezierCurveTo(0.1, -0.05, 0.05, -0.05, 0, 0);

                const eyeGeometry = new THREE.ShapeGeometry(eyeShape);
                const leftEyeWhite = new THREE.Mesh(eyeGeometry, eyeMaterial);
                const rightEyeWhite = new THREE.Mesh(eyeGeometry, eyeMaterial);

                const pupilGeometry = new THREE.CircleGeometry(0.02, 16);
                const leftPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);
                const rightPupil = new THREE.Mesh(pupilGeometry, pupilMaterial);

                const highlightGeometry = new THREE.CircleGeometry(0.01, 16);
                const leftHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);
                const rightHighlight = new THREE.Mesh(highlightGeometry, highlightMaterial);

                leftPupil.position.z = 0.01;
                rightPupil.position.z = 0.01;
                leftHighlight.position.set(0.01, 0.01, 0.02);
                rightHighlight.position.set(0.01, 0.01, 0.02);

                this.leftEye = new THREE.Group();
                this.rightEye = new THREE.Group();
                this.leftEye.add(leftEyeWhite, leftPupil, leftHighlight);
                this.rightEye.add(rightEyeWhite, rightPupil, rightHighlight);
            }
        ];

        eyeTypes[Math.floor(Math.random() * eyeTypes.length)]();
        this.mesh.add(this.leftEye, this.rightEye);

        this.addRandomHat();
        this.name = generateRandomName();

        this.mesh.position.copy(position);
        scene.add(this.mesh);

        this.speechBubble = document.createElement('div');
        this.speechBubble.className = 'speech-bubble';
        document.body.appendChild(this.speechBubble);

        this.isInteracting = false;
        this.interactionTimeout = null;
        this.velocity = new THREE.Vector3();
        this.pushRecoveryTime = 0;
        this.animationTime = 0;
        this.walkSpeed = 0;
        this.isInside = false;
        this.insideTimer = 0;
        this.insideHouse = null;
        this.direction = new THREE.Vector3();
        this.targetPosition = this.mesh.position.clone();
        this.targetHouse = null;
        this.setNewTarget(); // Added to initialize target position
        this.ownsHouse = false;
        this.home = null;

        // Add interaction menu functionality
        this.interactionMenu = document.createElement('div');
        this.interactionMenu.className = 'interaction-menu';
        document.body.appendChild(this.interactionMenu);

        const tellFactOption = document.createElement('button');
        tellFactOption.className = 'interaction-option';
        tellFactOption.textContent = 'Tell me a quick fact';
        tellFactOption.onclick = () => this.tellFact();

        const insultOption = document.createElement('button');
        insultOption.className = 'interaction-option';
        insultOption.textContent = 'Insult';
        insultOption.onclick = () => this.receiveInsult();

        const complimentOption = document.createElement('button');
        complimentOption.className = 'interaction-option';
        complimentOption.textContent = 'Compliment';
        complimentOption.onclick = () => this.receiveCompliment();

        this.interactionMenu.appendChild(tellFactOption);
        this.interactionMenu.appendChild(insultOption);
        this.interactionMenu.appendChild(complimentOption); // Add the new option

        // Add click handler to speech bubble
        this.speechBubble.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showInteractionMenu();
        });
    }

    setNewTarget() {
        const angle = Math.random() * Math.PI * 2;
        const distance = 5 + Math.random() * 20;
        this.targetPosition = new THREE.Vector3(
            Math.cos(angle) * distance,
            1,
            Math.sin(angle) * distance
        );
        this.targetHouse = null;
    }

    showInteractionMenu() {
        // Center the menu on screen
        this.interactionMenu.style.left = '50%';
        this.interactionMenu.style.top = '50%';
        this.interactionMenu.style.transform = 'translate(-50%, -50%)';
        this.interactionMenu.style.display = 'block';
    }

    interact() {
        if (!this.interactionTimeout) {
            this.interactionTimeout = setTimeout(() => {
                this.isInteracting = !this.isInteracting;
                if (this.isInteracting) {
                    // Add coin toss chance
                    if (Math.random() < 0.2) { // 1 in 5 chance
                        // Create notification
                        const notification = document.createElement('div');
                        notification.style.cssText = `
                            position: fixed;
                            top: 80px;
                            left: 50%;
                            transform: translateX(-50%);
                            background: rgba(255, 215, 0, 0.9);
                            color: black;
                            padding: 10px 20px;
                            border-radius: 20px;
                            font-family: Arial, sans-serif;
                            z-index: 1000;
                            animation: fadeInOut 2s forwards;
                        `;
                        notification.textContent = `${this.name} tossed you a coin!`;
                        document.body.appendChild(notification);
                        
                        // Update currency
                        updateCurrency(1);
                        
                        // Remove notification after animation
                        setTimeout(() => {
                            document.body.removeChild(notification);
                        }, 2000);
                    }

                    const dialogues = [
                        this.ownsHouse ? 
                            `Hi! I'm ${this.name}. I live in one of these lovely houses.` :
                            `Hi! I'm ${this.name}. I'm visiting this beautiful neighborhood.`,
                        this.ownsHouse ?
                            `*${this.name} waves* Welcome to my neighborhood!` :
                            `*${this.name} waves* This is such a nice place to visit!`,
                        `I'm ${this.name}, and I love living in this colorful neighborhood.`,
                        `${this.name} here! The architecture of these houses is fascinating!`,
                        `Hey there! ${this.name}'s the name. Did you know trees communicate through their root systems?`,
                        `${this.name} at your service! I heard there's going to be a community gathering soon.`,
                        `*${this.name} smiles* The weather is perfect for a stroll.`,
                        `${this.name}'s my name, and I just love the design of my hat!`,
                        `Greetings! ${this.name} here. The gardens are so well maintained.`,
                        `${this.name}'s the name! Did you know that some trees can live for thousands of years?`
                    ];

                    this.speechBubble.textContent = dialogues[Math.floor(Math.random() * dialogues.length)];
                    this.speechBubble.style.display = 'block';
                } else {
                    this.speechBubble.style.display = 'none';
                }
                this.interactionTimeout = null;
            }, 2000);
        }
    }

    tellFact() {
        const facts = [
            "Did you know that trees communicate through a network of fungi?",
            "The oldest known living tree is over 5,000 years old!",
            "Butterflies taste with their feet!",
            "Honey never spoils. Archaeologists found edible honey in ancient Egyptian tombs!",
            "The human body contains enough carbon to make 900 pencils.",
            "A day on Venus is longer than its year!",
            "Sloths are so slow that algae grows on their fur!",
            "The first oranges weren't orange - they were green!",
            "Bananas are berries, but strawberries aren't!",
            "A cloud can weigh over a million pounds!"
        ];
        this.speechBubble.textContent = `${facts[Math.floor(Math.random() * facts.length)]}`;
        this.interactionMenu.style.display = 'none';
    }

    receiveInsult() {
        const reactions = [
            "Hey, that's not very nice! *looks hurt*",
            "*gasps* How dare you!",
            "I'm telling everyone about this!",
            "*turns away sadly*",
            "What did I ever do to you?",
            "*tries to hold back tears*",
            "That's just mean...",
            "I thought we were friends...",
            "Well, I never!",
            "*walking away* Some people..."
        ];
        this.speechBubble.textContent = `${reactions[Math.floor(Math.random() * reactions.length)]}`;
        this.interactionMenu.style.display = 'none';
    }

    receiveCompliment() {
        const reactions = [
            "*blushes* Oh, you're too kind!",
            "That just made my day! Thank you!",
            "*smiles warmly* You're such a nice person!",
            "How sweet of you to say that!",
            "I really appreciate that, thank you!",
            "*beaming with joy* You've made me so happy!",
            "That's the nicest thing anyone's said to me today!",
            "*happy dance* You're amazing too!",
            "We need more people like you in the world!",
            "Your kindness means so much to me!"
        ];
        this.speechBubble.textContent = `${reactions[Math.floor(Math.random() * reactions.length)]}`;
        this.interactionMenu.style.display = 'none';
    }

    updateSpeechBubble() {
        if (this.isInteracting) {
            const vector = new THREE.Vector3();
            vector.setFromMatrixPosition(this.mesh.matrixWorld);
            vector.project(camera);

            const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
            const y = (-vector.y * 0.5 + 0.5) * window.innerHeight - 100;

            this.speechBubble.style.left = x + 'px';
            this.speechBubble.style.top = y + 'px';
        }
    }

    update() {
        if (this.enteringHouse) {
            if (!this.isInside) {
                this.isInside = true;
                this.insideHouse = this.targetHouse;
                this.insideTimer = 300;
                this.mesh.position.set(
                    this.insideHouse.position.x,
                    1,
                    this.insideHouse.position.z - 2
                );
            }

            if (this.isInside) {
                this.insideTimer--;

                const movementAngle = Math.random() * Math.PI * 2;
                const moveDistance = 0.05;
                const newX = this.mesh.position.x + Math.cos(movementAngle) * moveDistance;
                const newZ = this.mesh.position.z + Math.sin(movementAngle) * moveDistance;

                const houseBounds = {
                    minX: this.insideHouse.position.x - 3,
                    maxX: this.insideHouse.position.x + 3,
                    minZ: this.insideHouse.position.z - 3,
                    maxZ: this.insideHouse.position.z + 3
                };

                if (newX > houseBounds.minX && newX < houseBounds.maxX &&
                    newZ > houseBounds.minZ && newZ < houseBounds.maxZ) {
                    this.mesh.position.x = newX;
                    this.mesh.position.z = newZ;
                }

                if (this.insideTimer <= 0) {
                    this.mesh.position.set(
                        this.insideHouse.position.x,
                        1,
                        this.insideHouse.position.z - 4
                    );
                    this.isInside = false;
                    this.enteringHouse = false;
                    this.insideHouse = null;
                    this.setNewTarget();
                }
            }
            return;
        }

        const direction = new THREE.Vector3().subVectors(this.targetPosition, this.mesh.position);
        const distance = direction.length();

        if (distance > 0.1) {
            direction.normalize();
            direction.multiplyScalar(0.05);
            this.mesh.position.add(direction);
            this.mesh.rotation.y = Math.atan2(direction.x, direction.z);
            this.animationTime += 0.1;
            if (this.leftArm && this.rightArm) {
                this.leftArm.rotation.x = Math.sin(this.animationTime) * 0.5;
                this.rightArm.rotation.x = -Math.sin(this.animationTime) * 0.5;
                this.mesh.position.y = 1 + Math.abs(Math.sin(this.animationTime * 2)) * 0.1; // Enhanced animation
            }
        } else if (this.targetHouse) {
            this.enteringHouse = true;
            this.targetHouse.userData.doorOpen = true;
        } else if (!this.targetTimeout) {
            this.targetTimeout = setTimeout(() => {
                this.setNewTarget();
                this.targetTimeout = null;
            }, 2000 + Math.random() * 3000);
        }
    }

    addRandomHat() {
        const hats = [
            () => this.createTopHat(),
            () => this.createCowboyHat(),
            () => this.createBaseballCap(),
            () => this.createBeanie()
        ];

        const randomHat = hats[Math.floor(Math.random() * hats.length)]();
        randomHat.position.y = 1.2;
        randomHat.scale.set(0.8, 0.8, 0.8);
        this.mesh.add(randomHat);
    }
    
    push(direction) {
        if (this.pushRecoveryTime <= 0) {
            this.velocity.copy(direction).multiplyScalar(1.5); // More force
            this.pushRecoveryTime = 30;

            const pushPhrases = [
                "Hey, watch it!",
                "Oops!",
                "Careful there!",
                "Whoa!",
                "Oh my!"
            ];
            this.speechBubble.textContent = pushPhrases[Math.floor(Math.random() * pushPhrases.length)];
            this.speechBubble.style.display = 'block';
            this.isInteracting = true;

            this.mesh.position.add(direction.multiplyScalar(0.5)); // Visual feedback

            this.mesh.rotation.y = Math.atan2(direction.x, direction.z) + Math.PI; // Physical reaction

            setTimeout(() => {
                this.speechBubble.style.display = 'none';
                this.isInteracting = false;
            }, 2000);
        }
    }

    createTopHat() {
        const hatGroup = new THREE.Group();

        const brimGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 32);
        const brimMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 });
        const brim = new THREE.Mesh(brimGeometry, brimMaterial);

        const topGeometry = new THREE.CylinderGeometry(0.3, 0.3, 0.4, 32);
        const top = new THREE.Mesh(topGeometry, brimMaterial);
        top.position.y = 0.225;

        hatGroup.add(brim);
        hatGroup.add(top);

        return hatGroup;
    }

    createCowboyHat() {
        const hatGroup = new THREE.Group();

        const brimGeometry = new THREE.TorusGeometry(0.4, 0.1, 8, 24);
        const hatColor = new THREE.Color(
            0.4 + Math.random() * 0.3,
            0.2 + Math.random() * 0.3,
            0.1 + Math.random() * 0.2
        );
        const brimMaterial = new THREE.MeshStandardMaterial({ color: hatColor });
        const brim = new THREE.Mesh(brimGeometry, brimMaterial);
        brim.rotation.x = Math.PI / 2;

        const topGeometry = new THREE.SphereGeometry(0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const top = new THREE.Mesh(topGeometry, brimMaterial);
        top.position.y = 0.2;

        hatGroup.add(brim);
        hatGroup.add(top);

        return hatGroup;
    }

    createBaseballCap() {
        const hatGroup = new THREE.Group();

        const primaryColor = new THREE.Color(Math.random(), Math.random(), Math.random());
        const secondaryColor = new THREE.Color(Math.random(), Math.random(), Math.random());

        const crownGeometry = new THREE.SphereGeometry(0.3, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const crownMaterial = new THREE.MeshStandardMaterial({ color: primaryColor });
        const crown = new THREE.Mesh(crownGeometry, crownMaterial);

        const billGeometry = new THREE.BoxGeometry(0.6, 0.05, 0.3);
        const billMaterial = new THREE.MeshStandardMaterial({ color: secondaryColor });
        const bill = new THREE.Mesh(billGeometry, billMaterial);
        bill.position.z = 0.3;
        bill.position.y = -0.1;
        bill.rotation.x = -0.2;

        hatGroup.add(crown);
        hatGroup.add(bill);

        return hatGroup;
    }

    createBeanie() {
        const hatGroup = new THREE.Group();

        const color = new THREE.Color(
            0.4 + Math.random() * 0.6,
            0.4 + Math.random() * 0.6,
            0.4 + Math.random() * 0.6
        );

        const beanieGeometry = new THREE.SphereGeometry(0.32, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2);
        const beanieMaterial = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.8
        });
        const beanie = new THREE.Mesh(beanieGeometry, beanieMaterial);

        const rimGeometry = new THREE.TorusGeometry(0.32, 0.05, 8, 24);
        const rim = new THREE.Mesh(rimGeometry, beanieMaterial);
        rim.rotation.x = Math.PI / 2;
        rim.position.y = -0.1;

        if (Math.random() > 0.5) {
            const pomGeometry = new THREE.SphereGeometry(0.08, 8, 8);
            const pomMaterial = new THREE.MeshStandardMaterial({
                color: new THREE.Color(Math.random(), Math.random(), Math.random())
            });
            const pom = new THREE.Mesh(pomGeometry, pomMaterial);
            pom.position.y = 0.3;
            hatGroup.add(pom);
        }

        hatGroup.add(beanie);
        hatGroup.add(rim);

        return hatGroup;
    }
}

class House {
    constructor(mesh) {
        this.mesh = mesh;
        this.owner = null;
    }
}

function createHouse() {
    const house = new THREE.Group();

    const floorGeometry = new THREE.BoxGeometry(6.6, 0.2, 6.6);
    const floorMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.8
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 0.1;
    house.add(floor);

    const wallCanvas = document.createElement('canvas');
    wallCanvas.width = 256;
    wallCanvas.height = 256;
    const ctx = wallCanvas.getContext('2d');

    const hue = Math.random() * 360;
    const saturation = 30 + Math.random() * 20;
    const lightness = 70 + Math.random() * 20;
    ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    ctx.fillRect(0, 0, 256, 256);

    const patternType = Math.floor(Math.random() * 4);
    switch (patternType) {
        case 0: // Bricks
            for (let y = 0; y < 256; y += 20) {
                for (let x = 0; x < 256; x += 40) {
                    ctx.strokeStyle = `hsla(${hue}, ${saturation}%, ${lightness - 20}%, 0.5)`;
                    ctx.strokeRect(x + (y % 40 === 0 ? 0 : 20), y, 40, 20);
                }
            }
            break;
        case 1: // Vertical stripes
            for (let x = 0; x < 256; x += 16) {
                ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 10}%, 0.3)`;
                ctx.fillRect(x, 0, 8, 256);
            }
            break;
        case 2: // Dots
            for (let i = 0; i < 100; i++) {
                ctx.beginPath();
                ctx.arc(
                    Math.random() * 256,
                    Math.random() * 256,
                    2 + Math.random() * 4,
                    0,
                    Math.PI * 2
                );
                ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 15}%, 0.3)`;
                ctx.fill();
            }
            break;
        case 3: // Checkers
            for (let y = 0; y < 256; y += 32) {
                for (let x = 0; x < 256; x += 32) {
                    if ((x + y) % 64 === 0) {
                        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness - 10}%, 0.3)`;
                        ctx.fillRect(x, y, 32, 32);
                    }
                }
            }
            break;
    }

    const wallTexture = new THREE.CanvasTexture(wallCanvas);
    const wallMaterial = new THREE.MeshStandardMaterial({
        map: wallTexture,
        roughness: 0.6
    });

    const frontWall = new THREE.Group();
    const leftWallGeometry = new THREE.BoxGeometry(2.6, 4, 0.2);
    const leftWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    leftWall.position.set(-2, 2, -3.3);
    frontWall.add(leftWall);

    const rightWall = new THREE.Mesh(leftWallGeometry, wallMaterial);
    rightWall.position.set(2, 2, -3.3);
    frontWall.add(rightWall);

    // Fix wall and door proportions
    const topWallGeometry = new THREE.BoxGeometry(1.4, 0.7, 0.2); // Reduced height from 1.4 to 0.7
    const topWall = new THREE.Mesh(topWallGeometry, wallMaterial);
    topWall.position.set(0, 3.3, -3.3); // Adjusted y position from 3.7 to 3.3
    frontWall.add(topWall);

    house.add(frontWall);

    const backWall = new THREE.BoxGeometry(6.6, 4, 0.2); // Add missing back wall
    const backWallMesh = new THREE.Mesh(backWall, wallMaterial);
    backWallMesh.position.set(0, 2, 3.3);
    house.add(backWallMesh);

    const backWallPart = new THREE.Mesh(leftWallGeometry, wallMaterial); // Back part of the wall
    backWallPart.position.set(0, 2, 3.3);
    house.add(backWallPart);

    const sideWallGeometry = new THREE.BoxGeometry(0.2, 4, 6.6);
    const leftSideWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    leftSideWall.position.set(-3.3, 2, 0);
    house.add(leftSideWall);

    const rightSideWall = new THREE.Mesh(sideWallGeometry, wallMaterial);
    rightSideWall.position.set(3.3, 2, 0);
    house.add(rightSideWall);

    const roofGroup = new THREE.Group();

    const roofGeometry = new THREE.ConeGeometry(5.6, 5, 4);
    const roofMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.9
    });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.y = 3;
    roof.rotation.y = Math.PI / 4;
    roofGroup.add(roof);

    const trimGeometry = new THREE.TorusGeometry(5.4, 0.1, 4, 4);
    const trimMaterial = new THREE.MeshStandardMaterial({ color: 0x654321 });
    const trim = new THREE.Mesh(trimGeometry, trimMaterial);
    trim.rotation.x = Math.PI / 2;
    trim.position.y = 0.1;
    roofGroup.add(trim);

    roofGroup.position.y = 3;
    house.add(roofGroup);

    // Update door height
    const doorGeometry = new THREE.BoxGeometry(1.4, 2.7, 0.1); // Increased height from 2.6 to 2.7
    const doorMaterial = new THREE.MeshStandardMaterial({
        color: 0x8B4513,
        roughness: 0.8,
        metalness: 0.2
    });
    const door = new THREE.Mesh(doorGeometry, doorMaterial);
    door.position.set(-0.7, 1.3, -3.31);
    door.geometry.translate(0.7, 0, 0);

    const doorFrameGeometry = new THREE.BoxGeometry(1.6, 2.8, 0.3);
    const doorFrameMaterial = new THREE.MeshStandardMaterial({
        color: 0x000000,
        roughness: 0.9,
        transparent: true,
        opacity: 0
    });
    const doorFrame = new THREE.Mesh(doorFrameGeometry, doorFrameMaterial);
    doorFrame.position.set(0, 1.3, -3.29);
    house.add(doorFrame);

    house.add(door);
    house.userData.door = door;
    house.userData.doorOpen = false;
    house.userData.doorRotation = 0;

    return house;
}

for (let i = 0; i < 10; i++) {
    const position = new THREE.Vector3(
        (Math.random() - 0.5) * 50,
        1,
        (Math.random() - 0.5) * 50
    );
    people.push(new Person(position));
}

function createHouses(count) {
    const houses = [];
    const positions = [];

    house = createHouse();
    house.scale.set(1.2, 1.2, 1.2);
    const mainHouseObj = new House(house);
    scene.add(house);
    positions.push(new THREE.Vector3(0, 0, 0));
    houses.push(mainHouseObj);

    for(let i = 0; i < count - 1; i++) {
        let position;
        let attempts = 0;
        do {
            position = new THREE.Vector3(
                (Math.random() - 0.5) * 100,
                0,
                (Math.random() - 0.5) * 100
            );
            attempts++;
        } while(checkHousePosition(position, positions) && attempts < 100);

        if(attempts < 100) {
            const newHouse = createHouse();
            newHouse.position.copy(position);
            const houseObj = new House(newHouse);
            scene.add(newHouse);
            positions.push(position);
            houses.push(houseObj);
        }
    }

    houses.forEach(house => {
        const availablePeople = people.filter(person => !person.ownsHouse);
        if (availablePeople.length > 0) {
            const randomPerson = availablePeople[Math.floor(Math.random() * availablePeople.length)];
            house.owner = randomPerson;
            randomPerson.ownsHouse = true;
            randomPerson.home = house;

            const originalSetNewTarget = randomPerson.setNewTarget;
            randomPerson.setNewTarget = function() {
                if (Math.random() < 0.6) {
                    this.targetPosition = new THREE.Vector3(
                        house.mesh.position.x,
                        1,
                        house.mesh.position.z - 3.3
                    );
                    this.targetHouse = house.mesh;
                } else {
                    originalSetNewTarget.call(this);
                }
            };
        }
    });

    return houses;
}

const player = new Person(new THREE.Vector3(0, 1, -7)); 
player.mesh.scale.set(1.2, 1.2, 1.2); 

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.copy(player.mesh.position).add(new THREE.Vector3(0, 3, 8));
camera.lookAt(player.mesh.position);

// Create sun and glow
const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sun = new THREE.Mesh(sunGeometry, sunMaterial);
sun.position.set(100, 100, -100);
scene.add(sun);

const sunGlowGeometry = new THREE.SphereGeometry(6, 32, 32);
const sunGlowMaterial = new THREE.MeshBasicMaterial({ 
    color: 0xffff00,
    transparent: true,
    opacity: 0.3
});
const sunGlow = new THREE.Mesh(sunGlowGeometry, sunGlowMaterial);
sun.add(sunGlow);

const generatedHouses = createHouses(5); 
houses.push(...generatedHouses); 

// Add gradient sky
const skyGeometry = new THREE.SphereGeometry(400, 32, 32);
const vertexShader = `
varying vec3 vWorldPosition;
void main() {
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPosition.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
const fragmentShader = `
uniform vec3 topColor;
uniform vec3 bottomColor;
varying vec3 vWorldPosition;
void main() {
    float h = normalize(vWorldPosition).y;
    gl_FragColor = vec4(mix(bottomColor, topColor, max(h, 0.0)), 1.0);
}`;
const uniforms = {
    topColor: { value: new THREE.Color(0x0077ff) }, // Blue
    bottomColor: { value: new THREE.Color(0xff8c00) }  // Orange
};
const skyMaterial = new THREE.ShaderMaterial({
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    uniforms: uniforms,
    side: THREE.BackSide
});
const sky = new THREE.Mesh(skyGeometry, skyMaterial);
scene.add(sky);

// Update renderer to ensure proper background rendering
renderer.setClearColor(0x000000, 0);

function createTree(x, z) {
    const position = new THREE.Vector3(x, 0, z);
    if (checkCollision(position, 1.5)) {
        return null; 
    }
    
    const tree = new THREE.Group();
    tree.userData.type = 'tree';
    
    const trunkHeight = 2 + Math.random() * 3;
    const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.3, trunkHeight, 8);
    const trunkMaterial = new THREE.MeshStandardMaterial({
        map: createBarkTexture(),
        roughness: 0.9,
        metalness: 0.1
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.y = trunkHeight / 2;
    tree.add(trunk);
    
    const layers = Math.floor(2 + Math.random() * 3);
    const foliageColor = new THREE.Color(
        0.1 + Math.random() * 0.2,
        0.4 + Math.random() * 0.3,
        0.1 + Math.random() * 0.2
    );
    
    for(let i = 0; i < layers; i++) {
        const layerSize = 1 + Math.random() * 1.5;
        let foliageGeometry;
        
        const shapeType = Math.random();
        if(shapeType < 0.3) {
            foliageGeometry = new THREE.ConeGeometry(layerSize, layerSize * 1.5, 8);
        } else if(shapeType < 0.6) {
            foliageGeometry = new THREE.SphereGeometry(layerSize, 8, 8);
        } else {
            foliageGeometry = new THREE.OctahedronGeometry(layerSize, 1);
        }
        
        const foliageMaterial = new THREE.MeshStandardMaterial({
            color: foliageColor.clone().offsetHSL(0, 0, (Math.random() - 0.5) * 0.1),
            roughness: 0.8,
            metalness: 0.1,
            map: (function() {
                const foliageCanvas = document.createElement('canvas');
                foliageCanvas.width = 256;
                foliageCanvas.height = 256;
                const fctx = foliageCanvas.getContext('2d');

                fctx.fillStyle = foliageColor.getStyle();
                fctx.fillRect(0, 0, 256, 256);

                for(let i = 0; i < 1000; i++) {
                    fctx.beginPath();
                    const x = Math.random() * 256;
                    const y = Math.random() * 256;
                    fctx.moveTo(x, y);
                    fctx.lineTo(x + (Math.random() - 0.5) * 10, y + Math.random() * 15);
                    fctx.strokeStyle = `rgba(0, 0, 0, 0.1)`;
                    fctx.lineWidth = 1;
                    fctx.stroke();
                }
                return new THREE.CanvasTexture(foliageCanvas);
            })()
        });
        
        const foliage = new THREE.Mesh(foliageGeometry, foliageMaterial);
        foliage.position.y = trunkHeight - (i * 0.5);
        foliage.rotation.y = Math.random() * Math.PI * 2;
        foliage.position.x += (Math.random() - 0.5) * 0.3;
        foliage.position.z += (Math.random() - 0.5) * 0.3;
        
        tree.add(foliage);
    }
    
    if(Math.random() < 0.2) {
        const details = 3 + Math.floor(Math.random() * 5);
        const detailColor = new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random()
        );
        
        for(let i = 0; i < details; i++) {
            const detailGeometry = new THREE.SphereGeometry(0.1, 6, 6);
            const detailMaterial = new THREE.MeshStandardMaterial({
                color: detailColor,
                emissive: detailColor,
                emissiveIntensity: 0.2
            });
            const detail = new THREE.Mesh(detailGeometry, detailMaterial);
            
            detail.position.set(
                (Math.random() - 0.5) * 2,
                trunkHeight - Math.random() * 2,
                (Math.random() - 0.5) * 2
            );
            
            tree.add(detail);
        }
    }
    
    tree.position.set(x, 0, z);
    return tree;
}

const groundTextureCanvas = document.createElement('canvas');
groundTextureCanvas.width = 1024;
groundTextureCanvas.height = 1024;
const gtx = groundTextureCanvas.getContext('2d');

gtx.fillStyle = '#2d5a27';
gtx.fillRect(0, 0, 1024, 1024);

for(let i = 0; i < 5000; i++) {
    gtx.beginPath();
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    gtx.moveTo(x, y);
    gtx.lineTo(x + (Math.random() - 0.5) * 15, y - Math.random() * 20);
    gtx.strokeStyle = `rgba(${45 + Math.random() * 20}, ${90 + Math.random() * 30}, ${39 + Math.random() * 20}, 0.7)`;
    gtx.lineWidth = 1 + Math.random() * 2;
    gtx.stroke();
}

const groundTexture = new THREE.CanvasTexture(groundTextureCanvas);
groundTexture.wrapS = THREE.RepeatWrapping;
groundTexture.wrapT = THREE.RepeatWrapping;
groundTexture.repeat.set(100, 100);

const groundMaterial = new THREE.MeshStandardMaterial({
    map: groundTexture,
    roughness: 0.8,
    metalness: 0.1
});

const groundGeometry = new THREE.PlaneGeometry(1000, 1000);
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
scene.add(ground);

function createBush(x, z) {
    const bush = new THREE.Group();

    const clusters = 3 + Math.floor(Math.random() * 4);
    const bushColor = new THREE.Color(
        0.1 + Math.random() * 0.2,
        0.3 + Math.random() * 0.3,
        0.1 + Math.random() * 0.2
    );

    for(let i = 0; i < clusters; i++) {
        const size = 0.5 + Math.random() * 0.5;
        const sphereGeometry = new THREE.SphereGeometry(size, 8, 8);
        const sphereMaterial = new THREE.MeshStandardMaterial({ 
            color: bushColor.clone().offsetHSL(0, 0, (Math.random() - 0.5) * 0.1),
            roughness: 0.8
        });
        const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

        sphere.position.set(
            (Math.random() - 0.5) * 1.5,
            size,
            (Math.random() - 0.5) * 1.5
        );

        bush.add(sphere);
    }

    if(Math.random() < 0.3) {
        const details = 3 + Math.floor(Math.random() * 5);
        const detailColor = new THREE.Color(
            Math.random(),
            Math.random(),
            Math.random()
        );

        for(let i = 0; i < details; i++) {
            const detailGeometry = new THREE.SphereGeometry(0.1, 6, 6);
            const detailMaterial = new THREE.MeshStandardMaterial({
                color: detailColor,
                emissive: detailColor,
                emissiveIntensity: 0.2
            });
            const detail = new THREE.Mesh(detailGeometry, detailMaterial);

            detail.position.set(
                (Math.random() - 0.5) * 2,
                0.5 + Math.random() * 1.5,
                (Math.random() - 0.5) * 2
            );

            bush.add(detail);
        }
    }

    bush.position.set(x, 0, z);
    return bush;
}

for (let i = 0; i < 300; i++) {
    const x = (Math.random() - 0.5) * 100;
    const z = (Math.random() - 0.5) * 100;

    const vegetation = Math.random();
    if (vegetation < 0.5) {
        const tree = createTree(x, z);
        if (tree) {
            scene.add(tree);
        }
    } else if (vegetation < 0.8) {
        scene.add(createBush(x, z));
    } else {
        const flowers = new THREE.Group();
        const numFlowers = Math.floor(Math.random() * 10) + 5;
        const flowerColors = [0xFF69B4, 0xFFFF00, 0xFF0000, 0xFFFFFF, 0x9932CC];

        for(let j = 0; j < numFlowers; j++) {
            const flowerGeometry = new THREE.SphereGeometry(0.1, 8, 8);
            const flowerMaterial = new THREE.MeshStandardMaterial({
                color: flowerColors[Math.floor(Math.random() * flowerColors.length)],
                emissive: 0x444444
            });
            const flower = new THREE.Mesh(flowerGeometry, flowerMaterial);
            flower.position.set(
                (Math.random() - 0.5) * 2,
                0.1,
                (Math.random() - 0.5) * 2
            );
            flowers.add(flower);
        }
        flowers.position.set(x, 0, z);
        scene.add(flowers);
    }
}

const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(10, 20, 10);
scene.add(directionalLight);

let isMovingForward = false;

function startForwardMovement() {
    isMovingForward = true;
}

function stopForwardMovement() {
    isMovingForward = false;
}

function animate() {
    requestAnimationFrame(animate);

    if (isPaused) {
        return; // Skip the rest of the animation if paused
    }

    const previousPosition = player.mesh.position.clone();

    // Update day/night cycle
    dayNightCycle += 0.001;
    const timeOfDay = (Math.sin(dayNightCycle) + 1) / 2;

    // Update sky colors
    uniforms.topColor.value.setRGB(
        0.0 + timeOfDay * 0.0, // Blue component
        0.4 + timeOfDay * 0.3, // Increased blue during day
        0.8 + timeOfDay * 0.2  // Maximum blue
    );

    uniforms.bottomColor.value.setRGB(
        0.8 + timeOfDay * 0.2,  // Red/orange component
        0.3 + timeOfDay * 0.5,  // Green/yellow component
        timeOfDay * 0.8         // Blue tint during day
    );

    // Update lighting
    ambientLight.intensity = 0.2 + timeOfDay * 0.4;
    directionalLight.intensity = timeOfDay * 0.8;

    // Update sun position and color
    sun.position.x = Math.cos(dayNightCycle) * 100;
    sun.position.y = Math.sin(dayNightCycle) * 100;
    sunGlow.material.opacity = 0.1 + timeOfDay * 0.2;

    // Change sun color based on time
    const sunColor = new THREE.Color(
        1, // Red
        0.7 + timeOfDay * 0.3, // More yellow during day
        timeOfDay * 0.5 // Blue tint during day
    );
    sun.material.color.copy(sunColor);
    sunGlow.material.color.copy(sunColor);

    if (isMovingForward) {
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);
        cameraDirection.y = 0;
        cameraDirection.normalize();

        const newPosition = player.mesh.position.clone().add(cameraDirection.multiplyScalar(moveSpeed));

        let isEnteringHouse = false;
        houses.forEach(house => {
            const doorDistance = Math.abs(newPosition.x - house.mesh.position.x) <= 1.4 &&
                           Math.abs(newPosition.z - (house.mesh.position.z - 3.3)) <= 1.0;
            if (doorDistance && house.mesh.userData.doorOpen) {
                if (!player.isInside) {
                    player.isInside = true;
                    player.insideHouse = house.mesh;
                    player.insideTimer = 300;
                    isEnteringHouse = true;
                }
            }
        });

        if (player.isInside) {
            const houseBounds = {
                minX: player.insideHouse.position.x - 3,
                maxX: player.insideHouse.position.x + 3,
                minZ: player.insideHouse.position.z - 3,
                maxZ: player.insideHouse.position.z + 3
            };

            if (newPosition.x > houseBounds.minX && newPosition.x < houseBounds.maxX &&
                newPosition.z > houseBounds.minZ && newPosition.z < houseBounds.maxZ) {
                player.mesh.position.copy(newPosition);
            }

            player.insideTimer--;
            if (player.insideTimer <= 0) {
                player.isInside = false;
                player.mesh.position.set(
                    player.insideHouse.position.x,
                    1,
                    player.insideHouse.position.z - 4
                );
                player.insideHouse = null;
            }
        } else if (!checkCollision(newPosition, 1) || isEnteringHouse) {
            player.mesh.position.copy(newPosition);
        }

        player.mesh.rotation.y = Math.atan2(cameraDirection.x, cameraDirection.z);
    }

    houses.forEach(house => {
        const distance = player.mesh.position.distanceTo(house.mesh.position);
        if (distance < 5) {
            const nearDoor = Math.abs(player.mesh.position.x - house.mesh.position.x) <= 1.4 &&
                            Math.abs(player.mesh.position.z - (house.mesh.position.z - 3.3)) <= 1.0;
            if (nearDoor && house.mesh.userData.doorOpen) {
                house.mesh.userData.doorOpen = true;
            }
        }
    });

    const playerPosition = player.mesh.position;
    people.forEach(person => {
        const distance = person.mesh.position.distanceTo(playerPosition);
        if (distance < 5) {
            if (!person.isInteracting) {
                person.interact();
            }
        } else if (person.isInteracting && distance >= 5) {
            person.interact();
        }
    });

    houses.forEach(house => {
        if (house.mesh.userData.door) {
            if (house.mesh.userData.doorOpen) {
                if (house.mesh.userData.doorRotation < Math.PI / 2) {
                    house.mesh.userData.doorRotation += 0.1;
                    house.mesh.userData.door.rotation.y = house.mesh.userData.doorRotation;
                }
            } else {
                if (house.mesh.userData.doorRotation > 0) {
                    house.mesh.userData.doorRotation -= 0.1;
                    house.mesh.userData.door.rotation.y = house.mesh.userData.doorRotation;
                }
            }

            if (house.mesh.userData.doorOpen) {
                if (!house.mesh.userData.closeTimeout) {
                    house.mesh.userData.closeTimeout = setTimeout(() => {
                        house.mesh.userData.doorOpen = false;
                        house.mesh.userData.closeTimeout = null;
                    }, 3000);
                }
            }
        }
    });

    // Update camera position based on rotation
    const radius = 8;
    const cameraHeight = 3;
    camera.position.x = player.mesh.position.x + radius * Math.sin(cameraRotation);
    camera.position.z = player.mesh.position.z + radius * Math.cos(cameraRotation);
    camera.position.y = player.mesh.position.y + cameraHeight;
    camera.lookAt(player.mesh.position.clone().add(new THREE.Vector3(0, 1, 0)));

    if (sun) {
        const glowScale = 1 + Math.sin(Date.now() * 0.001) * 0.1;
        sunGlow.scale.set(glowScale, glowScale, glowScale);
    }

    people.forEach(person => {
        person.update();
        person.updateSpeechBubble();
    });

    // Hide menus when clicking elsewhere
    document.addEventListener('click', () => {
        people.forEach(person => {
            if (person.interactionMenu) {
                person.interactionMenu.style.display = 'none';
            }
        });
    });

    renderer.render(scene, camera);
}

document.getElementById('forward-button').addEventListener('touchstart', (e) => {
    e.preventDefault();
    startForwardMovement();
});

document.getElementById('forward-button').addEventListener('touchend', (e) => {
    e.preventDefault();
    stopForwardMovement();
});

document.getElementById('push-button').addEventListener('touchstart', (e) => {
    e.preventDefault();
    const pushDirection = new THREE.Vector3();
    camera.getWorldDirection(pushDirection);
    pushDirection.y = 0;
    pushDirection.normalize();

    people.forEach(person => {
        const distance = person.mesh.position.distanceTo(player.mesh.position);
        if (distance < 3) {
            const directionToPerson = new THREE.Vector3()
                .subVectors(person.mesh.position, player.mesh.position)
                .normalize();
            
            if (pushDirection.dot(directionToPerson) > 0.5) {
                person.push(pushDirection);
            }
        }
    });
});

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Updated touchmove event listener
renderer.domElement.addEventListener('touchmove', (e) => {
    e.preventDefault();
    
    const rightTouch = Array.from(e.touches).find(touch => touch.clientX > window.innerWidth / 2);
    if (rightTouch) {
        const deltaX = rightTouch.clientX - (touchStartX || rightTouch.clientX);
        cameraRotation -= deltaX * 0.01;
        touchStartX = rightTouch.clientX;

        // Update camera position based on rotation
        const radius = 8;
        const cameraHeight = 3;
        camera.position.x = player.mesh.position.x + radius * Math.sin(cameraRotation);
        camera.position.z = player.mesh.position.z + radius * Math.cos(cameraRotation);
        camera.position.y = player.mesh.position.y + cameraHeight;
        camera.lookAt(player.mesh.position.clone().add(new THREE.Vector3(0, 1, 0)));
    }
    
    const joystickTouch = Array.from(e.touches).find(touch => touch.identifier === joystick.touchId);
    if (joystickTouch && joystick.active) {
        const deltaX = joystickTouch.clientX - joystick.baseX;
        const deltaY = joystickTouch.clientY - joystick.baseY;
        const distance = Math.min(50, Math.sqrt(deltaX * deltaX + deltaY * deltaY));
        const angle = Math.atan2(deltaY, deltaX);
        
        joystick.knobX = joystick.baseX + distance * Math.cos(angle);
        joystick.knobY = joystick.baseY + distance * Math.sin(angle);
        
        joystickKnob.style.left = (75 + deltaX * 0.5) + 'px';
        joystickKnob.style.top = (75 + deltaY * 0.5) + 'px';
    }
}, { passive: false });

animate();

const joystickElement = document.getElementById('joystick');
const joystickKnob = document.getElementById('joystick-knob');
const joystickArea = document.getElementById('joystick-area');

renderer.domElement.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    
    if (touch.clientX < window.innerWidth / 2) {
        joystick.active = true;
        joystick.touchId = touch.identifier;
        joystick.baseX = touch.clientX;
        joystick.baseY = touch.clientY;
        joystick.knobX = touch.clientX;
        joystick.knobY = touch.clientY;
        
        joystickElement.style.display = 'block';
        joystickElement.style.left = (joystick.baseX - 75) + 'px';
        joystickElement.style.top = (joystick.baseY - 75) + 'px';
        joystickKnob.style.left = '75px';
        joystickKnob.style.top = '75px';
    } else {
        touchStartX = touch.clientX;
    }
}, {passive: false
});

renderer.domElement.addEventListener('touchend', (e) => {
    e.preventDefault();
    const touches = Array.from(e.touches);
    
    if (!touches.find(touch => touch.identifier === joystick.touchId)) {
        joystick.active = false;
        joystickElement.style.display = 'none';
    }

    if (!touches.find(touch => touch.clientX > window.innerWidth / 2)) {
        touchStartX = null;
    }
}, {passive: false});

document.addEventListener('keydown', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') {
        startForwardMovement();
    }
});

document.addEventListener('keyup', (e) => {
    if (e.key === 'w' || e.key === 'ArrowUp') {
        stopForwardMovement();
    }
});

document.addEventListener('mousemove', (e) => {
    if (e.buttons & 1) {
        cameraRotation -= e.movementX * 0.01;
    }
});