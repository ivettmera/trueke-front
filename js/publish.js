// Publish Page JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('publishForm');
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const categorySelect = document.getElementById('category');
    const conditionSelect = document.getElementById('condition');
    const locationInput = document.getElementById('location');
    const previewBtn = document.getElementById('previewBtn');
    const publishBtn = document.getElementById('publishBtn');
    const saveDraftBtn = document.getElementById('saveDraftBtn');
    
    // Character counters
    const titleCounter = document.getElementById('titleCounter');
    const descriptionCounter = document.getElementById('descriptionCounter');
    
    // Image upload functionality
    initializeImageUpload();
    
    // Character counting
    if (titleInput && titleCounter) {
        titleInput.addEventListener('input', function() {
            const count = this.value.length;
            titleCounter.textContent = `${count}/100`;
            
            if (count > 90) {
                titleCounter.style.color = 'var(--error-color)';
            } else {
                titleCounter.style.color = 'var(--text-secondary)';
            }
        });
    }
    
    if (descriptionInput && descriptionCounter) {
        descriptionInput.addEventListener('input', function() {
            const count = this.value.length;
            descriptionCounter.textContent = `${count}/1000`;
            
            if (count > 900) {
                descriptionCounter.style.color = 'var(--error-color)';
            } else {
                descriptionCounter.style.color = 'var(--text-secondary)';
            }
        });
    }
    
    // Form validation
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm()) {
                publishObject();
            }
        });
    }
    
    // Button handlers
    if (previewBtn) {
        previewBtn.addEventListener('click', function() {
            if (validateForm()) {
                showPreview();
            }
        });
    }
    
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', function() {
            saveDraft();
        });
    }
    
    // Load draft if exists
    loadDraft();
    
    // Auto-save draft every 30 seconds
    setInterval(saveDraft, 30000);
});

function initializeImageUpload() {
    const imageSlots = document.querySelectorAll('.image-upload-slot');
    
    imageSlots.forEach((slot, index) => {
        const input = slot.querySelector('.image-input');
        const label = slot.querySelector('.upload-label');
        
        if (input) {
            input.addEventListener('change', function(e) {
                handleImageUpload(e, slot, index);
            });
        }
        
        // Drag and drop functionality
        slot.addEventListener('dragover', function(e) {
            e.preventDefault();
            slot.classList.add('drag-over');
        });
        
        slot.addEventListener('dragleave', function(e) {
            e.preventDefault();
            slot.classList.remove('drag-over');
        });
        
        slot.addEventListener('drop', function(e) {
            e.preventDefault();
            slot.classList.remove('drag-over');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                handleImageFile(files[0], slot, index);
            }
        });
    });
}

function handleImageUpload(event, slot, index) {
    const file = event.target.files[0];
    if (file) {
        handleImageFile(file, slot, index);
    }
}

