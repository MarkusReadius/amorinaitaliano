// Menu Data (In a real application, this would come from a server)
const menuData = {
    popular: [
        { id: 'p1', title: 'Spaghetti Carbonara', description: 'Classic Roman pasta with pecorino romano, fresh eggs, guanciale, and black pepper', price: 18.00, category: 'pasta' },
        { id: 'p2', title: 'Margherita Pizza', description: 'San Marzano tomatoes, fresh mozzarella, basil, and extra virgin olive oil', price: 16.00, category: 'pizza' },
        { id: 'p3', title: 'Tiramisu', description: 'Traditional recipe with mascarpone, espresso-soaked ladyfingers, and cocoa', price: 10.00, category: 'desserts' }
    ],
    antipasti: [
        { id: 'a1', title: 'Bruschetta al Pomodoro', description: 'Grilled Tuscan bread topped with fresh tomatoes, garlic, basil, and extra virgin olive oil', price: 12.00 },
        { id: 'a2', title: 'Burrata con Prosciutto', description: 'Creamy burrata cheese served with prosciutto di Parma, arugula, and aged balsamic', price: 16.00 },
        { id: 'a3', title: 'Calamari Fritti', description: 'Crispy fried calamari served with lemon and house-made marinara sauce', price: 14.00 }
    ],
    // Add more menu categories as needed
};

// Cart State
let cart = {
    items: [],
    subtotal: 0,
    tax: 0,
    deliveryFee: 5.00,
    total: 0
};

// Order Type Handling
document.addEventListener('DOMContentLoaded', () => {
    const orderTypeBtns = document.querySelectorAll('.order-type__btn');
    const deliveryForm = document.getElementById('deliveryForm');
    const pickupForm = document.getElementById('pickupForm');
    const deliveryFeeRow = document.getElementById('deliveryFeeRow');

    orderTypeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state
            orderTypeBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Show/hide appropriate form
            if (btn.dataset.type === 'delivery') {
                deliveryForm.classList.remove('hidden');
                pickupForm.classList.add('hidden');
                deliveryFeeRow.style.display = 'flex';
                updateCart(); // Recalculate with delivery fee
            } else {
                deliveryForm.classList.add('hidden');
                pickupForm.classList.remove('hidden');
                deliveryFeeRow.style.display = 'none';
                cart.deliveryFee = 0;
                updateCart(); // Recalculate without delivery fee
            }
        });
    });

    // Initialize pickup times
    populatePickupTimes();
    
    // Initialize menu
    loadMenuItems('popular');
});

// Pickup Time Population
function populatePickupTimes() {
    const select = document.getElementById('pickupTime');
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    // Round up to next 15-minute interval
    let minutes = Math.ceil(currentMinute / 15) * 15;
    let hour = currentHour;
    if (minutes === 60) {
        minutes = 0;
        hour++;
    }

    // Generate times for the next 3 hours
    for (let h = 0; h < 3; h++) {
        for (let m = 0; m < 4; m++) {
            const timeHour = (hour + h) % 24;
            const timeMinutes = (minutes + (m * 15)) % 60;
            if (timeHour >= 11 && timeHour <= 21) { // Restaurant hours
                const timeString = `${timeHour.toString().padStart(2, '0')}:${timeMinutes.toString().padStart(2, '0')}`;
                const option = document.createElement('option');
                option.value = timeString;
                option.textContent = timeString;
                select.appendChild(option);
            }
        }
    }
}

// Menu Category Navigation
const categoryBtns = document.querySelectorAll('.category-btn');
categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        loadMenuItems(btn.dataset.category);
    });
});

// Menu Item Loading
function loadMenuItems(category) {
    const menuContainer = document.getElementById('menuItems');
    menuContainer.innerHTML = '';

    const items = menuData[category] || [];
    items.forEach(item => {
        const itemElement = createMenuItemElement(item);
        menuContainer.appendChild(itemElement);
    });
}

// Menu Item Element Creation
function createMenuItemElement(item) {
    const div = document.createElement('div');
    div.className = 'menu-item';
    div.innerHTML = `
        <div class="menu-item__header">
            <h3 class="menu-item__title">${item.title}</h3>
            <span class="menu-item__price">$${item.price.toFixed(2)}</span>
        </div>
        <p class="menu-item__description">${item.description}</p>
        <div class="menu-item__actions">
            <button class="btn btn--primary" onclick="addToCart(${JSON.stringify(item)})">
                Add to Cart
            </button>
        </div>
    `;
    return div;
}

// Cart Functions
function addToCart(item) {
    const existingItem = cart.items.find(i => i.id === item.id);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.items.push({ ...item, quantity: 1 });
    }
    updateCart();
}

function removeFromCart(itemId) {
    cart.items = cart.items.filter(item => item.id !== itemId);
    updateCart();
}

function updateQuantity(itemId, delta) {
    const item = cart.items.find(i => i.id === itemId);
    if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(itemId);
        } else {
            updateCart();
        }
    }
}

function updateCart() {
    const cartContainer = document.getElementById('cartItems');
    cartContainer.innerHTML = '';

    // Update cart items
    cart.items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item__details">
                <h4>${item.title}</h4>
                <div class="cart-item__quantity">
                    <button onclick="updateQuantity('${item.id}', -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity('${item.id}', 1)">+</button>
                </div>
                <span>$${(item.price * item.quantity).toFixed(2)}</span>
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });

    // Update totals
    cart.subtotal = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cart.tax = cart.subtotal * 0.08875; // NYC tax rate
    cart.total = cart.subtotal + cart.tax + cart.deliveryFee;

    // Update display
    document.getElementById('subtotal').textContent = `$${cart.subtotal.toFixed(2)}`;
    document.getElementById('tax').textContent = `$${cart.tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${cart.total.toFixed(2)}`;

    // Enable/disable checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    checkoutBtn.disabled = cart.items.length === 0;
}

// Form Validation
document.querySelector('.address-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const zipcode = document.getElementById('zipcode').value;
    // Simple validation - check if zipcode is in delivery range
    if (['10001', '10002', '10003'].includes(zipcode)) {
        showMessage('You are in our delivery area! Please proceed with your order.', 'success');
    } else {
        showMessage('Sorry, we do not deliver to your area yet.', 'error');
    }
});

// Message Display
function showMessage(message, type = 'success') {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message message--${type}`;
    messageDiv.textContent = message;
    
    const form = document.querySelector('.address-form');
    form.appendChild(messageDiv);
    
    setTimeout(() => messageDiv.remove(), 5000);
}

// Checkout Handler
document.getElementById('checkoutBtn').addEventListener('click', () => {
    // In a real application, this would redirect to a checkout page or open a checkout modal
    alert('Proceeding to checkout...');
});
