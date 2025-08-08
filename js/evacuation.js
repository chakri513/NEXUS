// Global variables
let map;
let directionsService;
let directionsRenderer;
let trafficLayer;
let currentRoute;
let safeZoneMarkers = [];
let allRoutes = [];

// Initialize map when DOM is loaded
document.addEventListener('DOMContentLoaded', initMap);

function initMap() {
    try {
        console.log('Initializing map...');
        
        // Initialize the map
        map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 16.3067, lng: 80.4365 },
            zoom: 12,
            styles: mapStyles,
            mapTypeControl: false,
            streetViewControl: false,
            fullscreenControl: false,
            zoomControl: true,
            zoomControlOptions: {
                position: google.maps.ControlPosition.RIGHT_BOTTOM
            }
        });

        // Initialize services
        directionsService = new google.maps.DirectionsService();
        directionsRenderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: '#4ECDC4',
                strokeWeight: 5,
                strokeOpacity: 0.7
            }
        });

        trafficLayer = new google.maps.TrafficLayer();

        // Initialize features
        initializeSafeZones();
        initializeEventListeners();
        initializeAutocomplete();

        console.log('Map initialized successfully');
    } catch (error) {
        console.error('Error initializing map:', error);
        alert('Error loading map. Please refresh the page.');
    }
}

function initializeEventListeners() {
    // Add event listeners for buttons
    document.getElementById('findRoute')?.addEventListener('click', calculateRoute);
    document.getElementById('toggleTraffic')?.addEventListener('click', toggleTraffic);
    document.getElementById('toggleSafeZones')?.addEventListener('click', toggleSafeZones);
    document.getElementById('toggleRoutes')?.addEventListener('click', toggleRoutes);
}

function initializeSafeZones() {
    // Sample safe zones data
    const safeZones = [
        {
            name: "Emergency Shelter A",
            location: { lat: 16.3167, lng: 80.4465 },
            capacity: "500 people",
            status: "Available"
        },
        {
            name: "Community Center B",
            location: { lat: 16.3267, lng: 80.4565 },
            capacity: "300 people",
            status: "Available"
        }
    ];

    safeZones.forEach(zone => {
        const marker = new google.maps.Marker({
            position: zone.location,
            map: map,
            title: zone.name,
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: '#4CAF50',
                fillOpacity: 1,
                strokeWeight: 0,
                scale: 10
            }
        });

        safeZoneMarkers.push(marker);

        // Add to sidebar list
        const safeZonesList = document.getElementById('safeZonesList');
        const zoneCard = document.createElement('div');
        zoneCard.className = 'zone-card';
        zoneCard.innerHTML = `
            <h4>${zone.name}</h4>
            <p>Capacity: ${zone.capacity}</p>
            <p>Status: ${zone.status}</p>
        `;
        
        safeZonesList?.appendChild(zoneCard);
    });
}

function calculateRoute() {
    const start = document.getElementById('currentLocation').value;
    const end = document.getElementById('safeZone').value;

    if (!start || !end) {
        alert('Please enter both locations');
        return;
    }

    const request = {
        origin: start,
        destination: end,
        travelMode: 'DRIVING'
    };

    directionsService.route(request, (result, status) => {
        if (status === 'OK') {
            directionsRenderer.setDirections(result);
            updateRouteInfo(result);
        } else {
            console.error('Route calculation failed:', status);
            alert('Could not calculate route. Please try again.');
        }
    });
}

function updateRouteInfo(result) {
    const route = result.routes[0].legs[0];
    document.getElementById('etaTime').textContent = route.duration.text;
    document.getElementById('routeDistance').textContent = route.distance.text;
    document.getElementById('trafficStatus').textContent = 'Moderate';
}

function toggleTraffic() {
    const button = document.getElementById('toggleTraffic');
    if (button.classList.toggle('active')) {
        trafficLayer.setMap(map);
    } else {
        trafficLayer.setMap(null);
    }
}

function toggleSafeZones() {
    const button = document.getElementById('toggleSafeZones');
    const isVisible = button.classList.toggle('active');
    safeZoneMarkers.forEach(marker => {
        marker.setVisible(isVisible);
    });
}

function toggleRoutes() {
    const button = document.getElementById('toggleRoutes');
    const isVisible = button.classList.toggle('active');
    
    if (isVisible) {
        showAllEvacuationRoutes();
    } else {
        clearAllRoutes();
    }
}

function showAllEvacuationRoutes() {
    // Sample evacuation routes
    const routes = [
        {
            start: { lat: 16.3067, lng: 80.4365 },
            end: { lat: 16.3167, lng: 80.4465 }
        },
        {
            start: { lat: 16.3167, lng: 80.4365 },
            end: { lat: 16.3267, lng: 80.4565 }
        }
    ];

    routes.forEach(route => {
        const renderer = new google.maps.DirectionsRenderer({
            map: map,
            suppressMarkers: true,
            polylineOptions: {
                strokeColor: '#FF6B6B',
                strokeWeight: 4,
                strokeOpacity: 0.7
            }
        });

        directionsService.route({
            origin: route.start,
            destination: route.end,
            travelMode: 'DRIVING'
        }, (result, status) => {
            if (status === 'OK') {
                renderer.setDirections(result);
                allRoutes.push(renderer);
            }
        });
    });
}

function clearAllRoutes() {
    allRoutes.forEach(route => route.setMap(null));
    allRoutes = [];
}

function initializeAutocomplete() {
    const currentLocationInput = document.getElementById('currentLocation');
    const safeZoneInput = document.getElementById('safeZone');
    
    if (currentLocationInput && safeZoneInput) {
        new google.maps.places.Autocomplete(currentLocationInput);
        new google.maps.places.Autocomplete(safeZoneInput);
    }
}

// Your existing mapStyles constant remains the same

// Map styles for dark theme
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