function handleImageFile(file, slot, index) {
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
        const preview = document.createElement('div');
        preview.className = 'image-preview';
        preview.innerHTML = `
            <img src="${e.target.result}" alt="Preview" class="preview-image">
            <button type="button" class="remove-image" onclick="removeImage(${index})">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        // Remove existing content
        const existingPreview = slot.querySelector('.image-preview');
        if (existingPreview) {
            existingPreview.remove();
        }
        
        slot.appendChild(preview);
        
        // Hide upload label
        const label = slot.querySelector('.upload-label');
        if (label) {
            label.style.display = 'none';
        }
        
        // Store image data
        window.uploadedImages = window.uploadedImages || [];
        window.uploadedImages[index] = {
            file: file,
            dataUrl: e.target.result,
            isMain: index === 0
        };
        
        showNotification('Imagen cargada exitosamente', 'success');
    };
    
    reader.readAsDataURL(file);
}

function removeImage(index) {
    const slot = document.querySelectorAll('.image-upload-slot')[index];
    const preview = slot.querySelector('.image-preview');
    const label = slot.querySelector('.upload-label');
    
    if (preview) {
        preview.remove();
    }
    
    if (label) {
        label.style.display = 'flex';
    }
    
    // Clear input
    const input = slot.querySelector('.image-input');
    if (input) {
        input.value = '';
    }
    
    // Remove from stored images
    if (window.uploadedImages && window.uploadedImages[index]) {
        delete window.uploadedImages[index];
    }
    
    showNotification('Imagen eliminada', 'info');
}

function validateForm() {
    const title = document.getElementById('title').value.trim();
    const description = document.getElementById('description').value.trim();
    const category = document.getElementById('category').value;
    const condition = document.getElementById('condition').value;
    const location = document.getElementById('location').value.trim();
    
    const errors = [];
    
    if (!title) {
        errors.push('El título es obligatorio');
    } else if (title.length < 5) {
        errors.push('El título debe tener al menos 5 caracteres');
    }
    
    if (!description) {
        errors.push('La descripción es obligatoria');
    } else if (description.length < 20) {
        errors.push('La descripción debe tener al menos 20 caracteres');
    }
    
    if (!category) {
        errors.push('Selecciona una categoría');
    }
    
    if (!condition) {
        errors.push('Selecciona el estado del objeto');
    }
    
    if (!location) {
        errors.push('La ubicación es obligatoria');
    }
    
    if (!window.uploadedImages || window.uploadedImages.length === 0 || !window.uploadedImages[0]) {
        errors.push('Sube al menos una imagen principal');
    }
    
    if (errors.length > 0) {
        showNotification(errors.join('<br>'), 'error');
        return false;
    }
    
    return true;
}

function showPreview() {
    const formData = getFormData();
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>Vista previa de tu objeto</h3>
                <button class="modal-close" onclick="closePreviewModal()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="modal-body">
                <div class="preview-card">
                    <div class="preview-image-container">
                        <img src="${formData.mainImage}" alt="${formData.title}" class="preview-main-image">
                        <div class="preview-status">Disponible</div>
                    </div>
                    <div class="preview-info">
                        <h4>${formData.title}</h4>
                        <p class="preview-category">${formData.category}</p>
                        <p class="preview-description">${formData.description}</p>
                        <div class="preview-details">
                            <span class="preview-condition">Estado: ${formData.condition}</span>
                            <span class="preview-location">
                                <i class="fas fa-map-marker-alt"></i> ${formData.location}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary" onclick="closePreviewModal()">Cerrar</button>
                <button class="btn btn-primary" onclick="publishFromPreview()">Publicar</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal functionality
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePreviewModal();
        }
    });
}

function closePreviewModal() {
    const modal = document.querySelector('.modal');
    if (modal) {
        modal.remove();
    }
}

function publishFromPreview() {
    closePreviewModal();
    publishObject();
}

function getFormData() {
    return {
        title: document.getElementById('title').value.trim(),
        description: document.getElementById('description').value.trim(),
        category: document.getElementById('category').value,
        condition: document.getElementById('condition').value,
        location: document.getElementById('location').value.trim(),
        mainImage: window.uploadedImages && window.uploadedImages[0] ? window.uploadedImages[0].dataUrl : 'https://via.placeholder.com/400x300',
        images: window.uploadedImages || [],
        preferences: getSelectedPreferences()
    };
}

function getSelectedPreferences() {
    const checkboxes = document.querySelectorAll('input[name="exchange_preferences"]:checked');
    return Array.from(checkboxes).map(cb => cb.value);
}

function publishObject() {
    const formData = getFormData();
    
    // Show loading state
    const publishBtn = document.getElementById('publishBtn');
    const originalText = publishBtn.textContent;
    publishBtn.textContent = 'Publicando...';
    publishBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        // Reset button
        publishBtn.textContent = originalText;
        publishBtn.disabled = false;
        
        // Clear draft
        localStorage.removeItem('truek_draft');
        
        // Show success message
        showNotification('¡Objeto publicado exitosamente!', 'success');
        
        // Redirect to my objects page
        setTimeout(() => {
            window.location.href = 'my-objects.html';
        }, 2000);
    }, 2000);
}

function saveDraft() {
    const formData = getFormData();
    
    // Only save if there's meaningful content
    if (formData.title || formData.description) {
        localStorage.setItem('truek_draft', JSON.stringify({
            ...formData,
            savedAt: new Date().toISOString()
        }));
        
        // Show brief notification
        showNotification('Borrador guardado', 'info');
    }
}

function loadDraft() {
    const draft = localStorage.getItem('truek_draft');
    if (draft) {
        try {
            const draftData = JSON.parse(draft);
            
            // Ask user if they want to restore draft
            if (confirm('¿Quieres restaurar el borrador guardado?')) {
                // Restore form data
                document.getElementById('title').value = draftData.title || '';
                document.getElementById('description').value = draftData.description || '';
                document.getElementById('category').value = draftData.category || '';
                document.getElementById('condition').value = draftData.condition || '';
                document.getElementById('location').value = draftData.location || '';
                
                // Restore images
                if (draftData.images) {
                    window.uploadedImages = draftData.images;
                    
                    // Display images
                    draftData.images.forEach((imageData, index) => {
                        if (imageData) {
                            const slot = document.querySelectorAll('.image-upload-slot')[index];
                            if (slot) {
                                const preview = document.createElement('div');
                                preview.className = 'image-preview';
                                preview.innerHTML = `
                                    <img src="${imageData.dataUrl}" alt="Preview" class="preview-image">
                                    <button type="button" class="remove-image" onclick="removeImage(${index})">
                                        <i class="fas fa-times"></i>
                                    </button>
                                `;
                                
                                slot.appendChild(preview);
                                
                                const label = slot.querySelector('.upload-label');
                                if (label) {
                                    label.style.display = 'none';
                                }
                            }
                        }
                    });
                }
                
                // Restore preferences
                if (draftData.preferences) {
                    draftData.preferences.forEach(preference => {
                        const checkbox = document.querySelector(`input[name="exchange_preferences"][value="${preference}"]`);
                        if (checkbox) {
                            checkbox.checked = true;
                        }
                    });
                }
                
                // Update character counters
                updateCharacterCounters();
                
                showNotification('Borrador restaurado', 'success');
            }
        } catch (error) {
            console.error('Error loading draft:', error);
            localStorage.removeItem('truek_draft');
        }
    }
}

function updateCharacterCounters() {
    const titleInput = document.getElementById('title');
    const descriptionInput = document.getElementById('description');
    const titleCounter = document.getElementById('titleCounter');
    const descriptionCounter = document.getElementById('descriptionCounter');
    
    if (titleInput && titleCounter) {
        titleCounter.textContent = `${titleInput.value.length}/100`;
    }
    
    if (descriptionInput && descriptionCounter) {
        descriptionCounter.textContent = `${descriptionInput.value.length}/1000`;
    }
}

// Utility function for notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = message;
    
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
        max-width: 300px;
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
window.closePreviewModal = closePreviewModal;
window.publishFromPreview = publishFromPreview;
window.removeImage = removeImage;
