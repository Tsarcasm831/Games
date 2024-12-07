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
            
            this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
                gameObject.x = dragX;
                gameObject.y = dragY;
            });
            
            this.input.on('dragend', function (pointer, gameObject) {
                const hex = hexGrid.getHexAtPosition(gameObject.x, gameObject.y);
                if (hex) {
                    const success = hexGrid.placeUnit(gameObject, hex);
                    if (!success) {
                        gameObject.destroy();
                    }
                } else {
                    gameObject.destroy();
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
