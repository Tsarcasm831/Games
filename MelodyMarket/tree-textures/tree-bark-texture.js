// Tree Bark Texture Generator for Three.js
// Optimized for performance and reduced complexity
function generateTreeBarkTexture(width = 32, height = 32) {  
    // Reduce canvas size for faster rendering
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Simplified bark color palette
    const baseColors = [
        'rgb(101, 67, 33)',    
        'rgb(139, 90, 43)'     
    ];

    // Simple solid background
    ctx.fillStyle = 'rgb(180, 130, 100)';
    ctx.fillRect(0, 0, width, height);

    // Simplified bark line drawing function
    function drawBarkLine(x, y, length, angle, lineWidth, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);

        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        // More simplified line
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(length, 0);
        
        ctx.globalAlpha = 0.4;
        ctx.stroke();
        
        ctx.restore();
    }

    // Reduced number of bark lines
    for (let i = 0; i < 100; i++) {  
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const length = 5 + Math.floor(Math.random() * 10);  
        const angle = 70 + Math.floor(Math.random() * 200);
        const lineWidth = 0.2 + Math.random() * 1;  
        
        const currentBaseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
        drawBarkLine(x, y, length, angle, lineWidth, currentBaseColor);
    }

    // Minimal noise addition
    ctx.globalAlpha = 0.02;
    for (let i = 0; i < 100; i++) {  
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,0,0.02)';
        ctx.arc(x, y, 0.2 + Math.random() * 0.5, 0, Math.PI * 2);
        ctx.fill();
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
