document.addEventListener("DOMContentLoaded", () => {
    const productList = document.getElementById('product-list');

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p><strong>Price: $${product.price}</strong></p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });


    document.getElementById('view-cart-btn').addEventListener('click', () => {
        document.getElementById('cart-summary').style.display = 'block';
    });

    document.getElementById('clear-cart-btn').addEventListener('click', clearCart);

    document.getElementById('checkout-btn').addEventListener('click', checkout);
});