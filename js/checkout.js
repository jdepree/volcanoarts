// Volcano Arts - Stripe Checkout Integration

// NOTE: Replace with your actual Stripe publishable key
const STRIPE_PUBLISHABLE_KEY = 'pk_test_XXXXXXXXXXXXXXXXXXXXXXXX';

// Initialize Stripe checkout button
document.addEventListener('DOMContentLoaded', function() {
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', initiateCheckout);
    }
});

// Initiate Stripe Checkout
async function initiateCheckout() {
    const cart = getCart();

    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.disabled = true;
        checkoutBtn.textContent = 'Processing...';
    }

    // Get cart totals
    const totals = getCartTotal();

    // Build line items for Stripe
    const lineItems = cart.map(item => ({
        price_data: {
            currency: 'usd',
            product_data: {
                name: item.title,
                description: `by ${item.artist}`,
            },
            unit_amount: Math.round(item.price * 100), // Stripe uses cents
        },
        quantity: item.quantity,
    }));

    // Add shipping as a line item
    if (totals.shipping > 0) {
        lineItems.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: `International Shipping (${totals.region})`,
                    description: 'Insured worldwide shipping',
                },
                unit_amount: Math.round(totals.shipping * 100),
            },
            quantity: 1,
        });
    }

    try {
        // In production, you would call your backend to create a Checkout Session
        // For now, we'll show a demo message

        // Example of what backend call would look like:
        /*
        const response = await fetch('/api/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                lineItems,
                successUrl: window.location.origin + '/success.html',
                cancelUrl: window.location.origin + '/cart.html',
            }),
        });

        const { sessionId } = await response.json();

        const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);
        const { error } = await stripe.redirectToCheckout({ sessionId });

        if (error) {
            throw error;
        }
        */

        // Demo mode - show what would happen
        showCheckoutDemo(totals, cart);

    } catch (error) {
        console.error('Checkout error:', error);
        showNotification('Checkout failed. Please try again.', 'error');
    } finally {
        if (checkoutBtn) {
            checkoutBtn.disabled = false;
            checkoutBtn.textContent = 'Proceed to Checkout';
        }
    }
}

// Demo checkout modal (for demonstration purposes)
function showCheckoutDemo(totals, cart) {
    const modal = document.createElement('div');
    modal.className = 'checkout-modal';
    modal.innerHTML = `
        <div class="checkout-modal__content">
            <h2>Checkout Preview</h2>
            <p class="checkout-modal__note">
                This is a demonstration. In production, you would be redirected to Stripe's secure checkout page.
            </p>

            <div class="checkout-modal__summary">
                <h3>Order Summary</h3>
                <ul>
                    ${cart.map(item => `
                        <li>
                            <span>${item.title} × ${item.quantity}</span>
                            <span>${formatPrice(item.price * item.quantity)}</span>
                        </li>
                    `).join('')}
                    <li>
                        <span>Shipping (${totals.region})</span>
                        <span>${formatPrice(totals.shipping)}</span>
                    </li>
                    <li class="checkout-modal__total">
                        <span>Total</span>
                        <span>${formatPrice(totals.total)}</span>
                    </li>
                </ul>
            </div>

            <div class="checkout-modal__info">
                <h4>To enable real payments:</h4>
                <ol>
                    <li>Create a Stripe account at <a href="https://stripe.com" target="_blank">stripe.com</a></li>
                    <li>Get your API keys from the Stripe Dashboard</li>
                    <li>Replace STRIPE_PUBLISHABLE_KEY in checkout.js</li>
                    <li>Set up a backend endpoint to create Checkout Sessions</li>
                </ol>
            </div>

            <button class="btn btn--primary checkout-modal__close">Close</button>
        </div>
    `;

    // Add modal styles
    const styles = document.createElement('style');
    styles.textContent = `
        .checkout-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.7);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            padding: 1rem;
        }
        .checkout-modal__content {
            background: white;
            padding: 2rem;
            border-radius: 16px;
            max-width: 500px;
            width: 100%;
            max-height: 90vh;
            overflow-y: auto;
        }
        .checkout-modal__content h2 {
            margin-bottom: 1rem;
            color: #8B4513;
        }
        .checkout-modal__note {
            background: #F5E6D3;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
            font-size: 0.9rem;
        }
        .checkout-modal__summary {
            margin-bottom: 1.5rem;
        }
        .checkout-modal__summary h3 {
            margin-bottom: 1rem;
            font-size: 1.1rem;
        }
        .checkout-modal__summary ul {
            list-style: none;
        }
        .checkout-modal__summary li {
            display: flex;
            justify-content: space-between;
            padding: 0.5rem 0;
            border-bottom: 1px solid #E0D5C7;
        }
        .checkout-modal__total {
            font-weight: bold;
            font-size: 1.1rem;
            border-top: 2px solid #8B4513 !important;
            margin-top: 0.5rem;
            padding-top: 0.75rem !important;
        }
        .checkout-modal__info {
            background: #FDF8F3;
            padding: 1rem;
            border-radius: 8px;
            margin-bottom: 1.5rem;
        }
        .checkout-modal__info h4 {
            margin-bottom: 0.75rem;
            font-size: 1rem;
        }
        .checkout-modal__info ol {
            margin-left: 1.25rem;
            font-size: 0.9rem;
        }
        .checkout-modal__info li {
            margin-bottom: 0.5rem;
        }
        .checkout-modal__info a {
            color: #D2691E;
        }
        .checkout-modal__close {
            width: 100%;
        }
    `;
    document.head.appendChild(styles);

    document.body.appendChild(modal);

    // Close modal on button click
    modal.querySelector('.checkout-modal__close').addEventListener('click', () => {
        modal.remove();
        styles.remove();
    });

    // Close modal on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
            styles.remove();
        }
    });
}
