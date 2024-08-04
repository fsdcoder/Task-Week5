document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'ART1', price: 10.00, image: 'https://images.pexels.com/photos/1509534/pexels-photo-1509534.jpeg?auto=compress&cs=tinysrgb&w=1200' },
        { id: 2, name: 'ART2', price: 20.00, image: 'https://images.pexels.com/photos/1543455/pexels-photo-1543455.jpeg?auto=compress&cs=tinysrgb&w=1200' },
        { id: 3, name: 'ART3', price: 30.00, image: 'https://images.pexels.com/photos/1451567/pexels-photo-1451567.jpeg?auto=compress&cs=tinysrgb&w=1200' }
    ];

    let cart = [];

    function displayProducts() {
        const productList = document.getElementById('product-list');
        products.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.className = 'col-md-4';
            productDiv.innerHTML = `
                <div class="card mb-4 shadow-sm">
                    <img src="${product.image}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">$${product.price.toFixed(2)}</p>
                        <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
                    </div>
                </div>
            `;
            productList.appendChild(productDiv);
        });
    }

    function updateCart() {
        const cartItems = document.getElementById('cart-items');
        cartItems.innerHTML = '';
        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <div>${item.name}</div>
                <div>
                    <input type="number" class="cart-quantity" data-id="${item.id}" value="${item.quantity}">
                    <button class="btn btn-danger remove-item" data-id="${item.id}">Remove</button>
                </div>
                <div>$${(item.price * item.quantity).toFixed(2)}</div>
            `;
            cartItems.appendChild(cartItem);
        });
        updateCartTotal();
        updateCartIcon();
    }

    function updateCartTotal() {
        const totalCost = document.getElementById('total-cost');
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        totalCost.textContent = total.toFixed(2);
    }

    function updateCartIcon() {
        const cartIcon = document.getElementById('cart-icon');
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartIcon.querySelector('.badge').textContent = totalItems;
    }

    document.addEventListener('click', event => {
        if (event.target.classList.contains('add-to-cart')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            const product = products.find(p => p.id === id);
            const cartItem = cart.find(item => item.id === id);
            if (cartItem) {
                cartItem.quantity++;
            } else {
                cart.push({ ...product, quantity: 1 });
            }
            updateCart();
        } else if (event.target.classList.contains('remove-item')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            cart = cart.filter(item => item.id !== id);
            updateCart();
        }
    });

    document.addEventListener('input', event => {
        if (event.target.classList.contains('cart-quantity')) {
            const id = parseInt(event.target.getAttribute('data-id'));
            const cartItem = cart.find(item => item.id === id);
            cartItem.quantity = parseInt(event.target.value);
            updateCart();
        }
    });

    document.getElementById('cart-icon').addEventListener('click', () => {
        const cart = document.getElementById('cart');
        cart.classList.toggle('d-none');
    });

    displayProducts();
});
