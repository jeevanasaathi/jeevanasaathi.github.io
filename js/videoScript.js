function generateVideoGallery(orderedNames, randomNames) {
    // Get the gallery container
    const galleryList = document.getElementById('videoGallery');
    
    // First add all ordered names in the specified order
    orderedNames.forEach(name => {
        const videoPath = `gallery/wishes/${name}.mp4`;
        const thumbnailPath = `gallery/wishes/thumbnails/${name}.png`;
        
        const li = document.createElement('li');
        li.className = 'video-item animate-box';
        li.setAttribute('data-animate-effect', 'fadeIn');
        
        li.innerHTML = `
            <a href="${videoPath}" class="glightbox" data-gallery="gallery1">
                <img src="${thumbnailPath}" alt="${name}" class="video-thumbnail">
                <div class="play-overlay"></div>
                <div class="video-summary">
                    <span>${name}</span>
                </div>
            </a>
        `;
        
        galleryList.appendChild(li);
    });
    
    // Shuffle the random names
    const shuffledNames = randomNames.sort(() => Math.random() - 0.5);
    
    // Then add all random names
    shuffledNames.forEach(name => {
        const videoPath = `gallery/wishes/${name}.mp4`;
        const thumbnailPath = `gallery/wishes/thumbnails/${name}.png`;
        
        const li = document.createElement('li');
        li.className = 'video-item animate-box';
        li.setAttribute('data-animate-effect', 'fadeIn');
        
        li.innerHTML = `
            <a href="${videoPath}" class="glightbox" data-gallery="gallery1">
                <img src="${thumbnailPath}" alt="${name}" class="video-thumbnail">
                <div class="play-overlay"></div>
                <div class="video-summary">
                    <span>${name}</span>
                </div>
            </a>
        `;
        
        galleryList.appendChild(li);
    });
    
    // Initialize GLightbox after adding all videos
    const lightbox = GLightbox({
        touchNavigation: true,
        loop: true,
        autoplayVideos: true
    });
}

// Example usage:
const orderedNames = [
    'Appa',
    'Aaie',
    'Papa',
    'Mumma'
];

const randomNames = [
    'Ajja',
    'Amma',
    'Uncle1',
    'Uncle2',
    'Aunt1',
    'Aunt2'
    // Add more names as needed
];

// Call the function when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    generateVideoGallery(orderedNames, randomNames);
});