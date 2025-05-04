document.addEventListener('DOMContentLoaded', function() {
    // Отримуємо кнопку "Place Order"
    const placeOrderBtn = document.getElementById('placeOrderBtn');

    // Додаємо обробник події для кнопки
    placeOrderBtn.addEventListener('click', function(e) {
        e.preventDefault();

        // 1. Валідація форми
        const form = document.querySelector('.checkout-form');
        if (!form.checkValidity()) {
            // Показуємо помилки, якщо форма не валідна
            form.classList.add('was-validated');
            return;
        }

        // 2. Отримання даних з кошика
        const cart = JSON.parse(localStorage.getItem('furnitureCart')) || { items: [] };

        if (cart.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        // 3. Підготовка даних для відправки (в реальному додатку тут буде AJAX-запит)
        const orderData = {
            items: cart.items,
            shipping: {
                firstName: document.querySelector('[name="firstName"]')?.value,
                lastName: document.querySelector('[name="lastName"]')?.value,
                address: document.querySelector('[name="address"]')?.value,
                city: document.querySelector('[name="city"]')?.value,
                zip: document.querySelector('[name="zip"]')?.value
            },
            payment: {
                cardName: document.querySelector('[name="cardName"]')?.value,
                cardNumber: document.querySelector('[name="cardNumber"]')?.value,
                expiration: document.querySelector('[name="expiration"]')?.value,
                cvv: document.querySelector('[name="cvv"]')?.value
            }
        };

        console.log('Order data:', orderData); // Для тестування

        // 4. Очищення кошика
        localStorage.removeItem('furnitureCart');

        // 5. Перенаправлення на головну сторінку з параметром успіху
        window.location.href = 'index.jsp?order=success';

        // Альтернатива: можна показати сповіщення перед перенаправленням
        // alert('Thank you for your order!');
        // window.location.href = 'index.jsp';
    });

    // Функція для оновлення підсумку замовлення (якщо потрібно)
    function updateOrderSummary(cart) {
        const orderList = document.querySelector('.order-list');
        const orderTotals = document.querySelector('.order-totals');

        if (!cart || cart.items.length === 0) {
            orderList.innerHTML = '<li>Your cart is empty</li>';
            return;
        }

        // Очищаємо список
        orderList.innerHTML = '';

        // Додаємо товари
        cart.items.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${getProductName(item.product)}</span>
                <span>$${item.price.toFixed(2)}</span>
            `;
            orderList.appendChild(li);
        });

        // Розраховуємо підсумки
        const subtotal = cart.items.reduce((sum, item) => sum + item.price, 0);
        const shipping = 49.00; // Фіксована вартість доставки
        const total = subtotal + shipping;

        // Оновлюємо підсумки
        orderTotals.innerHTML = `
            <div><span>Subtotal</span><span>$${subtotal.toFixed(2)}</span></div>
            <div><span>Shipping</span><span>$${shipping.toFixed(2)}</span></div>
            <div class="total"><span>Total</span><span>$${total.toFixed(2)}</span></div>
        `;
    }

    // Допоміжна функція для отримання назви товару
    function getProductName(productKey) {
        const productNames = {
            'sofa': 'Custom Sofa',
            'coffee-table': 'Custom Coffee Table',
            'chair': 'Custom Chair'
        };
        return productNames[productKey] || productKey;
    }

    // При завантаженні сторінки оновлюємо підсумок замовлення
    const savedCart = localStorage.getItem('furnitureCart');
    if (savedCart) {
        updateOrderSummary(JSON.parse(savedCart));
    }
});