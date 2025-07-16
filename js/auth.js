// Authentication System for Truek-e

// Demo users database
const DEMO_USERS = {
    'maria@trueke.com': {
        password: '123456',
        name: 'María González',
        userId: 'maria',
        avatar: 'https://via.placeholder.com/40x40/4285F4/white?text=M',
        location: 'Madrid, España',
        memberSince: 'Enero 2024',
        rating: 4.8,
        stats: {
            objects: 23,
            exchanges: 15,
            reviews: 47
        },
        products: [
            {
                id: 'maria-1',
                title: 'Cámara Canon EOS vintage',
                category: 'Electrónicos',
                condition: 'Muy bueno',
                status: 'available',
                image: 'https://via.placeholder.com/300x200/FF6B6B/white?text=Cámara',
                description: 'Cámara réflex en excelente estado, perfecta para fotografía analógica.'
            },
            {
                id: 'maria-2',
                title: 'Colección de libros de cocina',
                category: 'Libros',
                condition: 'Como nuevo',
                status: 'available',
                image: 'https://via.placeholder.com/300x200/4ECDC4/white?text=Libros',
                description: 'Colección completa de libros de cocina internacional.'
            },
            {
                id: 'maria-3',
                title: 'Vestido vintage años 70',
                category: 'Ropa',
                condition: 'Muy bueno',
                status: 'available',
                image: 'https://via.placeholder.com/300x200/45B7D1/white?text=Vestido',
                description: 'Vestido auténtico de los años 70, talla M.'
            },
            {
                id: 'maria-4',
                title: 'Lámpara de mesa vintage',
                category: 'Decoración',
                condition: 'Bueno',
                status: 'exchanged',
                image: 'https://via.placeholder.com/300x200/96CEB4/white?text=Lámpara',
                description: 'Lámpara de mesa estilo vintage, funcional y decorativa.'
            }
        ]
    },
    'carlos@trueke.com': {
        password: '123456',
        name: 'Carlos López',
        userId: 'carlos',
        avatar: 'https://via.placeholder.com/40x40/FF6B6B/white?text=C',
        location: 'Barcelona, España',
        memberSince: 'Marzo 2024',
        rating: 4.6,
        stats: {
            objects: 18,
            exchanges: 12,
            reviews: 34
        },
        products: [
            {
                id: 'carlos-1',
                title: 'Bicicleta de montaña Trek',
                category: 'Deportes',
                condition: 'Muy bueno',
                status: 'available',
                image: 'https://via.placeholder.com/300x200/FFD93D/white?text=Bicicleta',
                description: 'Bicicleta de montaña Trek en excelente estado, poco uso.'
            },
            {
                id: 'carlos-2',
                title: 'Guitarra eléctrica Fender',
                category: 'Música',
                condition: 'Bueno',
                status: 'available',
                image: 'https://via.placeholder.com/300x200/6BCF7F/white?text=Guitarra',
                description: 'Guitarra eléctrica Fender Stratocaster, incluye amplificador.'
            },
            {
                id: 'carlos-3',
                title: 'Consola PlayStation 4',
                category: 'Electrónicos',
                condition: 'Muy bueno',
                status: 'available',
                image: 'https://via.placeholder.com/300x200/A8E6CF/white?text=PS4',
                description: 'PlayStation 4 con 2 mandos y 5 juegos incluidos.'
            },
            {
                id: 'carlos-4',
                title: 'Mochila de senderismo',
                category: 'Deportes',
                condition: 'Como nuevo',
                status: 'available',
                image: 'https://via.placeholder.com/300x200/FFEAA7/white?text=Mochila',
                description: 'Mochila de senderismo de 40L, perfecta para montañismo.'
            }
        ]
    },
    'ana@trueke.com': {
        password: '123456',
        name: 'Ana Martínez',
        userId: 'ana',
        avatar: 'https://via.placeholder.com/40x40/9B59B6/white?text=A',
        location: 'Valencia, España',
        memberSince: 'Febrero 2024',
        rating: 4.9,
        stats: {
            objects: 31,
            exchanges: 22,
            reviews: 58
        },
        products: [
            {
                id: 'ana-1',
                title: 'Máquina de coser Singer',
                category: 'Hogar',
                condition: 'Muy bueno',
                status: 'available',
                image: 'https://via.placeholder.com/300x200/E17055/white?text=Máquina',
                description: 'Máquina de coser Singer vintage, completamente funcional.'
            },
            {
                id: 'ana-2',
                title: 'Juego de vajilla japonesa',
                category: 'Hogar',
                condition: 'Como nuevo',
                status: 'available',
                image: 'https://via.placeholder.com/300x200/00B894/white?text=Vajilla',
                description: 'Juego completo de vajilla japonesa para 6 personas.'
            },
            {
                id: 'ana-3',
                title: 'Plantas suculentas variadas',
                category: 'Jardín',
                condition: 'Excelente',
                status: 'available',
                image: 'https://via.placeholder.com/300x200/00CEC9/white?text=Plantas',
                description: 'Colección de 12 plantas suculentas en macetas decorativas.'
            },
            {
                id: 'ana-4',
                title: 'Libros de arte contemporáneo',
                category: 'Libros',
                condition: 'Muy bueno',
                status: 'available',
                image: 'https://via.placeholder.com/300x200/6C5CE7/white?text=Arte',
                description: 'Colección de libros sobre arte contemporáneo y diseño.'
            }
        ]
    }
};

