// Declare a variable
let welcomeMessage = "Welcome to my Portfolio!";

// Function to update text color
function changeTextColor() {
    document.getElementById("intro").style.color = "blue";
}

// Show an alert when the page loads
window.onload = function() {
    alert(welcomeMessage);
};
