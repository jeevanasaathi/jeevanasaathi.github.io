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
        '1f8fa204-a842-4272-9262-0b8be851a678.JPG',
        '3FA0D218-6578-4AC4-ACBE-79EC23F334B3.JPG',
        '6C5A4828-3591-4B83-AB9E-1FE1803D2940.JPG',
        'gallery.jpeg',
        'IMG_1802.jpeg',
        'IMG_1962.jpeg',
        'IMG_2057.jpeg',
        'IMG_2178.jpeg',
        'IMG_2346.jpeg',
        'IMG_2473.jpeg',
        'IMG_3146.jpeg',
        'IMG_3470.jpeg',
        'IMG_3697.jpeg',
        'IMG_4235.jpeg',
        'IMG_4333.jpeg',
        'IMG_4444.jpeg',
        'IMG_4644.jpeg',
        'IMG_5042.jpeg',
        'IMG_5083.jpeg',
        'IMG_5878.jpeg',
        'IMG_5939.jpeg',
        'IMG_6209.jpeg',
        'IMG_6397.jpeg',
        'IMG_7033.jpeg',
        'IMG_7171.jpeg',
        'IMG_7183.jpeg',
        'IMG_7303.JPG',
        'IMG_7317.JPG',
        'IMG_7945.jpeg',
        'IMG_8878.jpeg'
    ];    

    // Add the folder path automatically to each filename
    const images = imageFilenames.map(filename => `gallery/gallery/${filename}`);

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
