document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("mainImage");
    const overlay = document.getElementById("overlay");
    const overlayImg = document.getElementById("overlayImage");
    const closeOverlay = document.getElementById("closeOverlay");

    // Make sure all necessary elements exist before proceeding
    if (!mainImage || !overlay || !overlayImg || !closeOverlay) {
        console.error("One or more elements are missing!");
        return; // Exit if any element is missing
    }

    // Requirement #1: Swap image on click and show overlay
    mainImage.addEventListener("click", function () {
        overlayImg.src = "pfp_compressed.jpg"; // Set different image
        overlay.style.display = "flex";  // Show overlay
    });

    // Close overlay when 'X' button is clicked
    closeOverlay.addEventListener("click", function () {
        console.log("Close button clicked");  // Debugging
        overlay.style.display = "none"; // Hide overlay
    });

    // Close overlay if clicked outside the image
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            console.log("Overlay clicked outside the image");  // Debugging
            overlay.style.display = "none"; // Hide overlay
        }
    });

    // Requirement #3: CreateElement & AppendChild Example
    const newParagraph = document.createElement("p"); // createElement example
    newParagraph.textContent = "This paragraph was dynamically added using JavaScript!";
    newParagraph.style.textAlign = "center";
    newParagraph.style.color = "#2c3e50";

    document.body.appendChild(newParagraph); // appendChild example

    // Form handling (Make sure form exists before adding an event listener)
    const userForm = document.getElementById("userForm");
    if (userForm) {
        userForm.addEventListener("submit", function (e) {
            e.preventDefault();
            alert("Form submitted successfully!");
        });
    }
});
