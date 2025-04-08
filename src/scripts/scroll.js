document.querySelector('#scroll-arrow').addEventListener('click', function(e) {
    e.preventDefault(); 
    document.querySelector('#about-us').scrollIntoView({
        behavior: 'smooth', 
        block: 'start'
    });
});