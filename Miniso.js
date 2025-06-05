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

    
    // Cart Functionality 

const cartModal = document.getElementById('cartModal');
const closeModalBtn = cartModal ? cartModal.querySelector('.close-modal-btn'):null;
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
const cartItemsContainer = document.getElementById('cartItemsContainer');
const cartItemCountSpan = document.getElementById('cartItemCount');
const cartSubtotalSpan = document.getElementById('cartSubtotal');
const cartShippingSpan = document.getElementById('cartShipping');
const cartGSTSpan = document.getElementById('cartGST');
const cartTotalSpan = document.getElementById('cartTotal');
const headerCartIcon = document.querySelector('.header-actions .cart-icon-link');
const proceedToCheckoutBtn = document.getElementById('proceedToCheckoutBtn');

let cart = [];
const SHIPPING_COST = 10.00;
const GST_CALCULATION_RATE = 2.64 / 29;

function openCartModal() {
    if (cartModal) {
        updateCartDisplay();
        cartModal.style.display = 'block';
    }
}

function closeCartModal () {
    if (cartModal) cartModal.style.display = 'none';
}

function getProductDetails(buttonElement) {
    const card = buttonElement.closest('.product-card');
    if (!card) return null; 

    const id = card.dataset.id || 
    card.querySelector('h3').textContent.trim().replace(/\s+/g, '-').toLowerCase();
    const name = card.dataset.name ||
    card.querySelector('h3').textContent.trim();
    const priceText = card.dataset.price ||
    (card.querySelector('.product-price')?card.querySelector('.product-price').textContent.replace('$',''):"0");
    const price = parseFloat(priceText);
    const imageSrc = card.dataset.image || (card.querySelector('img')?card.querySelector('img').src:'placeholder.png');
    const description = card.dataset.description || "Details not available"
    if (isNaN(price)){
        console.error("Could not parse price for item:", name);
    return null;
    }
    return { id, name, price, imageSrc, description, quantity: 1};
}

function addToCart(productInfo) {
    if (!productInfo) return;

    const existingItemIndex = cart.findIndex(item=>item.id===productInfo.id);
    if (existingItemIndex > -1){
        cart[existingItemIndex].quantity++;
    } else {
        cart.push(productInfo);
    }
    openCartModal();
}

function updateCartQuantity(productId, change) {
    const itemIndex = cart.findIndex(item=>item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0){
            cart.splice(itemIndex, 1);
        }
    }
    updateCartDisplay();
}

function removeItemFromCart(productId) {
    cart = cart.filter(item=> item.id !== productId);
    updateCartDisplay();

}

function updateCartDisplay() {
    if (!cartItemsContainer || !cartModal) return;

    cartItemsContainer.innerHTML = ''; // Clear existing items
    let currentSubtotal = 0;
    let totalItemsInCart = 0;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p style="text-align: center; color: #777; padding: 20px 0;">Your cart is empty.</p>';
    } else {
        cart.forEach(item => {
            const itemLinePrice = item.price * item.quantity;
            currentSubtotal += itemLinePrice;
            totalItemsInCart += item.quantity;

            const cartItemDiv = document.createElement('div');
            cartItemDiv.classList.add('cart-item');
            // **** CORRECTED innerHTML assignment ****
            cartItemDiv.innerHTML = `
                <img src="${item.imageSrc}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                    <div class="quantity-controls">
                        <button class="quantity-decrease" data-id="${item.id}">-</button>
                        <span class="item-quantity">${item.quantity}</span>
                        <button class="quantity-increase" data-id="${item.id}">+</button>
                    </div>
                </div>
                <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                <button class="remove-item-btn" data-id="${item.id}">×</button>
            `; // Note: Changed 'x' to '×' for the remove button
            cartItemsContainer.appendChild(cartItemDiv);
        });
    }

    const gstAmount = currentSubtotal * GST_CALCULATION_RATE;
    const totalAmount = (cart.length > 0) ? (currentSubtotal + gstAmount + SHIPPING_COST) : 0; // Ensure total is 0 if cart is empty

    // **** CORRECTED summary updates ****
    if (cartItemCountSpan) cartItemCountSpan.textContent = totalItemsInCart;
    if (cartSubtotalSpan) cartSubtotalSpan.textContent = `$${currentSubtotal.toFixed(2)}`;
    if (cartGSTSpan) cartGSTSpan.textContent = `$${gstAmount.toFixed(2)}`;
    if (cartShippingSpan) cartShippingSpan.textContent = (cart.length > 0) ? `$${SHIPPING_COST.toFixed(2)}` : "$0.00"; // Shipping cost only if items in cart
    if (cartTotalSpan) cartTotalSpan.textContent = `$${totalAmount.toFixed(2)}`;

    attachCartItemEventListeners();
}

function attachCartItemEventListeners() {
    document.querySelectorAll('#cartModal .quantity-decrease').forEach(button=> {
        button.onclick = (e) => updateCartQuantity(e.target.dataset.id,-1);
    });
    document.querySelectorAll('#cartModal .quantity-increase').forEach(button=> {
        button.onclick = (e) => updateCartQuantity(e.target.dataset.id,1);
    });
    document.querySelectorAll('#cartModal .remove-item-btn').forEach(button=> {
        button.onclick = (e) => removeItemFromCart(e.target.dataset.id);
    });
} 

// Event Listeners 

if(closeModalBtn) {
    closeModalBtn.addEventListener('click', closeCartModal);
}

window.addEventListener('click', (event)=> {
    if(cartModal && event.target == cartModal) {
        closeCartModal();
    }
});

addToCartButtons.forEach(button=> {
    button.addEventListener('click', ()=> {
        const productDetails = getProductDetails(button);
        if (productDetails){
        addToCart(productDetails);
        }
    });
});

if(headerCartIcon) {
    headerCartIcon.addEventListener('click', (e)=> {
        e.preventDefault();
        openCartModal();
    });
}

if(proceedToCheckoutBtn) {
    proceedToCheckoutBtn.addEventListener('click', ()=> {
        if (cart.length > 0) {
            let currentTotalItems = 0;
            cart.forEach(item => {
                currentTotalItems += item.quantity;
            });
            alert('Proceeding to checkout with ' + currentTotalItems + ' item(s)! (This is a demo)');
        } else {
            alert('Your cart is empty. Add some items first!');
        }
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