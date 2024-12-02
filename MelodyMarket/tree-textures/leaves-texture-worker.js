// Web Worker for Leaves Texture Generation
self.onmessage = function(event) {
    const { width, height } = event.data;
    const textureData = generateLeavesTextureData(width, height);
    self.postMessage(textureData, [textureData.data]);
};

function generateLeavesTextureData(width = 64, height = 64) {
    const canvas = new OffscreenCanvas(width, height);
    const ctx = canvas.getContext('2d');

    const leafColors = [
        'rgb(34, 139, 34)',   // Forest Green
        'rgb(50, 205, 50)',   // Lime Green
        'rgb(0, 128, 0)'      // Green
    ];

    const gradient = ctx.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgb(200, 240, 200)');
    gradient.addColorStop(1, 'rgb(144, 238, 144)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

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

    for (let i = 0; i < 250; i++) {
        const x = Math.floor(Math.random() * width);
        const y = Math.floor(Math.random() * height);
        const size = 3 + Math.floor(Math.random() * 7);
        const angle = Math.floor(Math.random() * 360);
        
        drawLeaf(x, y, size, angle);
    }

    // Convert canvas to image data for transfer
    const imageData = ctx.getImageData(0, 0, width, height);
    return {
        width,
        height,
        data: imageData.data.buffer
    };
}
