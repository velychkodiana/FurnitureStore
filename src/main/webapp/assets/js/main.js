// main.js
window.addEventListener('DOMContentLoaded', () => {
    // Color name mappings
    const colorNames = {
        '#1C1C1C': 'NERO',
        '#6D6D6D': 'DIM GRAY',
        '#766B5D': 'CHALK BEIGE',
        '#241a16': 'DARK CHOCOLATE',
        '#162A2C': 'MIDNIGHT GREEN'
    };

    // Material name mappings
    const materialNames = {
        'linen': 'Linen',
        'leather': 'Leather',
        'velvet': 'Velvet',
        'wood': 'Wood',
        'glass': 'Glass'
    };

    let cart = {
        items: [],
        total: 0
    };

    const prices = {
        'sofa': 599,
        'coffee-table': 299,
        'chair': 199
    };

    init();

    function init() {
        loadCart();
        updateCartCount();
        bindCartButton();
        bindAddToCartButtons();
        renderCartModal();
    }

    function bindAddToCartButtons() {
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', () => {
                const product = button.dataset.product;
                const customization = getCustomization(product);
                const item = {
                    product,
                    customization,
                    price: prices[product]
                };

                cart.items.push(item);
                updateTotal();
                saveCart();
                updateCartCount();
                renderCartModal();
                alert(`${productName(product)} added to cart!`);
            });
        });
    }

    function getCustomization(product) {
        const custom = {};
        if (product === 'sofa') {
            const colorValue = document.querySelector('#sofaColor')?.value;
            custom.color = colorNames[colorValue] || colorValue;
            custom.material = materialNames[document.querySelector('#sofaMaterial')?.value] ||
                document.querySelector('#sofaMaterial')?.value;
        }
        if (product === 'coffee-table') {
            const colorValue = document.querySelector('#tableColor')?.value;
            custom.color = colorNames[colorValue] || colorValue;
            custom.material = materialNames[document.querySelector('#tableMaterial')?.value] ||
                document.querySelector('#tableMaterial')?.value;
        }
        if (product === 'chair') {
            const colorValue = document.querySelector('#chairColor')?.value;
            custom.color = colorNames[colorValue] || colorValue;
            custom.material = materialNames[document.querySelector('#chairMaterial')?.value] ||
                document.querySelector('#chairMaterial')?.value;
        }
        return custom;
    }

    function bindCartButton() {
        const btn = document.getElementById('cartButton');
        btn?.addEventListener('click', () => {
            document.getElementById('cartModal').classList.add('show');
        });

        document.querySelector('.close-modal')?.addEventListener('click', () => {
            document.getElementById('cartModal').classList.remove('show');
        });

        window.addEventListener('click', e => {
            if (e.target === document.getElementById('cartModal')) {
                document.getElementById('cartModal').classList.remove('show');
            }
        });
    }

    function renderCartModal() {
        const cartItemsEl = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        if (!cartItemsEl || !cartTotal) return;

        if (cart.items.length === 0) {
            cartItemsEl.innerHTML = '<p class="cart-empty">Your cart is empty</p>';
        } else {
            cartItemsEl.innerHTML = '';
            cart.items.forEach((item, index) => {
                const div = document.createElement('div');
                div.className = 'cart-item';
                div.innerHTML = `
                    <div class="cart-item-details">
                        <div class="cart-item-title">${productName(item.product)}</div>
                        <span class="cart-item-color">Color: ${item.customization.color}</span>
                        <span class="cart-item-material">Material: ${item.customization.material}</span>
                    </div>
                    <div class="cart-item-price-container">
                        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                        <button class="cart-item-remove" data-index="${index}">×</button>
                    </div>
                `;
                cartItemsEl.appendChild(div);
            });

            document.querySelectorAll('.cart-item-remove').forEach(button => {
                button.addEventListener('click', e => {
                    const i = parseInt(e.target.dataset.index);
                    cart.items.splice(i, 1);
                    updateTotal();
                    saveCart();
                    updateCartCount();
                    renderCartModal();
                });
            });
        }

        cartTotal.textContent = `$${cart.total.toFixed(2)}`;
    }

    function productName(key) {
        return {
            'sofa': 'Custom Sofa',
            'coffee-table': 'Custom Coffee Table',
            'chair': 'Custom Chair'
        }[key] || key;
    }

    function updateTotal() {
        cart.total = cart.items.reduce((sum, item) => sum + item.price, 0);
    }

    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) cartCount.textContent = cart.items.length;
    }

    function saveCart() {
        localStorage.setItem('furnitureCart', JSON.stringify(cart));
    }

    function loadCart() {
        const saved = localStorage.getItem('furnitureCart');
        if (saved) {
            cart = JSON.parse(saved);
            updateTotal();
        }
    }
});
