// Initialize map and markers
let map;
let markers = [];

// Emergency locations data
const emergencyLocations = [
    {
        type: 'hospital',
        name: 'City General Hospital',
        location: { lat: 16.5062, lng: 80.6480 },
        phone: '0866-2575577'
    },
    {
        type: 'police',
        name: 'Central Police Station',
        location: { lat: 16.5162, lng: 80.6234 },
        phone: '0866-2576956'
    },
    {
        type: 'fire',
        name: 'Fire Station',
        location: { lat: 16.5033, lng: 80.6462 },
        phone: '0866-2575121'
    }
    // Add more locations as needed
];

// Protocol details data
const protocolDetails = {
    firstaid: {
        title: 'First Aid Protocol',
        content: `
            <h3>Basic First Aid Steps</h3>
            <ol>
                <li>Check the scene is safe</li>
                <li>Check consciousness and breathing</li>
                <li>Call emergency services (108)</li>
                <li>Check for bleeding and other injuries</li>
                <li>Provide appropriate care based on conditions found</li>
            </ol>

            <h3>Common Emergency Situations</h3>
            <h4>Bleeding:</h4>
            <ul>
                <li>Apply direct pressure to wound</li>
                <li>Elevate injured area if possible</li>
                <li>Apply bandage firmly but not too tight</li>
            </ul>

            <h4>Burns:</h4>
            <ul>
                <li>Cool the burn under running water</li>
                <li>Cover with sterile dressing</li>
                <li>Don't apply creams or break blisters</li>
            </ul>

            <h4>Choking:</h4>
            <ul>
                <li>Encourage coughing</li>
                <li>Give up to 5 back blows</li>
                <li>Give up to 5 abdominal thrusts</li>
            </ul>
        `
    },
    fire: {
        title: 'Fire Safety Protocol',
        content: `
            <h3>Fire Emergency Steps</h3>
            <ol>
                <li>Activate the nearest fire alarm</li>
                <li>Call fire service (101)</li>
                <li>Alert others in the building</li>
                <li>Evacuate using nearest emergency exit</li>
                <li>Do not use elevators</li>
            </ol>

            <h3>If Trapped in Fire:</h3>
            <ul>
                <li>Stay low to avoid smoke</li>
                <li>Close doors to prevent fire spread</li>
                <li>Signal for help from windows</li>
                <li>Place wet cloth under doors</li>
            </ul>

            <h3>Prevention Tips:</h3>
            <ul>
                <li>Install smoke detectors</li>
                <li>Keep fire extinguishers accessible</li>
                <li>Create and practice evacuation plan</li>
                <li>Keep emergency exits clear</li>
            </ul>
        `
    },
    disaster: {
        title: 'Natural Disaster Protocol',
        content: `
            <h3>General Guidelines</h3>
            <ol>
                <li>Stay informed through official channels</li>
                <li>Follow evacuation orders immediately</li>
                <li>Keep emergency kit ready</li>
                <li>Have a family communication plan</li>
            </ol>

            <h3>Emergency Kit Contents:</h3>
            <ul>
                <li>Water and non-perishable food</li>
                <li>First aid supplies</li>
                <li>Flashlight and batteries</li>
                <li>Important documents</li>
                <li>Basic tools</li>
            </ul>

            <h3>During Disaster:</h3>
            <ul>
                <li>Stay calm and follow instructions</li>
                <li>Help others if safe to do so</li>
                <li>Avoid unnecessary travel</li>
                <li>Monitor emergency broadcasts</li>
            </ul>
        `
    }
};

// Initialize map
function initMap() {
    map = new google.maps.Map(document.getElementById('emergencyMap'), {
        center: { lat: 16.5062, lng: 80.6480 },
        zoom: 13,
        styles: mapStyles // Your existing map styles
    });

    // Add markers for emergency locations
    emergencyLocations.forEach(location => {
        addMarker(location);
    });
}

// Add marker to map
function addMarker(location) {
    const markerColors = {
        hospital: '#4CAF50',
        police: '#2196F3',
        fire: '#FF5252'
    };

    const marker = new google.maps.Marker({
        position: location.location,
        map: map,
        icon: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: markerColors[location.type],
            fillOpacity: 0.9,
            strokeWeight: 2,
            strokeColor: '#FFFFFF',
            scale: 10
        },
        title: location.name
    });

    const infoWindow = new google.maps.InfoWindow({
        content: `
            <div style="color: #333;">
                <h3>${location.name}</h3>
                <p>Phone: ${location.phone}</p>
                <button onclick="callEmergency('${location.phone}')" 
                        style="background: #4ECDC4; color: white; border: none; 
                        padding: 5px 10px; border-radius: 5px; cursor: pointer;">
                    Call Now
                </button>
            </div>
        `
    });

    marker.addListener('click', () => {
        infoWindow.open(map, marker);
    });

    markers.push(marker);
}

// Trigger SOS
function triggerSOS() {
    // Get user's location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const location = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            // Center map on user's location
            map.setCenter(location);
            map.setZoom(15);

            // Show alert
            alert('SOS signal sent! Emergency services have been notified of your location.');
            
            // You would typically send this location to your backend/emergency services
        }, () => {
            alert('Unable to get your location. Please call emergency services directly.');
        });
    } else {
        alert('Location services not available. Please call emergency services directly.');
    }
}

// Call emergency number
function callEmergency(number) {
    window.location.href = `tel:${number}`;
}

// Show protocol details
function showProtocolDetails(protocolType) {
    const modal = document.getElementById('protocolModal');
    const modalContent = document.getElementById('modalContent');
    const protocol = protocolDetails[protocolType];

    modalContent.innerHTML = `
        <h2>${protocol.title}</h2>
        ${protocol.content}
    `;

    modal.style.display = 'block';
}

// Close modal
document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('protocolModal').style.display = 'none';
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('protocolModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', initMap);

// Map styles (dark theme)
const mapStyles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [{"color": "#ffffff"}]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {"color": "#000000"},
            {"lightness": 13}
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"}]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {"color": "#144b53"},
            {"lightness": 14},
            {"weight": 1.4}
        ]
    }
    // Add more styles as needed
]; 