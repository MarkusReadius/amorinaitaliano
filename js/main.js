// Mobile Menu Toggle
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking outside
document.addEventListener('click', (event) => {
    if (!event.target.closest('.nav') && navMenu.classList.contains('active')) {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close mobile menu if open
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            
            // Smooth scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Reservation Form Handling
const reservationForm = document.querySelector('.reservation-form');

reservationForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(reservationForm);
    const reservation = Object.fromEntries(formData);

    try {
        // Since this is a static site, we'll just show a success message
        // In a real application, you would send this data to a server
        console.log('Reservation details:', reservation);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'form-success';
        successMessage.textContent = 'Thank you for your reservation! We will contact you shortly to confirm.';
        successMessage.style.cssText = `
            color: #4CAF50;
            text-align: center;
            padding: 1rem;
            margin-top: 1rem;
            background: #E8F5E9;
            border-radius: 4px;
        `;

        // Clear form
        reservationForm.reset();

        // Add success message
        reservationForm.appendChild(successMessage);

        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.remove();
        }, 5000);

    } catch (error) {
        console.error('Error submitting reservation:', error);
    }
});

// Header scroll behavior
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // Add/remove background when scrolling
    if (currentScroll > 50) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        header.style.backgroundColor = 'var(--color-background)';
    }

    lastScroll = currentScroll;
});
