class ModernVisualization {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        
        // Mouse position
        this.mouseX = this.width / 2;
        this.mouseY = this.height / 2;
        
        // Animation state (0 = dark, 1 = bright)
        this.intensity = 0;
        
        // Grid and geometric elements
        this.time = 0;
        this.gridSize = 40;
        
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
        // Dynamic background based on intensity
        const darkness = Math.floor((1 - this.intensity) * 15 + 5);
        this.ctx.fillStyle = `hsl(220, 20%, ${darkness}%)`;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawGrid() {
        const opacity = 0.05 + this.intensity * 0.15;
        this.ctx.strokeStyle = `rgba(77, 101, 255, ${opacity})`;
        this.ctx.lineWidth = 1;
        
        // Vertical lines
        for (let x = 0; x <= this.width; x += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(x, 0);
            this.ctx.lineTo(x, this.height);
            this.ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 0; y <= this.height; y += this.gridSize) {
            this.ctx.beginPath();
            this.ctx.moveTo(0, y);
            this.ctx.lineTo(this.width, y);
            this.ctx.stroke();
        }
    }
    
    drawCentralOrb() {
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        // Main orb that follows mouse X
        const orbX = this.mouseX;
        const orbY = centerY + (this.mouseY - centerY) * 0.3;
        
        // Orb size based on intensity
        const baseSize = 30;
        const maxSize = 80;
        const size = baseSize + (maxSize - baseSize) * this.intensity;
        
        // Outer glow
        const glowGradient = this.ctx.createRadialGradient(orbX, orbY, 0, orbX, orbY, size * 2);
        glowGradient.addColorStop(0, `rgba(77, 101, 255, ${0.3 + this.intensity * 0.4})`);
        glowGradient.addColorStop(0.5, `rgba(77, 101, 255, ${0.1 + this.intensity * 0.2})`);
        glowGradient.addColorStop(1, 'rgba(77, 101, 255, 0)');
        
        this.ctx.fillStyle = glowGradient;
        this.ctx.beginPath();
        this.ctx.arc(orbX, orbY, size * 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Core orb
        this.ctx.fillStyle = `rgba(77, 101, 255, ${0.6 + this.intensity * 0.4})`;
        this.ctx.beginPath();
        this.ctx.arc(orbX, orbY, size * 0.7, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Inner core
        this.ctx.fillStyle = `rgba(200, 220, 255, ${0.8 + this.intensity * 0.2})`;
        this.ctx.beginPath();
        this.ctx.arc(orbX, orbY, size * 0.3, 0, Math.PI * 2);
        this.ctx.fill();
    }
    
    drawConnectedNodes() {
        const nodeCount = 6;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const radius = 120 + this.intensity * 40;
        
        this.ctx.strokeStyle = `rgba(77, 101, 255, ${0.2 + this.intensity * 0.3})`;
        this.ctx.lineWidth = 2;
        
        for (let i = 0; i < nodeCount; i++) {
            const angle = (i / nodeCount) * Math.PI * 2 + this.time * 0.001;
            const x = centerX + Math.cos(angle) * radius;
            const y = centerY + Math.sin(angle) * radius;
            
            // Draw connection line to center
            this.ctx.beginPath();
            this.ctx.moveTo(centerX, centerY);
            this.ctx.lineTo(x, y);
            this.ctx.stroke();
            
            // Draw node
            this.ctx.fillStyle = `rgba(77, 101, 255, ${0.4 + this.intensity * 0.4})`;
            this.ctx.beginPath();
            this.ctx.arc(x, y, 4 + this.intensity * 4, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    drawDataStreams() {
        const streamCount = 8;
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        
        this.ctx.strokeStyle = `rgba(77, 101, 255, ${0.1 + this.intensity * 0.2})`;
        this.ctx.lineWidth = 1;
        
        for (let i = 0; i < streamCount; i++) {
            const angle = (i / streamCount) * Math.PI * 2;
            const distance = 200 + Math.sin(this.time * 0.002 + i) * 50;
            
            const startX = centerX + Math.cos(angle) * 60;
            const startY = centerY + Math.sin(angle) * 60;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;
            
            // Draw stream line
            this.ctx.beginPath();
            this.ctx.moveTo(startX, startY);
            this.ctx.lineTo(endX, endY);
            this.ctx.stroke();
            
            // Draw data points along the stream
            const segments = 5;
            for (let j = 1; j <= segments; j++) {
                const t = j / segments;
                const px = startX + (endX - startX) * t;
                const py = startY + (endY - startY) * t;
                
                const size = (1 + Math.sin(this.time * 0.005 + i + j)) * 2;
                this.ctx.fillStyle = `rgba(77, 101, 255, ${0.3 + this.intensity * 0.4})`;
                this.ctx.beginPath();
                this.ctx.arc(px, py, size, 0, Math.PI * 2);
                this.ctx.fill();
            }
        }
    }
    
    animate() {
        this.time += 16; // Approximate 60fps timing
        
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.drawBackground();
        this.drawGrid();
        this.drawDataStreams();
        this.drawConnectedNodes();
        this.drawCentralOrb();
        
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
            if (window.modernViz) {
                window.modernViz.width = canvas.width;
                window.modernViz.height = canvas.height;
            }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Initialize visualization
        window.modernViz = new ModernVisualization(canvas);
    }
});