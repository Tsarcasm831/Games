// Tree Bark Texture Generator for Three.js
function generateTreeBarkTexture(width = 256, height = 256) {
    // Create a canvas to draw the texture
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Base bark color (brown tones)
    const baseColors = [
        'rgb(101, 67, 33)',   // Dark Brown
        'rgb(139, 90, 43)',   // Medium Brown
        'rgb(160, 82, 45)'    // Sienna Brown
    ];
    ctx.fillStyle = baseColors[Math.floor(Math.random() * baseColors.length)];
    ctx.fillRect(0, 0, width, height);

    // Function to draw bark texture lines
    function drawBarkLine(x, y, length, angle, lineWidth, color) {
        ctx.beginPath();
        
        // Slight color variation
        const colorVariation = Math.floor(Math.random() * 20);
        const [r, g, b] = color.match(/\d+/g).map(Number);
        ctx.strokeStyle = `rgb(${r + colorVariation}, ${g + colorVariation}, ${b + colorVariation})`;
        
        ctx.lineWidth = lineWidth;
        ctx.moveTo(x, y);
        
        // Calculate end point based on angle and length
        const endX = x + Math.cos(angle * Math.PI / 180) * length;
        const endY = y + Math.sin(angle * Math.PI / 180) * length;
        
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }

    // Draw multiple bark texture lines
    for (let i = 0; i < 500; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const length = 10 + Math.floor(Math.random() * 30);  // Longer, more varied lines
        const angle = 90 + Math.floor(Math.random() * 180);  // More vertical orientation
        const lineWidth = 1 + Math.random() * 2;  // Variable line thickness
        
        const currentBaseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
        drawBarkLine(x, y, length, angle, lineWidth, currentBaseColor);
    }

    // Add some noise for texture roughness
    for (let i = 0; i < 1000; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        
        // Small random dots to simulate bark roughness
        ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.1})`;
        ctx.fillRect(x, y, 1, 1);
    }

    // Convert canvas to texture
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(1000, 1000);  // Tile the texture 1000x1000 times
    
    return texture;
}
