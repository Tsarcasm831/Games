// Leaves Texture Generator for Three.js
// Optimized for performance and reduced complexity
function generateLeavesTexture(width = 32, height = 32) {  
    // Reduce canvas size for faster rendering
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Simplified leaf colors with fewer variations
    const leafColors = [
        'rgb(34, 139, 34)',   
        'rgb(0, 128, 0)'      
    ];

    // Simplified gradient background
    ctx.fillStyle = 'rgb(200, 240, 200)';
    ctx.fillRect(0, 0, width, height);

    // Simplified leaf drawing function with fewer details
    function drawLeaf(x, y, size, angle) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);

        const leafColor = leafColors[Math.floor(Math.random() * leafColors.length)];
        
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(size, 0);  
        
        ctx.strokeStyle = leafColor;
        ctx.lineWidth = size / 3;
        ctx.globalAlpha = 0.6;
        ctx.stroke();
        
        ctx.restore();
    }

    // Reduced number of leaves
    for (let i = 0; i < 100; i++) {  
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const size = 2 + Math.floor(Math.random() * 5);  
        const angle = Math.floor(Math.random() * 360);
        
        drawLeaf(x, y, size, angle);
    }

    // Convert canvas to texture with reduced complexity
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(2, 2);  
    texture.magFilter = THREE.LinearFilter;  
    texture.minFilter = THREE.LinearMipMapLinearFilter;  
    
    return texture;
}
