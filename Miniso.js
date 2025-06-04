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
    const scrollToTopBtn = document.querySelector ('.scroll-to-top-btn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => {
            if(window.pageYOffset > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
        });
        scrollToTopBtn.addEventListener('click', (e)=> {
            e.preventDefault();
            window.scrollTo({
                top:0,
                behavior: 'smooth'
            });
        });
    }

    // -- Specific for shop.html -- 
    if(document.body.classList.contains('shop-page')) {
        const urlParams = new URLSearchParams(window.location.search);
        const category = urlParams.get('category');
        const query =urlParams.get('q');

        const searchTermDisplay = 
        document.getElementById('searchTermDisplay');
        const searchTermDisplay2 =
        document.getElementById('searchTermDisplay2');

        let displayQuery = "products"; 
        if (category) {
            displayQuery = category.replace(/-/g, ' ').replace (/\b\w/g, l => l.toUpperCase());
        } else if (query) {
            displayQuery = query;
        }
        if (searchTermDisplay) searchTermDisplay.textContent = displayQuery;
        if (searchTermDisplay2) searchTermDisplay2.textContent = displayQuery;
    }
});
