// Grass Texture Generator for Three.js
function generateGrassTexture(width = 128, height = 128) {
    // Smaller canvas for faster rendering
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Base green color
    ctx.fillStyle = 'rgb(34, 139, 34)';  // Forest Green
    ctx.fillRect(0, 0, width, height);

    // Simplified grass blade drawing
    function drawGrassBlade(x, y, length, angle) {
        ctx.beginPath();
        
        const greenIntensity = 100 + Math.floor(Math.random() * 100);
        ctx.strokeStyle = `rgb(0, ${greenIntensity}, 0)`;
        
        ctx.lineWidth = 0.5;  // Thinner line
        ctx.moveTo(x, y);
        
        const endX = x + Math.cos(angle * Math.PI / 180) * length;
        const endY = y + Math.sin(angle * Math.PI / 180) * length;
        
        ctx.lineTo(endX, endY);
        ctx.stroke();
    }

    // Fewer grass blades
    for (let i = 0; i < 500; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const length = 3 + Math.floor(Math.random() * 7);  // Shorter blades
        const angle = Math.floor(Math.random() * 360);
        
        drawGrassBlade(x, y, length, angle);
    }

    // Convert canvas to texture with reduced repeat
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(100, 100);  // Less tiling
    
    return texture;
}
