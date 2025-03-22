// Reservations Page Specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const reservationForm = document.getElementById('reservationForm');
    const dateInput = document.getElementById('date');
    const timeSelect = document.getElementById('time');
    const phoneInput = document.getElementById('phone');

    if (reservationForm) {
        // Set minimum date to today
        const today = new Date();
        const maxDate = new Date();
        maxDate.setMonth(maxDate.getMonth() + 3); // Allow bookings up to 3 months in advance
        
        dateInput.min = today.toISOString().split('T')[0];
        dateInput.max = maxDate.toISOString().split('T')[0];

        // Update available time slots when date changes
        dateInput.addEventListener('change', () => {
            updateTimeSlots(dateInput.value);
        });

        // Phone number formatting
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

        // Form submission
        reservationForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            if (!validateForm()) {
                return;
            }

            const formData = new FormData(reservationForm);
            const data = Object.fromEntries(formData);

            try {
                // Since this is a static site, we'll just show a success message
                // In a real application, you would send this data to a server
                console.log('Reservation details:', data);

                // Show success message
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message show';
                successMessage.textContent = 'Thank you for your reservation! A confirmation email will be sent shortly.';

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
                
                // Show error message
                const errorMessage = document.createElement('div');
                errorMessage.className = 'error-message show';
                errorMessage.textContent = 'There was an error processing your reservation. Please try again later.';
                
                reservationForm.appendChild(errorMessage);

                setTimeout(() => {
                    errorMessage.remove();
                }, 5000);
            }
        });
    }

    function updateTimeSlots(selectedDate) {
        const timeSlots = generateTimeSlots(selectedDate);
        timeSelect.innerHTML = '<option value="">Select a time</option>';
        
        timeSlots.forEach(slot => {
            const option = document.createElement('option');
            option.value = slot;
            option.textContent = slot;
            timeSelect.appendChild(option);
        });
    }

    function generateTimeSlots(selectedDate) {
        const slots = [];
        const selected = new Date(selectedDate);
        const today = new Date();
        const isToday = selected.toDateString() === today.toDateString();
        const dayOfWeek = selected.getDay();

        // Restaurant is closed on Mondays (day 1)
        if (dayOfWeek === 1) {
            const option = document.createElement('option');
            option.value = "";
            option.textContent = "Closed on Mondays";
            option.disabled = true;
            timeSelect.appendChild(option);
            return slots;
        }

        // Lunch service: 11:30 AM - 2:30 PM
        let lunchStart = new Date(selected.setHours(11, 30, 0));
        const lunchEnd = new Date(selected.setHours(14, 30, 0));

        // Dinner service: 5:00 PM - 10:00 PM
        let dinnerStart = new Date(selected.setHours(17, 0, 0));
        const dinnerEnd = new Date(selected.setHours(22, 0, 0));

        // If booking for today, only show future time slots
        if (isToday) {
            const now = new Date();
            now.setMinutes(now.getMinutes() + 30); // Add 30 minutes buffer
            if (now > lunchStart) lunchStart = now;
            if (now > dinnerStart) dinnerStart = now;
        }

        // Generate lunch slots
        while (lunchStart < lunchEnd) {
            slots.push(formatTime(lunchStart));
            lunchStart.setMinutes(lunchStart.getMinutes() + 30);
        }

        // Generate dinner slots
        while (dinnerStart < dinnerEnd) {
            slots.push(formatTime(dinnerStart));
            dinnerStart.setMinutes(dinnerStart.getMinutes() + 30);
        }

        return slots;
    }

    function formatTime(date) {
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    function validateForm() {
        let isValid = true;
        const inputs = reservationForm.querySelectorAll('input, select, textarea');
        
        inputs.forEach(input => {
            if (input.hasAttribute('required') && !input.value) {
                isValid = false;
                showError(input, 'This field is required');
            } else if (input.type === 'email' && input.value && !isValidEmail(input.value)) {
                isValid = false;
                showError(input, 'Please enter a valid email address');
            } else if (input.type === 'tel' && input.value && !isValidPhone(input.value)) {
                isValid = false;
                showError(input, 'Please enter a valid phone number');
            }
        });

        return isValid;
    }

    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorDiv = formGroup.querySelector('.input-error');
        
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'input-error';
            formGroup.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        input.classList.add('invalid');
    }

    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        return /^\(\d{3}\) \d{3}-\d{4}$/.test(phone);
    }

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

    // Policy Card Hover Effects
    const policyCards = document.querySelectorAll('.policy-card');
    policyCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
            card.style.transition = 'transform 0.3s ease';
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
});
