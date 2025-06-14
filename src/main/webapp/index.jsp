<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Furniture Store - Customize Your Home</title>
  <link href="https://fonts.googleapis.com/css2?family=Comfortaa&family=Montserrat+Alternates:wght@700&display=swap" rel="stylesheet">
  <link href="assets/css/style.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
</head>
<body>
<header class="navbar">
  <div class="container">
    <div class="navbar-logo">
      <img src="assets/icon/logo.png" alt="logo" class="sofa-logo">
      <span class="brand">Furniture Store</span>
    </div>
    <nav class="navbar-links">
      <a href="#sofa">Sofa</a>
      <a href="#coffee-table">Coffee Table</a>
      <a href="#chair">Chair</a>
      <button class="btn" id="cartButton">
        Cart <span class="badge" id="cartCount">0</span>
      </button>
    </nav>
  </div>
</header>

<main>
  <section class="hero">
    <div class="container hero-grid">
      <div class="hero-text">
        <h1>Custom Furniture for Your Home</h1>
        <p>Design and customize your perfect furniture pieces with our easy-to-use 3D configurator.</p>
        <a href="#sofa" class="btn primary">Start Designing</a>
      </div>
      <div id="scene1" class="hero-model"></div>
    </div>
  </section>

  <section id="sofa" class="product-section">
    <div class="container product-grid">
      <div id="scene2" class="product-model"></div>
      <div class="product-controls">
        <h2>Custom Sofa</h2>
        <label for="sofaColor">Color</label><select id="sofaColor">
        <option value="#1C1C1C">NERO</option>
        <option value="#6D6D6D">DIM GRAY</option>
        <option value="#766B5D">CHALK BEIGE</option>
        <option value="#241a16">DARK CHOCOLATE</option>
        <option value="#162A2C">MIDNIGHT GREEN</option>
        </select>
        <label for="sofaMaterial">Fabric</label><select id="sofaMaterial">
          <option value="linen">Linen</option>
          <option value="leather">Leather</option>
          <option value="velvet">Velvet</option>
        </select>
        <button class="btn primary add-to-cart" data-product="sofa">Add to Cart</button>
      </div>
    </div>
  </section>

  <section id="coffee-table" class="product-section">
    <div class="container product-grid reverse">
      <div id="scene3" class="product-model"></div>
      <div class="product-controls">
        <h2>Custom Coffee Table</h2>
        <label for="tableMaterial">Material</label><select id="tableMaterial">
          <option value="wood">Wood</option>
          <option value="glass">Glass</option>
        </select>
        <label for="tableColor">Color</label><select id="tableColor">
        <option value="#1C1C1C">NERO</option>
        <option value="#6D6D6D">DIM GRAY</option>
        <option value="#766B5D">CHALK BEIGE</option>
        <option value="#241a16">DARK CHOCOLATE</option>
        <option value="#162A2C">MIDNIGHT GREEN</option>
        </select>
        <button class="btn primary add-to-cart" data-product="coffee-table">Add to Cart</button>
      </div>
    </div>
  </section>

  <section id="chair" class="product-section">
    <div class="container product-grid">
      <div id="scene4" class="product-model"></div>
      <div class="product-controls">
        <h2>Custom Chair</h2>
        <label for="chairMaterial">Fabric</label><select id="chairMaterial">
          <option value="linen">Linen</option>
          <option value="leather">Leather</option>
          <option value="velvet">Velvet</option>
        </select>
        <label for="chairColor">Color</label><select id="chairColor">
          <option value="#1C1C1C">NERO</option>
          <option value="#6D6D6D">DIM GRAY</option>
          <option value="#766B5D">CHALK BEIGE</option>
          <option value="#241a16">DARK CHOCOLATE</option>
          <option value="#162A2C">MIDNIGHT GREEN</option>
        </select>
        <button class="btn primary add-to-cart" data-product="chair">Add to Cart</button>
      </div>
    </div>
  </section>
</main>

<!-- Cart Modal -->
<div class="custom-modal" id="cartModal">
  <div class="custom-modal-content">
    <div class="custom-modal-header">
      <h2>Your Cart</h2>
      <button class="close-modal">&times;</button>
    </div>
    <div class="custom-modal-body" id="cartItems"></div>
    <div class="custom-modal-footer">
      <div>Total: <span id="cartTotal">$0.00</span></div>
      <a href="checkout.jsp" class="btn primary">Checkout</a>
    </div>
  </div>
</div>

<footer class="footer">
  <div class="container footer-grid">
    <div>
      <h5>Furniture Store</h5>
      <p>Custom furniture designed by you, crafted by us.<br>Perfect for your home.</p>
    </div>
    <div>
      <h5>Quick Links</h5>
      <ul>
        <li><a href="#sofa">Sofas</a></li>
        <li><a href="#coffee-table">Coffee Tables</a></li>
        <li><a href="#chair">Chairs</a></li>
      </ul>
    </div>
    <div>
      <h5>Contact Us</h5>
      <ul>
        <li>Email: info@dixicreated.com</li>
        <li>Phone: (095) 404-1977</li>
        <li>Address: KNU, Kyiv, Ukraine</li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    &copy; 2025 Furniture Store. Created by Diana Velychko.
  </div>
</footer>

}
<script>if (new URLSearchParams(window.location.search).get('order') === 'success') {
alert('Thank you for your order!');

}</script>

<script src="assets/js/main.js"></script>
<script src="assets/js/navigation.js"></script>
<script src="assets/js/view.js"></script>

</body>
</html>