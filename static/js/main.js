// Utility function to safely add an event listener
const addEventListenerIfExists = (element, event, handler) => {
    if (element) {
        console.log(`Adding event listener for ${event} on`, element);
        element.addEventListener(event, handler);
    } else {
        console.log(`Element not found for event ${event}`);
    }
};

// Select elements using their IDs or classes
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');
const header = document.querySelector('.header');
const reserveBtn = document.getElementById('reserveBtn');
const modal = document.getElementById('reserveModal');
const closeModal = document.querySelector('.close');

// New elements for sign-in modal, sign-up modal, region selector, and help tooltip
const userIcon = document.getElementById('userIcon');
const signInModal = document.getElementById('signInModal');
const closeSignInModal = document.getElementById('closeSignInModal');
const signUpLink = document.getElementById('signUpLink');
const signUpModal = document.getElementById('signUpModal');
const closeSignUpModal = document.getElementById('closeSignUpModal');
const signInLink = document.getElementById('signInLink');

// Region selector and Help tooltip
const globeIcon = document.getElementById('globeIcon');
const regionDropdown = document.getElementById('regionDropdown');
const closeRegionDropdown = document.getElementById('closeRegionDropdown');
const helpIcon = document.getElementById('helpIcon');
const helpTooltip = document.getElementById('helpTooltip');

// ============================
// Demo Drive Modal Functionality
// ============================
const demoDriveModal = document.getElementById('demoDriveModal');
const closeDemoDriveModal = document.getElementById('closeDemoDriveModal');
const demoDriveButtons = document.querySelectorAll('.demo-drive-btn');
const demoDriveForm = document.getElementById('demoDriveForm');

// Check if user is signed in
let isUserSignedIn = false;


// Close the Demo Drive modal when the close button or outside the modal is clicked
//lets check this demo drive
// Open the Demo Drive modal when any button is clicked
demoDriveButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (isUserSignedIn) {
            console.log('Opening Demo Drive Modal');
            demoDriveModal.style.display = 'block';
        } else {
            alert("Please sign up or sign in first to schedule a demo drive.");
        }
    });
});

// Close the Demo Drive modal when the close button or outside the modal is clicked
addEventListenerIfExists(closeDemoDriveModal, 'click', () => {
    console.log('Closing Demo Drive Modal');
    demoDriveModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === demoDriveModal) {
        console.log('Clicked outside Demo Drive modal, closing it');
        demoDriveModal.style.display = 'none';
    }
});

