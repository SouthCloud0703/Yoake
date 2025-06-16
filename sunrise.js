class StaticGlowVisualization {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        
        this.draw();
    }
    
    drawBackground() {
        // Simple dark background to match the site theme
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawGlow() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        // Sunrise orange color: #e6750a (230, 117, 10)
        const sunriseOrange = '230, 117, 10';
        
        // Static glow effect - no animation
        const glowRadius = 150;
        
        // Multiple glow layers for depth
        // Outer glow
        const outerGradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius * 1.5);
        outerGradient.addColorStop(0, `rgba(${sunriseOrange}, 0.12)`);
        outerGradient.addColorStop(0.3, `rgba(${sunriseOrange}, 0.08)`);
        outerGradient.addColorStop(0.6, `rgba(${sunriseOrange}, 0.04)`);
        outerGradient.addColorStop(1, `rgba(${sunriseOrange}, 0)`);
        
        this.ctx.fillStyle = outerGradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, glowRadius * 1.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Middle glow
        const middleGradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius);
        middleGradient.addColorStop(0, `rgba(${sunriseOrange}, 0.2)`);
        middleGradient.addColorStop(0.4, `rgba(${sunriseOrange}, 0.12)`);
        middleGradient.addColorStop(0.8, `rgba(${sunriseOrange}, 0.05)`);
        middleGradient.addColorStop(1, `rgba(${sunriseOrange}, 0)`);
        
        this.ctx.fillStyle = middleGradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner glow
        const innerGradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius * 0.6);
        innerGradient.addColorStop(0, `rgba(${sunriseOrange}, 0.3)`);
        innerGradient.addColorStop(0.5, `rgba(${sunriseOrange}, 0.15)`);
        innerGradient.addColorStop(1, `rgba(${sunriseOrange}, 0)`);
        
        this.ctx.fillStyle = innerGradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, glowRadius * 0.6, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.drawBackground();
        this.drawGlow();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('sunrise-canvas');
    if (canvas) {
        // Set canvas size
        const resizeCanvas = () => {
            const rect = canvas.parentElement.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            
            // Reinitialize if needed
            if (window.glowViz) {
                window.glowViz.width = canvas.width;
                window.glowViz.height = canvas.height;
                window.glowViz.draw(); // Redraw static content
            }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Initialize visualization
        window.glowViz = new StaticGlowVisualization(canvas);
    }
});