// Product Detail Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Image gallery functionality
    const thumbnails = document.querySelectorAll('.product-thumbnail');
    const mainImage = document.querySelector('.main-product-image');
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Remove active class from all thumbnails
            thumbnails.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            this.classList.add('active');
            
            // Update main image
            if (mainImage) {
                mainImage.src = this.src;
                mainImage.alt = this.alt;
            }
        });
    });
    
    // Set first thumbnail as active by default
    if (thumbnails.length > 0) {
        thumbnails[0].classList.add('active');
    }
    
    // Exchange proposal functionality
    const proposeExchangeBtn = document.querySelector('.propose-exchange-btn');
    const favoriteBtn = document.querySelector('.favorite-btn');
    const shareBtn = document.querySelector('.share-btn');
    
    if (proposeExchangeBtn) {
        proposeExchangeBtn.addEventListener('click', function() {
            // Redirect to exchange proposal page
            window.location.href = 'exchange-proposal.html';
        });
    }
    
    if (favoriteBtn) {
        favoriteBtn.addEventListener('click', function() {
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                this.classList.add('favorited');
                showNotification('Agregado a favoritos', 'success');
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                this.classList.remove('favorited');
                showNotification('Removido de favoritos', 'info');
            }
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    text: document.querySelector('.product-header h1').textContent,
                    url: window.location.href
                });
            } else {
                // Fallback: copy URL to clipboard
                navigator.clipboard.writeText(window.location.href).then(function() {
                    showNotification('Enlace copiado al portapapeles', 'success');
                }).catch(function() {
                    showNotification('Error al copiar enlace', 'error');
                });
            }
        });
    }
    
    // Contact owner functionality
    const contactOwnerBtn = document.querySelector('.contact-owner-btn');
    const viewProfileBtn = document.querySelector('.view-profile-btn');
    
    if (contactOwnerBtn) {
        contactOwnerBtn.addEventListener('click', function() {
            showContactModal();
        });
    }
    
    if (viewProfileBtn) {
        viewProfileBtn.addEventListener('click', function() {
            // Redirect to user profile
            window.location.href = 'user-profile.html';
        });
    }
    
    // Load related products
    loadRelatedProducts();
    
    // Load product reviews/ratings
    loadProductReviews();
});

function showContactModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Contactar al propietario</h3>
                <button class="modal-close">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="contactForm">
                    <div class="form-group">
                        <label for="contactMessage" class="form-label">Mensaje</label>
                        <textarea id="contactMessage" class="form-textarea" 
                                rows="5" placeholder="Escribe tu mensaje aquí..."></textarea>
                    </div>
                    <div class="form-group">
                        <label class="checkbox-item">
                            <input type="checkbox" id="includeMyObjects">
                            <span class="checkbox-label">Incluir mis objetos disponibles</span>
                        </label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button class="btn btn-primary" onclick="sendMessage()">Enviar mensaje</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal());
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
}

function closeModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

function sendMessage() {
    const message = document.getElementById('contactMessage').value;
    const includeObjects = document.getElementById('includeMyObjects').checked;
    
    if (!message.trim()) {
        showNotification('Por favor escribe un mensaje', 'error');
        return;
    }
    
    // Simulate sending message
    setTimeout(() => {
        showNotification('Mensaje enviado exitosamente', 'success');
        closeModal();
    }, 1000);
}

function loadRelatedProducts() {
    const relatedGrid = document.querySelector('.related-products-grid');
    if (!relatedGrid) return;
    
    // Simulate loading related products
    const relatedProducts = [
        {
            id: 1,
            title: "Cámara Canon EOS",
            image: "https://via.placeholder.com/250x180",
            category: "Electrónicos",
            condition: "Muy bueno",
            location: "Barcelona"
        },
        {
            id: 2,
            title: "Bicicleta de montaña",
            image: "https://via.placeholder.com/250x180",
            category: "Deportes",
            condition: "Bueno",
            location: "Madrid"
        },
        {
            id: 3,
            title: "Libro de cocina",
            image: "https://via.placeholder.com/250x180",
            category: "Libros",
            condition: "Como nuevo",
            location: "Valencia"
        }
    ];
    
    relatedGrid.innerHTML = relatedProducts.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                <img src="${product.image}" alt="${product.title}" class="product-image">
                <div class="product-status-badge available">Disponible</div>
            </div>
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-category">${product.category}</p>
                <div class="product-details">
                    <span class="product-condition">${product.condition}</span>
                    <span class="product-location">
                        <i class="fas fa-map-marker-alt"></i> ${product.location}
                    </span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click handlers to related products
    relatedGrid.querySelectorAll('.product-card').forEach(card => {
        card.addEventListener('click', function() {
            // Redirect to product detail
            window.location.href = `product-detail.html?id=${this.dataset.id}`;
        });
    });
}

function loadProductReviews() {
    // Simulate loading product reviews
    const reviews = [
        {
            user: "Ana García",
            rating: 5,
            comment: "Excelente producto, muy buena condición",
            date: "2024-01-15"
        },
        {
            user: "Carlos López",
            rating: 4,
            comment: "Muy satisfecho con el intercambio",
            date: "2024-01-10"
        }
    ];
    
    // Could add reviews section to the page
    console.log('Product reviews loaded:', reviews);
}

// Utility function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 24px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 1001;
        opacity: 0;
        transform: translateY(-20px);
        transition: all 0.3s ease;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.backgroundColor = '#10b981';
            break;
        case 'error':
            notification.style.backgroundColor = '#ef4444';
            break;
        case 'warning':
            notification.style.backgroundColor = '#f59e0b';
            break;
        default:
            notification.style.backgroundColor = '#3b82f6';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateY(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Initialize page based on URL parameters
function initializeProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    
    if (productId) {
        // Load specific product data
        loadProductData(productId);
    }
}

function loadProductData(productId) {
    // Simulate loading product data from API
    console.log('Loading product data for ID:', productId);
    
    // In a real application, this would fetch from an API
    // For now, we'll use the static HTML content
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', initializeProductDetail);
