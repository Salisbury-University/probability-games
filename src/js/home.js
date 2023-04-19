const container = document.querySelector('.carousel-container');
const leftButton = document.querySelector('.left-button');
const rightButton = document.querySelector('.right-button');

leftButton.addEventListener('click', () => {
    container.scrollLeft -= 200;
});

rightButton.addEventListener('click', () => {
    container.scrollLeft += 200;
});
