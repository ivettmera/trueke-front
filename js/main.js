// Main JavaScript file
document.addEventListener('DOMContentLoaded', () => {
    // Initialize authentication check
    if (typeof updateNavigation === 'function') {
        updateNavigation();
    }
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Favorite button toggle
    const favoriteButtons = document.querySelectorAll('.favorite-btn');
    favoriteButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            // Check if user is logged in
            if (!isLoggedIn()) {
                showNotification('Debes iniciar sesión para agregar favoritos', 'warning');
                return;
            }
            
            btn.classList.toggle('active');
            const svg = btn.querySelector('svg path');
            if (btn.classList.contains('active')) {
                svg.setAttribute('fill', '#FF6B6B');
                showNotification('Agregado a favoritos', 'success');
            } else {
                svg.setAttribute('fill', 'none');
                showNotification('Removido de favoritos', 'info');
            }
        });
    });
    
    // Product card click
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.closest('.favorite-btn') && !e.target.closest('.btn')) {
                // Check if user is logged in before showing product details
                if (!isLoggedIn()) {
                    showNotification('Debes iniciar sesión para ver detalles', 'warning');
                    return;
                }
                window.location.href = 'pages/product-detail.html';
            }
        });
    });
    
    // Search functionality - only work if logged in
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            if (!isLoggedIn()) {
                e.target.value = '';
                showNotification('Debes iniciar sesión para buscar', 'warning');
                return;
            }
            
            const searchTerm = e.target.value.toLowerCase();
            filterProducts(searchTerm);
        });
    }
    
    // Category filter - only work if logged in
    const categoryFilter = document.querySelector('.category-filter');
    if (categoryFilter) {
        categoryFilter.addEventListener('change', (e) => {
            if (!isLoggedIn()) {
                e.target.value = 'Escoge una categoría';
                showNotification('Debes iniciar sesión para filtrar', 'warning');
                return;
            }
            
            const category = e.target.value;
            filterByCategory(category);
        });
    }
});

// Helper functions
function isLoggedIn() {
    return localStorage.getItem('trueke_session') === 'active';
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    const colors = {
        'info': '#2196F3',
        'success': '#4CAF50',
        'warning': '#FF9800',
        'error': '#F44336'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${colors[type] || colors.info};
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

// Filter products by search term
function filterProducts(searchTerm) {
    const products = document.querySelectorAll('.product-card');
    products.forEach(product => {
        const title = product.querySelector('.product-title').textContent.toLowerCase();
        if (title.includes(searchTerm)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Filter products by category
function filterByCategory(category) {
    // Implementation depends on how categories are stored
    console.log('Filtering by category:', category);
}

// Smooth scroll to anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Global logout function for consistency
window.logout = function() {
    if (typeof logout === 'function') {
        logout();
    } else {
        // Fallback if auth.js is not loaded
        localStorage.removeItem('trueke_user');
        localStorage.removeItem('trueke_session');
        window.location.href = window.location.pathname.includes('/pages/') ? '../index.html' : 'index.html';
    }
};