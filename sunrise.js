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
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            
            // Update intensity based on mouse Y position (inverted)
            this.intensity = Math.max(0, Math.min(1, 1 - (this.mouseY / this.height)));
        });
    }
    
    drawBackground() {
        // Simple gradient background based on intensity
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        
        if (this.intensity < 0.3) {
            // Night
            gradient.addColorStop(0, `hsl(220, 30%, ${5 + this.intensity * 10}%)`);
            gradient.addColorStop(1, `hsl(240, 40%, ${3 + this.intensity * 7}%)`);
        } else if (this.intensity < 0.7) {
            // Dawn
            const dawnProgress = (this.intensity - 0.3) / 0.4;
            gradient.addColorStop(0, `hsl(${220 - dawnProgress * 40}, 50%, ${15 + dawnProgress * 25}%)`);
            gradient.addColorStop(1, `hsl(${30 - dawnProgress * 10}, 60%, ${20 + dawnProgress * 30}%)`);
        } else {
            // Day
            const dayProgress = (this.intensity - 0.7) / 0.3;
            gradient.addColorStop(0, `hsl(200, 60%, ${40 + dayProgress * 20}%)`);
            gradient.addColorStop(1, `hsl(220, 50%, ${50 + dayProgress * 15}%)`);
        }
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawSun() {
        const sunX = this.mouseX;
        const sunY = this.height * 0.75 - (this.intensity * this.height * 0.5);
        
        // Sun size based on intensity
        const baseRadius = 25;
        const maxRadius = 60;
        const radius = baseRadius + (maxRadius - baseRadius) * this.intensity;
        
        // Sun color based on intensity
        let sunColor;
        if (this.intensity < 0.3) {
            // Moon-like when dim
            sunColor = `rgba(220, 230, 250, ${0.3 + this.intensity * 0.7})`;
        } else if (this.intensity < 0.7) {
            // Sunrise colors
            const progress = (this.intensity - 0.3) / 0.4;
            const red = Math.floor(255 * (0.8 + progress * 0.2));
            const green = Math.floor(180 + progress * 75);
            const blue = Math.floor(80 + progress * 40);
            sunColor = `rgba(${red}, ${green}, ${blue}, ${0.8 + progress * 0.2})`;
        } else {
            // Bright day sun
            const progress = (this.intensity - 0.7) / 0.3;
            sunColor = `rgba(255, ${220 + progress * 35}, ${120 + progress * 80}, ${0.9 + progress * 0.1})`;
        }
        
        // Outer glow
        const glowRadius = radius * (1.5 + this.intensity * 1.5);
        const glowGradient = this.ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, glowRadius);
        
        if (this.intensity < 0.3) {
            glowGradient.addColorStop(0, `rgba(220, 230, 250, ${this.intensity * 0.4})`);
            glowGradient.addColorStop(0.7, `rgba(200, 220, 240, ${this.intensity * 0.2})`);
        } else {
            glowGradient.addColorStop(0, `rgba(255, 200, 100, ${0.3 + this.intensity * 0.4})`);
            glowGradient.addColorStop(0.5, `rgba(255, 150, 50, ${0.2 + this.intensity * 0.3})`);
        }
        glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        this.ctx.fillStyle = glowGradient;
        this.ctx.beginPath();
        this.ctx.arc(sunX, sunY, glowRadius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Main sun body
        this.ctx.fillStyle = sunColor;
        this.ctx.beginPath();
        this.ctx.arc(sunX, sunY, radius, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner bright core
        if (this.intensity > 0.3) {
            const coreRadius = radius * 0.4;
            const coreGradient = this.ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, coreRadius);
            coreGradient.addColorStop(0, `rgba(255, 255, 255, ${this.intensity * 0.8})`);
            coreGradient.addColorStop(1, `rgba(255, 255, 200, ${this.intensity * 0.4})`);
            
            this.ctx.fillStyle = coreGradient;
            this.ctx.beginPath();
            this.ctx.arc(sunX, sunY, coreRadius, 0, Math.PI * 2);
            this.ctx.fill();
        }
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