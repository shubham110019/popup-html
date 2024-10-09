// Get the user ID and website ID from the script element's dataset
const userId = parseInt(document.currentScript.dataset.user); // Accessing the userId from the dataset
const websiteId = parseInt(document.currentScript.dataset.website); // Accessing the websiteId from the dataset


function showPopup(userId, websiteId) {
    fetch(`http://localhost:9000/api/modal-data/${userId}`) // Fetch the data based on userId
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            // Check if the data is an array or a single object
            if (Array.isArray(data)) {
                // If it's an array, loop through each popup
                data.forEach(popup => {
                    createPopupDiv(popup);
                });
            } else {
                // If it's a single object, handle it as a single popup
                createPopupDiv(data);
            }
        })
        .catch(error => console.error('Error fetching popup data:', error));
}

// Function to create a div for each popup and append it to the body
function createPopupDiv(popup) {
    // Create the popup div
    const popDiv = document.createElement('div'); 
    popDiv.id = `popid-${popup.popid}`; // Assign a unique ID
    popDiv.innerHTML = popup.html; // Insert HTML content

    // Dynamically add CSS if provided
    if (popup.css) {
        const style = document.createElement('style');
        style.innerHTML = popup.css; // Inject CSS content
        popDiv.appendChild(style); // Append CSS style to the popup div
    }

    if (popup.js) {
        const script = document.createElement('script');
        script.innerHTML = popup.js; // Inject JS content
        popDiv.appendChild(script); // Append JS style to the popup div
    }

    // Append the popup div to the body
    document.body.appendChild(popDiv);
}

showPopup(userId, websiteId);

