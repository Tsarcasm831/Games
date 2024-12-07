class HexGrid {
    constructor(scene) {
        this.scene = scene;
        this.hexes = [];
        this.units = [];
        this.createGrid();
    }

    createGrid() {
        // Calculate hex dimensions
        const size = gameConfig.hexSize;
        const width = size * Math.sqrt(3);
        const height = size * 2;
        
        // Calculate spacing
        const horizontalSpacing = width;
        const verticalSpacing = height * 3/4;
        
        for (let row = 0; row < gameConfig.gridHeight; row++) {
            this.hexes[row] = [];
            for (let col = 0; col < gameConfig.gridWidth; col++) {
                // Calculate position with proper offset for odd rows
                const x = gameConfig.boardOffsetX + col * horizontalSpacing + (row % 2) * (width/2);
                const y = gameConfig.boardOffsetY + row * verticalSpacing;
                
                const hex = this.createHex(x, y);
                this.hexes[row][col] = {
                    sprite: hex,
                    unit: null,
                    coords: { row, col }
                };
            }
        }
    }

    createHex(x, y) {
        const hex = this.scene.add.graphics();
        
        // Use a more visible color scheme
        hex.fillStyle(0x4a90e2, 0.4);  // Lighter fill
        hex.lineStyle(2, 0x2980b9, 0.8);  // More visible border
        
        const size = gameConfig.hexSize;
        const points = [];
        
        // Draw starting from the rightmost point, going counter-clockwise
        for (let i = 0; i < 6; i++) {
            // Angle for each corner (starting from 0 degrees)
            const angle = (i * 60) * Math.PI / 180;
            const px = x + size * Math.cos(angle);
            const py = y + size * Math.sin(angle);
            
            if (i === 0) {
                hex.moveTo(px, py);
            } else {
                hex.lineTo(px, py);
            }
            points.push({ x: px, y: py });
        }
        
        hex.closePath();
        hex.fillPath();
        hex.strokePath();
        
        // Create interactive polygon with the same points
        const polygon = new Phaser.Geom.Polygon(points);
        hex.setInteractive(polygon, Phaser.Geom.Polygon.Contains);
        
        return hex;
    }

    getHexAtPosition(x, y) {
        for (let row = 0; row < this.hexes.length; row++) {
            for (let col = 0; col < this.hexes[row].length; col++) {
                const hex = this.hexes[row][col];
                const distance = Phaser.Math.Distance.Between(
                    x,
                    y,
                    hex.sprite.x,
                    hex.sprite.y
                );
                if (distance < gameConfig.hexSize) {
                    return hex;
                }
            }
        }
        return null;
    }

    placeUnit(unit, hex) {
        if (hex.unit) {
            return false;
        }
        
        unit.x = hex.sprite.x;
        unit.y = hex.sprite.y;
        hex.unit = unit;
        return true;
    }
}
