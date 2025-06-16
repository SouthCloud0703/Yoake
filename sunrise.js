class GlowVisualization {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        
        // Animation time
        this.time = 0;
        
        this.animate();
    }
    
    drawBackground() {
        // Simple dark background to match the site theme
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawGlow() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        // Logo orange color: #FF8F37 (255, 143, 55)
        const logoOrange = '255, 143, 55';
        
        // Animated glow effect with subtle pulsing
        const pulse = Math.sin(this.time * 0.001) * 0.2 + 0.8;
        const glowRadius = 150 * pulse;
        
        // Multiple glow layers for depth
        // Outer glow
        const outerGradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius * 1.5);
        outerGradient.addColorStop(0, `rgba(${logoOrange}, ${0.15 * pulse})`);
        outerGradient.addColorStop(0.3, `rgba(${logoOrange}, ${0.08 * pulse})`);
        outerGradient.addColorStop(0.6, `rgba(${logoOrange}, ${0.04 * pulse})`);
        outerGradient.addColorStop(1, `rgba(${logoOrange}, 0)`);
        
        this.ctx.fillStyle = outerGradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, glowRadius * 1.5, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Middle glow
        const middleGradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius);
        middleGradient.addColorStop(0, `rgba(${logoOrange}, ${0.25 * pulse})`);
        middleGradient.addColorStop(0.4, `rgba(${logoOrange}, ${0.12 * pulse})`);
        middleGradient.addColorStop(0.8, `rgba(${logoOrange}, ${0.05 * pulse})`);
        middleGradient.addColorStop(1, `rgba(${logoOrange}, 0)`);
        
        this.ctx.fillStyle = middleGradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner glow
        const innerGradient = this.ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, glowRadius * 0.6);
        innerGradient.addColorStop(0, `rgba(${logoOrange}, ${0.35 * pulse})`);
        innerGradient.addColorStop(0.5, `rgba(${logoOrange}, ${0.18 * pulse})`);
        innerGradient.addColorStop(1, `rgba(${logoOrange}, 0)`);
        
        this.ctx.fillStyle = innerGradient;
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, glowRadius * 0.6, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    animate() {
        this.time += 16; // Approximate 60fps timing
        
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.drawBackground();
        this.drawGlow();
        
        requestAnimationFrame(() => this.animate());
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
            }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Initialize visualization
        window.glowViz = new GlowVisualization(canvas);
    }
});