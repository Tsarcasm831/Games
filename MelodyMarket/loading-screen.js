// Loading Screen Management
window.GameLoader = {
    scriptsLoaded: 0,
    totalScripts: 0,
    requiredScripts: [
        'grass-texture.js',
        'loading-screen.js'
        // Add other critical scripts here
    ],
    loadStartTime: performance.now(),
    loadingErrors: [],
    
    trackScriptLoading: function() {
        const scripts = document.querySelectorAll('script[src]');
        this.totalScripts = scripts.length;
        
        scripts.forEach(script => {
            const src = script.getAttribute('src');
            
            script.addEventListener('load', () => {
                this.scriptsLoaded++;
                
                // Check if all required scripts are loaded
                const allRequiredScriptsLoaded = this.requiredScripts.every(requiredScript => 
                    document.querySelector(`script[src="${requiredScript}"]`)?.complete
                );
                
                if (allRequiredScriptsLoaded) {
                    this.onAllScriptsLoaded();
                }
                
                this.updateLoadingProgress();
            });
            
            script.addEventListener('error', (e) => {
                this.loadingErrors.push(src);
                console.error(`Failed to load script: ${src}`, e);
                this.updateLoadingProgress();
            });
        });
    },
    
    updateLoadingProgress: function() {
        const loadingText = document.getElementById('loading-text');
        const loadingBar = document.getElementById('loading-bar');
        
        if (loadingText) {
            const progressPercentage = this.totalScripts > 0 
                ? Math.round((this.scriptsLoaded / this.totalScripts) * 100) 
                : 0;
            
            loadingText.textContent = `Loading Melody Market... (${progressPercentage}%)`;
            
            // Update loading bar if it exists
            if (loadingBar) {
                loadingBar.style.width = `${progressPercentage}%`;
            }
        }
    },
    
    onAllScriptsLoaded: function() {
        const totalLoadTime = performance.now() - this.loadStartTime;
        console.log(`Total Script Loading Time: ${totalLoadTime.toFixed(2)}ms`);
        
        if (this.loadingErrors.length > 0) {
            console.warn('Scripts failed to load:', this.loadingErrors);
        }
        
        this.hideLoadingOverlay();
        
        // Trigger game initialization if all required scripts are loaded
        if (typeof init === 'function' && typeof animate === 'function') {
            init();
            animate();
        }
    },
    
    init: function() {
        // Ensure loading overlay is visible
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.display = 'block';
        }
        
        // Track script loading on initialization
        this.trackScriptLoading();
        
        // Fallback if some scripts don't trigger load/error events
        setTimeout(() => {
            if (this.scriptsLoaded < this.totalScripts) {
                console.warn('Some scripts may not have loaded correctly');
                this.updateLoadingProgress();
            }
        }, 10000);  // 10-second timeout
    },
    
    hideLoadingOverlay: function() {
        const loadingOverlay = document.getElementById('loading-overlay');
        if (loadingOverlay) {
            loadingOverlay.style.opacity = '0';
            setTimeout(() => {
                loadingOverlay.style.display = 'none';
            }, 500);
        }
    }
};

// Initialize loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.GameLoader.init();
});
