const slider = document.querySelector('.infinite-gallery');

const imagesArray = [
    { src: 'assets/19_05/image30.JPEG', alt: 'image' },
    { src: 'assets/19_05/image6.JPEG', alt: 'image' },
    { src: 'assets/19_05/image35.JPEG', alt: 'image' },
    { src: 'assets/19_05/image32.JPEG', alt: 'image' },
    { src: 'assets/19_05/image4.JPEG', alt: 'image' },
    { src: 'assets/19_05/image5.JPEG', alt: 'image' },
    { src: 'assets/19_05/image7.JPEG', alt: 'image' },
    { src: 'assets/20_05/image6.JPEG', alt: 'image' },
    { src: 'assets/20_05/image9.JPEG', alt: 'image' },
    { src: 'assets/20_05/image10.JPEG', alt: 'image' },
    { src: 'assets/22_05/image11.JPEG', alt: 'image' },
    { src: 'assets/22_05/image8.JPEG', alt: 'image' },
    { src: 'assets/22_05/image6.JPEG', alt: 'image' },
    { src: 'assets/22_05/image29.JPEG', alt: 'image' },
    { src: 'assets/22_05/image27.JPEG', alt: 'image' },
    { src: 'assets/22_05/image31.JPEG', alt: 'image' },
    { src: 'assets/22_05/image37.JPEG', alt: 'image' },
    { src: 'assets/22_05/image38.JPEG', alt: 'image' },
    { src: 'assets/22_05/image42.jpg', alt: 'image' },
    { src: 'assets/23_05/image30.JPEG', alt: 'image' },
];

function populateSlider() {
    imagesArray.forEach(image => {
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = image.src;
        img.alt = image.alt;
        li.appendChild(img);
        slider.appendChild(li);
    });
}

function updateSlider() {
    const firstChild = slider.firstElementChild;
    const lastChild = slider.lastElementChild;

    if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth) {
        const newImage = imagesArray.shift();
        imagesArray.push(newImage);
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = newImage.src;
        img.alt = newImage.alt;
        li.appendChild(img);
        slider.appendChild(li);
        slider.removeChild(firstChild);
        slider.scrollLeft -= firstChild.offsetWidth;
    }

    if (slider.scrollLeft === 0) {
        const newImage = imagesArray.pop();
        imagesArray.unshift(newImage);
        const li = document.createElement('li');
        const img = document.createElement('img');
        img.src = newImage.src;
        img.alt = newImage.alt;
        li.appendChild(img);
        slider.prepend(li);
        slider.removeChild(lastChild);
        slider.scrollLeft += li.offsetWidth;
    }
}

populateSlider();

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    e.preventDefault();
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
    updateSlider();
});

slider.addEventListener('touchstart', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
});

slider.addEventListener('touchend', () => {
    isDown = false;
    slider.classList.remove('active');
});

slider.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - slider.offsetLeft;
    const walk = (x - startX) * 1.5;
    slider.scrollLeft = scrollLeft - walk;
    updateSlider();
});

function autoScrollGallery() {
    const scrollStep = -1;
    const scrollInterval = 20;

    function scroll() {
        slider.scrollLeft += scrollStep;
        updateSlider();
    }

    setInterval(scroll, scrollInterval);
}

document.addEventListener('DOMContentLoaded', () => {
    autoScrollGallery();
});