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
        
        // Get the row number from y coordinate
        const row = Math.floor((y - gameConfig.boardOffsetY) / (gameConfig.hexSize * 1.5));
        
        // Set color based on territory
        let fillColor = 0x4a90e2;  // Default blue for neutral territory
        let fillAlpha = 0.4;
        let borderColor = 0x2980b9;
        let borderAlpha = 0.8;

        if (row <= 2) {  // Enemy territory (top 3 rows)
            fillColor = 0xff0000;  // Red
            fillAlpha = 0.3;
            borderColor = 0xcc0000;
        } else if (row >= 5) {  // Friendly territory (bottom 3 rows)
            fillColor = 0x00ff00;  // Green
            fillAlpha = 0.3;
            borderColor = 0x00cc00;
        }
        
        hex.fillStyle(fillColor, fillAlpha);
        hex.lineStyle(2, borderColor, borderAlpha);
        
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
                const hexSprite = hex.sprite;
                const distance = Phaser.Math.Distance.Between(
                    x, y,
                    hexSprite.x, hexSprite.y
                );
                
                if (distance < gameConfig.hexSize) {
                    return hex;
                }
            }
        }
        return null;
    }

    placeUnit(unit, hex) {
        // Check if hex is already occupied
        if (hex.unit !== null) {
            return { success: false, reason: 'This hex is already occupied' };
        }

        // Check if hex is in friendly territory (bottom 3 rows)
        if (hex.coords.row < 5) {  // Only allow placement in rows 5 and above (friendly territory)
            return { success: false, reason: 'Champions can only be placed in friendly territory' };
        }

        // Update unit position to hex center
        unit.x = hex.sprite.x;
        unit.y = hex.sprite.y;
        
        // Make unit not draggable while on board
        unit.input.draggable = false;
        
        // Store unit reference in hex
        hex.unit = unit;
        
        return { success: true };
    }
}
