document.addEventListener('DOMContentLoaded', () => {
    let cart = [];

    const products = [
        { id: 1, name: 'Gray Chair', price: 46, image: 'img/p1.jpg' },
        { id: 2, name: 'Gray Chair', price: 46, image: 'img/p2.jpg' },
        { id: 3, name: 'Gray Chair', price: 46, image: 'img/p3.jpg' },
        { id: 4, name: 'Gray Chair', price: 46, image: 'img/p4.jpg' },
        { id: 5, name: 'Gray Chair', price: 46, image: 'img/p5.jpg' },
        { id: 6, name: 'Gray Chair', price: 46, image: 'img/p6.jpg' },
        { id: 7, name: 'Gray Chair', price: 46, image: 'img/new1.jpg' },
        { id: 8, name: 'Gray Chair', price: 46, image: 'img/new2.jpg' },
        { id: 9, name: 'Gray Chair', price: 46, image: 'img/new3.jpg' }
    ];

    function addToCart(product) {
        const itemIndex = cart.findIndex(item => item.id === product.id);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        renderCart();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id !== productId);
        renderCart();
    }

    function updateCartItem(productId, quantity) {
        const itemIndex = cart.findIndex(item => item.id === productId);
        if (itemIndex !== -1) {
            cart[itemIndex].quantity = quantity;
            if (quantity === 0) {
                removeFromCart(productId);
            }
        }
        renderCart();
    }

    function renderCart() {
        const cartContainer = document.querySelector('.cart-container');
        if (!cartContainer) return;
        cartContainer.innerHTML = '';

        cart.forEach(item => {
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>$${item.price}</p>
                    <input type="number" value="${item.quantity}" min="1" data-id="${item.id}">
                    <button class="remove-btn" data-id="${item.id}">Remove</button>
                </div>
            `;
            cartContainer.appendChild(cartItem);
        });

        const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
        document.getElementById('cart-total').innerText = totalPrice.toFixed(2);

        document.querySelectorAll('.cart-item input[type="number"]').forEach(input => {
            input.addEventListener('change', (e) => {
                const productId = parseInt(e.target.dataset.id);
                const quantity = parseInt(e.target.value);
                updateCartItem(productId, quantity);
            });
        });

        document.querySelectorAll('.cart-item .remove-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const productId = parseInt(e.target.dataset.id);
                removeFromCart(productId);
            });
        });
    }

    document.querySelectorAll('.bx-cart').forEach(button => {
        button.addEventListener('click', () => {
            const productId = parseInt(button.dataset.id);
            const product = products.find(p => p.id === productId);
            if (product) {
                addToCart(product);
            }
        });
    });

    const checkoutBtn = document.getElementById('checkout-btn');
    checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) {
            alert('Your cart is empty. Please add items to the cart before checking out.');
        } else {
            alert('Order placed successfully!');
            cart = [];
            renderCart();
        }
    });
});
