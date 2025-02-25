document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("mainImage");
    const overlay = document.getElementById("overlay");
    const overlayImg = document.getElementById("overlayImage");
    const closeOverlay = document.getElementById("closeOverlay");

    // Swap image on click
    mainImage.addEventListener("click", function () {
        overlayImg.src = "pfp_compressed.jpg"; // Different image
        overlay.style.display = "flex";
    });

    // Close overlay when 'X' button is clicked
    closeOverlay.addEventListener("click", function () {
        overlay.style.display = "none";
    });

    // Close overlay if clicked outside the image
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });

    // Form handling
    document.getElementById("userForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Form submitted successfully!");
    });
});
