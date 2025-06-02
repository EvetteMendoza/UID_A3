document.addEventListener('DOMContentLoaded', () => {
    // Product Carousel
    const carousel = document.querySelector('.product-carousel');
    const prevArrow = document.querySelector('.prev-arrow');
    const nextArrow = document.querySelector('.next-arrow');
    const productCard = document.querySelector('.product-card'); // To get card width

    if (carousel && prevArrow && nextArrow && productCard) {
        const cardWidth = productCard.offsetWidth + 20; // card width + gap

        prevArrow.addEventListener('click', () => {
            carousel.scrollLeft -= cardWidth * 2; // Scroll by width of 2 cards
        });

        nextArrow.addEventListener('click', () => {
            carousel.scrollLeft += cardWidth * 2; // Scroll by width of 2 cards
        });
    }

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('header nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
            // Change icon on toggle
            const icon = menuToggle.querySelector('i');
            if (nav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
});