// Project 11: Working with External APIs
// This script shows how to get data from two free APIs:
// - Dog API: https://dog.ceo/dog-api/ (for dog pictures)
// - JSONPlaceholder: https://jsonplaceholder.typicode.com/ (for user data)

// Get all the elements we need
const dogButton = document.getElementById('fetch-dog');
const dogContainer = document.getElementById('dog-container');
const dogErrorContainer = document.getElementById('dog-error');

const userIdInput = document.getElementById('user-id');
const userButton = document.getElementById('fetch-user');
const userContainer = document.getElementById('user-container');
const userErrorContainer = document.getElementById('user-error');

// Set up our page when it loads
document.addEventListener('DOMContentLoaded', () => {
    // Get a dog image right away
    fetchDogImage();
    
    // Make the buttons work
    dogButton.addEventListener('click', fetchDogImage);
    userButton.addEventListener('click', fetchUserData);
});

// Using the modern Fetch API to get dog images
async function fetchDogImage() {
    // Clear any old error messages
    dogErrorContainer.textContent = '';
    
    // Let the user know we're loading
    dogContainer.innerHTML = '<p>Loading dog image...</p>';
    
    try {
        // Get data from the Dog API
        const response = await fetch('https://dog.ceo/api/breeds/image/random');
        
        // Check if something went wrong
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        // Convert the response to JSON
        const data = await response.json();
        
        // If we got a good response, show the image
        if (data.status === 'success') {
            dogContainer.innerHTML = `
                <img src="${data.message}" alt="Random dog" />
                <p class="caption">Random dog image fetched using Fetch API</p>
            `;
        } else {
            throw new Error('API returned an error');
        }
    } catch (error) {
        // Something went wrong, show an error
        console.error('Error fetching dog image:', error);
        dogErrorContainer.textContent = `Failed to fetch dog image: ${error.message}`;
        dogContainer.innerHTML = '<p>Could not load dog image. Please try again.</p>';
    }
}

// Using the older XMLHttpRequest to get user data
function fetchUserData() {
    // Get the user ID from the input
    const userId = userIdInput.value;
    
    // Make sure it's a valid ID
    if (!userId || userId < 1 || userId > 10) {
        userErrorContainer.textContent = 'Please enter a valid user ID between 1 and 10';
        return;
    }
    
    // Clear any old error messages
    userErrorContainer.textContent = '';
    
    // Let the user know we're loading
    userContainer.innerHTML = '<p>Loading user data...</p>';
    
    // Create and set up the request
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `https://jsonplaceholder.typicode.com/users/${userId}`, true);
    
    // What to do when the data finishes loading
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            // Request worked! Let's show the data
            try {
                const userData = JSON.parse(xhr.responseText);
                
                userContainer.innerHTML = `
                    <div class="user-card">
                        <h3>${userData.name}</h3>
                        <p><strong>Username:</strong> ${userData.username}</p>
                        <p><strong>Email:</strong> ${userData.email}</p>
                        <p><strong>Phone:</strong> ${userData.phone}</p>
                        <p><strong>Website:</strong> ${userData.website}</p>
                        <p><strong>Company:</strong> ${userData.company.name}</p>
                        <p><strong>Address:</strong> 
                           ${userData.address.street}, ${userData.address.suite}, 
                           ${userData.address.city}, ${userData.address.zipcode}
                        </p>
                    </div>
                    <p class="caption">User data fetched using XMLHttpRequest</p>
                `;
            } catch (error) {
                // Something went wrong with parsing the data
                console.error('Error parsing JSON:', error);
                userErrorContainer.textContent = 'Error processing the response data';
                userContainer.innerHTML = '<p>Could not process user data. Please try again.</p>';
            }
        } else {
            // Request failed
            console.error('Request failed:', xhr.status, xhr.statusText);
            userErrorContainer.textContent = `Failed to fetch user data: ${xhr.status} ${xhr.statusText}`;
            userContainer.innerHTML = '<p>Could not load user data. Please try again.</p>';
        }
    };
    
    // What to do if there's a network error
    xhr.onerror = function() {
        console.error('Network error occurred');
        userErrorContainer.textContent = 'Network error while fetching user data';
        userContainer.innerHTML = '<p>Network error. Please check your connection and try again.</p>';
    };
    
    // Track loading progress (useful for big files)
    xhr.onprogress = function(event) {
        if (event.lengthComputable) {
            const percentComplete = (event.loaded / event.total) * 100;
            console.log(`Loading: ${percentComplete.toFixed(2)}%`);
        }
    };
    
    // Send the request
    xhr.send();
}

// Differences between Fetch and XMLHttpRequest:
// 
// 1. Fetch is newer and cleaner to write, especially with async/await
// 2. XMLHttpRequest is older but works in all browsers (even Internet Explorer)
// 3. Fetch handles JSON more easily with the .json() method
// 4. XMLHttpRequest gives us more control over progress tracking
// 5. Both can do the same job, but Fetch is generally preferred for new projects