const slider = document.querySelector('.infinite-gallery');

const imagesArray = [
    { src: 'assets/gallery/image1.jpg', alt: 'Test z języka angielskiego' },
    { src: 'assets/gallery/image2.jpg', alt: 'Test z języka angielskiego' },
    { src: 'assets/gallery/image3.jpg', alt: 'Spotkanie informacyjne dla klas IV' },
    { src: 'assets/gallery/image4.jpg', alt: 'Spotkanie online z firmą przyjmującą z Alicante – przygotowanie kulturowe' },
    { src: 'assets/gallery/image1.jpg', alt: 'Test z języka angielskiego' },
    { src: 'assets/gallery/image2.jpg', alt: 'Test z języka angielskiego' },
    { src: 'assets/gallery/image3.jpg', alt: 'Spotkanie informacyjne dla klas IV' },
    { src: 'assets/gallery/image4.jpg', alt: 'Spotkanie online z firmą przyjmującą z Alicante – przygotowanie kulturowe' },

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