/**
 * Registration Form Validation System
 * This script provides comprehensive validation for user registration forms
 * with detailed error feedback and exception handling.
 */

document.addEventListener("DOMContentLoaded", function () {
    // Get the form element
    const registrationForm = document.querySelector("form");
    
    // Check if form exists on the page
    if (!registrationForm) {
        console.error("Registration form not found on the page!");
        return;
    }
    
    // Create an error container to display validation errors
    const errorContainer = document.createElement("div");
    errorContainer.id = "error-container";
    errorContainer.style.color = "#e74c3c";
    errorContainer.style.marginBottom = "15px";
    errorContainer.style.padding = "10px";
    errorContainer.style.border = "1px solid #e74c3c";
    errorContainer.style.borderRadius = "5px";
    errorContainer.style.display = "none";
    registrationForm.prepend(errorContainer);
    
    // Function to display error messages
    function displayErrors(errors) {
        errorContainer.innerHTML = "";
        
        if (errors.length > 0) {
            const errorList = document.createElement("ul");
            errorList.style.margin = "5px 0";
            errorList.style.paddingLeft = "20px";
            
            errors.forEach(error => {
                const errorItem = document.createElement("li");
                errorItem.textContent = error;
                errorList.appendChild(errorItem);
            });
            
            errorContainer.appendChild(errorList);
            errorContainer.style.display = "block";
        } else {
            errorContainer.style.display = "none";
        }
    }
    
    // Function to validate full name (no numbers or special characters)
    function validateFullName(name) {
        const nameRegex = /^[A-Za-z\s]+$/;
        return name.trim() !== "" && nameRegex.test(name);
    }
    
    // Function to validate username (6-15 chars, alphanumeric, can't start with number)
    function validateUsername(username) {
        const usernameRegex = /^[A-Za-z][A-Za-z0-9]{5,14}$/;
        return usernameRegex.test(username);
    }
    
    // Function to validate email format
    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
    
    // Function to validate password strength
    function validatePassword(password) {
        // At least 8-20 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,20}$/;
        return passwordRegex.test(password);
    }
    
    // Function to validate matching passwords
    function validatePasswordsMatch(password, confirmPassword) {
        return password === confirmPassword;
    }
    
    // Function to validate phone number format
    function validatePhoneNumber(phone) {
        // Accepts formats like 123-456-7890, (123) 456-7890, or 1234567890
        const phoneRegex = /^(\(\d{3}\)|\d{3})[-\s]?\d{3}[-\s]?\d{4}$/;
        return phoneRegex.test(phone);
    }
    
    // Function to validate date of birth (at least 18 years old)
    function validateDateOfBirth(dob) {
        try {
            const birthDate = new Date(dob);
            const today = new Date();
            
            // Check if birthDate is valid
            if (isNaN(birthDate.getTime())) {
                console.warn("Invalid date format provided");
                return false;
            }
            
            // Calculate age
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDifference = today.getMonth() - birthDate.getMonth();
            
            // Adjust age if birth month hasn't occurred yet this year
            if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            return age >= 18;
        } catch (error) {
            console.error("Error validating date of birth:", error);
            return false;
        }
    }
    
    // Function to validate form submission
    registrationForm.addEventListener("submit", function(event) {
        event.preventDefault();
        
        const errors = [];
        
        try {
            // Get form field values
            const fullNameField = registrationForm.querySelector('input[name="fullName"]');
            const usernameField = registrationForm.querySelector('input[name="username"]');
            const emailField = registrationForm.querySelector('input[name="email"]');
            const passwordField = registrationForm.querySelector('input[name="password"]');
            const confirmPasswordField = registrationForm.querySelector('input[name="confirmPassword"]');
            const phoneField = registrationForm.querySelector('input[name="phone"]');
            const dobField = registrationForm.querySelector('input[name="dob"]');
            const termsCheckbox = registrationForm.querySelector('input[name="terms"]');
            
            // Check if fields exist before validating
            if (!fullNameField || !usernameField || !emailField || !passwordField || 
                !confirmPasswordField || !phoneField || !dobField || !termsCheckbox) {
                console.error("One or more form fields are missing");
                throw new Error("Form is incomplete. Please contact support.");
            }
            
            // Validate Full Name
            if (!validateFullName(fullNameField.value)) {
                errors.push("Full Name should only contain letters and spaces.");
                fullNameField.style.borderColor = "#e74c3c";
            } else {
                fullNameField.style.borderColor = "";
            }
            
            // Validate Username
            if (!validateUsername(usernameField.value)) {
                errors.push("Username must be 6-15 characters, contain only letters and numbers, and not start with a number.");
                usernameField.style.borderColor = "#e74c3c";
            } else {
                usernameField.style.borderColor = "";
            }
            
            // Validate Email
            if (!validateEmail(emailField.value)) {
                errors.push("Please enter a valid email address (e.g., user@example.com).");
                emailField.style.borderColor = "#e74c3c";
            } else {
                emailField.style.borderColor = "";
            }
            
            // Validate Password
            if (!validatePassword(passwordField.value)) {
                errors.push("Password must be 8-20 characters and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).");
                passwordField.style.borderColor = "#e74c3c";
            } else {
                passwordField.style.borderColor = "";
            }
            
            // Validate Password Confirmation
            if (!validatePasswordsMatch(passwordField.value, confirmPasswordField.value)) {
                errors.push("Passwords do not match.");
                confirmPasswordField.style.borderColor = "#e74c3c";
            } else {
                confirmPasswordField.style.borderColor = "";
            }
            
            // Validate Phone Number
            if (!validatePhoneNumber(phoneField.value)) {
                errors.push("Please enter a valid phone number (e.g., 123-456-7890).");
                phoneField.style.borderColor = "#e74c3c";
            } else {
                phoneField.style.borderColor = "";
            }
            
            // Validate Date of Birth
            if (!validateDateOfBirth(dobField.value)) {
                errors.push("You must be at least 18 years old to register.");
                dobField.style.borderColor = "#e74c3c";
            } else {
                dobField.style.borderColor = "";
            }
            
            // Validate Terms Agreement
            if (!termsCheckbox.checked) {
                errors.push("You must agree to the terms and conditions.");
                termsCheckbox.parentElement.style.color = "#e74c3c";
            } else {
                termsCheckbox.parentElement.style.color = "";
            }
            
            // Display errors or submit form
            if (errors.length > 0) {
                displayErrors(errors);
                console.warn("Form validation failed with the following errors:", errors);
            } else {
                errorContainer.style.display = "none";
                console.log("Form validated successfully!");
                
                // You can uncomment the next line to allow actual form submission
                // registrationForm.submit();
                
                // For demonstration purposes, show success message instead
                alert("Registration successful!");
            }
        } catch (error) {
            console.error("An unexpected error occurred during form validation:", error);
            errors.push("An unexpected error occurred. Please try again later.");
            displayErrors(errors);
        }
    });
    
    // Add real-time validation feedback on input fields
    registrationForm.querySelectorAll("input").forEach(input => {
        input.addEventListener("blur", function() {
            try {
                // Clear previous styling
                this.style.borderColor = "";
                
                // Validate the field based on its name
                switch(this.name) {
                    case "fullName":
                        if (!validateFullName(this.value) && this.value.trim() !== "") {
                            this.style.borderColor = "#e74c3c";
                            console.warn("Invalid full name format");
                        }
                        break;
                    case "username":
                        if (!validateUsername(this.value) && this.value.trim() !== "") {
                            this.style.borderColor = "#e74c3c";
                            console.warn("Invalid username format");
                        }
                        break;
                    case "email":
                        if (!validateEmail(this.value) && this.value.trim() !== "") {
                            this.style.borderColor = "#e74c3c";
                            console.warn("Invalid email format");
                        }
                        break;
                    case "password":
                        if (!validatePassword(this.value) && this.value.trim() !== "") {
                            this.style.borderColor = "#e74c3c";
                            console.warn("Password does not meet requirements");
                        }
                        break;
                    case "confirmPassword":
                        const passwordField = registrationForm.querySelector('input[name="password"]');
                        if (passwordField && !validatePasswordsMatch(passwordField.value, this.value) && this.value.trim() !== "") {
                            this.style.borderColor = "#e74c3c";
                            console.warn("Passwords do not match");
                        }
                        break;
                    case "phone":
                        if (!validatePhoneNumber(this.value) && this.value.trim() !== "") {
                            this.style.borderColor = "#e74c3c";
                            console.warn("Invalid phone number format");
                        }
                        break;
                    case "dob":
                        if (!validateDateOfBirth(this.value) && this.value.trim() !== "") {
                            this.style.borderColor = "#e74c3c";
                            console.warn("User is under 18 years old");
                        }
                        break;
                }
            } catch (error) {
                console.error("Error during input validation:", error);
            }
        });
    });
});