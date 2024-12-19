let game;
let hexGrid;
let shop;
let mainScene;

class MainScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MainScene' });
    }

    preload() {
        console.log('Game preload started');
        // Load assets if needed
    }

    create() {
        console.log('Game create started');
        try {
            mainScene = this;
            hexGrid = new HexGrid(this);
            shop = new Shop();
            
            // Initialize start button
            this.startButton = document.getElementById('start-game');
            this.startButton.disabled = false; // Enable the button
            console.log('Start button enabled.');
            
            // Add event listener to the start button
            this.startButton.addEventListener('click', () => {
                console.log('Start button clicked.');
                this.startGame();
            });
            
            // Enable drag and drop functionality
            this.input.on('dragstart', function (pointer, gameObject) {
                // Store original position in case we need to return
                gameObject.originalX = gameObject.x;
                gameObject.originalY = gameObject.y;
                gameObject.setDepth(1); // Bring dragged unit to front
                
                // Store original color and set feedback color
                gameObject.originalColor = gameObject.list[0].fillColor;
                gameObject.list[0].setFillStyle(0x44ff44, 0.8);
            });

            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
                
                // Visual feedback for valid placement
                const hex = hexGrid.getHexAtPosition(dragX, dragY);
                if (hex && hex.coords.row >= 5 && !hex.unit) {
                    gameObject.list[0].setFillStyle(0x44ff44, 0.8); // Green for valid
                } else {
                    gameObject.list[0].setFillStyle(0xff4444, 0.8); // Red for invalid
                }
            });
            
            this.input.on('dragend', function (pointer, gameObject) {
                // Restore original color
                gameObject.list[0].setFillStyle(gameObject.originalColor);
                gameObject.setDepth(0); // Reset depth after drag
                
                const hex = hexGrid.getHexAtPosition(gameObject.x, gameObject.y);
                if (hex) {
                    const result = hexGrid.placeUnit(gameObject, hex);
                    if (!result.success) {
                        // Return to original position with animation
                        mainScene.tweens.add({
                            targets: gameObject,
                            x: gameObject.originalX,
                            y: gameObject.originalY,
                            duration: 300,
                            ease: 'Back.easeOut'
                        });
                        
                        // Show error message
                        const text = mainScene.add.text(gameObject.x, gameObject.y - 40, result.reason, {
                            fontSize: '16px',
                            fill: '#ff0000',
                            backgroundColor: '#ffffff',
                            padding: { x: 5, y: 2 }
                        });
                        text.setOrigin(0.5);
                        
                        // Fade out and destroy the text after 2 seconds
                        mainScene.tweens.add({
                            targets: text,
                            alpha: 0,
                            duration: 2000,
                            onComplete: () => text.destroy()
                        });
                    } else {
                        // Enable start button when a unit is successfully placed
                        mainScene.startButton.disabled = false;
                    }
                } else {
                    // Return to original position with animation if dropped outside grid
                    mainScene.tweens.add({
                        targets: gameObject,
                        x: gameObject.originalX,
                        y: gameObject.originalY,
                        duration: 300,
                        ease: 'Back.easeOut'
                    });
                }
            });
            console.log('Game initialization completed');
        } catch (error) {
            console.error('Error during game creation:', error);
        }
    }

    update() {
        // Game loop update logic
    }

    createUnit(type) {
        console.log('Creating unit:', type);
        const unit = new Unit(this, type);
        unit.x = this.game.canvas.width - 100;
        unit.y = this.game.canvas.height / 2;
        // Make unit draggable
        unit.setInteractive();
        this.input.setDraggable(unit);
        return unit;
    }

    startGame() {
        console.log('Start game method called.');
        console.log('Starting game countdown...');
        this.startCountdown(5); // Start the countdown
        console.log('Countdown started. Disabling start button...');
        this.startButton.disabled = true;
        console.log('Start button disabled.');
    }

    startCountdown(seconds) {
        console.log('Countdown started for', seconds, 'seconds.');
        const countdownText = this.add.text(this.game.canvas.width / 2, this.game.canvas.height / 2, seconds, {
            fontSize: '48px',
            fill: '#ffffff'
        }).setOrigin(0.5);

        console.log('Countdown text created.');
        const countdownInterval = setInterval(() => {
            console.log('Countdown interval triggered.');
            seconds--;
            countdownText.setText(seconds);
            console.log('Countdown at', seconds, 'seconds.');
            if (seconds <= 0) {
                console.log('Countdown finished. Clearing interval...');
                clearInterval(countdownInterval);
                console.log('Countdown interval cleared.');
                countdownText.destroy();
                console.log('Countdown text destroyed.');
                this.spawnEnemies(); // Spawn enemies after countdown
                console.log('Enemies spawned.');
                this.startCombat(); // Start combat after countdown
                console.log('Combat started.');
                this.hexGrid.spawnEnemyMinions(); // Spawn enemy minions
                console.log('Enemy minions spawned.');
                console.log('Countdown finished.');
            }
        }, 1000);
        console.log('Countdown interval set.');
    }

    spawnEnemies() {
        const enemySide = this.getEnemySide(); // Get enemy side coordinates
        console.log('Spawning enemies at:', enemySide);
        for (let i = 0; i < 2; i++) {
            const minionType = this.getRandomEnemyType(); // Get a random enemy type
            const minion = this.createUnit(minionType); // Create a minion unit
            this.placeUnitOnGrid(minion, enemySide[i]); // Place it on the grid
            console.log('Spawned enemy:', minionType, 'at position:', enemySide[i]);
        }
        console.log('Enemy spawning completed.');
    }

    startCombat() {
        const friendlyUnits = this.getFriendlyUnits();
        const enemyUnits = this.getEnemyUnits();

        const combatInterval = setInterval(() => {
            if (friendlyUnits.length === 0 || enemyUnits.length === 0) {
                clearInterval(combatInterval);
                this.endGame();
                return;
            }

            // Simulate combat
            friendlyUnits.forEach(unit => {
                const target = enemyUnits[Math.floor(Math.random() * enemyUnits.length)];
                if (target) {
                    target.stats.health -= unit.stats.attackDamage; // Deal damage
                    if (target.stats.health <= 0) {
                        this.removeUnit(target);
                    }
                }
            });

            enemyUnits.forEach(unit => {
                const target = friendlyUnits[Math.floor(Math.random() * friendlyUnits.length)];
                if (target) {
                    target.stats.health -= unit.stats.attackDamage; // Deal damage
                    if (target.stats.health <= 0) {
                        this.removeUnit(target);
                    }
                }
            });

            // Update the unit arrays
            friendlyUnits = this.getFriendlyUnits();
            enemyUnits = this.getEnemyUnits();
        }, 1000); // Combat every second
    }

    getFriendlyUnits() {
        return this.units.filter(unit => unit.origin === 'friendly'); // Adjust based on your unit structure
    }

    getEnemyUnits() {
        return this.units.filter(unit => unit.origin === 'enemy'); // Adjust based on your unit structure
    }

    removeUnit(unit) {
        const index = this.units.indexOf(unit);
        if (index > -1) {
            this.units.splice(index, 1);
            // Additional logic to remove the unit from the scene
            unit.destroy(); // Assuming you have a destroy method
        }
    }

    getRandomEnemyType() {
        const enemyKeys = Object.keys(enemyTypes);
        return enemyTypes[enemyKeys[Math.floor(Math.random() * enemyKeys.length)]]; // Randomly select an enemy type
    }

    placeUnitOnGrid(unit, position) {
        // Assuming position is an object with x and y coordinates
        unit.x = position.x;
        unit.y = position.y;
        this.add.existing(unit); // Add the unit to the scene
        // Update grid state if necessary
        const hex = hexGrid.getHexAtPosition(position.x, position.y);
        if (hex) {
            hex.unit = unit; // Mark the hex as occupied by this unit
        }
    }

    getEnemySide() {
        const enemyPositions = [];
        for (let row = 0; row < 3; row++) { // Top three rows for enemy spawning
            for (let col = 0; col < hexGrid.hexes[row].length; col++) {
                enemyPositions.push(hexGrid.hexes[row][col].coords);
            }
        }
        console.log('Enemy positions determined:', enemyPositions);
        return enemyPositions;
    }

    endGame() {
        console.log('Game ended');
        // Add game over logic here
    }
}

// Initialize game when window loads
window.onload = function() {
    try {
        console.log('Starting game initialization');
        const gameConfig = { ...config, scene: MainScene };
        game = new Phaser.Game(gameConfig);
        console.log('Game instance created');
    } catch (error) {
        console.error('Error creating game:', error);
    }
};
