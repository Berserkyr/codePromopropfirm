function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex >= slides.length) { slideIndex = 0;}
    slides[slideIndex].style.display = "block";
    slideshowTimer = setTimeout(showSlides, 3000);
}

function plusSlides(n) {
    clearTimeout(slideshowTimer);
    showSlides();
}

function currentSlide(n) {
    clearTimeout(slideshowTimer);
    showSlides(slideIndex = n);
}