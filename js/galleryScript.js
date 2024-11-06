// Example array of images in the folder (replace with a server-side API to fetch files if needed)
const imageFolder = 'gallery/gallery/';
const images = [
    'IMG_1802.jpeg', 'IMG_1962.jpeg', 'IMG_2057.jpeg', 'IMG_2178.jpeg', 'IMG_2346.jpeg', 
    'IMG_2473.jpeg', 'IMG_3146.jpeg', 'IMG_3470.jpeg', 'IMG_3697.jpeg', 'IMG_4235.jpeg', 
    'IMG_4333.jpeg', 'IMG_4444.jpeg', 'IMG_4644.jpeg', 'IMG_5042.jpeg', 'IMG_5083.jpeg', 
    'IMG_5878.jpeg', 'IMG_5939.jpeg', 'IMG_6209.jpeg', 'IMG_6397.jpeg', 'IMG_7033.jpeg', 
    'IMG_7171.jpeg', 'IMG_7183.jpeg', 'IMG_7303.JPG', 'IMG_7317.JPG', 'IMG_7945.jpeg', 
    'IMG_8878.jpeg', 'Snapchat-621883149.mp4', 'IMG_9851.MOV'
];


function populateGallery() {
    const galleryList = document.getElementById('fh5co-gallery-list');
    images.forEach(image => {
        // Extract image name without extension for use in h2
        const imageName = image.split('.')[0].replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase()); // Capitalize words
        
        // Create the list item
        const listItem = document.createElement('li');
        listItem.className = 'one-third animate-box';
        listItem.setAttribute('data-animate-effect', 'fadeIn');
        listItem.style.backgroundImage = `url(${imageFolder + image})`;

        // Create anchor tag
        const anchor = document.createElement('a');
        anchor.href = imageFolder + image;

        // Create the case-studies-summary div
        const summaryDiv = document.createElement('div');
        summaryDiv.className = 'case-studies-summary';

        // Create h2 and set text to the image name
        const heading = document.createElement('h2');
        heading.innerText = imageName;

        // Append elements
        summaryDiv.appendChild(heading);
        anchor.appendChild(summaryDiv);
        listItem.appendChild(anchor);
        galleryList.appendChild(listItem);
    });
}

// Call the function to populate the gallery
populateGallery();
