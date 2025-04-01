/**
 * Page Customizer
 * This script handles page customization preferences through URL query parameters and cookies.
 * It allows users to customize background color, text color, and font size.
 */

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get form elements
    const form = document.getElementById('customizationForm');
    const bgColorSelect = document.getElementById('bgColor');
    const textColorSelect = document.getElementById('textColor');
    const fontSizeSelect = document.getElementById('fontSize');
    const statusDiv = document.getElementById('status');
    
    // Default settings
    const defaultSettings = {
        bgColor: 'white',
        textColor: 'black',
        fontSize: '16px'
    };
    
    // Load settings from URL query parameters first
    const urlParams = new URLSearchParams(window.location.search);
    let settings = {
        bgColor: urlParams.get('bgColor') || getCookie('bgColor') || defaultSettings.bgColor,
        textColor: urlParams.get('textColor') || getCookie('textColor') || defaultSettings.textColor,
        fontSize: urlParams.get('fontSize') || getCookie('fontSize') || defaultSettings.fontSize
    };
    
    // Apply initial settings
    applySettings(settings);
    updateForm(settings);
    updateStatusMessage(settings);
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get new settings from form
        const newSettings = {
            bgColor: bgColorSelect.value,
            textColor: textColorSelect.value,
            fontSize: fontSizeSelect.value
        };
        
        // Apply new settings
        applySettings(newSettings);
        
        // Save settings in cookies (expire in 30 days)
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);
        
        setCookie('bgColor', newSettings.bgColor, expiryDate);
        setCookie('textColor', newSettings.textColor, expiryDate);
        setCookie('fontSize', newSettings.fontSize, expiryDate);
        
        // Update URL query parameters
        const url = new URL(window.location);
        url.searchParams.set('bgColor', newSettings.bgColor);
        url.searchParams.set('textColor', newSettings.textColor);
        url.searchParams.set('fontSize', newSettings.fontSize);
        window.history.pushState({}, '', url);
        
        // Update status message
        updateStatusMessage(newSettings);
    });
    
    /**
     * Applies the given settings to the page
     * @param {Object} settings - The settings to apply
     */
    function applySettings(settings) {
        document.body.style.backgroundColor = settings.bgColor;
        document.body.style.color = settings.textColor;
        document.body.style.fontSize = settings.fontSize;
    }
    
    /**
     * Updates the form to reflect the current settings
     * @param {Object} settings - The current settings
     */
    function updateForm(settings) {
        bgColorSelect.value = settings.bgColor;
        textColorSelect.value = settings.textColor;
        fontSizeSelect.value = settings.fontSize;
    }
    
    /**
     * Updates the status message to show the current settings and their source
     * @param {Object} settings - The current settings
     */
    function updateStatusMessage(settings) {
        let sourceText = '';
        
        if (urlParams.has('bgColor') || urlParams.has('textColor') || urlParams.has('fontSize')) {
            sourceText = 'Settings loaded from URL parameters';
        } else if (getCookie('bgColor') || getCookie('textColor') || getCookie('fontSize')) {
            sourceText = 'Settings loaded from cookies';
        } else {
            sourceText = 'Using default settings';
        }
        
        statusDiv.innerHTML = `
            <h3>Current Settings:</h3>
            <p>Background Color: ${settings.bgColor}</p>
            <p>Text Color: ${settings.textColor}</p>
            <p>Font Size: ${settings.fontSize}</p>
            <p><em>${sourceText}</em></p>
            <p>Your settings will be saved in cookies for 30 days.</p>
        `;
    }
    
    /**
     * Gets a cookie value by name
     * @param {string} name - The name of the cookie
     * @returns {string|null} - The cookie value or null if not found
     */
    function getCookie(name) {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith(name + '=')) {
                return cookie.substring(name.length + 1);
            }
        }
        return null;
    }
    
    /**
     * Sets a cookie with the given name, value, and expiry date
     * @param {string} name - The name of the cookie
     * @param {string} value - The value of the cookie
     * @param {Date} expiryDate - The expiry date of the cookie
     */
    function setCookie(name, value, expiryDate) {
        document.cookie = `${name}=${value}; expires=${expiryDate.toUTCString()}; path=/`;
    }
});