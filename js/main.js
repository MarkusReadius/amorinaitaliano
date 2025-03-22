document.addEventListener('DOMContentLoaded', () => {
    // Mobile Menu Toggle
    const navToggle = document.querySelector('.nav__toggle');
    const navMenu = document.querySelector('.nav__menu');

    if (navToggle && navMenu) {
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
    }

    // Header scroll behavior
    const header = document.querySelector('.header');
    if (header) {
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
    }

    // Initialize form validation if form exists
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            try {
                // Since this is a static site, we'll just show a success message
                // In a real application, you would send this data to a server
                console.log('Form details:', data);
                
                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'form-success';
                successMessage.textContent = 'Thank you! We will get back to you shortly.';
                successMessage.style.cssText = `
                    color: #4CAF50;
                    text-align: center;
                    padding: 1rem;
                    margin-top: 1rem;
                    background: #E8F5E9;
                    border-radius: 4px;
                `;

                // Clear form
                form.reset();

                // Add success message
                form.appendChild(successMessage);

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);

            } catch (error) {
                console.error('Error submitting form:', error);
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'form-error';
                errorMessage.textContent = 'There was an error. Please try again.';
                errorMessage.style.cssText = `
                    color: #D32F2F;
                    text-align: center;
                    padding: 1rem;
                    margin-top: 1rem;
                    background: #FFEBEE;
                    border-radius: 4px;
                `;
                form.appendChild(errorMessage);

                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        });
    });
});

// Menu Navigation
const menuNavButtons = document.querySelectorAll('.menu-nav__btn');
const menuSections = document.querySelectorAll('.menu-section');

function showMenuSection(categoryId) {
    // Hide all sections
    menuSections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const activeSection = document.getElementById(categoryId);
    if (activeSection) {
        activeSection.classList.add('active');
    }

    // Update button states
    menuNavButtons.forEach(button => {
        if (button.dataset.category === categoryId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });
}

// Add click handlers to menu navigation buttons
menuNavButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.dataset.category;
        showMenuSection(category);
    });
});

// Initialize menu with first category
if (menuNavButtons.length > 0 && window.location.pathname.includes('menu.html')) {
    const firstCategory = menuNavButtons[0].dataset.category;
    showMenuSection(firstCategory);
}

// Enhance menu items with hover effects
const menuItems = document.querySelectorAll('.menu-item');
menuItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-5px)';
        item.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = 'none';
    });
});
