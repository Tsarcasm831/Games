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
        // Store the center coordinates
        hex.x = x;
        hex.y = y;
        
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
            const px = size * Math.cos(angle);
            const py = size * Math.sin(angle);
            
            if (i === 0) {
                hex.moveTo(px, py);
            } else {
                hex.lineTo(px, py);
            }
            points.push({ x: px + x, y: py + y });
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
                const hexGraphics = hex.sprite;
                const distance = Phaser.Math.Distance.Between(
                    x, y,
                    hexGraphics.x, hexGraphics.y
                );
                
                // Increase detection radius slightly for better usability
                if (distance < gameConfig.hexSize * 1.2) {
                    return hex;
                }
            }
        }
        return null;
    }

    placeUnit(unit, hex) {
        console.log('Attempting to place unit at hex:', hex.coords);
        
        // Check if hex is already occupied
        if (hex.unit !== null) {
            console.log('Placement failed: Hex is already occupied');
            return { success: false, reason: 'This hex is already occupied' };
        }

        // Check if hex is in friendly territory (green hexes, row >= 5)
        if (hex.coords.row < 5) {
            console.log('Placement failed: Not in friendly territory');
            return { success: false, reason: 'Champions can only be placed in friendly territory' };
        }

        // If unit was previously on another hex, remove it from there
        this.hexes.forEach(row => {
            row.forEach(h => {
                if (h.unit === unit) {
                    h.unit = null;
                }
            });
        });

        // Update unit position to hex center
        unit.x = hex.sprite.x;
        unit.y = hex.sprite.y;
        
        console.log('Unit placed at hex:', hex.coords);
        
        // Keep unit draggable for repositioning
        unit.input.draggable = true;
        
        // Store unit reference in hex
        hex.unit = unit;
        
        return { success: true };
    }

    spawnEnemyMinions() {
        const enemyMinions = ['champion13', 'champion16', 'champion19', 'champion14']; // Selecting low-cost common/rare units
        const enemyTerritory = this.hexes.slice(0, 3); // Top 3 rows are enemy territory
        console.log('Attempting to spawn enemy minions...');
        for (let i = 0; i < 4; i++) {
            // Randomly select a minion type
            const minionType = enemyMinions[Math.floor(Math.random() * enemyMinions.length)];
            // Find available hexes in enemy territory
            const availableHexes = enemyTerritory.flatMap(row => 
                row.filter(hex => hex.unit === null)
            );
            if (availableHexes.length > 0) {
                // Randomly select an available hex
                const selectedHex = availableHexes[Math.floor(Math.random() * availableHexes.length)];
                // Create the unit
                const unit = new Unit(this.scene, minionType);
                // Place the unit on the selected hex
                this.placeUnit(unit, selectedHex);
                console.log('Spawned enemy minion:', minionType, 'at hex:', selectedHex.coords);
            } else {
                console.log('No available hexes for spawning enemy minions.');
            }
        }
        console.log('Enemy minion spawning completed.');
    }
}
