class SunVisualization {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        
        // Mouse position
        this.mouseX = this.width / 2;
        this.mouseY = this.height / 2;
        
        // Sun intensity (0 = dim, 1 = bright)
        this.intensity = 0.3;
        
        this.bindEvents();
        this.animate();
    }
    
    bindEvents() {
        // Enable pointer events for the canvas
        this.canvas.style.pointerEvents = 'auto';
        
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        });
        
        // Reset to center when mouse leaves the canvas
        this.canvas.addEventListener('mouseleave', () => {
            this.mouseX = this.width / 2;
            this.mouseY = this.height / 2;
        });
    }
    
    drawBackground() {
        // Simple dark background to match the site theme
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawSun() {
        const sunX = this.mouseX;
        const sunY = this.height / 2;
        
        // Fixed sun size for consistent appearance
        const radius = 50;
        
        // Logo orange color: #FF8F37 (255, 143, 55)
        const logoOrange = '255, 143, 55';
        
        // Outer glow with orange theme
        const glowRadius = radius * 2.5;
        const glowGradient = this.ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, glowRadius);
        glowGradient.addColorStop(0, `rgba(${logoOrange}, 0.6)`);
        glowGradient.addColorStop(0.3, `rgba(${logoOrange}, 0.4)`);
        glowGradient.addColorStop(0.6, `rgba(${logoOrange}, 0.2)`);
        glowGradient.addColorStop(1, `rgba(${logoOrange}, 0)`);
        
        this.ctx.fillStyle = glowGradient;
        this.ctx.beginPath();
        this.ctx.arc(sunX, sunY, glowRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Main sun body with logo orange
        this.ctx.fillStyle = `rgba(${logoOrange}, 0.9)`;
        this.ctx.beginPath();
        this.ctx.arc(sunX, sunY, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner bright core with lighter orange
        const coreRadius = radius * 0.5;
        const coreGradient = this.ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, coreRadius);
        coreGradient.addColorStop(0, `rgba(255, 200, 150, 0.9)`);
        coreGradient.addColorStop(1, `rgba(${logoOrange}, 0.7)`);
        
        this.ctx.fillStyle = coreGradient;
        this.ctx.beginPath();
        this.ctx.arc(sunX, sunY, coreRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Optional: subtle pulsing effect
        const pulseRadius = radius * 0.2;
        const pulse = Math.sin(Date.now() * 0.003) * 0.3 + 0.7;
        this.ctx.fillStyle = `rgba(255, 255, 255, ${pulse * 0.8})`;
        this.ctx.beginPath();
        this.ctx.arc(sunX, sunY, pulseRadius, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.drawBackground();
        this.drawSun();
        
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
            if (window.sunViz) {
                window.sunViz.width = canvas.width;
                window.sunViz.height = canvas.height;
            }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Initialize visualization
        window.sunViz = new SunVisualization(canvas);
    }
});