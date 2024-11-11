document.addEventListener('DOMContentLoaded', function() {
    const gallery = document.getElementById('masonry-gallery');
    const sizes = ['small', 'small', 'small', 'medium', 'medium', 'large'];
    let currentImageIndex = 0;

    // Create lightbox elements (same as before)
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';

    const lightboxContent = document.createElement('div');
    lightboxContent.className = 'lightbox-content';

    const lightboxImage = document.createElement('img');
    lightboxImage.className = 'lightbox-image';

    const closeButton = document.createElement('button');
    closeButton.className = 'lightbox-close';
    closeButton.innerHTML = '×';

    const prevButton = document.createElement('button');
    prevButton.className = 'lightbox-nav prev';
    prevButton.innerHTML = '‹';

    const nextButton = document.createElement('button');
    nextButton.className = 'lightbox-nav next';
    nextButton.innerHTML = '›';

    lightboxContent.appendChild(lightboxImage);
    lightboxContent.appendChild(closeButton);
    lightbox.appendChild(prevButton);
    lightbox.appendChild(lightboxContent);
    lightbox.appendChild(nextButton);
    document.body.appendChild(lightbox);

    // Provide a list of filenames (without path)
    const imageFilenames = [
        'yoda2.jpg',
    ];    

    // Add the folder path automatically to each filename
    const images = imageFilenames.map(filename => `gallery/proposal/${filename}`);

    // Lightbox navigation functions
    function showImage(index) {
        currentImageIndex = index;
        lightboxImage.src = images[index];
        prevButton.style.display = index === 0 ? 'none' : 'flex';
        nextButton.style.display = index === images.length - 1 ? 'none' : 'flex';
    }

    function nextImage() {
        if (currentImageIndex < images.length - 1) {
            showImage(currentImageIndex + 1);
        }
    }

    function prevImage() {
        if (currentImageIndex > 0) {
            showImage(currentImageIndex - 1);
        }
    }

    function openLightbox(imagePath) {
        const index = images.indexOf(imagePath);
        if (index !== -1) {
            showImage(index);
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', prevImage);
    nextButton.addEventListener('click', nextImage);

    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;

        switch (e.key) {
            case 'ArrowLeft':
                prevImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Escape':
                closeLightbox();
                break;
        }
    });

    function getRandomSize() {
        return sizes[Math.floor(Math.random() * sizes.length)];
    }

    function createImageElement(imagePath) {
        const gridItem = document.createElement('div');
        gridItem.className = `grid-item ${getRandomSize()}`;

        const img = document.createElement('img');
        img.src = imagePath;
        img.alt = 'Gallery Image';
        img.style.opacity = '0';

        gridItem.addEventListener('click', () => openLightbox(imagePath));

        img.onload = function () {
            if (img.naturalWidth > img.naturalHeight) {
                gridItem.classList.add('landscape');
            } else if (img.naturalWidth < img.naturalHeight) {
                gridItem.classList.add('portrait');
            }
            img.style.transition = 'opacity 0.3s ease';
            img.style.opacity = '1';
        };

        img.onerror = function () {
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
