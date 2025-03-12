/**
 * Project 7 - Form Selections, Validation, and File Upload
 * This file handles:
 * 1. Adding selections to an array and displaying them
 * 2. Regular expression validation
 * 3. File uploading and display
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // ========== PART 1: SELECTIONS MANAGEMENT ==========
    
    // Initialize an array to store user selections
    let userSelections = [];
    
    // Get DOM elements
    const addCheckedBtn = document.getElementById('addCheckedBtn');
    const addCustomBtn = document.getElementById('addCustomBtn');
    const customItemInput = document.getElementById('customItem');
    const selectionsContainer = document.getElementById('selectionsContainer');
    const clearAllBtn = document.getElementById('clearAllBtn');
    
    /**
     * Add checked items to the selections array
     */
    addCheckedBtn.addEventListener('click', function() {
        const checkboxes = document.querySelectorAll('input[name="option"]:checked');
        
        // Add each checked item to the array if it's not already there
        checkboxes.forEach(checkbox => {
            if (!userSelections.includes(checkbox.value)) {
                userSelections.push(checkbox.value);
                checkbox.checked = false; // Uncheck after adding
            }
        });
        
        // Update the display
        displaySelections();
    });
    
    /**
     * Add custom item to the selections array
     */
    addCustomBtn.addEventListener('click', function() {
        const customItem = customItemInput.value.trim();
        
        // Only add if there's text and it's not already in the array
        if (customItem && !userSelections.includes(customItem)) {
            userSelections.push(customItem);
            customItemInput.value = ''; // Clear the input
            
            // Update the display
            displaySelections();
        }
    });
    
    /**
     * Clear all selections
     */
    clearAllBtn.addEventListener('click', function() {
        userSelections = []; // Empty the array
        displaySelections(); // Update the display
    });
    
    /**
     * Display all current selections in the container
     */
    function displaySelections() {
        // Clear the container first
        selectionsContainer.innerHTML = '';
        
        // If empty, show a message
        if (userSelections.length === 0) {
            selectionsContainer.innerHTML = '<em>No items selected yet.</em>';
            return;
        }
        
        // Add each selection as a visual item with remove button
        userSelections.forEach((item, index) => {
            const selectionElement = document.createElement('div');
            selectionElement.className = 'selection-item';
            selectionElement.innerHTML = `
                ${item} 
                <span class="remove-btn" data-index="${index}">✕</span>
            `;
            selectionsContainer.appendChild(selectionElement);
        });
        
        // Add event listeners to all remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.getAttribute('data-index'));
                removeSelection(index);
            });
        });
    }
    
    /**
     * Remove an item from the selections array at the given index
     */
    function removeSelection(index) {
        if (index >= 0 && index < userSelections.length) {
            userSelections.splice(index, 1); // Remove the item
            displaySelections(); // Update the display
        }
    }
    
    // Initialize the display
    displaySelections();
    
    // ========== PART 2: REGEX VALIDATION ==========
    
    // Get validation elements
    const phoneInput = document.getElementById('phoneNumber');
    const emailInput = document.getElementById('email');
    const phoneError = document.getElementById('phoneError');
    const emailError = document.getElementById('emailError');
    const validateBtn = document.getElementById('validateBtn');
    const validationResult = document.getElementById('validationResult');
    
    /**
     * Validate phone number using RegEx
     * Accepts: 10 digits with optional separators like spaces, dashes, or parentheses
     */
    function validatePhone(phone) {
        // Remove all non-digit characters first
        const digitsOnly = phone.replace(/\D/g, '');
        
        // Check if we have exactly 10 digits
        return digitsOnly.length === 10;
    }
    
    /**
     * Validate email address using RegEx
     */
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    
    /**
     * Show validation error for an input
     */
    function showError(input, errorElement) {
        input.style.borderColor = 'red';
        errorElement.style.display = 'block';
    }
    
    /**
     * Hide validation error for an input
     */
    function hideError(input, errorElement) {
        input.style.borderColor = '';
        errorElement.style.display = 'none';
    }
    
    // Add input event listeners to provide real-time feedback
    phoneInput.addEventListener('input', function() {
        if (validatePhone(this.value)) {
            hideError(phoneInput, phoneError);
        }
    });
    
    emailInput.addEventListener('input', function() {
        if (validateEmail(this.value)) {
            hideError(emailInput, emailError);
        }
    });
    
    // Validate button click handler
    validateBtn.addEventListener('click', function() {
        let isValid = true;
        validationResult.innerHTML = '';
        
        // Validate phone
        if (!validatePhone(phoneInput.value)) {
            showError(phoneInput, phoneError);
            isValid = false;
        } else {
            hideError(phoneInput, phoneError);
        }
        
        // Validate email
        if (!validateEmail(emailInput.value)) {
            showError(emailInput, emailError);
            isValid = false;
        } else {
            hideError(emailInput, emailError);
        }
        
        // Show result
        if (isValid) {
            validationResult.innerHTML = '<div style="color: green;">All information is valid!</div>';
            
            // Extract just the digits from phone for consistent display
            const phoneDigits = phoneInput.value.replace(/\D/g, '');
            const formattedPhone = `(${phoneDigits.slice(0,3)}) ${phoneDigits.slice(3,6)}-${phoneDigits.slice(6)}`;
            
            // Add validated info to the result display
            validationResult.innerHTML += `
                <div style="margin-top: 10px;">
                    <strong>Phone:</strong> ${formattedPhone}<br>
                    <strong>Email:</strong> ${emailInput.value}
                </div>
            `;
        } else {
            validationResult.innerHTML = '<div style="color: red;">Please fix the errors above.</div>';
        }
    });
    
    // ========== PART 3: FILE UPLOAD ==========
    
    // Get file upload elements
    const fileUpload = document.getElementById('fileUpload');
    const filePreview = document.getElementById('filePreview');
    const fileContents = document.getElementById('fileContents');
    
    /**
     * Handle file upload and display contents
     */
    fileUpload.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file) {
            // Only proceed if a file was selected
            const reader = new FileReader();
            
            reader.onload = function(e) {
                // Get the file contents
                const contents = e.target.result;
                
                // Display the contents
                fileContents.textContent = contents;
                filePreview.style.display = 'block';
            };
            
            reader.onerror = function() {
                fileContents.textContent = "Error reading file!";
                filePreview.style.display = 'block';
            };
            
            // Read the file as text
            reader.readAsText(file);
        } else {
            // Hide preview if no file is selected
            filePreview.style.display = 'none';
        }
    });
});