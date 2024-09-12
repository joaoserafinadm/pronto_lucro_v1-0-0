



export default function scrollCarouselTo(id, index) {
    const carousel = document.querySelector(`#${id}`);
    const carouselInstance = bootstrap.Carousel.getOrCreateInstance(carousel);
    carouselInstance.to(+index);
    return
}