
// Array to store predefined user messages based on age groups
const ageGroups = [
    { min: 0, max: 12, message: "You're a child! Enjoy your time!" },
    { min: 13, max: 19, message: "You're a teenager! Keep learning and exploring!" },
    { min: 20, max: 64, message: "You're an adult! Keep pushing forward!" },
    { min: 65, max: 120, message: "You're a senior! Share your wisdom!" }
];

// Function to determine and display a message based on age
function displayAgeMessage(age) {
    let message = "";
    
    // Using if, else if, else statements to determine the category
    if (age < 0 || age > 120) {
        message = "Please enter a valid age.";
    } else {
        for (let i = 0; i < ageGroups.length; i++) {
            if (age >= ageGroups[i].min && age <= ageGroups[i].max) {
                message = ageGroups[i].message;
                break;
            }
        }
    }
    
    return message;
}

// Function to display a fun fact based on user input
function displayFunFact(category) {
    let fact;
    
    // Using switch statement to handle multiple cases
    switch (category.toLowerCase()) {
        case "coding":
            fact = "Did you know? The first computer programmer was Ada Lovelace in the 1800s!";
            break;
        case "music":
            fact = "Fun Fact: The world's largest grand piano was built by a 15-year-old in New Zealand!";
            break;
        case "fitness":
            fact = "Health Tip: Exercising for just 30 minutes a day can boost your mood and productivity!";
            break;
        default:
            fact = "Interesting choice! Keep exploring and learning new things!";
    }
    
    return fact;
}

// Event listener for form submission
document.getElementById("userForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent page reload
    
    let name = document.getElementById("name").value.trim();
    let age = parseInt(document.getElementById("age").value.trim());
    
    if (name === "" || isNaN(age)) {
        alert("Please enter a valid name and age.");
        return;
    }
    
    let ageMessage = displayAgeMessage(age);
    let funFact = displayFunFact("coding"); // Example category, can be dynamic
    
    document.getElementById("resultMessage").innerText = `Hi, ${name}! ${ageMessage} \n ${funFact}`;
});
