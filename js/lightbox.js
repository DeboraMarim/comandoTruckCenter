document.addEventListener('DOMContentLoaded', function() {
    // Lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="close-btn">&times;</span>
            <div class="lightbox-navigation">
                <button class="nav-btn prev-btn">&larr;</button>
                <button class="nav-btn next-btn">&rarr;</button>
            </div>
            <div class="lightbox-image-container">
                <img src="" alt="Gallery Image" class="lightbox-img">
                <div class="lightbox-caption">
                    <h3></h3>
                    <p></p>
                </div>
            </div>
        </div>
    `;
    document.body.appendChild(lightbox);

    // Gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightboxImg = document.querySelector('.lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentIndex = 0;
    let touchStartX = 0;
    let touchEndX = 0;

    // Open lightbox
    function openLightbox(index) {
        currentIndex = index;
        const item = galleryItems[index];
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('h3') ? item.querySelector('h3').textContent : '';
        const description = item.querySelector('p') ? item.querySelector('p').textContent : '';

        lightboxImg.src = imgSrc;
        lightboxImg.alt = title;
        lightboxCaption.querySelector('h3').textContent = title;
        lightboxCaption.querySelector('p').textContent = description;
        
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Add animation class
        setTimeout(() => {
            lightbox.querySelector('.lightbox-content').classList.add('active');
        }, 10);
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.querySelector('.lightbox-content').classList.remove('active');
        setTimeout(() => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
    }

    // Navigate between images
    function navigate(direction) {
        currentIndex = (currentIndex + direction + galleryItems.length) % galleryItems.length;
        const item = galleryItems[currentIndex];
        const imgSrc = item.querySelector('img').src;
        const title = item.querySelector('h3') ? item.querySelector('h3').textContent : '';
        const description = item.querySelector('p') ? item.querySelector('p').textContent : '';

        // Fade out current image
        lightboxImg.style.opacity = '0';
        
        // Update content after fade out
        setTimeout(() => {
            lightboxImg.src = imgSrc;
            lightboxImg.alt = title;
            lightboxCaption.querySelector('h3').textContent = title;
            lightboxCaption.querySelector('p').textContent = description;
            lightboxImg.style.opacity = '1';
        }, 300);
    }

    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
        
        // Add keyboard navigation for accessibility
        item.setAttribute('tabindex', '0');
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox(index);
            }
        });
    });

    closeBtn.addEventListener('click', closeLightbox);
    prevBtn.addEventListener('click', () => navigate(-1));
    nextBtn.addEventListener('click', () => navigate(1));

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                navigate(-1);
                break;
            case 'ArrowRight':
                navigate(1);
                break;
        }
    });

    // Touch events for mobile
    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });

    function handleSwipe() {
        const swipeThreshold = 50;
        const deltaX = touchEndX - touchStartX;
        
        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                navigate(-1); // Swipe right
            } else {
                navigate(1); // Swipe left
            }
        }
    }

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
});
