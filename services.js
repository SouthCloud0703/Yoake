// Service modal functionality
const serviceData = {
    validator: {
        title: "High-performance Validator Operations",
        content: `
            <div class="modal-header">
                <h2>High-performance Validator Operations</h2>
            </div>
            <div class="modal-body">
                <p>Yoake Labs operates high-performance Solana validators with industry-leading uptime and zero commission structure, providing maximum value to our delegators.</p>
                
                <h3>Key Features</h3>
                <ul>
                    <li><strong>0% Commission:</strong> We take no commission from your staking rewards</li>
                    <li><strong>0% MEV:</strong> Maximum extractable value stays with delegators</li>
                    <li><strong>99.99% Uptime:</strong> Enterprise-grade infrastructure ensures maximum availability</li>
                    <li><strong>Frankfurt Location:</strong> Strategically located in Europe for optimal performance</li>
                    <li><strong>Real-time Monitoring:</strong> 24/7 monitoring and automated failover systems</li>
                </ul>

                <div class="modal-highlight">
                    <h4>Technical Specifications</h4>
                    <p>Our validators run on enterprise-grade hardware in Frankfurt data centers with redundant network connections and automated monitoring systems.</p>
                </div>

                <h3>Validator Information</h3>
                <ul>
                    <li><strong>Identity:</strong> 4k6wgP5WPBKQpsFGtzuXNrjcTE2fKWLj17nDvFeG5zSF</li>
                    <li><strong>Vote Account:</strong> 8zuMRTXThoPTTPLLvaiKiJshLLCqGMt9BdRjjCL19xBc</li>
                    <li><strong>Location:</strong> Frankfurt, Germany</li>
                    <li><strong>Commission:</strong> 0%</li>
                    <li><strong>MEV Commission:</strong> 0%</li>
                </ul>

                <p>Join thousands of delegators who trust Yoake Labs for reliable, high-performance Solana validation services.</p>
            </div>
        `
    },
    vaas: {
        title: "Validator as a Service",
        content: `
            <div class="modal-header">
                <h2>Validator as a Service (VaaS)</h2>
            </div>
            <div class="modal-body">
                <p>Complete validator operations tailored for Solana-native projects, communities, and enterprises. We handle all technical aspects while you focus on your core business.</p>
                
                <h3>Service Offerings</h3>
                <ul>
                    <li><strong>White-label Validation:</strong> Run validators under your brand</li>
                    <li><strong>Custom Infrastructure:</strong> Dedicated hardware and network setup</li>
                    <li><strong>Technical Support:</strong> 24/7 monitoring and maintenance</li>
                    <li><strong>Governance Participation:</strong> Active participation in Solana governance</li>
                    <li><strong>Reporting & Analytics:</strong> Detailed performance and reward reporting</li>
                </ul>

                <div class="modal-highlight">
                    <h4>Perfect For</h4>
                    <p>DeFi protocols, DAOs, exchanges, and enterprises looking to participate in Solana's proof-of-stake consensus without technical overhead.</p>
                </div>

                <h3>What We Handle</h3>
                <ul>
                    <li>Validator setup and configuration</li>
                    <li>Hardware procurement and maintenance</li>
                    <li>Software updates and security patches</li>
                    <li>Network monitoring and optimization</li>
                    <li>Slashing protection and risk management</li>
                    <li>Reward distribution and reporting</li>
                </ul>

                <h3>Benefits</h3>
                <ul>
                    <li><strong>Reduced Operational Overhead:</strong> No need to hire validator specialists</li>
                    <li><strong>Maximum Uptime:</strong> Enterprise-grade infrastructure and monitoring</li>
                    <li><strong>Cost Effective:</strong> Shared infrastructure reduces operational costs</li>
                    <li><strong>Expert Support:</strong> Access to experienced Solana validation team</li>
                </ul>

                <p>Contact us to discuss custom validator solutions tailored to your specific needs and requirements.</p>
            </div>
        `
    }
};

function openServiceModal(serviceKey) {
    const modal = document.getElementById('service-modal');
    const modalBody = document.getElementById('modal-body');
    
    if (serviceData[serviceKey]) {
        modalBody.innerHTML = serviceData[serviceKey].content;
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closeServiceModal() {
    const modal = document.getElementById('service-modal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto'; // Restore scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('service-modal');
    if (event.target === modal) {
        closeServiceModal();
    }
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeServiceModal();
    }
});