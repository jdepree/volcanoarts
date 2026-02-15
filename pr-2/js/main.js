// Volcano Arts - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initMobileNav();
    updateCartCount();
});

// Mobile Navigation Toggle
function initMobileNav() {
    const navToggle = document.querySelector('.nav__toggle');
    const navList = document.querySelector('.nav__list');

    if (navToggle && navList) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('nav__list--open');
            navToggle.setAttribute('aria-expanded',
                navList.classList.contains('nav__list--open'));
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav') && navList.classList.contains('nav__list--open')) {
                navList.classList.remove('nav__list--open');
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Update cart count in navigation
function updateCartCount() {
    const cartCountElements = document.querySelectorAll('.nav__cart-count');
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartCountElements.forEach(el => {
        el.textContent = count;
        el.style.display = count > 0 ? 'flex' : 'none';
    });
}

// Cart utility functions
function getCart() {
    const cart = localStorage.getItem('volcanoarts_cart');
    return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
    localStorage.setItem('volcanoarts_cart', JSON.stringify(cart));
    updateCartCount();
}

function addToCart(artwork) {
    const cart = getCart();
    const existingItem = cart.find(item => item.id === artwork.id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: artwork.id,
            title: artwork.title,
            artist: artwork.artist,
            price: artwork.price,
            image: artwork.image,
            quantity: 1
        });
    }

    saveCart(cart);
    showNotification(`"${artwork.title}" added to cart!`);
}

function removeFromCart(artworkId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== artworkId);
    saveCart(cart);
}

function updateCartItemQuantity(artworkId, quantity) {
    const cart = getCart();
    const item = cart.find(item => item.id === artworkId);

    if (item) {
        if (quantity <= 0) {
            removeFromCart(artworkId);
        } else {
            item.quantity = quantity;
            saveCart(cart);
        }
    }
}

function clearCart() {
    localStorage.removeItem('volcanoarts_cart');
    updateCartCount();
}

// Notification system
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification__close">&times;</button>
    `;

    // Add styles dynamically if not exists
    if (!document.querySelector('#notification-styles')) {
        const styles = document.createElement('style');
        styles.id = 'notification-styles';
        styles.textContent = `
            .notification {
                position: fixed;
                bottom: 2rem;
                right: 2rem;
                background-color: #2D5016;
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 8px;
                display: flex;
                align-items: center;
                gap: 1rem;
                box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                z-index: 10000;
                animation: slideIn 0.3s ease;
            }
            .notification--error {
                background-color: #C0392B;
            }
            .notification__close {
                background: none;
                border: none;
                color: white;
                font-size: 1.5rem;
                cursor: pointer;
                padding: 0;
                line-height: 1;
            }
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(styles);
    }

    document.body.appendChild(notification);

    // Close button
    notification.querySelector('.notification__close').addEventListener('click', () => {
        notification.remove();
    });

    // Auto-remove after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}

// Format currency
function formatPrice(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Smooth scroll to element
function scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}
