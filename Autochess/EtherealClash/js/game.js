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
            
            // Enable drag and drop functionality
            this.input.on('dragstart', function (pointer, gameObject) {
                // Store original position in case we need to return
                gameObject.originalX = gameObject.x;
                gameObject.originalY = gameObject.y;
                gameObject.setDepth(1); // Bring dragged unit to front
            });

            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
            
            this.input.on('dragend', function (pointer, gameObject) {
                gameObject.setDepth(0); // Reset depth after drag
                const hex = hexGrid.getHexAtPosition(gameObject.x, gameObject.y);
                if (hex) {
                    const result = hexGrid.placeUnit(gameObject, hex);
                    if (!result.success) {
                        // Return to original position
                        gameObject.x = gameObject.originalX;
                        gameObject.y = gameObject.originalY;
                        
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
                    }
                } else {
                    // Return to original position if dropped outside grid
                    gameObject.x = gameObject.originalX;
                    gameObject.y = gameObject.originalY;
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
        return unit;
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