// Form submission handling for the "Demo Drive" form
if (demoDriveForm) {
    demoDriveForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission behavior

        // Capture the form data
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            zipCode: document.getElementById('zipCode').value,
            energyProducts: document.getElementById('energyProducts').checked // For checkbox
        };

        // Send the form data to the Flask backend using fetch
        fetch('/demo-drive', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Tell Flask we're sending JSON data
            },
            body: JSON.stringify(formData) // Convert the form data to JSON
        })
        .then(response => response.json()) // Parse the response as JSON
        .then(data => {
            if (data.message) {
                alert("Thank you for scheduling a demo drive! We will contact you soon.");
                demoDriveForm.reset(); // Reset the form after submission
                demoDriveModal.style.display = 'none'; // Close the modal after successful submission
            } else if (data.error) {
                alert(`Error: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error:', error); // Log any errors
            alert('There was an issue scheduling your demo drive. Please try again.');
        });
    });
}


// ============================
// Order Now Modal Functionality
// ============================
const orderNowModal = document.getElementById('orderNowModal');
const closeOrderNowModal = document.getElementById('closeOrderNowModal');
const orderNowButtons = document.querySelectorAll('.order-now-btn');

// Open the "Order Now" modal when any "Order Now" button is clicked
orderNowButtons.forEach((button) => {
    button.addEventListener('click', () => {
        if (isUserSignedIn) {
            console.log('Opening Order Now Modal');
            orderNowModal.style.display = 'flex'; // Show the modal
        } else {
            alert("Please sign up or sign in first to place an order.");
        }
    });
});

// Close the "Order Now" modal when the close button or outside the modal is clicked
addEventListenerIfExists(closeOrderNowModal, 'click', () => {
    console.log('Closing Order Now Modal');
    orderNowModal.style.display = 'none'; // Hide the modal
});

window.addEventListener('click', (event) => {
    if (event.target === orderNowModal) {
        console.log('Clicked outside Order Now modal, closing it');
        orderNowModal.style.display = 'none';
    }
});

// Form submission handling for the "Order Now" form
const orderForm = document.getElementById('orderForm');
if (orderForm) {
    orderForm.addEventListener('submit', (event) => {
        event.preventDefault();  // Prevent default form submission

        // Capture form data
        const formData = {
            fullName: document.getElementById('fullName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            address: document.getElementById('address').value,
            city: document.getElementById('city').value,
            zip: document.getElementById('zip').value,
            country: document.getElementById('country').value,
            trim: document.getElementById('trim').value,
            color: document.getElementById('color').value,
            interiorColor: document.getElementById('interiorColor').value,
            paymentMethod: document.getElementById('paymentMethod').value,
            deliveryDate: document.getElementById('deliveryDate').value,
            comments: document.getElementById('comments').value
        };

        // Send data to the Flask backend using fetch
        fetch('/order', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'  // Send data as JSON
            },
            body: JSON.stringify(formData)  // Send form data
        })
        .then(response => response.json())  // Parse JSON response
        .then(data => {
            if (data.message) {
                // Display success message and reset the form
                alert(`Thank you, ${formData.fullName}! Your order has been submitted!`);
                orderForm.reset();  // Optionally, reset the form

                // Close the modal
                if (orderNowModal) {
                    orderNowModal.style.display = 'none';
                }
            } else if (data.error) {
                // Handle error case
                alert(`Error: ${data.error}`);
            }
        })
        .catch(error => {
            console.error('Error:', error);  // Log any errors
            alert('There was an issue submitting your order. Please try again.');
        });
    });
}


// ============================
// Car model buttons and corresponding background images
// ============================
const carModels = {
    '911': 'imgp/iris (6).webp',
    '911-S': 'imgp/iris (37).webp',
    '911-GTS': 'imgp/iris (43).webp',
    '911-GT3': 'imgp/iris (22).webp',
    '911-RS': 'imgp/iris (29).webp'
};

// Function to change the header background image
const changeBackgroundImage = (modelId) => {
    const imagePath = carModels[modelId];
    console.log(`Changing background to ${imagePath} for model ${modelId}`);
    if (imagePath) {
        header.style.backgroundImage = `url('${imagePath}')`;
    } else {
        console.log("No image path found for model:", modelId);
    }
};

// Add event listeners for car model buttons
Object.keys(carModels).forEach(modelId => {
    const button = document.getElementById(modelId);
    console.log(`Checking car model button for ${modelId}:`, button);
    addEventListenerIfExists(button, 'click', () => changeBackgroundImage(modelId));
});

// ============================
// Toggle menu visibility
// ============================
addEventListenerIfExists(navToggle, 'click', () => {
    console.log("Toggling nav menu");
    navMenu.classList.toggle('show-menu');
});

addEventListenerIfExists(navClose, 'click', () => {
    console.log("Closing nav menu");
    navMenu.classList.remove('show-menu');
});

// ============================
// Handle reservation modal visibility
// ============================
addEventListenerIfExists(reserveBtn, 'click', () => {
    console.log("Opening reservation modal");
    modal.style.display = "block";
});

addEventListenerIfExists(closeModal, 'click', () => {
    console.log("Closing reservation modal");
    modal.style.display = "none";
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        console.log("Clicked outside modal, closing it");
        modal.style.display = "none";
    }
});

// Form submission handling for reservation
const reserveForm = document.getElementById("reserveForm");
if (reserveForm) {
    reserveForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert("Thank you for reserving! We'll be in touch soon.");
        modal.style.display = "none";
    });
}
// let try this for photos/////////////////////////////////////////////////////////////
document.addEventListener("DOMContentLoaded", function () {
    // Function to initialize image carousel using radio buttons
    function setupRadioCarousel(galleryClass, radioName) {
        const images = document.querySelectorAll(`${galleryClass} label img`);
        const radios = document.querySelectorAll(`input[name="${radioName}"]`);

        radios.forEach((radio, index) => {
            radio.addEventListener("change", function() {
                images.forEach((img, i) => {
                    img.style.display = (i === index) ? "block" : "none";  // Show or hide the corresponding image
                });
            });
        });

        // Initially show the first image
        images.forEach((img, index) => {
            img.style.display = index === 0 ? "block" : "none";
        });
    }

    // Initialize the carousels for each car model
    setupRadioCarousel(".gallery-row-911s", "carousel-911s");
    setupRadioCarousel(".gallery-row-911gts", "carousel-911gts");
    setupRadioCarousel(".gallery-row-911gt3", "carousel-911gt3");
});



// ============================
// Sign-In and Sign-Up Modal Functionality
// ============================
addEventListenerIfExists(userIcon, 'click', () => {
    console.log("Opening sign-in modal");
    signInModal.style.display = 'flex';
});

addEventListenerIfExists(closeSignInModal, 'click', () => {
    console.log("Closing sign-in modal");
    signInModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === signInModal) {
        console.log("Clicked outside sign-in modal, closing it");
        signInModal.style.display = 'none';
    }
});

// Sign-In form submission handling
const signInForm = document.getElementById('signInForm');
if (signInForm) {
    signInForm.addEventListener('submit', (event) => {
        event.preventDefault();  // Prevent the form from submitting in the traditional way

        // Capture form data
        const formData = new FormData(signInForm);

        // Send data to Flask backend
        fetch('/signin', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                // Successful sign-in
                alert(data.message);  // Show welcome message
                isUserSignedIn = true;  // Mark the user as signed in
                signInModal.style.display = 'none';  // Close the sign-in modal
            } else if (data.error) {
                // Invalid credentials, suggest sign-up
                alert(data.error);  // Display error
                if (data.error === "Invalid username or password") {
                    // If the error is invalid credentials, suggest signing up
                    alert("You need to sign up first!");
                    signInModal.style.display = 'none';  // Close the sign-in modal
                    signUpModal.style.display = 'flex';  // Show the sign-up modal
                }
            }
        })
        .catch(error => console.error('Error:', error));
    });
}


// Sign-Up Modal Functionality
addEventListenerIfExists(signUpLink, 'click', (event) => {
    event.preventDefault();
    console.log("Switching from sign-in to sign-up modal");
    signInModal.style.display = 'none';
    signUpModal.style.display = 'flex';
});

addEventListenerIfExists(closeSignUpModal, 'click', () => {
    console.log("Closing sign-up modal");
    signUpModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === signUpModal) {
        console.log("Clicked outside sign-up modal, closing it");
        signUpModal.style.display = 'none';
    }
});

// Sign-Up form submission handling
const signUpForm = document.getElementById('signUpForm');
if (signUpForm) {
    signUpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        // Get the password and confirm password fields
        const password = document.getElementById('signup-password').value;
        const confirmPassword = document.getElementById('signup-password-confirm').value;

        // Check if the passwords match
        if (password !== confirmPassword) {
            alert("Passwords do not match. Please try again.");
            return;  // Stop form submission
        }

        // Capture form data if passwords match
        const formData = new FormData(signUpForm);

        // Send data to Flask backend
        fetch('/signup', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                alert(data.message);
                signUpModal.style.display = 'none';
            } else if (data.error) {
                alert(data.error);
            }
        })
        .catch(error => console.error('Error:', error));
    });
}
// Add event listener for the logout button
function logout() {
    fetch('/logout')
        .then(response => response.json())
        .then(data => {
            alert(data.message);  // Show the message from the server (logged out or already logged out)
            if (data.message.includes('logged out successfully')) {
                window.location.reload();  // Reload the page to reflect the logged-out state
            }
        });
}



// Back to Sign-In from Sign-Up
addEventListenerIfExists(signInLink, 'click', (event) => {
    event.preventDefault();
    console.log("Switching from sign-up to sign-in modal");
    signUpModal.style.display = 'none';
    signInModal.style.display = 'flex';
});

// ============================
// Region Dropdown Modal Functionality
// ============================
addEventListenerIfExists(globeIcon, 'click', (event) => {
    event.stopPropagation();
    console.log("Toggling region dropdown");
    regionDropdown.style.display = regionDropdown.style.display === 'none' || regionDropdown.style.display === '' ? 'block' : 'none';
});

// Corrected close functionality for region dropdown
addEventListenerIfExists(closeRegionDropdown, 'click', (event) => {
    event.stopPropagation();
    console.log("Closing region dropdown");
    regionDropdown.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (!regionDropdown.contains(event.target) && event.target !== globeIcon) {
        console.log("Clicked outside region dropdown, closing it");
        regionDropdown.style.display = 'none';
    }
});

// ============================
// Help Tooltip Functionality
// ============================
addEventListenerIfExists(helpIcon, 'click', (event) => {
    event.stopPropagation();
    console.log("Toggling help tooltip");
    helpTooltip.style.display = helpTooltip.style.display === 'none' || helpTooltip.style.display === '' ? 'block' : 'none';
});

window.addEventListener('click', (event) => {
    if (!helpTooltip.contains(event.target) && event.target !== helpIcon) {
        console.log("Clicked outside help tooltip, closing it");
        helpTooltip.style.display = 'none';
    }
});

// ============================
// Dynamic Content Loading Section
// ============================
const contentContainer = document.getElementById('content-container');
const vehiclesBtn = document.getElementById('vehiclesBtn');
const discoverBtn = document.getElementById('discoverBtn');

// Function to load new content into the content container
const loadContent = (content) => {
    contentContainer.innerHTML = content;
};

// Event handler for the "Vehicles" button
addEventListenerIfExists(vehiclesBtn, 'click', () => {
    console.log("Loading Vehicles content");
    const vehiclesContent = `
        <h1>Porsche Vehicles</h1>
        <p>Explore our range of Porsche vehicles, from the iconic 911 to the electric Taycan.</p>
        <img src="static/imgp/vehicles.jpg" alt="Porsche Vehicles">
    `;
    loadContent(vehiclesContent);
});

// Event handler for the "Discover" button
addEventListenerIfExists(discoverBtn, 'click', () => {
    console.log("Loading Discover content");
    const discoverContent = `
        <h1>Discover Porsche</h1>
        <p>Learn about the history, innovation, and performance of Porsche vehicles.</p>
        <img src="static/imgp/discover.jpg" alt="Discover Porsche">
    `;
    loadContent(discoverContent);
});
const dropbtn = document.querySelector('.dropbtn');
const dropdownContent = document.querySelector('.dropdown-content');

// Check if elements are selected correctly
console.log(dropbtn);  // Should log the dropbtn element
console.log(dropdownContent);  // Should log the dropdown content element

// Toggle the dropdown on click
dropbtn.addEventListener('click', function (event) {
    event.stopPropagation();  // Prevent click from closing the dropdown immediately
    console.log('Dropdown button clicked');  // Log for debugging
    dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});

// Close the dropdown if the user clicks outside of it
window.addEventListener('click', function () {
    if (dropdownContent.style.display === 'block') {
        console.log('Closing dropdown');  // Log window click
        dropdownContent.style.display = 'none';
    }
});
//discover

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 400,
    // reset: true // Uncomment this line if you want animations to repeat
});

sr.reveal(`.home__data, .about__data, .popular__card, .features__content, .featured__card, .offer__card, .logos__content, .contact__form`, {
    interval: 100
});
