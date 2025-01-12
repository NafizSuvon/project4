let cart = [];

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex === -1) {
        cart.push({...product, quantity: 1 });
    } else {
        cart[existingProductIndex].quantity += 1;
    }

    updateCart();
}

function updateQuantity(productId, delta) {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
        productInCart.quantity += delta;
        if (productInCart.quantity < 1) productInCart.quantity = 1; // Prevent going below 1
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function updateCart() {
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    document.getElementById('view-cart-btn').textContent = `View Cart (${cartCount})`;

    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = cart.map(item => `
        <div>
            <img src="${item.image}" alt="${item.name}" class="product-image" />
            <div class="product-info">
                <div class="product-name">${item.name}</div>
                <div class="product-price">$${item.price}</div>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        </div>
    `).join('');

    // Update total price
    document.getElementById('total-price').textContent = `Total: $${totalPrice.toFixed(2)}`;
}

function checkout() {
    alert(`Proceeding to checkout. Total: $${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}`);
}