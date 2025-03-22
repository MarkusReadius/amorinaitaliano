// Home Page Specific JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Featured Menu Item Animations
    const menuItems = document.querySelectorAll('.menu__item');
    menuItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.2}s`;
    });

    // CTA Cards Animation
    const ctaCards = document.querySelectorAll('.cta-card');
    ctaCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.3}s`;
    });

    // Hero Section Parallax Effect
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPosition = `center ${scrolled * 0.5}px`;
        });
    }

    // Menu Category Hover Effects
    const menuCategories = document.querySelectorAll('.menu__category');
    menuCategories.forEach(category => {
        category.addEventListener('mouseenter', () => {
            category.style.transform = 'translateY(-5px)';
            category.style.transition = 'transform 0.3s ease';
        });

        category.addEventListener('mouseleave', () => {
            category.style.transform = 'translateY(0)';
        });
    });

    // Smooth Scroll for CTA Buttons
    document.querySelectorAll('a[href*="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').split('#')[1];
            if (targetId) {
                e.preventDefault();
                document.getElementById(targetId).scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
