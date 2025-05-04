<%@ page contentType="text/html;charset=UTF-8" language="java" %>
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Checkout - Furniture Store</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://fonts.googleapis.com/css2?family=Comfortaa&family=Montserrat+Alternates:wght@700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="assets/css/style.css">
    </head>
    <body>
    <header class="navbar">
      <div class="container">
        <div class="navbar-logo">
          <img src="assets/icon/logo.png" alt="logo" class="sofa-logo">
          <span class="brand">Furniture Store</span>
        </div>
        <nav class="navbar-links">
          <a href="index.jsp">Back to Store</a>
        </nav>
      </div>
    </header>

    <main class="checkout-container">
      <h1 class="checkout-title">Checkout</h1>
      <div class="checkout-grid">
        <div>
          <form class="checkout-form">
            <h3>Shipping Information</h3>
            <div class="form-row">
              <div>
                <label>First Name</label>
                <label>
                  <input type="text" required>
                </label>
              </div>
              <div>
                <label>Last Name</label>
                <label>
                  <input type="text" required>
                </label>
              </div>
            </div>
            <div class="form-full-width">
              <label>Address</label>
              <label>
                <input type="text" required>
              </label>
            </div>
            <div class="form-row">
              <div>
                <label>City</label>
                <label>
                  <input type="text" required>
                </label>
              </div>
              <div>
                <label>Zip</label>
                <label>
                  <input type="text" required>
                </label>
              </div>
            </div>

            <h3>Payment Information</h3>
            <div class="form-row">
              <div>
                <label>Name on Card</label>
                <label>
                  <input type="text" required>
                </label>
              </div>
              <div>
                <label>Card Number</label>
                <label>
                  <input type="text" required>
                </label>
              </div>
            </div>
            <div class="form-row">
              <div>
                <label>Expiration</label>
                <label>
                  <input type="text" required>
                </label>
              </div>
              <div>
                <label>CVV</label>
                <label>
                  <input type="text" required>
                </label>
              </div>
            </div>
          </form>
        </div>
        <div class="order-summary">
          <h2>Your Order</h2>
          <ul class="order-list">
            <li><span>Sofa</span><span>$599.00</span></li>
            <li><span>Coffee Table</span><span>$299.00</span></li>
            <li><span>Chair</span><span>$199.00</span></li>
          </ul>
          <div class="order-totals">
            <div><span>Subtotal</span><span>$1097.00</span></div>
            <div><span>Shipping</span><span>$49.00</span></div>
            <div class="total"><span>Total</span><span>$1146.00</span></div>
          </div>
          <div class="place-order">
            <button type="button" class="btn primary place-order-btn" id="placeOrderBtn">Place Order</button>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <div class="footer-grid container">
        <div>
          <h5>Furniture Store</h5>
          <p>Custom furniture designed by you, crafted by us. Perfect for your home.</p>
        </div>
        <div>
          <h5>Quick Links</h5>
          <ul>
            <li><a href="index.jsp#sofa">Sofas</a></li>
            <li><a href="index.jsp#coffee-table">Coffee Tables</a></li>
            <li><a href="index.jsp#chair">Chairs</a></li>
          </ul>
        </div>
        <div>
          <h5>Contact Us</h5>
          <ul>
            <li>Email: info@furniturestore.com</li>
            <li>Phone: (123) 456-7890</li>
            <li>Address: 123 Design St, Creative City</li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        &copy; 2025 Furniture Store. Created by Diana Velychko.
  </div>
</footer>
    <script src="assets/js/checkout.js"></script>

</body>
</html>