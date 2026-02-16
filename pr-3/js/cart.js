// Volcano Arts - Cart Page Functionality

// Shipping rates by region
const shippingRates = {
    'rwanda': { name: 'Rwanda & East Africa', rate: 15 },
    'africa': { name: 'Rest of Africa', rate: 35 },
    'europe': { name: 'Europe', rate: 45 },
    'americas': { name: 'Americas', rate: 55 },
    'asia': { name: 'Asia & Pacific', rate: 60 }
};

document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.cart')) {
        renderCart();
        initShippingSelector();
    }
});

// Render cart items
function renderCart() {
    const cart = getCart();
    const cartContainer = document.querySelector('.cart__items');
    const cartSummary = document.querySelector('.cart__summary');
    const emptyMessage = document.querySelector('.cart__empty');

    if (!cartContainer) return;

    if (cart.length === 0) {
        cartContainer.style.display = 'none';
        if (cartSummary) cartSummary.style.display = 'none';
        if (emptyMessage) emptyMessage.style.display = 'block';
        return;
    }

    if (emptyMessage) emptyMessage.style.display = 'none';
    cartContainer.style.display = 'block';
    if (cartSummary) cartSummary.style.display = 'block';

    cartContainer.innerHTML = cart.map(item => `
        <div class="cart__item" data-id="${item.id}">
            <div class="cart__item-image" style="background: linear-gradient(135deg, #D2691E20, #8B451320); display: flex; align-items: center; justify-content: center;">
                <span style="color: #8B4513; font-size: 1.5rem;">🎨</span>
            </div>
            <div class="cart__item-details">
                <h4>${item.title}</h4>
                <p class="cart__item-artist">by ${item.artist}</p>
            </div>
            <div class="cart__item-quantity">
                <button class="cart__qty-btn" onclick="changeQuantity('${item.id}', -1)">−</button>
                <span>${item.quantity}</span>
                <button class="cart__qty-btn" onclick="changeQuantity('${item.id}', 1)">+</button>
            </div>
            <div class="cart__item-price">${formatPrice(item.price * item.quantity)}</div>
            <button class="cart__item-remove" onclick="removeItem('${item.id}')" title="Remove item">
                ✕
            </button>
        </div>
    `).join('');

    // Add remove button styles if not exists
    if (!document.querySelector('#cart-extra-styles')) {
        const styles = document.createElement('style');
        styles.id = 'cart-extra-styles';
        styles.textContent = `
            .cart__item {
                position: relative;
            }
            .cart__item-remove {
                position: absolute;
                top: 1rem;
                right: 0;
                background: none;
                border: none;
                color: #999;
                cursor: pointer;
                font-size: 1rem;
                padding: 0.25rem;
                transition: color 0.3s;
            }
            .cart__item-remove:hover {
                color: #C0392B;
            }
        `;
        document.head.appendChild(styles);
    }

    updateCartSummary();
}

// Change item quantity
function changeQuantity(itemId, change) {
    const cart = getCart();
    const item = cart.find(i => i.id === itemId);

    if (item) {
        const newQuantity = item.quantity + change;
        updateCartItemQuantity(itemId, newQuantity);
        renderCart();
    }
}

// Remove item from cart
function removeItem(itemId) {
    removeFromCart(itemId);
    renderCart();
    showNotification('Item removed from cart');
}

// Initialize shipping selector
function initShippingSelector() {
    const shippingSelect = document.querySelector('.cart__shipping-select');
    if (!shippingSelect) return;

    shippingSelect.addEventListener('change', updateCartSummary);
}

// Update cart summary with totals
function updateCartSummary() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const shippingSelect = document.querySelector('.cart__shipping-select');
    const selectedRegion = shippingSelect ? shippingSelect.value : 'rwanda';
    const shipping = cart.length > 0 ? shippingRates[selectedRegion].rate : 0;

    const total = subtotal + shipping;

    // Update display
    const subtotalEl = document.querySelector('.cart__subtotal');
    const shippingEl = document.querySelector('.cart__shipping');
    const totalEl = document.querySelector('.cart__total');

    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (shippingEl) shippingEl.textContent = formatPrice(shipping);
    if (totalEl) totalEl.textContent = formatPrice(total);
}

// Get cart total for checkout
function getCartTotal() {
    const cart = getCart();
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const shippingSelect = document.querySelector('.cart__shipping-select');
    const selectedRegion = shippingSelect ? shippingSelect.value : 'rwanda';
    const shipping = cart.length > 0 ? shippingRates[selectedRegion].rate : 0;

    return {
        subtotal,
        shipping,
        total: subtotal + shipping,
        region: shippingRates[selectedRegion].name
    };
}
