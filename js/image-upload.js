// Image Upload Functionality
document.addEventListener('DOMContentLoaded', function() {
    const imageInputs = document.querySelectorAll('.image-input');
    const imageSlots = document.querySelectorAll('.image-upload-slot');
    const imageCounter = document.getElementById('imageCount');
    
    let uploadedImages = 0;
    
    // Initialize drag and drop for all slots
    imageSlots.forEach(slot => {
        setupDragAndDrop(slot);
    });
    
    // Setup file input listeners
    imageInputs.forEach(input => {
        input.addEventListener('change', handleFileSelect);
    });
    
    function setupDragAndDrop(slot) {
        const input = slot.querySelector('.image-input');
        
        slot.addEventListener('dragover', handleDragOver);
        slot.addEventListener('dragleave', handleDragLeave);
        slot.addEventListener('drop', (e) => handleDrop(e, input));
    }
    
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.add('drag-over');
    }
    
    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        this.classList.remove('drag-over');
    }
    
    function handleDrop(e, input) {
        e.preventDefault();
        e.stopPropagation();
        
        const slot = e.currentTarget;
        slot.classList.remove('drag-over');
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            const file = files[0];
            if (validateFile(file)) {
                input.files = files;
                handleFileSelect({ target: input });
            }
        }
    }
    
    function handleFileSelect(e) {
        const input = e.target;
        const file = input.files[0];
        const slot = input.closest('.image-upload-slot');
        
        if (file && validateFile(file)) {
            displayImagePreview(file, slot);
            updateImageCounter();
        }
    }
    
    function validateFile(file) {
        // Check file type
        if (!file.type.startsWith('image/')) {
            alert('Por favor selecciona solo archivos de imagen.');
            return false;
        }
        
        // Check file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
            alert('El archivo es demasiado grande. Máximo 5MB.');
            return false;
        }
        
        return true;
    }
    
    function displayImagePreview(file, slot) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            const label = slot.querySelector('.upload-label');
            const preview = slot.querySelector('.image-preview');
            const img = preview.querySelector('.preview-image');
            
            img.src = e.target.result;
            label.style.display = 'none';
            preview.style.display = 'block';
            slot.classList.add('has-image');
        };
        
        reader.readAsDataURL(file);
    }
    
    function updateImageCounter() {
        const filledSlots = document.querySelectorAll('.image-upload-slot.has-image').length;
        uploadedImages = filledSlots;
        
        if (imageCounter) {
            imageCounter.textContent = uploadedImages;
        }
    }
    
    // Remove image function (global scope for onclick)
    window.removeImage = function(slotNumber) {
        const input = document.getElementById(`imageInput${slotNumber}`);
        const slot = input.closest('.image-upload-slot');
        const label = slot.querySelector('.upload-label');
        const preview = slot.querySelector('.image-preview');
        const img = preview.querySelector('.preview-image');
        
        // Clear the input
        input.value = '';
        
        // Reset the display
        img.src = '';
        label.style.display = 'flex';
        preview.style.display = 'none';
        slot.classList.remove('has-image');
        
        // Update counter
        updateImageCounter();
    };
    
    // Initialize counter
    updateImageCounter();
});

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
    const publishForm = document.getElementById('publishForm');
    
    if (publishForm) {
        publishForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            
            // Get image files
            const imageInputs = document.querySelectorAll('.image-input');
            imageInputs.forEach(input => {
                if (input.files && input.files[0]) {
                    formData.append('images', input.files[0]);
                }
            });
            
            // Show loading state
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Publicando...';
            submitButton.disabled = true;
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                alert('¡Objeto publicado exitosamente!');
                
                // Reset form
                this.reset();
                
                // Reset image uploads
                document.querySelectorAll('.image-upload-slot.has-image').forEach(slot => {
                    const slotNumber = slot.querySelector('.image-input').dataset.slot;
                    removeImage(slotNumber);
                });
                
                // Reset button
                submitButton.textContent = originalText;
                submitButton.disabled = false;
                
                // Redirect to home or objects page
                window.location.href = '../pages/objects.html';
            }, 2000);
        });
    }
});
