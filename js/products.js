// Products JavaScript

// Product selection for exchange
const selectionButtons = document.querySelectorAll('.selection-btn');
const selectedProducts = new Set();

selectionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const productId = e.target.dataset.productId;
        
        if (selectedProducts.has(productId)) {
            selectedProducts.delete(productId);
            btn.classList.remove('selected');
            btn.textContent = 'Seleccionar';
        } else {
            selectedProducts.add(productId);
            btn.classList.add('selected');
            btn.textContent = 'Seleccionado';
        }
        
        updateProposalButton();
    });
});

// Update proposal button state
function updateProposalButton() {
    const proposalBtn = document.querySelector('.proposal-submit-btn');
    if (proposalBtn) {
        proposalBtn.disabled = selectedProducts.size === 0;
    }
}

// Handle product image gallery
const thumbnails = document.querySelectorAll('.product-thumbnail');
const mainImage = document.querySelector('.main-product-image');

thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked thumbnail
        thumb.classList.add('active');
        
        // Update main image
        if (mainImage) {
            mainImage.src = thumb.src;
        }
    });
});

// Handle publish form
const publishForm = document.getElementById('publishForm');
if (publishForm) {
    publishForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(publishForm);
        
        try {
            showLoading();
            await simulateApiCall();
            
            // Show success page
            window.location.href = 'publish-success.html';
        } catch (error) {
            showNotification('Error al publicar objeto', 'error');
        } finally {
            hideLoading();
        }
    });
}

// Handle image upload
const imageUpload = document.querySelector('.image-upload');
const fileInput = document.getElementById('fileInput');

if (imageUpload && fileInput) {
    imageUpload.addEventListener('click', () => {
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            handleImageFiles(files);
        }
    });
    
    // Drag and drop
    imageUpload.addEventListener('dragover', (e) => {
        e.preventDefault();
        imageUpload.classList.add('drag-over');
    });
    
    imageUpload.addEventListener('dragleave', () => {
        imageUpload.classList.remove('drag-over');
    });
    
    imageUpload.addEventListener('drop', (e) => {
        e.preventDefault();
        imageUpload.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageFiles(files);
        }
    });
}

function handleImageFiles(files) {
    // Handle uploaded images
    console.log('Files uploaded:', files);
    
    // Update UI to show preview
    const preview = document.createElement('div');
    preview.className = 'image-preview';
    
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = document.createElement('img');
            img.src = e.target.result;
            preview.appendChild(img);
        };
        reader.readAsDataURL(file);
    });
}