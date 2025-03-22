// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

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
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Basic validation
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value.trim();

        if (!name || !email || !phone || !subject || !message) {
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

        // Collect form data
        const formData = {
            name,
            email,
            phone,
            subject,
            message
        };

        try {
            // In a real application, you would send this data to a server
            console.log('Contact form details:', formData);
            
            // Show success message
            showMessage('Thank you for your message! We will get back to you shortly.', 'success');
            
            // Clear form
            contactForm.reset();
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showMessage('There was an error sending your message. Please try again.', 'error');
        }
    });
});

// Message display function
function showMessage(message, type = 'success') {
    // Remove any existing messages
    const existingMessage = document.querySelector('.message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `message message--${type}`;
    messageElement.textContent = message;

    // Add message to form
    const form = document.getElementById('contactForm');
    form.appendChild(messageElement);

    // Scroll message into view
    messageElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    // Remove success message after 5 seconds
    if (type === 'success') {
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}

// Map interaction enhancement
document.addEventListener('DOMContentLoaded', () => {
    const mapContainer = document.querySelector('.map-container');
    if (!mapContainer) return;

    // Add hover effect
    mapContainer.addEventListener('mouseenter', () => {
        mapContainer.style.transform = 'scale(1.01)';
        mapContainer.style.transition = 'transform 0.3s ease';
    });

    mapContainer.addEventListener('mouseleave', () => {
        mapContainer.style.transform = 'scale(1)';
    });
});

// Transport options interaction
document.addEventListener('DOMContentLoaded', () => {
    const transportItems = document.querySelectorAll('.transport-item');
    
    transportItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });
});

// Quick links enhancement
document.addEventListener('DOMContentLoaded', () => {
    const quickLinks = document.querySelectorAll('.quick-links .btn');
    
    quickLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.transform = 'translateY(-2px)';
            link.style.transition = 'transform 0.3s ease';
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translateY(0)';
        });
    });
});
