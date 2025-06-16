class SunriseVisualization {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.width = canvas.width;
        this.height = canvas.height;
        
        // Mouse position
        this.mouseX = this.width / 2;
        this.mouseY = this.height / 2;
        
        // Sun properties
        this.sunX = this.width / 2;
        this.sunY = this.height * 0.8; // Start below horizon
        this.sunRadius = 40;
        
        // Time of day (0 = night, 1 = day)
        this.timeOfDay = 0;
        
        // Clouds
        this.clouds = this.generateClouds();
        
        this.bindEvents();
        this.animate();
    }
    
    bindEvents() {
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
            
            // Update time of day based on mouse Y position
            this.timeOfDay = Math.max(0, Math.min(1, 1 - (this.mouseY / this.height)));
            
            // Update sun position
            this.sunX = this.mouseX;
            this.sunY = this.height * (0.9 - this.timeOfDay * 0.6);
        });
    }
    
    generateClouds() {
        const clouds = [];
        for (let i = 0; i < 8; i++) {
            clouds.push({
                x: Math.random() * this.width,
                y: Math.random() * this.height * 0.4 + this.height * 0.1,
                size: Math.random() * 60 + 30,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.3 + 0.1
            });
        }
        return clouds;
    }
    
    drawSky() {
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.height);
        
        if (this.timeOfDay < 0.3) {
            // Night to early morning
            const intensity = this.timeOfDay / 0.3;
            gradient.addColorStop(0, `hsl(220, 80%, ${5 + intensity * 15}%)`);
            gradient.addColorStop(0.6, `hsl(240, 60%, ${3 + intensity * 12}%)`);
            gradient.addColorStop(1, `hsl(260, 40%, ${1 + intensity * 8}%)`);
        } else if (this.timeOfDay < 0.7) {
            // Sunrise
            const intensity = (this.timeOfDay - 0.3) / 0.4;
            gradient.addColorStop(0, `hsl(${200 + intensity * 60}, 80%, ${20 + intensity * 40}%)`);
            gradient.addColorStop(0.4, `hsl(${30 + intensity * 20}, 70%, ${30 + intensity * 30}%)`);
            gradient.addColorStop(0.8, `hsl(${15 + intensity * 25}, 80%, ${25 + intensity * 35}%)`);
            gradient.addColorStop(1, `hsl(${350 + intensity * 20}, 60%, ${15 + intensity * 25}%)`);
        } else {
            // Day
            const intensity = (this.timeOfDay - 0.7) / 0.3;
            gradient.addColorStop(0, `hsl(${200 + intensity * 40}, 70%, ${60 + intensity * 20}%)`);
            gradient.addColorStop(0.6, `hsl(${220 + intensity * 20}, 60%, ${50 + intensity * 30}%)`);
            gradient.addColorStop(1, `hsl(${240 + intensity * 20}, 50%, ${40 + intensity * 35}%)`);
        }
        
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.width, this.height);
    }
    
    drawSun() {
        const sunGradient = this.ctx.createRadialGradient(
            this.sunX, this.sunY, 0,
            this.sunX, this.sunY, this.sunRadius * 2
        );
        
        if (this.timeOfDay < 0.3) {
            // Moon
            sunGradient.addColorStop(0, `rgba(220, 220, 250, ${0.1 + this.timeOfDay * 0.3})`);
            sunGradient.addColorStop(0.7, `rgba(200, 200, 240, ${0.05 + this.timeOfDay * 0.15})`);
            sunGradient.addColorStop(1, 'rgba(200, 200, 240, 0)');
        } else {
            // Sun
            const intensity = Math.min(1, (this.timeOfDay - 0.2) / 0.5);
            sunGradient.addColorStop(0, `rgba(255, 220, 120, ${0.8 + intensity * 0.2})`);
            sunGradient.addColorStop(0.3, `rgba(255, 180, 80, ${0.6 + intensity * 0.3})`);
            sunGradient.addColorStop(0.7, `rgba(255, 140, 60, ${0.3 + intensity * 0.4})`);
            sunGradient.addColorStop(1, 'rgba(255, 100, 40, 0)');
        }
        
        this.ctx.fillStyle = sunGradient;
        this.ctx.beginPath();
        this.ctx.arc(this.sunX, this.sunY, this.sunRadius * 2, 0, Math.PI * 2);
        this.ctx.fill();
        
        // Sun core
        if (this.timeOfDay > 0.2) {
            this.ctx.fillStyle = `rgba(255, 255, 200, ${Math.min(1, this.timeOfDay)})`;
            this.ctx.beginPath();
            this.ctx.arc(this.sunX, this.sunY, this.sunRadius * 0.6, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }
    
    drawClouds() {
        this.clouds.forEach(cloud => {
            cloud.x += cloud.speed;
            if (cloud.x > this.width + cloud.size) {
                cloud.x = -cloud.size;
            }
            
            const cloudOpacity = cloud.opacity * (0.3 + this.timeOfDay * 0.7);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${cloudOpacity})`;
            
            // Simple cloud shape
            this.ctx.beginPath();
            this.ctx.arc(cloud.x, cloud.y, cloud.size * 0.5, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + cloud.size * 0.3, cloud.y, cloud.size * 0.4, 0, Math.PI * 2);
            this.ctx.arc(cloud.x - cloud.size * 0.3, cloud.y, cloud.size * 0.4, 0, Math.PI * 2);
            this.ctx.arc(cloud.x + cloud.size * 0.1, cloud.y - cloud.size * 0.2, cloud.size * 0.35, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }
    
    drawMountains() {
        const mountainGradient = this.ctx.createLinearGradient(0, this.height * 0.7, 0, this.height);
        
        const mountainColor = this.timeOfDay < 0.3 ? 
            `hsl(220, 20%, ${5 + this.timeOfDay * 20}%)` :
            `hsl(${120 + this.timeOfDay * 40}, 30%, ${15 + this.timeOfDay * 35}%)`;
            
        mountainGradient.addColorStop(0, mountainColor);
        mountainGradient.addColorStop(1, `rgba(0, 0, 0, ${0.3 - this.timeOfDay * 0.2})`);
        
        this.ctx.fillStyle = mountainGradient;
        this.ctx.beginPath();
        this.ctx.moveTo(0, this.height);
        this.ctx.lineTo(0, this.height * 0.8);
        this.ctx.lineTo(this.width * 0.2, this.height * 0.7);
        this.ctx.lineTo(this.width * 0.4, this.height * 0.75);
        this.ctx.lineTo(this.width * 0.6, this.height * 0.65);
        this.ctx.lineTo(this.width * 0.8, this.height * 0.78);
        this.ctx.lineTo(this.width, this.height * 0.72);
        this.ctx.lineTo(this.width, this.height);
        this.ctx.closePath();
        this.ctx.fill();
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        this.drawSky();
        this.drawMountains();
        this.drawClouds();
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
            if (window.sunriseViz) {
                window.sunriseViz.width = canvas.width;
                window.sunriseViz.height = canvas.height;
            }
        };
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Initialize visualization
        window.sunriseViz = new SunriseVisualization(canvas);
    }
});