// Authentication functions
function login(email, password) {
    console.log('Login function called with:', { email, password });
    console.log('Available users:', Object.keys(DEMO_USERS));
    
    const user = DEMO_USERS[email];
    console.log('Found user:', user);
    
    if (user && user.password === password) {
        console.log('Credentials match, storing session...');
        
        // Store user session
        localStorage.setItem('trueke_user', JSON.stringify(user));
        localStorage.setItem('trueke_session', 'active');
        
        console.log('Session stored successfully');
        
        // Simulate email verification for new registrations
        if (sessionStorage.getItem('newRegistration')) {
            simulateEmailVerification(user);
            sessionStorage.removeItem('newRegistration');
        }
        
        return { success: true, user: user };
    }
    
    console.log('Login failed - credentials do not match');
    return { success: false, message: 'Credenciales incorrectas' };
}

function logout() {
    console.log('Logout function called from:', window.location.pathname);
    
    // Clear session data
    localStorage.removeItem('trueke_user');
    localStorage.removeItem('trueke_session');
    
    // Also clear any other session-related data
    sessionStorage.removeItem('newRegistration');
    
    console.log('Session data cleared');
    
    // Update UI immediately if possible
    try {
        updateNavigation();
    } catch (e) {
        console.log('Could not update navigation:', e.message);
    }
    
    // Show logout notification
    try {
        showNotification('Sesión cerrada exitosamente', 'success');
    } catch (e) {
        console.log('Could not show notification:', e.message);
    }
    
    // Determine the correct path to index.html based on current location
    const currentPath = window.location.pathname;
    const currentDir = window.location.href;
    let indexPath = 'index.html';
    
    // If we're in a subfolder (like /pages/), go back to root
    if (currentPath.includes('/pages/') || currentDir.includes('/pages/')) {
        indexPath = '../index.html';
    }
    
    console.log('Current path:', currentPath);
    console.log('Redirecting to:', indexPath);
    
    // Force immediate redirect with replace to avoid back button issues
    setTimeout(() => {
        window.location.replace(indexPath);
    }, 100);
}

function getCurrentUser() {
    const userSession = localStorage.getItem('trueke_session');
    const userData = localStorage.getItem('trueke_user');
    
    if (userSession === 'active' && userData) {
        return JSON.parse(userData);
    }
    return null;
}

function isLoggedIn() {
    return localStorage.getItem('trueke_session') === 'active';
}

// Email verification simulation
function simulateEmailVerification(user) {
    // This would typically send an actual email in a real application
    console.log(`Email de verificación enviado a: ${user.name}`);
    
    // Show notification to user
    showNotification(
        `¡Bienvenido ${user.name}! Te hemos enviado un email de verificación.`,
        'success'
    );
}

