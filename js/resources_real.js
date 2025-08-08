// Global variables
let map;
let markers = [];
let activeInfoWindow = null;

// Resource teams data
const teams = [
    {
        id: 1,
        name: "Medical Team Alpha",
        type: "medical",
        location: "PB Siddhartha College Ground",
        coordinates: { lat: 16.5058, lng: 80.6497 },
        status: "active",
        personnel: 8,
        equipment: "Advanced Life Support, Ambulance",
        contact: "1234567890"
    },
    {
        id: 2,
        name: "Fire Response Unit 1",
        type: "fire",
        location: "Vijayawada Railway Station",
        coordinates: { lat: 16.5162, lng: 80.6234 },
        status: "active",
        personnel: 6,
        equipment: "Fire Engine, Water Tanker",
        contact: "9876543210"
    },
    {
        id: 3,
        name: "Supply Team Delta",
        type: "supply",
        location: "Indira Gandhi Stadium",
        coordinates: { lat: 16.5075, lng: 80.6400 },
        status: "active",
        personnel: 4,
        equipment: "Food, Water, Medical Supplies",
        contact: "8765432109"
    },
    {
        id: 4,
        name: "Medical Team Bravo",
        type: "medical",
        location: "Government General Hospital",
        coordinates: { lat: 16.5107, lng: 80.6287 },
        status: "active",
        personnel: 6,
        equipment: "Emergency Medical Unit",
        contact: "7890123456"
    },
    {
        id: 5,
        name: "Fire Unit 2",
        type: "fire",
        location: "Benz Circle",
        coordinates: { lat: 16.5033, lng: 80.6462 },
        status: "active",
        personnel: 5,
        equipment: "Fire Engine, Rescue Equipment",
        contact: "8901234567"
    },
    {
        id: 6,
        name: "Supply Team Echo",
        type: "supply",
        location: "Vijayawada Bus Station",
        coordinates: { lat: 16.5146, lng: 80.6321 },
        status: "active",
        personnel: 4,
        equipment: "Relief Supplies, Water",
        contact: "9012345678"
    }
];

// Map initialization
function initMap() {
    // Create map
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 16.5062, lng: 80.6480 }, // Vijayawada center
        zoom: 13,
        styles: mapStyles,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false
    });

    // Create markers for each team
    teams.forEach(team => {
        // Create custom marker
        const marker = new google.maps.Marker({
            position: team.coordinates,
            map: map,
            title: team.name,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: getTeamColor(team.type),
                fillOpacity: 1,
                strokeWeight: 2,
                strokeColor: '#FFFFFF',
                scale: 12
            }
        });

        // Create info window
        const infoWindow = new google.maps.InfoWindow({
            content: createInfoWindowContent(team)
        });

        // Add click listener
        marker.addListener('click', () => {
            if (activeInfoWindow) {
                activeInfoWindow.close();
            }
            infoWindow.open(map, marker);
            activeInfoWindow = infoWindow;
        });

        // Store marker reference
        markers.push(marker);
    });

    // Add legend
    addMapLegend();
}

// Helper functions
function getTeamColor(type) {
    const colors = {
        medical: '#4CAF50', // Green
        fire: '#FF5722',    // Red-Orange
        supply: '#2196F3'   // Blue
    };
    return colors[type] || '#757575';
}

function createInfoWindowContent(team) {
    return `
        <div style="padding: 15px; max-width: 300px; font-family: 'Poppins', sans-serif;">
            <h3 style="color: ${getTeamColor(team.type)}; margin-bottom: 10px;">
                ${team.name}
            </h3>
            <div style="color: #333; font-size: 14px;">
                <p style="margin: 5px 0;"><strong>Location:</strong> ${team.location}</p>
                <p style="margin: 5px 0;"><strong>Status:</strong> ${team.status}</p>
                <p style="margin: 5px 0;"><strong>Personnel:</strong> ${team.personnel}</p>
                <p style="margin: 5px 0;"><strong>Equipment:</strong> ${team.equipment}</p>
                <p style="margin: 5px 0;"><strong>Contact:</strong> ${team.contact}</p>
            </div>
        </div>
    `;
}

function addMapLegend() {
    const legend = document.createElement('div');
    legend.className = 'map-legend';

    const items = [
        { type: 'medical', label: 'Medical Teams' },
        { type: 'fire', label: 'Fire Units' },
        { type: 'supply', label: 'Supply Teams' }
    ];

    items.forEach(item => {
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <div class="legend-color" style="background-color: ${getTeamColor(item.type)}"></div>
            <span style="color: #333; font-size: 12px;">${item.label}</span>
        `;
        legend.appendChild(legendItem);
    });

    map.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(legend);
}

// Map styles
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
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{"color": "#08304b"}]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {"color": "#0c4152"},
            {"lightness": 5}
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"}]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {"color": "#0b434f"},
            {"lightness": 25}
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"}]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {"color": "#0b3d51"},
            {"lightness": 16}
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [{"color": "#000000"}]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [{"color": "#146474"}]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [{"color": "#021019"}]
    }
];

// Initialize map when page loads
document.addEventListener('DOMContentLoaded', initMap);