// Menu Page Specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
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

    // Menu Item Animations
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
    });

    // Menu Category Hover Effects
    const menuCategories = document.querySelectorAll('.menu-section');
    menuCategories.forEach(category => {
        const items = category.querySelectorAll('.menu-item');
        items.forEach(item => {
            item.addEventListener('mouseenter', () => {
                item.style.transform = 'translateY(-5px)';
                item.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            });

            item.addEventListener('mouseleave', () => {
                item.style.transform = 'translateY(0)';
                item.style.boxShadow = 'none';
            });
        });
    });

    // Initialize with first category
    const firstCategory = menuNavButtons[0].dataset.category;
    showMenuSection(firstCategory);

    // Smooth scroll to sections
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Price hover effect
    const prices = document.querySelectorAll('.menu-item__price');
    prices.forEach(price => {
        price.addEventListener('mouseenter', () => {
            price.style.color = 'var(--color-primary)';
            price.style.transform = 'scale(1.1)';
            price.style.transition = 'all 0.3s ease';
        });

        price.addEventListener('mouseleave', () => {
            price.style.color = 'var(--color-accent)';
            price.style.transform = 'scale(1)';
        });
    });
});
