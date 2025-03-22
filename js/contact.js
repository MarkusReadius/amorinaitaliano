// Contact Page Specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Form validation and submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);

            try {
                // Since this is a static site, we'll just show a success message
                // In a real application, you would send this data to a server
                console.log('Form submission data:', data);

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message show';
                successMessage.textContent = 'Thank you for your message! We will get back to you shortly.';

                // Clear form
                contactForm.reset();

                // Add success message after the form
                contactForm.appendChild(successMessage);

                // Remove success message after 5 seconds
                setTimeout(() => {
                    successMessage.remove();
                }, 5000);

            } catch (error) {
                console.error('Error submitting form:', error);
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message show';
                errorMessage.textContent = 'There was an error sending your message. Please try again later.';
                
                contactForm.appendChild(errorMessage);

                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        });

        // Real-time form validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                validateInput(input);
            });

            input.addEventListener('input', () => {
                if (input.classList.contains('invalid')) {
                    validateInput(input);
                }
            });
        });
    }

    function validateInput(input) {
        const isValid = input.checkValidity();
        if (isValid) {
            input.classList.remove('invalid');
            input.classList.add('valid');
            
            // Remove any existing error message
            const errorMessage = input.parentElement.querySelector('.input-error');
            if (errorMessage) {
                errorMessage.remove();
            }
        } else {
            input.classList.remove('valid');
            input.classList.add('invalid');
            
            // Show error message
            let message = '';
            if (input.validity.valueMissing) {
                message = 'This field is required';
            } else if (input.validity.typeMismatch) {
                message = `Please enter a valid ${input.type}`;
            } else if (input.validity.patternMismatch) {
                message = 'Please enter a valid format';
            }

            // Add error message if not already present
            if (!input.parentElement.querySelector('.input-error')) {
                const errorDiv = document.createElement('div');
                errorDiv.className = 'input-error';
                errorDiv.textContent = message;
                input.parentElement.appendChild(errorDiv);
            }
        }
    }

    // Phone number formatting
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
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
    }

    // FAQ Interaction
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.transform = 'translateY(-5px)';
            item.style.transition = 'transform 0.3s ease';
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'translateY(0)';
        });
    });

    // Info Card Hover Effects
    const infoCards = document.querySelectorAll('.info-card');
    infoCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
