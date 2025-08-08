// Initialize map features after Google Maps loads
function initializeMapFeatures() {
    // Sample incident data
    const incidents = [
        {
            position: { lat: 16.3067, lng: 80.4365 },
            type: 'severe',
            title: 'Flood Alert',
            description: 'Severe flooding in downtown area',
            severity: 'High',
            status: 'Active',
            timestamp: new Date().toLocaleString()
        },
        {
            position: { lat: 16.3167, lng: 80.4465 },
            type: 'moderate',
            title: 'Power Outage',
            description: 'Multiple blocks affected',
            severity: 'Medium',
            status: 'Active',
            timestamp: new Date().toLocaleString()
        },
        {
            position: { lat: 16.3100, lng: 80.4400 },
            type: 'minor',
            title: 'Road Blockage',
            description: 'Tree fallen on main road',
            severity: 'Low',
            status: 'Active',
            timestamp: new Date().toLocaleString()
        }
    ];

    // Track current markers and layers
    let currentMarkers = [];
    let heatmap = null;
    let trafficLayer = null;

    // Custom marker symbols
    const markerSymbols = {
        severe: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#FF4848',
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 10
        },
        moderate: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#FFB302',
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 8
        },
        minor: {
            path: google.maps.SymbolPath.CIRCLE,
            fillColor: '#4ECDC4',
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 6
        }
    };

    // Add marker to map
    function addMarker(incident) {
        const marker = new google.maps.Marker({
            position: incident.position,
            map: window.map,
            icon: markerSymbols[incident.type],
            title: incident.title,
            animation: google.maps.Animation.DROP
        });

        // Create info window
        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px; max-width: 200px;">
                    <h3 style="color: #333; margin-bottom: 5px;">${incident.title}</h3>
                    <p style="color: #666; margin-bottom: 5px;">${incident.description}</p>
                    <p style="color: #666; margin-bottom: 5px;">Status: ${incident.status}</p>
                    <p style="color: #666; font-size: 12px;">Last Updated: ${incident.timestamp}</p>
                </div>
            `
        });

        // Add click listener to marker
        marker.addListener('click', () => {
            infoWindow.open(window.map, marker);
        });

        currentMarkers.push(marker);
    }

    // Clear existing markers
    function clearMarkers() {
        currentMarkers.forEach(marker => marker.setMap(null));
        currentMarkers = [];
    }

    // Update active incidents panel
    function updateActiveIncidents() {
        const incidentsList = document.getElementById('activeIncidents');
        incidentsList.innerHTML = '';

        incidents.forEach(incident => {
            const div = document.createElement('div');
            div.className = 'incident-card';
            div.innerHTML = `
                <h3>${incident.title}</h3>
                <p>Severity: ${incident.severity}</p>
                <p>Status: ${incident.status}</p>
                <p>Last Updated: ${incident.timestamp}</p>
            `;
            
            // Add click event to center map on incident
            div.addEventListener('click', () => {
                window.map.panTo(incident.position);
                window.map.setZoom(15);
            });
            
            incidentsList.appendChild(div);
        });
    }

    // Initialize heatmap toggle
    document.getElementById('toggleHeatmap').addEventListener('click', function() {
        if (!heatmap) {
            const heatmapData = incidents.map(incident => ({
                location: new google.maps.LatLng(incident.position),
                weight: incident.type === 'severe' ? 3 : 
                        incident.type === 'moderate' ? 2 : 1
            }));

            heatmap = new google.maps.visualization.HeatmapLayer({
                data: heatmapData,
                radius: 50
            });
        }

        if (this.classList.toggle('active')) {
            heatmap.setMap(window.map);
        } else {
            heatmap.setMap(null);
        }
    });

    // Initialize traffic layer toggle
    document.getElementById('toggleTraffic').addEventListener('click', function() {
        if (!trafficLayer) {
            trafficLayer = new google.maps.TrafficLayer();
        }

        if (this.classList.toggle('active')) {
            trafficLayer.setMap(window.map);
        } else {
            trafficLayer.setMap(null);
        }
    });

    // Update statistics
    function updateStatistics() {
        document.getElementById('affectedCount').textContent = '1,234';
        document.getElementById('teamCount').textContent = '23';
        document.getElementById('damageCount').textContent = '89';
    }

    // Initialize footer button handlers
    document.getElementById('home').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    document.getElementById('requestResources').addEventListener('click', () => {
        window.location.href = 'request.html';
    });

    document.getElementById('realTimeMap').addEventListener('click', () => {
        window.location.reload();
    });

    document.getElementById('chat').addEventListener('click', () => {
        window.location.href = 'chat.html';
    });

    document.getElementById('emergencyContact').addEventListener('click', () => {
        window.location.href = 'emergency.html';
    });

    // Initialize map display
    function initializeDisplay() {
        clearMarkers();
        incidents.forEach(addMarker);
        updateActiveIncidents();
        updateStatistics();
    }

    // Initialize everything
    initializeDisplay();
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
        "stylers": [{"color": "#000000"}, {"lightness": 13}]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"}]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#144b53"}, {"lightness": 14}, {"weight": 1.4}]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [{"color": "#08304b"}]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{"color": "#0c4152"}, {"lightness": 5}]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"}]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#0b434f"}, {"lightness": 25}]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [{"color": "#000000"}]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [{"color": "#0b3d51"}, {"lightness": 16}]
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