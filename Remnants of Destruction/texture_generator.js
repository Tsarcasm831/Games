// Texture Generator for 8 Basic Colors
class TextureGenerator {
    constructor() {
        // Basic color palette
        this.colors = [
            '#FF0000',  // Red
            '#00FF00',  // Green
            '#0000FF',  // Blue
            '#FFFF00',  // Yellow
            '#FF00FF',  // Magenta
            '#00FFFF',  // Cyan
            '#FFA500',  // Orange
            '#800080'   // Purple
        ];
    }

    // Generate a random noise texture
    generateNoiseTexture(color, width = 64, height = 64) {
        // Create an offscreen canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');

        // Fill background with base color
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, width, height);

        // Add noise
        const imageData = ctx.getImageData(0, 0, width, height);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            // Generate noise variation
            const noiseIntensity = Math.random() * 50 - 25; // -25 to 25
            
            // Modify RGB channels while preserving alpha
            data[i] = Math.min(255, Math.max(0, data[i] + noiseIntensity));     // Red
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noiseIntensity)); // Green
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noiseIntensity)); // Blue
            data[i + 3] = 255; // Full opacity
        }

        // Put the modified image data back
        ctx.putImageData(imageData, 0, 0);

        // Return the data URL
        return canvas.toDataURL();
    }

    // Generate textures for all basic colors
    generateAllTextures(width = 64, height = 64) {
        const textures = {};
        this.colors.forEach(color => {
            textures[color] = this.generateNoiseTexture(color, width, height);
        });
        return textures;
    }
}

// Create a global instance for easy access
window.textureGenerator = new TextureGenerator();
