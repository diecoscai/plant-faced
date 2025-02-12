import { ProductCatalog } from './product-catalog.js';
import { CartManager } from './cart-manager.js';

// Hamburger Menu
document.addEventListener('click', (e) => {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (e.target.closest('.hamburger')) {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !isExpanded);
        navList.classList.toggle('active');
        hamburger.classList.toggle('open');
        
        if (!isExpanded) {
            navList.querySelector('a').focus();
        }
    }
    
    if (!e.target.closest('.nav') && !e.target.closest('.hamburger')) {
        hamburger.setAttribute('aria-expanded', 'false');
        navList.classList.remove('active');
        hamburger.classList.remove('open');
    }
});


//Hero Section
document.querySelector('.cta-button').addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelector('#products').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    })
})

// Keyboard support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.setAttribute('aria-expanded', 'false');
        navList.classList.remove('active');
        hamburger.classList.remove('open');
    }
});



document.addEventListener('DOMContentLoaded', () => {
    window.productCatalog = new ProductCatalog();
    window.cartManager = new CartManager();
});