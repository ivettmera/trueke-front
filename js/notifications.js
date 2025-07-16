// Notifications JavaScript

// Create notification container if it doesn't exist
function createNotificationContainer() {
    if (!document.querySelector('.notification-container')) {
        const container = document.createElement('div');
        container.className = 'notification-container';
        document.body.appendChild(container);
    }
}

// Show notification
function showNotification(message, type = 'info', duration = 5000) {
    createNotificationContainer();
    
    const container = document.querySelector('.notification-container');
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    
    const title = type === 'success' ? 'Éxito' : 
                  type === 'error' ? 'Error' : 
                  type === 'warning' ? 'Advertencia' : 'Información';
    
    notification.innerHTML = `
        <div class="notification-title">${title}</div>
        <div class="notification-message">${message}</div>
        <div class="notification-time">Ahora</div>
    `;
    
    container.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, duration);
}

// Initialize notifications for certain actions
document.addEventListener('DOMContentLoaded', () => {
    // Check for notification triggers in URL params
    const urlParams = new URLSearchParams(window.location.search);
    const notification = urlParams.get('notification');
    
    if (notification === 'login_success') {
        showNotification('Has iniciado sesión correctamente', 'success');
    } else if (notification === 'logout_success') {
        showNotification('Has cerrado sesión', 'info');
    } else if (notification === 'publish_success') {
        showNotification('Tu objeto ha sido publicado con éxito', 'success');
    }
});

// WebSocket simulation for real-time notifications
function simulateRealtimeNotifications() {
    // Simulate receiving notifications
    const notifications = [
        {
            title: 'Nueva solicitud recibida',
            message: 'Emma Espinoza quiere intercambiar por tu "Bolso Gucci 2020 Limited Edition"',
            type: 'info'
        },
        {
            title: '¡Tu trueque fue aceptado!',
            message: 'Emma Espinoza aceptó tu solicitud por "Disco de Vinilo - Trench autografiado"',
            type: 'success'
        }
    ];
    
    // Random notification every 30-60 seconds
    setInterval(() => {
        if (Math.random() > 0.7 && checkAuth()) {
            const randomNotification = notifications[Math.floor(Math.random() * notifications.length)];
            showNotification(randomNotification.message, randomNotification.type);
            
            // Update notification badge
            updateNotificationBadge();
        }
    }, 45000);
}

// Update notification badge
function updateNotificationBadge() {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.style.display = 'block';
    }
}

// Start real-time notifications if user is logged in
if (checkAuth()) {
    simulateRealtimeNotifications();
}