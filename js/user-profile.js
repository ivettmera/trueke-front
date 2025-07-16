// User Profile Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Remove active class from all tabs and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab
            this.classList.add('active');
            
            // Show corresponding content
            const targetContent = document.getElementById(`${tabId}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
    
    // Profile editing functionality
    const editProfileBtn = document.querySelector('.profile-actions .btn-primary');
    const editCoverBtn = document.querySelector('.edit-cover-btn');
    const editAvatarBtn = document.querySelector('.edit-avatar-btn');
    const shareBtn = document.querySelector('.profile-actions .btn-secondary');
    
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', function() {
            showEditProfileModal();
        });
    }
    
    if (editCoverBtn) {
        editCoverBtn.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                handleImageUpload(e.target.files[0], 'cover');
            };
            input.click();
        });
    }
    
    if (editAvatarBtn) {
        editAvatarBtn.addEventListener('click', function() {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'image/*';
            input.onchange = function(e) {
                handleImageUpload(e.target.files[0], 'avatar');
            };
            input.click();
        });
    }
    
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            shareProfile();
        });
    }
    
    // Product card clicks
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function() {
            // Get product title for demo
            const title = this.querySelector('.product-title').textContent;
            window.location.href = `product-detail.html?title=${encodeURIComponent(title)}`;
        });
    });
    
    // Load user data
    loadUserProfile();
    
    // Load user objects
    loadUserObjects();
    
    // Load user reviews
    loadUserReviews();
    
    // Load user activity
    loadUserActivity();
});

function showEditProfileModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Editar perfil</h3>
                <button class="modal-close" onclick="closeModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <form id="editProfileForm">
                    <div class="form-group">
                        <label for="profileName" class="form-label">Nombre completo</label>
                        <input type="text" id="profileName" class="form-input" value="María González">
                    </div>
                    
                    <div class="form-group">
                        <label for="profileLocation" class="form-label">Ubicación</label>
                        <input type="text" id="profileLocation" class="form-input" value="Madrid, España">
                    </div>
                    
                    <div class="form-group">
                        <label for="profileBio" class="form-label">Acerca de mí</label>
                        <textarea id="profileBio" class="form-textarea" rows="4">Apasionada por el intercambio sostenible y el reciclaje. Me encanta dar nueva vida a los objetos y encontrar tesoros únicos. Siempre busco intercambios justos y beneficiosos para ambas partes.</textarea>
                    </div>
                    
                    <div class="form-group">
                        <label for="profileInterests" class="form-label">Intereses (separados por comas)</label>
                        <input type="text" id="profileInterests" class="form-input" value="Libros, Decoración, Tecnología, Ropa vintage, Plantas">
                    </div>
                    
                    <div class="form-group">
                        <label for="profilePhone" class="form-label">Teléfono (opcional)</label>
                        <input type="tel" id="profilePhone" class="form-input" placeholder="+34 600 000 000">
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-item">
                            <input type="checkbox" id="profilePublic" checked>
                            <span class="checkbox-label">Perfil público</span>
                        </label>
                    </div>
                    
                    <div class="form-group">
                        <label class="checkbox-item">
                            <input type="checkbox" id="profileNotifications" checked>
                            <span class="checkbox-label">Recibir notificaciones por email</span>
                        </label>
                    </div>
                </form>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closeModal()">Cancelar</button>
                <button class="btn btn-primary" onclick="saveProfile()">Guardar cambios</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
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

function saveProfile() {
    const formData = {
        name: document.getElementById('profileName').value,
        location: document.getElementById('profileLocation').value,
        bio: document.getElementById('profileBio').value,
        interests: document.getElementById('profileInterests').value.split(',').map(i => i.trim()),
        phone: document.getElementById('profilePhone').value,
        isPublic: document.getElementById('profilePublic').checked,
        notifications: document.getElementById('profileNotifications').checked
    };
    
    // Simulate API call
    setTimeout(() => {
        // Update profile display
        document.querySelector('.profile-name').textContent = formData.name;
        document.querySelector('.profile-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${formData.location}`;
        document.querySelector('.sidebar-section p').textContent = formData.bio;
        
        // Update interests
        const interestsContainer = document.querySelector('.interests-tags');
        interestsContainer.innerHTML = formData.interests.map(interest => 
            `<span class="interest-tag">${interest}</span>`
        ).join('');
        
        showNotification('Perfil actualizado exitosamente', 'success');
        closeModal();
    }, 1000);
}

function handleImageUpload(file, type) {
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
        showNotification('Por favor selecciona un archivo de imagen válido', 'error');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        showNotification('La imagen debe ser menor a 5MB', 'error');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        if (type === 'cover') {
            document.querySelector('.cover-image').src = e.target.result;
        } else if (type === 'avatar') {
            document.querySelector('.profile-avatar').src = e.target.result;
        }
        
        showNotification(`${type === 'cover' ? 'Portada' : 'Avatar'} actualizado exitosamente`, 'success');
    };
    
    reader.readAsDataURL(file);
}

