// REQUIREMENT #1: Overlay Functionality
document.addEventListener("DOMContentLoaded", function () {
    const mainImage = document.getElementById("mainImage");
    const overlay = document.getElementById("overlay");
    const overlayImg = document.getElementById("overlayImage");

    // Swap image on click
    mainImage.addEventListener("click", function () {
        overlayImg.src = "pfp_compressed.jpg"; // Different image
        overlay.style.display = "flex";
    });

    // Close overlay
    overlay.addEventListener("click", function (e) {
        if (e.target === overlay) {
            overlay.style.display = "none";
        }
    });

    // REQUIREMENT #3: Node Manipulation
    const projectsList = document.querySelector("ul");
    const newProject = document.createElement("li");
    newProject.innerHTML = "<strong>New Project:</strong> Added dynamically with JavaScript!";
    projectsList.appendChild(newProject);

    // Form handling
    document.getElementById("userForm").addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Form submitted successfully!");
    });
});