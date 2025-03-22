// Reservation Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservationForm');
    if (!reservationForm) return;

    // Set minimum date to today
    const dateInput = document.getElementById('date');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];

    // Set maximum date to 3 months from now
    const maxDate = new Date(today);
    maxDate.setMonth(maxDate.getMonth() + 3);
    dateInput.max = maxDate.toISOString().split('T')[0];

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value.length <= 3) {
                value = `(${value}`;
            } else if (value.length <= 6) {
                value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
            } else {
                value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6, 10)}`;
            }
        }
        e.target.value = value;
    });

    // Form validation and submission
    reservationForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const guests = document.getElementById('guests').value;

        if (!name || !email || !phone || !date || !time || !guests) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Phone validation
        const phoneRegex = /^\(\d{3}\) \d{3}-\d{4}$/;
        if (!phoneRegex.test(phone)) {
            showMessage('Please enter a valid phone number.', 'error');
            return;
        }

        // Date validation
        const selectedDate = new Date(date);
        if (selectedDate < tomorrow) {
            showMessage('Please select a future date for your reservation.', 'error');
            return;
        }

        // Collect form data
        const formData = {
            name,
            email,
            phone,
            date,
            time,
            guests,
            occasion: document.getElementById('occasion').value,
            requests: document.getElementById('requests').value.trim()
        };

        try {
            // In a real application, you would send this data to a server
            console.log('Reservation details:', formData);
            
            // Show success message
            showMessage('Thank you for your reservation! We will send a confirmation email shortly.', 'success');
            
            // Clear form
            reservationForm.reset();
            
        } catch (error) {
            console.error('Error submitting reservation:', error);
            showMessage('There was an error submitting your reservation. Please try again.', 'error');
        }
    });
});

// Message display function
function showMessage(message, type = 'success') {
    // Remove any existing messages
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type === 'success' ? 'form-success' : 'form-error'}`;
    messageElement.textContent = message;

    // Add message to form
    const form = document.getElementById('reservationForm');
    form.appendChild(messageElement);

    // Scroll message into view
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove message after 5 seconds if it's a success message
    if (type === 'success') {
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Date and time validation
function validateDateTime() {
    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    
    if (!dateInput || !timeInput) return;

    const selectedDate = new Date(dateInput.value);
    const dayOfWeek = selectedDate.getDay();

    // Disable Mondays (0 = Sunday, 1 = Monday)
    if (dayOfWeek === 1) {
        showMessage('We are closed on Mondays. Please select another day.', 'error');
        dateInput.value = '';
        return false;
    }

    return true;
}

// Initialize gallery image loading
document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    galleryImages.forEach(img => {
        // Add loading animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });

        // Add click handler for larger view (could be expanded to a lightbox)
        img.addEventListener('click', () => {
            img.classList.toggle('gallery-img--expanded');
        });
    });
});
