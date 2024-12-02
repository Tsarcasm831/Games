// Tree Bark Texture Generator for Three.js
// Optimized with Web Worker for performance
function generateTreeBarkTexture(width = 64, height = 64) {
    return new Promise((resolve, reject) => {
        // Create a Web Worker
        const worker = new Worker('tree-textures/tree-bark-texture-worker.js');
        
        // Handle worker response
        worker.onmessage = function(event) {
            const { width, height, data } = event.data;
            
            // Create a canvas to reconstruct the texture
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            
            // Reconstruct image data
            const imageData = new ImageData(new Uint8ClampedArray(data), width, height);
            ctx.putImageData(imageData, 0, 0);

            // Create Three.js texture
            const texture = new THREE.CanvasTexture(canvas);
            texture.wrapS = THREE.RepeatWrapping;
            texture.wrapT = THREE.RepeatWrapping;
            texture.repeat.set(3, 3);
            
            resolve(texture);
        };

        // Handle worker errors
        worker.onerror = function(error) {
            console.error('Tree Bark Texture Worker Error:', error);
            reject(error);
        };

        // Send generation parameters to worker
        worker.postMessage({ width, height });
    });
}

// Async wrapper for compatibility with existing code
async function createTreeBarkTexture(width, height) {
    try {
        return await generateTreeBarkTexture(width, height);
    } catch (error) {
        console.error('Failed to generate tree bark texture:', error);
        // Fallback to original synchronous method if worker fails
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(3, 3);
        return texture;
    }
}
