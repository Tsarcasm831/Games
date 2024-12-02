// Web Worker for Tree Bark Texture Generation
self.onmessage = function(event) {
    const { width, height } = event.data;
    const textureData = generateTreeBarkTextureData(width, height);
    self.postMessage(textureData, [textureData.data]);
};

function generateTreeBarkTextureData(width = 64, height = 64) {
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const baseColors = [
        'rgb(101, 67, 33)',    // Dark Brown
        'rgb(139, 90, 43)',    // Medium Brown
        'rgb(160, 82, 45)'     // Sienna Brown
    ];

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgb(180, 130, 100)');
    gradient.addColorStop(1, 'rgb(160, 110, 80)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    function drawBarkLine(x, y, length, angle, lineWidth, color) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle * Math.PI / 180);

        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(length/2, 3, length, 0);
        
        ctx.globalAlpha = 0.5;
        ctx.stroke();
        
        ctx.restore();
    }

    for (let i = 0; i < 250; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const length = 7 + Math.floor(Math.random() * 15);
        const angle = 70 + Math.floor(Math.random() * 200);
        const lineWidth = 0.3 + Math.random() * 1.5;
        
        const currentBaseColor = baseColors[Math.floor(Math.random() * baseColors.length)];
        drawBarkLine(x, y, length, angle, lineWidth, currentBaseColor);
    }

    ctx.globalAlpha = 0.03;
    for (let i = 0; i < 250; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        
        ctx.beginPath();
        ctx.fillStyle = 'rgba(0,0,0,0.03)';
        ctx.arc(x, y, 0.3 + Math.random() * 0.7, 0, Math.PI * 2);
        ctx.fill();
    }

    // Convert canvas to image data for transfer
    const imageData = ctx.getImageData(0, 0, width, height);
    return {
        width,
        height,
        data: imageData.data.buffer
    };
}