function shareProfile() {
    const profileData = {
        title: 'Perfil de ' + document.querySelector('.profile-name').textContent,
        text: 'Mira el perfil de este usuario en Truek-e',
        url: window.location.href
    };
    
    if (navigator.share) {
        navigator.share(profileData);
    } else {
        // Fallback: copy URL to clipboard
        navigator.clipboard.writeText(window.location.href).then(function() {
            showNotification('Enlace del perfil copiado al portapapeles', 'success');
        }).catch(function() {
            showNotification('Error al copiar enlace', 'error');
        });
    }
}

function loadUserProfile() {
    // Simulate loading user profile data
    const userProfile = {
        name: 'María González',
        location: 'Madrid, España',
        memberSince: 'Enero 2024',
        stats: {
            objects: 23,
            exchanges: 15,
            rating: 4.8
        },
        bio: 'Apasionada por el intercambio sostenible y el reciclaje. Me encanta dar nueva vida a los objetos y encontrar tesoros únicos. Siempre busco intercambios justos y beneficiosos para ambas partes.',
        interests: ['Libros', 'Decoración', 'Tecnología', 'Ropa vintage', 'Plantas'],
        avatar: 'https://via.placeholder.com/120x120',
        cover: 'https://via.placeholder.com/1200x300'
    };
    
    // Update profile display
    document.querySelector('.profile-name').textContent = userProfile.name;
    document.querySelector('.profile-location').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${userProfile.location}`;
    document.querySelector('.profile-member-since').innerHTML = `<i class="fas fa-calendar"></i> Miembro desde ${userProfile.memberSince}`;
    
    // Update stats
    document.querySelectorAll('.stat-number')[0].textContent = userProfile.stats.objects;
    document.querySelectorAll('.stat-number')[1].textContent = userProfile.stats.exchanges;
    document.querySelectorAll('.stat-number')[2].textContent = userProfile.stats.rating;
    
    console.log('User profile loaded:', userProfile);
}

function loadUserObjects() {
    // Simulate loading user objects
    const objects = [
        {
            id: 1,
            title: 'Cámara vintage Canon',
            category: 'Electrónicos',
            condition: 'Muy bueno',
            status: 'available',
            image: 'https://via.placeholder.com/250x180',
            createdAt: '2024-01-20'
        },
        {
            id: 2,
            title: 'Libro de cocina mediterránea',
            category: 'Libros',
            condition: 'Como nuevo',
            status: 'available',
            image: 'https://via.placeholder.com/250x180',
            createdAt: '2024-01-15'
        },
        {
            id: 3,
            title: 'Lámpara de mesa vintage',
            category: 'Decoración',
            condition: 'Bueno',
            status: 'exchanged',
            image: 'https://via.placeholder.com/250x180',
            createdAt: '2024-01-10'
        },
        {
            id: 4,
            title: 'Vestido vintage años 70',
            category: 'Ropa',
            condition: 'Muy bueno',
            status: 'available',
            image: 'https://via.placeholder.com/250x180',
            createdAt: '2024-01-18'
        }
    ];
    
    console.log('User objects loaded:', objects);
}

function loadUserReviews() {
    // Simulate loading user reviews
    const reviews = [
        {
            id: 1,
            reviewer: 'Pedro Martínez',
            rating: 5,
            comment: 'Excelente intercambio con María. La cámara estaba en perfecto estado tal como se describía. Comunicación fluida y puntual en la entrega. ¡Totalmente recomendable!',
            date: '2024-01-20',
            avatar: 'https://via.placeholder.com/48x48'
        },
        {
            id: 2,
            reviewer: 'Laura Fernández',
            rating: 5,
            comment: 'Muy buena experiencia intercambiando libros con María. Persona seria y confiable. El libro llegó en excelente estado y el intercambio fue justo para ambas partes.',
            date: '2024-01-15',
            avatar: 'https://via.placeholder.com/48x48'
        },
        {
            id: 3,
            reviewer: 'Ana López',
            rating: 5,
            comment: 'Intercambio perfecto, muy amable y puntual',
            date: '2024-01-18',
            avatar: 'https://via.placeholder.com/32x32'
        },
        {
            id: 4,
            reviewer: 'Carlos Ruiz',
            rating: 5,
            comment: 'Excelente comunicación y objeto en perfecto estado',
            date: '2024-01-12',
            avatar: 'https://via.placeholder.com/32x32'
        }
    ];
    
    console.log('User reviews loaded:', reviews);
}

function loadUserActivity() {
    // Simulate loading user activity
    const activities = [
        {
            id: 1,
            type: 'publish',
            description: 'Publicó un nuevo objeto: "Cámara vintage Canon"',
            date: '2024-01-20',
            icon: 'fas fa-plus'
        },
        {
            id: 2,
            type: 'exchange',
            description: 'Completó un intercambio con Pedro Martínez',
            date: '2024-01-18',
            icon: 'fas fa-exchange-alt'
        },
        {
            id: 3,
            type: 'review',
            description: 'Recibió una valoración de 5 estrellas',
            date: '2024-01-15',
            icon: 'fas fa-star'
        },
        {
            id: 4,
            type: 'publish',
            description: 'Publicó un nuevo objeto: "Libro de cocina mediterránea"',
            date: '2024-01-15',
            icon: 'fas fa-plus'
        }
    ];
    
    console.log('User activity loaded:', activities);
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

// Global functions for HTML onclick handlers
window.closeModal = closeModal;
window.saveProfile = saveProfile;
