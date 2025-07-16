// Exchanges JavaScript

// Handle exchange proposal submission
const proposalForm = document.getElementById('proposalForm');
if (proposalForm) {
    proposalForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (selectedProducts.size === 0) {
            showNotification('Selecciona al menos un objeto para intercambiar', 'error');
            return;
        }
        
        try {
            showLoading();
            await simulateApiCall();
            
            showNotification('Solicitud enviada correctamente', 'success');
            
            // Redirect to success page
            setTimeout(() => {
                window.location.href = 'proposal-success.html';
            }, 2000);
        } catch (error) {
            showNotification('Error al enviar propuesta', 'error');
        } finally {
            hideLoading();
        }
    });
}

// Handle exchange acceptance/rejection
const acceptBtn = document.querySelector('.accept-exchange');
const rejectBtn = document.querySelector('.reject-exchange');

if (acceptBtn) {
    acceptBtn.addEventListener('click', async () => {
        try {
            showLoading();
            await simulateApiCall();
            
            // Show contact info
            document.querySelector('.contact-info').style.display = 'block';
            showNotification('¡Trueque aceptado!', 'success');
        } catch (error) {
            showNotification('Error al aceptar intercambio', 'error');
        } finally {
            hideLoading();
        }
    });
}

if (rejectBtn) {
    rejectBtn.addEventListener('click', async () => {
        if (confirm('¿Estás seguro de rechazar esta propuesta?')) {
            try {
                showLoading();
                await simulateApiCall();
                
                showNotification('Propuesta rechazada', 'info');
                
                // Redirect back to exchanges
                setTimeout(() => {
                    window.location.href = 'my-exchanges.html';
                }, 2000);
            } catch (error) {
                showNotification('Error al rechazar intercambio', 'error');
            } finally {
                hideLoading();
            }
        }
    });
}

// Handle rating submission
const ratingStars = document.querySelectorAll('.rating-star');
let selectedRating = 0;

ratingStars.forEach((star, index) => {
    star.addEventListener('click', () => {
        selectedRating = index + 1;
        updateRatingDisplay(selectedRating);
    });
    
    star.addEventListener('mouseenter', () => {
        updateRatingDisplay(index + 1);
    });
});

const ratingContainer = document.querySelector('.rating-stars');
if (ratingContainer) {
    ratingContainer.addEventListener('mouseleave', () => {
        updateRatingDisplay(selectedRating);
    });
}

function updateRatingDisplay(rating) {
    ratingStars.forEach((star, index) => {
        if (index < rating) {
            star.classList.add('filled');
        } else {
            star.classList.remove('filled');
        }
    });
}

const ratingForm = document.getElementById('ratingForm');
if (ratingForm) {
    ratingForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (selectedRating === 0) {
            showNotification('Por favor selecciona una calificación', 'error');
            return;
        }
        
        try {
            showLoading();
            await simulateApiCall();
            
            showNotification('Calificación enviada', 'success');
            
            // Redirect to exchanges
            setTimeout(() => {
                window.location.href = 'my-exchanges.html';
            }, 2000);
        } catch (error) {
            showNotification('Error al enviar calificación', 'error');
        } finally {
            hideLoading();
        }
    });
}

// Tab navigation
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const targetTab = button.dataset.tab;
        
        // Update active button
        tabButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        // Update visible content
        tabContents.forEach(content => {
            if (content.id === targetTab) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    });
});