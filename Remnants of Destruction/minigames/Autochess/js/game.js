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
            this.startButton.addEventListener('click', () => this.startGame());
            this.startButton.disabled = true;
            
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
        // Disable the start button
        this.startButton.disabled = true;
        
        // Start the game logic here
        console.log('Game started!');
        
        // Spawn enemy minions in the red territory
        if (this.hexGrid) {
            this.hexGrid.spawnEnemyMinions();
        }
        
        // Add your game start logic here
        // For example:
        // - Start the battle phase
        // - Enable opponent's AI
        // - Start the round timer
        // etc.
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
