// Leaves Texture Generator for Three.js
// Optimized for performance and reduced complexity
function generateLeavesTexture(width = 64, height = 64) {
    // Reduce canvas size for faster rendering
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Simplified leaf colors
    const leafColors = [
        'rgb(34, 139, 34)',   // Forest Green
        'rgb(50, 205, 50)',   // Lime Green
        'rgb(0, 128, 0)'      // Green
    ];

    // Simple gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgb(200, 240, 200)');
    gradient.addColorStop(1, 'rgb(144, 238, 144)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Simplified leaf drawing function
    function drawLeaf(x, y, size, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);

        const leafColor = leafColors[Math.floor(Math.random() * leafColors.length)];
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(size/2, -size/4, size, 0);
        ctx.quadraticCurveTo(size/2, size/4, 0, 0);
        
        ctx.fillStyle = leafColor;
        ctx.globalAlpha = 0.6;
        ctx.fill();
        
        ctx.restore();
    }

    // Reduced number of leaves
    for (let i = 0; i < 250; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const size = 3 + Math.floor(Math.random() * 7);
        const angle = Math.floor(Math.random() * 360);
        
        drawLeaf(x, y, size, angle);
    }

    // Convert canvas to texture with reduced complexity
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    
    return texture;
}
