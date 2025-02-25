document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("mainImage");
    const overlay = document.getElementById("overlay");
    const overlayImg = document.getElementById("overlayImage");
    const closeOverlay = document.getElementById("closeOverlay");

    // Make sure the overlay, close button, and other elements are properly identified
    if (!mainImage || !overlay || !overlayImg || !closeOverlay) {
        console.error("One or more elements are missing!");
        return; // Exit if any element is missing
    }

    // Swap image on click
    mainImage.addEventListener("click", function () {
        overlayImg.src = "pfp_compressed.jpg"; // Different image
        overlay.style.display = "flex";  // Show overlay
    });

    // Close overlay when 'X' button is clicked
    closeOverlay.addEventListener("click", function () {
        console.log("Close button clicked");  // For debugging
        overlay.style.display = "none"; // Hide the overlay
    });

    // Close overlay if clicked outside the image
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            console.log("Overlay clicked outside the image");  // For debugging
            overlay.style.display = "none"; // Hide the overlay
        }
    });

    // Form handling
    document.getElementById("userForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Form submitted successfully!");
    });
});
