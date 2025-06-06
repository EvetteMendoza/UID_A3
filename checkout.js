document.addEventListener('DOMContentLoaded', () => {
    // --- SHARED CONSTANTS & FUNCTIONS ---
    const GST_RATE = 0.1; // 10% GST
    const BASE_SHIPPING = 10.00; // The base shipping cost from your main site

    const subtotalEl = document.getElementById('summary-subtotal');
    const shippingEl = document.getElementById('summary-shipping');
    const gstEl = document.getElementById('summary-gst');
    const totalEl = document.getElementById('summary-total');
    const itemCountEl = document.getElementById('summary-item-count');
    const cartPreviewContainer = document.getElementById('cart-items-preview-container');

    // Function to calculate and display the order summary
    const updateSummary = (cart, shippingCost = 0) => {
        const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
        const totalShipping = BASE_SHIPPING + shippingCost;
        // GST is typically calculated on the subtotal + shipping
        const gst = (subtotal + totalShipping) * GST_RATE;
        const total = subtotal + totalShipping; // Total for display should not include GST twice

        if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
        if (shippingEl) shippingEl.textContent = `$${totalShipping.toFixed(2)}`;
        if (gstEl) gstEl.textContent = `$${gst.toFixed(2)}`;
        if (totalEl) totalEl.textContent = `$${(total + gst).toFixed(2)}`; // Final total includes GST
    };

    // Function to populate the "My Cart" dropdown
    const populateCartDropdown = (cart) => {
        if (!cartPreviewContainer) return;
        cartPreviewContainer.innerHTML = ''; // Clear previous items
        let totalItems = 0;

        if (cart.length === 0) {
            cartPreviewContainer.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            cart.forEach(item => {
                totalItems += item.quantity;
                const itemDiv = document.createElement('div');
                itemDiv.className = 'preview-item';
                itemDiv.innerHTML = `
                    <img src="${item.imageSrc}" alt="${item.name}">
                    <div class="preview-item-details">
                        <p class="name">${item.name}</p>
                        <p class="qty">Qty: ${item.quantity}</p>
                    </div>
                    <p class="price">$${(item.price * item.quantity).toFixed(2)}</p>
                `;
                cartPreviewContainer.appendChild(itemDiv);
            });
        }
        if (itemCountEl) itemCountEl.textContent = totalItems;
    };


    // --- PAGE-SPECIFIC LOGIC ---

    // Logic for CHECKOUT.HTML
    if (document.getElementById('continue-to-payment-btn')) {
        const cartData = JSON.parse(localStorage.getItem('minisoCart')) || [];

        if (cartData.length === 0) {
            alert('Your cart is empty! Redirecting to shop.');
            window.location.href = 'shop.html';
            return;
        }

        const shippingOptions = document.querySelectorAll('input[name="shipping"]');
        
        const handleShippingChange = () => {
            const selectedOption = document.querySelector('input[name="shipping"]:checked');
            const shippingCost = parseFloat(selectedOption.dataset.cost);
            updateSummary(cartData, shippingCost);
            // Store selected shipping cost for the next page
            localStorage.setItem('minisoShippingCost', shippingCost);
        };
        
        shippingOptions.forEach(option => option.addEventListener('change', handleShippingChange));
        
        // Initial load
        populateCartDropdown(cartData);
        handleShippingChange(); // Run on load to set initial summary

        document.getElementById('continue-to-payment-btn').addEventListener('click', () => {
            window.location.href = 'payment.html';
        });
    }


    // Logic for PAYMENT.HTML
    if (document.getElementById('place-order-btn')) {
        const cartData = JSON.parse(localStorage.getItem('minisoCart')) || [];
        const shippingCost = parseFloat(localStorage.getItem('minisoShippingCost')) || 0;

        if (cartData.length === 0) {
            alert('Session expired or cart is empty. Redirecting to shop.');
            window.location.href = 'shop.html';
            return;
        }

        // Initial load
        populateCartDropdown(cartData);
        updateSummary(cartData, shippingCost);

        document.getElementById('place-order-btn').addEventListener('click', () => {
            // This is where you would integrate a real payment gateway.
            // For this demo, we just simulate a successful order.
            alert('Thank you for your order! (This is a demo - no payment was processed)');
            
            // Clear the cart and redirect to the homepage
            localStorage.removeItem('minisoCart');
            localStorage.removeItem('minisoShippingCost');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500); // Wait 1.5 seconds before redirecting
        });

        // UI interaction for payment methods
        const paymentOptions = document.querySelectorAll('.payment-option');
        paymentOptions.forEach(option => {
            option.addEventListener('click', () => {
                paymentOptions.forEach(opt => opt.classList.remove('active'));
                option.classList.add('active');
            });
        });
    }
});