// UI Management functions
function updateNavigation() {
    const user = getCurrentUser();
    const navMenu = document.getElementById('navMenu');
    const authActions = document.getElementById('authActions');
    const userMenu = document.getElementById('userMenu');
    const productsSection = document.getElementById('productsSection');
    const welcomeSection = document.getElementById('welcomeSection');
    const heroCTA = document.getElementById('heroCTA');
    
    if (user) {
        // User is logged in
        if (navMenu) navMenu.style.display = 'flex';
        if (authActions) authActions.style.display = 'none';
        if (userMenu) {
            userMenu.style.display = 'flex';
            const userAvatar = document.getElementById('userAvatar');
            const userName = document.getElementById('userName');
            if (userAvatar) userAvatar.src = user.avatar;
            if (userName) userName.textContent = user.name;
        }
        if (productsSection) productsSection.style.display = 'block';
        if (welcomeSection) welcomeSection.style.display = 'none';
        if (heroCTA) heroCTA.style.display = 'none';
        
        // Load user's products
        loadUserProducts(user);
    } else {
        // User is not logged in
        if (navMenu) navMenu.style.display = 'none';
        if (authActions) authActions.style.display = 'flex';
        if (userMenu) userMenu.style.display = 'none';
        if (productsSection) productsSection.style.display = 'none';
        if (welcomeSection) welcomeSection.style.display = 'block';
        if (heroCTA) heroCTA.style.display = 'flex';
    }
}

function loadUserProducts(user) {
    const productGrid = document.getElementById('productGrid');
    if (!productGrid) return;
    
    productGrid.innerHTML = '';
    
    user.products.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const badge = product.status === 'available' ? 
        '<span class="product-badge badge-new">Disponible</span>' : 
        '<span class="product-badge badge-exchanged">Intercambiado</span>';
    
    card.innerHTML = `
        ${badge}
        <button class="favorite-btn">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M10 18l-1.45-1.32C4.4 13.36 1 10.28 1 6.5 1 3.42 3.42 1 6.5 1c1.74 0 3.41.81 4.5 2.09C12.09 1.81 13.76 1 15.5 1 18.58 1 21 3.42 21 6.5c0 3.78-3.4 6.86-7.55 10.18L10 18z" stroke="#333" stroke-width="2"/>
            </svg>
        </button>
        <img src="${product.image}" alt="${product.title}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.title}</h3>
            <p class="product-category">${product.category}</p>
            <p class="product-condition">Estado: ${product.condition}</p>
            <div class="product-actions">
                <button class="btn btn-primary btn-sm">Ver detalles</button>
                ${product.status === 'available' ? 
                    '<button class="btn btn-outline btn-sm">Proponer intercambio</button>' : 
                    '<button class="btn btn-disabled btn-sm">Intercambiado</button>'
                }
            </div>
        </div>
    `;
    
    return card;
}

// Page protection - redirect to login if not authenticated
function protectPage() {
    if (!isLoggedIn()) {
        window.location.href = '../pages/login.html';
    }
}

// Initialize authentication state when page loads
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing auth system...');
    
    updateNavigation();
    
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    console.log('Login form found:', !!loginForm);
    
    if (loginForm) {
        console.log('Adding event listener to login form...');
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Login form submitted'); // Debug
            
            const emailInput = document.getElementById('email') || this.querySelector('input[type="email"]');
            const passwordInput = document.getElementById('password') || this.querySelector('input[type="password"]');
            
            console.log('Email input found:', !!emailInput);
            console.log('Password input found:', !!passwordInput);
            
            const email = emailInput ? emailInput.value : '';
            const password = passwordInput ? passwordInput.value : '';
            
            console.log('Email:', email, 'Password:', password); // Debug
            
            const result = login(email, password);
            console.log('Login result:', result); // Debug
            
            if (result.success) {
                console.log('Login successful, redirecting...'); // Debug
                window.location.href = '../index.html';
            } else {
                alert(result.message);
            }
        });
    } else {
        console.log('Login form not found'); // Debug
    }
    
    // Handle register form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Mark as new registration for email simulation
            sessionStorage.setItem('newRegistration', 'true');
            // Redirect to login page
            window.location.href = 'login.html';
        });
    }
});

// Utility function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 8px;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}