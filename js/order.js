// Order Page Specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Order Type Toggle
    const deliveryBtn = document.querySelector('[data-type="delivery"]');
    const pickupBtn = document.querySelector('[data-type="pickup"]');
    const deliveryForm = document.getElementById('deliveryForm');
    const pickupForm = document.getElementById('pickupForm');
    const deliveryFeeRow = document.getElementById('deliveryFeeRow');

    function toggleOrderType(type) {
        if (type === 'delivery') {
            deliveryBtn.classList.add('active');
            pickupBtn.classList.remove('active');
            deliveryForm.classList.remove('hidden');
            pickupForm.classList.add('hidden');
            deliveryFeeRow.style.display = 'flex';
            updateTotal();
        } else {
            pickupBtn.classList.add('active');
            deliveryBtn.classList.remove('active');
            pickupForm.classList.remove('hidden');
            deliveryForm.classList.add('hidden');
            deliveryFeeRow.style.display = 'none';
            updateTotal();
        }
    }

    deliveryBtn.addEventListener('click', () => toggleOrderType('delivery'));
    pickupBtn.addEventListener('click', () => toggleOrderType('pickup'));

    // Populate Pickup Times
    const pickupTimeSelect = document.getElementById('pickupTime');
    if (pickupTimeSelect) {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();
        
        // Round up to nearest 15 minutes and add 30 minutes preparation time
        let startMinute = Math.ceil(currentMinute / 15) * 15 + 30;
        let startHour = currentHour;
        if (startMinute >= 60) {
            startMinute -= 60;
            startHour += 1;
        }

        // Add time slots for the next 3 hours
        for (let h = 0; h < 3; h++) {
            for (let m = 0; m < 60; m += 15) {
                const hour = (startHour + h) % 24;
                const minute = (m + startMinute) % 60;
                if (hour >= 11 && hour <= 21) { // Restaurant hours
                    const timeString = `${hour % 12 || 12}:${minute.toString().padStart(2, '0')} ${hour >= 12 ? 'PM' : 'AM'}`;
                    const option = document.createElement('option');
                    option.value = timeString;
                    option.textContent = timeString;
                    pickupTimeSelect.appendChild(option);
                }
            }
        }
    }

    // Menu Items Population
    const menuItems = {
        popular: [
            { name: 'Sunday Gravy', price: 28, description: 'Rigatoni with slow-cooked tomato sauce, meatballs, Italian sausage, and braised pork' },
            { name: 'Margherita D.O.P.', price: 22, description: 'San Marzano tomatoes, buffalo mozzarella, fresh basil, extra virgin olive oil' }
        ],
        antipasti: [
            { name: 'Arancini Siciliani', price: 14, description: 'Golden-fried risotto balls with mozzarella and beef ragù' },
            { name: 'Burrata Caprese', price: 16, description: 'Creamy burrata, heirloom tomatoes, basil, aged balsamic' }
        ],
        pasta: [
            { name: 'Lobster Fra Diavolo', price: 34, description: 'Linguine with Maine lobster and spicy tomato sauce' },
            { name: 'Truffle Fettuccine', price: 32, description: 'House-made pasta with black truffle cream sauce' }
        ]
        // Add more categories as needed
    };

    const menuContainer = document.getElementById('menuItems');
    const categoryButtons = document.querySelectorAll('.category-btn');

    function displayMenuItems(category) {
        if (!menuItems[category]) return;

        menuContainer.innerHTML = '';
        menuItems[category].forEach(item => {
            const itemElement = document.createElement('div');
            itemElement.className = 'menu-item';
            itemElement.innerHTML = `
                <div class="menu-item__header">
                    <h3>${item.name}</h3>
                    <span class="menu-item__price">$${item.price}</span>
                </div>
                <p class="menu-item__description">${item.description}</p>
                <button class="btn btn--secondary add-to-cart" data-name="${item.name}" data-price="${item.price}">
                    Add to Cart
                </button>
            `;
            menuContainer.appendChild(itemElement);
        });

        // Add to cart functionality
        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', function() {
                const name = this.dataset.name;
                const price = parseFloat(this.dataset.price);
                addToCart(name, price);
            });
        });
    }

    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayMenuItems(button.dataset.category);
        });
    });

    // Initialize with popular items
    displayMenuItems('popular');

    // Cart Functionality
    const cart = {
        items: [],
        subtotal: 0,
        tax: 0,
        deliveryFee: 5,
        total: 0
    };

    function addToCart(name, price) {
        cart.items.push({ name, price });
        updateCart();
    }

    function updateCart() {
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';

        cart.items.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'cart-row';
            itemElement.innerHTML = `
                <span>${item.name}</span>
                <span>$${item.price.toFixed(2)}</span>
                <button class="remove-item" data-index="${index}">×</button>
            `;
            cartItems.appendChild(itemElement);
        });

        updateTotal();
    }

    function updateTotal() {
        cart.subtotal = cart.items.reduce((sum, item) => sum + item.price, 0);
        cart.tax = cart.subtotal * 0.08875; // NYC tax rate
        cart.total = cart.subtotal + cart.tax;
        
        if (!pickupBtn.classList.contains('active')) {
            cart.total += cart.deliveryFee;
        }

        document.getElementById('subtotal').textContent = `$${cart.subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${cart.tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${cart.total.toFixed(2)}`;

        const checkoutBtn = document.getElementById('checkoutBtn');
        checkoutBtn.disabled = cart.items.length === 0;
    }

    // Remove items from cart
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const index = parseInt(e.target.dataset.index);
            cart.items.splice(index, 1);
            updateCart();
        }
    });

    // Form Validation
    const addressForm = document.querySelector('.address-form');
    if (addressForm) {
        addressForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const zipcode = document.getElementById('zipcode').value;
            // Add your delivery area validation logic here
            alert('Checking delivery availability for ' + zipcode);
        });
    }
});
