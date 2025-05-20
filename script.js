// Function to handle login
function handleLoginSubmit(event) {
    event.preventDefault(); // Prevent form submission
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // For simplicity, we are skipping validation for login here.
    // You can add real validation or authentication as needed.
    if (email && password) {
        // After successful login, show the journey form
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('journeyPage').style.display = 'block';
    }
}

// Function to handle journey form submission
async function handleLocationSubmit(event) {
    event.preventDefault(); // Prevent form submission

    const startLocation = document.getElementById('startLocation').value;
    const endLocation = document.getElementById('endLocation').value;

    if (!startLocation || !endLocation) {
        alert('Please enter both start and end locations.');
        return;
    }

    // Redirect to Google Maps with both locations pinned
    const startAddress = encodeURIComponent(startLocation);
    const endAddress = encodeURIComponent(endLocation);

    const mapUrl = `https://www.google.com/maps/dir/?api=1&origin=${startAddress}&destination=${endAddress}&travelmode=driving`;

    // Calculate travel time and display it
    calculateTravelTime(startLocation, endLocation);

    // Redirect to Google Maps
    window.open(mapUrl, '_blank');
}

// Function to calculate travel time using Google Maps API
async function calculateTravelTime(startLocation, endLocation) {
    const directionsService = new google.maps.DirectionsService();

    const request = {
        origin: startLocation,
        destination: endLocation,
        travelMode: google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
            const route = response.routes[0].legs[0];
            const duration = route.duration.text;
            document.getElementById('responseMessage').style.display = 'block';
            document.getElementById('responseMessage').innerHTML = `Estimated travel time: ${duration}`;
        } else {
            document.getElementById('responseMessage').style.display = 'block';
            document.getElementById('responseMessage').innerHTML = `Error calculating route: ${status}`;
        }
    });
}

// Load Google Maps API dynamically
function loadGoogleMapsAPI() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&callback=initMap&libraries=places`;
    document.head.appendChild(script);
}

// Initialize map (optional, you can also remove this part if not required)
function initMap() {
    // This is just for setting up a map for later use, it's optional.
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });
}

// Call the function to load Google Maps API
loadGoogleMapsAPI();
