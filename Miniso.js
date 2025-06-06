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

// Initialising cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem('minisoCart')) || [];
// Function to save the cart to localStorage and update the display
function saveCartAndDisplay() {
    localStorage.setItem('minisoCart', JSON.stringify(cart));
    updateCartDisplay(); // This is your existing function to update the modal
}
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
    saveCartAndDisplay(); openCartModal();
}

function updateCartQuantity(productId, change) {
    const itemIndex = cart.findIndex(item=>item.id === productId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += change;
        if (cart[itemIndex].quantity <= 0){
            cart.splice(itemIndex, 1);
        }
    }
    saveCartAndDisplay();
}

function removeItemFromCart(productId) {
    cart = cart.filter(item=> item.id !== productId);
    saveCartAndDisplay();

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

if (proceedToCheckoutBtn) {
    proceedToCheckoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            // Save the current cart to localStorage to access it on the checkout page
            localStorage.setItem('minisoCart', JSON.stringify(cart));
            // Redirect to the new checkout page
            window.location.href = 'checkout.html';
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
if (document.body.classList.contains('shop-page')) {
    // --- Existing URL and Search Term Display Logic ---
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
    const query = urlParams.get('q');

    const searchTermDisplay = document.getElementById('searchTermDisplay');
    const searchTermDisplay2 = document.getElementById('searchTermDisplay2');

    let displayQuery = "All Products";
    if (category) {
        displayQuery = category.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    } else if (query) {
        displayQuery = query;
    }
    if (searchTermDisplay) searchTermDisplay.textContent = displayQuery;
    if (searchTermDisplay2) searchTermDisplay2.textContent = displayQuery;

    // --- NEW SORTING FUNCTIONALITY ---
    const sortBySelect = document.getElementById('sort-by');
    const productGrid = document.querySelector('.shop-product-grid');

    // Store the original, unsorted product cards
    const originalProductCards = Array.from(productGrid.querySelectorAll('.product-card'));

    // Function to re-render the product grid with a new order of cards
    function renderProductGrid(sortedCards) {
        // Clear the grid first
        productGrid.innerHTML = '';
        // Append the sorted cards back into the grid
        sortedCards.forEach(card => {
            productGrid.appendChild(card);
        });
        // IMPORTANT: Re-attach event listeners for the 'Add to Cart' buttons after re-rendering
        productGrid.querySelectorAll('.add-to-cart-btn').forEach(button => {
            button.addEventListener('click', () => {
                const productDetails = getProductDetails(button);
                if (productDetails) {
                    addToCart(productDetails);
                }
            });
        });
    }

    // Event listener for the sort-by dropdown
    sortBySelect.addEventListener('change', (event) => {
        const sortValue = event.target.value;
        let sortedCards = [...originalProductCards]; // Create a copy to sort

        switch (sortValue) {
            case 'price-asc':
                // Sort by price: Low to High
                sortedCards.sort((a, b) => {
                    const priceA = parseFloat(a.dataset.price);
                    const priceB = parseFloat(b.dataset.price);
                    return priceA - priceB;
                });
                break;
            case 'price-desc':
                // Sort by price: High to Low
                sortedCards.sort((a, b) => {
                    const priceA = parseFloat(a.dataset.price);
                    const priceB = parseFloat(b.dataset.price);
                    return priceB - priceA;
                });
                break;
            case 'newest':
                // This is a placeholder. For true "newest", you'd need a date in your product data.
                // For now, we'll reverse the original order as a demonstration.
                sortedCards.reverse();
                break;
            case 'featured':
            default:
                // "Featured" simply returns to the original order from the HTML
                sortedCards = originalProductCards;
                break;
        }

        // Re-render the grid with the newly sorted cards
        renderProductGrid(sortedCards);
    });
}

    // --- NEW: PRODUCT DETAIL PAGE LOGIC ---
    if (document.body.classList.contains('product-detail-page')) {
        // This function finds product data based on URL (e.g., ?id=we-bare-bears-yellow)
        const findProductData = () => {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            if (!productId || typeof allProducts === 'undefined') {
                return null;
            }
            return allProducts.find(p => p.id === productId);
        };

        const productData = findProductData();

        const populateProductDetails = (product) => {
            document.title = `MINISO - ${product.name}`;
            document.getElementById('product-breadcrumbs').innerHTML = `Home > ${product.name}`;
            document.getElementById('product-title').textContent = product.name;
            document.getElementById('product-price-display').textContent = `$${product.price.toFixed(2)}`;

            const descriptionContainer = document.getElementById('product-description-container');
            const descriptionList = document.createElement('ul');
            product.descriptionPoints.forEach(point => {
                const listItem = document.createElement('li');
                listItem.innerHTML = `<strong>${point.title}</strong> ${point.text}`;
                descriptionList.appendChild(listItem);
            });
            descriptionContainer.innerHTML = '';
            descriptionContainer.appendChild(descriptionList);
        };

        const setupImageGallery = (product) => {
            const mainImage = document.getElementById('main-product-image');
            const thumbnailsContainer = document.getElementById('product-thumbnails-container');
            const prevArrow = document.querySelector('.gallery-arrow.prev-arrow');
            const nextArrow = document.querySelector('.gallery-arrow.next-arrow');
            let currentIndex = 0;

            if (!mainImage || !thumbnailsContainer || !product.images || product.images.length === 0) return;

            const updateGallery = (index) => {
                currentIndex = index;
                mainImage.src = product.images[currentIndex];
                mainImage.alt = product.name;
                
                thumbnailsContainer.querySelectorAll('.thumbnail-item').forEach((thumb, i) => {
                    thumb.classList.toggle('active-thumb', i === currentIndex);
                });
            };

            thumbnailsContainer.innerHTML = '';
            product.images.forEach((imgSrc, index) => {
                const thumbDiv = document.createElement('div');
                thumbDiv.className = 'thumbnail-item';
                thumbDiv.innerHTML = `<img src="${imgSrc}" alt="Thumbnail ${index + 1}">`;
                thumbDiv.addEventListener('click', () => updateGallery(index));
                thumbnailsContainer.appendChild(thumbDiv);
            });

            prevArrow.addEventListener('click', () => updateGallery((currentIndex - 1 + product.images.length) % product.images.length));
            nextArrow.addEventListener('click', () => updateGallery((currentIndex + 1) % product.images.length));
            updateGallery(0);
        };

        const setupQuantityControls = () => {
            const decreaseBtn = document.getElementById('decrease-quantity');
            const increaseBtn = document.getElementById('increase-quantity');
            const quantityInput = document.getElementById('quantity-input');

            decreaseBtn.addEventListener('click', () => {
                let currentValue = parseInt(quantityInput.value);
                if (currentValue > 1) quantityInput.value = currentValue - 1;
            });
            increaseBtn.addEventListener('click', () => {
                let currentValue = parseInt(quantityInput.value);
                quantityInput.value = currentValue + 1;
            });
        };

        const setupAddToCartButton = (product) => {
            document.getElementById('add-to-cart-detail-btn').addEventListener('click', () => {
                const quantity = parseInt(document.getElementById('quantity-input').value);
                const itemToAdd = { ...product.cartData, quantity: quantity };
                
                const existingItemIndex = cart.findIndex(item => item.id === itemToAdd.id);
                if (existingItemIndex > -1) {
                    cart[existingItemIndex].quantity += quantity;
                } else {
                    cart.push(itemToAdd);
                }
                openCartModal(); // This is my existing global function
            });
        };

        const populateRelatedProducts = (currentProduct) => {
            const grid = document.getElementById('related-products-grid');
            if (!grid) return;
            
            const related = allProducts.filter(p => p.category === currentProduct.category && p.id !== currentProduct.id);
            let productsToShow = related.slice(0, 4);
            if (productsToShow.length < 4) {
                 const others = allProducts.filter(p => p.category !== currentProduct.category && p.id !== currentProduct.id);
                 productsToShow.push(...others.slice(0, 4 - productsToShow.length));
            }

            grid.innerHTML = '';
            productsToShow.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                card.dataset.id = product.id;
                card.dataset.name = product.name;
                card.dataset.price = product.price;
                card.dataset.image = product.images[0];
                card.dataset.description = product.cartData.description;

                card.innerHTML = `
                    <a href="product-detail.html?id=${product.id}">
                        <img src="${product.images[0]}" alt="${product.name}">
                        <h3>${product.name}</h3>
                    </a>
                    <p class="product-price">$${product.price.toFixed(2)}</p>
                    <button class="add-to-cart-btn">+</button>
                `;
                grid.appendChild(card);
            });

            // Re-attach event listeners for the new '+' buttons on related products
            grid.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const productDetails = getProductDetails(button);
                    if (productDetails) {
                        addToCart(productDetails); // Use existing global function
                    }
                });
            });
        };

        // --- Initialize Page ---
        if (productData) {
            populateProductDetails(productData);
            setupImageGallery(productData);
            setupQuantityControls();
            setupAddToCartButton(productData);
            populateRelatedProducts(productData);
        } else {
            const mainContainer = document.querySelector('.product-detail-section');
            if(mainContainer) mainContainer.innerHTML = '<h1>404 - Product Not Found</h1><p>Sorry, the product you are looking for does not exist. <a href="shop.html">Return to shop</a>.</p>';
        }
    }
    updateCartDisplay();
});