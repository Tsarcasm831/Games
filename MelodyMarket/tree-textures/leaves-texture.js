// Leaves Texture Generator for Three.js
function generateLeavesTexture(width = 256, height = 256) {
    // Create a canvas to draw the texture
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Base leaf colors (various shades of green)
    const leafColors = [
        'rgb(34, 139, 34)',   // Forest Green
        'rgb(50, 205, 50)',   // Lime Green
        'rgb(0, 128, 0)',     // Green
        'rgb(107, 142, 35)'   // Olive Drab
    ];

    // Fill background with a light green base
    ctx.fillStyle = 'rgb(144, 238, 144)';  // Light Green
    ctx.fillRect(0, 0, width, height);

    // Function to draw a leaf shape
    function drawLeaf(x, y, size, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);

        // Choose a random leaf color
        const leafColor = leafColors[Math.floor(Math.random() * leafColors.length)];
        ctx.fillStyle = leafColor;

        // Create a leaf-like shape using bezier curves
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.bezierCurveTo(
            size/2, -size/3,   // First control point
            size/2, -size/3,   // Second control point
            size, 0            // End point
        );
        ctx.bezierCurveTo(
            size/2, size/3,    // First control point
            size/2, size/3,    // Second control point
            0, 0               // Back to start
        );
        ctx.fill();

        // Add some vein-like lines
        ctx.strokeStyle = `rgba(0,0,0,0.2)`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(size/2, 0);
        ctx.lineTo(size/2, -size/4);
        ctx.stroke();

        ctx.restore();
    }

    // Draw multiple leaves
    for (let i = 0; i < 300; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const size = 5 + Math.floor(Math.random() * 15);  // Varying leaf sizes
        const angle = Math.floor(Math.random() * 360);
        
        drawLeaf(x, y, size, angle);
    }

    // Add some subtle leaf overlap and depth
    ctx.globalAlpha = 0.1;
    for (let i = 0; i < 100; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const size = 3 + Math.floor(Math.random() * 10);
        const angle = Math.floor(Math.random() * 360);
        
        drawLeaf(x, y, size, angle);
    }

    // Convert canvas to texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1000, 1000);  // Tile the texture 1000x1000 times
    
    return texture;
}
