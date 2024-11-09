// gallery.js

document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('masonry-gallery');
    const sizes = ['small', 'small', 'small', 'medium', 'medium', 'large'];
    
    // Create lightbox elements
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';
    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';
    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '×';

    // Assemble lightbox
    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(closeButton);
    lightbox.appendChild(lightboxContent);
    document.body.appendChild(lightbox);

    // Lightbox event handlers
    function openLightbox(imageSrc) {
        lightboxImage.src = imageSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    }

    // Event listeners for lightbox
    closeButton.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Handle escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });

    // Predefined list of images
    const images = [
        'gallery/gallery/1f8fa204-a842-4272-9262-0b8be851a678.JPG',
        'gallery/gallery/2b07a3885d7542f7a6e313d4e7008a2d.MOV',
        'gallery/gallery/3FA0D218-6578-4AC4-ACBE-79EC23F334B3.JPG',
        'gallery/gallery/6C5A4828-3591-4B83-AB9E-1FE1803D2940.JPG',
        'gallery/gallery/gallery.jpeg',
        'gallery/gallery/IMG_1802.jpeg',
        'gallery/gallery/IMG_1962.jpeg',
        'gallery/gallery/IMG_2057.jpeg',
        'gallery/gallery/IMG_2178.jpeg',
        'gallery/gallery/IMG_2346.jpeg',
        'gallery/gallery/IMG_2473.jpeg',
        'gallery/gallery/IMG_3146.jpeg',
        'gallery/gallery/IMG_3470.jpeg',
        'gallery/gallery/IMG_3697.jpeg',
        'gallery/gallery/IMG_4235.jpeg',
        'gallery/gallery/IMG_4333.jpeg',
        'gallery/gallery/IMG_4444.jpeg',
        'gallery/gallery/IMG_4644.jpeg',
        'gallery/gallery/IMG_5042.jpeg',
        'gallery/gallery/IMG_5083.jpeg',
        'gallery/gallery/IMG_5878.jpeg',
        'gallery/gallery/IMG_5939.jpeg',
        'gallery/gallery/IMG_6209.jpeg',
        'gallery/gallery/IMG_6397.jpeg',
        'gallery/gallery/IMG_7033.jpeg',
        'gallery/gallery/IMG_7171.jpeg',
        'gallery/gallery/IMG_7183.jpeg',
        'gallery/gallery/IMG_7303.JPG',
        'gallery/gallery/IMG_7317.JPG',
        'gallery/gallery/IMG_7945.jpeg',
        'gallery/gallery/IMG_8878.jpeg'
    ];

    function getRandomSize() {
        return sizes[Math.floor(Math.random() * sizes.length)];
    }

    function createImageElement(imagePath) {
        if (imagePath.toLowerCase().endsWith('.mov')) {
            return null;
        }

        const gridItem = document.createElement('div');
        gridItem.className = `grid-item ${getRandomSize()}`;
        
        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = 'Gallery Image';
        img.style.opacity = '0';
        
        // Add click handler for lightbox
        gridItem.addEventListener('click', () => openLightbox(imagePath));
        
        img.onload = function() {
            if (img.naturalWidth > img.naturalHeight) {
                gridItem.classList.add('landscape');
            } else if (img.naturalWidth < img.naturalHeight) {
                gridItem.classList.add('portrait');
            }
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = '1';
        };
        
        img.onerror = function() {
            gridItem.remove();
        };
        
        gridItem.appendChild(img);
        return gridItem;
    }

    function loadGalleryImages() {
        const shuffledImages = [...images].sort(() => Math.random() - 0.5);
        shuffledImages.forEach(imagePath => {
            const imageElement = createImageElement(imagePath);
            if (imageElement) {
                gallery.appendChild(imageElement);
            }
        });
    }

    // Initialize gallery
    loadGalleryImages();
});