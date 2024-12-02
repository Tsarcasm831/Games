// Tree Bark Texture Generator for Three.js
// Optimized for performance and reduced complexity
function generateTreeBarkTexture(width = 64, height = 64) {
    // Reduce canvas size for faster rendering
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');

    // Simplified bark color palette
    const baseColors = [
        'rgb(101, 67, 33)',    // Dark Brown
        'rgb(139, 90, 43)',    // Medium Brown
        'rgb(160, 82, 45)'     // Sienna Brown
    ];

    // Simple gradient background
    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgb(180, 130, 100)');
    gradient.addColorStop(1, 'rgb(160, 110, 80)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    // Simplified bark line drawing function
    function drawBarkLine(x, y, length, angle, lineWidth, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);

        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        // More simplified, less computationally expensive curve
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(length/2, 3, length, 0);
        
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        
        ctx.restore();
    }

    // Reduced number of bark lines
    for (let i = 0; i < 250; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const length = 7 + Math.floor(Math.random() * 15);
        const angle = 70 + Math.floor(Math.random() * 200);
        const lineWidth = 0.3 + Math.random() * 1.5;
        
        const currentBaseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
        drawBarkLine(x, y, length, angle, lineWidth, currentBaseColor);
    }

    // Minimal noise addition
    ctx.globalAlpha = 0.03;
    for (let i = 0; i < 250; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,0,0.03)';
        ctx.arc(x, y, 0.3 + Math.random() * 0.7, 0, Math.PI * 2);
        ctx.fill();
    }

    // Convert canvas to texture with reduced complexity
    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(3, 3);
    
    return texture;
}
