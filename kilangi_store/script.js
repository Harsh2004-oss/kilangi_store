document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Fade-in for Hero Text
    const heroText = document.querySelector('.hero-overlay-text');
    if (heroText) {
        heroText.style.opacity = '0';
        heroText.style.transform = 'translateY(20px)';
        heroText.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        
        // Trigger reflow
        setTimeout(() => {
            heroText.style.opacity = '1';
            heroText.style.transform = 'translateY(0)';
        }, 300);
    }

    // 2. Feature Items Staggered Reveal
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay based on index for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const features = document.querySelectorAll('.feature-item');
    features.forEach(feature => {
        feature.style.opacity = '0';
        feature.style.transform = 'translateY(15px)';
        feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(feature);
    });

    // Add CSS class for visibility via JS
    const style = document.createElement('style');
    style.innerHTML = `
        .feature-item.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // 3. Search Bar Interaction
    const searchInput = document.querySelector('.search-bar input');
    const searchBar = document.querySelector('.search-bar');
    
    if(searchInput && searchBar) {
        searchInput.addEventListener('focus', () => {
            searchBar.style.boxShadow = '0 0 0 2px rgba(26, 60, 52, 0.1)';
        });
        searchInput.addEventListener('blur', () => {
            searchBar.style.boxShadow = 'none';
        });
    }
});
