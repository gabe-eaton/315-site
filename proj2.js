// Function to change text color
function changeTextColor() {
    document.getElementById("intro").style.color = "blue";
}

// Function to handle form submission
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload

    // Get user input
    let name = document.getElementById("name").value.trim();
    let age = document.getElementById("age").value.trim();

    // Validate input
    if (name === "" || age === "" || isNaN(age) || age <= 0) {
        alert("Please enter a valid name and age.");
        console.error("Invalid input: Name or age is missing/incorrect.");
        return;
    }

    // Perform calculations
    let birthYear = new Date().getFullYear() - age;
    let ageInMonths = age * 12;

    // Display result dynamically
    let resultMessage = `Hi, ${name}! You were born in ${birthYear} and are about ${ageInMonths} months old
    `;
    document.getElementById("resultMessage").innerText = resultMessage;

    // Log data to console
    console.log(`User Input-Name: ${name}, Age: ${age}`);
    console.log(`Calculated Birth Year: ${birthYear}, Age in Months: ${ageInMonths}`);
});

// Show alert on page load
window.onload = function() {
    alert("Welcome to my Portfolio!");
};
