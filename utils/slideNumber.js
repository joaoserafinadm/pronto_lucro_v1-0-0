

export default function slideNumber(id) {

    const carouselElement = document.querySelector('#' + id);

    const slides = carouselElement?.querySelectorAll('.carousel-item');


    const slidesArray = slides?.length && Array.from(slides);

    const activeSlideIndex = slidesArray?.length && slidesArray.findIndex(elem => elem.classList.contains('active'))

    return activeSlideIndex

}