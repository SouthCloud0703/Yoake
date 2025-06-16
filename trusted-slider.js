document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('trusted-track');
    const prevBtn = document.getElementById('trusted-prev');
    const nextBtn = document.getElementById('trusted-next');
    
    if (!track || !prevBtn || !nextBtn) return;
    
    const boxes = track.querySelectorAll('.trusted-box');
    const boxWidth = 180; // Width of each box
    const gap = 32; // 2rem gap
    const itemWidth = boxWidth + gap;
    
    let currentIndex = 0;
    const maxIndex = Math.max(0, boxes.length - Math.floor(window.innerWidth / itemWidth));
    
    function updateSlider() {
        const translateX = -currentIndex * itemWidth;
        track.style.transform = `translateX(${translateX}px)`;
        
        // Update button states
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }
    
    function slideLeft() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }
    
    function slideRight() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    }
    
    prevBtn.addEventListener('click', slideLeft);
    nextBtn.addEventListener('click', slideRight);
    
    // Initialize
    updateSlider();
    
    // Handle window resize
    window.addEventListener('resize', function() {
        const newMaxIndex = Math.max(0, boxes.length - Math.floor(window.innerWidth / itemWidth));
        if (currentIndex > newMaxIndex) {
            currentIndex = newMaxIndex;
        }
        updateSlider();
    });
});