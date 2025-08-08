document.addEventListener('DOMContentLoaded', initializeMap);

function initializeMap() {
    // Map initialization
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 16.3067, lng: 80.4365 },
        zoom: 12,
        styles: mapStyles
    });

    // Sample hazard zones data
    const hazardZones = {
        flood: [
            {
                name: "Downtown Flood Zone",
                risk: "high",
                coordinates: [
                    { lat: 16.3067, lng: 80.4365 },
                    { lat: 16.3167, lng: 80.4465 },
                    { lat: 16.3267, lng: 80.4365 }
                ],
                description: "High-risk flood area due to river proximity"
            }
        ],
        fire: [
            {
                name: "Industrial District Fire Risk",
                risk: "moderate",
                coordinates: [
                    { lat: 16.3167, lng: 80.4565 },
                    { lat: 16.3267, lng: 80.4665 },
                    { lat: 16.3367, lng: 80.4565 }
                ],
                description: "Moderate fire risk due to industrial activities"
            }
        ],
        earthquake: [
            {
                name: "Seismic Activity Zone",
                risk: "low",
                coordinates: [
                    { lat: 16.3267, lng: 80.4765 },
                    { lat: 16.3367, lng: 80.4865 },
                    { lat: 16.3467, lng: 80.4765 }
                ],
                description: "Known fault line area"
            }
        ]
    };

    // Track active overlays
    let activePolygons = [];
    let safeZones = [];

    // Create hazard zone polygons
    function createHazardZone(zone, type) {
        const colors = {
            flood: { fill: '#2196F3', stroke: '#1976D2' },
            fire: { fill: '#FF5722', stroke: '#E64A19' },
            earthquake: { fill: '#FFC107', stroke: '#FFA000' }
        };

        const polygon = new google.maps.Polygon({
            paths: zone.coordinates,
            strokeColor: colors[type].stroke,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: colors[type].fill,
            fillOpacity: 0.35
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="padding: 10px;">
                    <h3 style="color: #333;">${zone.name}</h3>
                    <p style="color: #666;">${zone.description}</p>
                    <p style="color: #666;">Risk Level: ${zone.risk}</p>
                </div>
            `
        });

        polygon.addListener('click', (e) => {
            infoWindow.setPosition(e.latLng);
            infoWindow.open(map);
        });

        return polygon;
    }

    // Update hazard alerts panel
    function updateHazardAlerts() {
        const alertsContainer = document.getElementById('hazardAlerts');
        alertsContainer.innerHTML = '';

        Object.entries(hazardZones).forEach(([type, zones]) => {
            zones.forEach(zone => {
                const alertCard = document.createElement('div');
                alertCard.className = 'alert-card';
                alertCard.innerHTML = `
                    <div class="alert-header">
                        <h4>${zone.name}</h4>
                        <span class="risk-level ${zone.risk}">${zone.risk}</span>
                    </div>
                    <p>${zone.description}</p>
                `;

                alertCard.addEventListener('click', () => {
                    const center = zone.coordinates[0];
                    map.panTo(center);
                    map.setZoom(15);
                });

                alertsContainer.appendChild(alertCard);
            });
        });
    }

    // Toggle risk zones
    document.getElementById('toggleRiskZones').addEventListener('click', function() {
        const isActive = this.classList.toggle('active');
        
        if (isActive) {
            Object.entries(hazardZones).forEach(([type, zones]) => {
                zones.forEach(zone => {
                    const polygon = createHazardZone(zone, type);
                    polygon.setMap(map);
                    activePolygons.push(polygon);
                });
            });
        } else {
            activePolygons.forEach(polygon => polygon.setMap(null));
            activePolygons = [];
        }
    });

    // Toggle safe zones
    document.getElementById('toggleSafeZones').addEventListener('click', function() {
        const isActive = this.classList.toggle('active');
        
        if (isActive) {
            // Add sample safe zones
            const safeZoneCoordinates = [
                { lat: 16.3167, lng: 80.4965 },
                { lat: 16.3267, lng: 80.5065 },
                { lat: 16.3367, lng: 80.4965 }
            ];

            const safeZone = new google.maps.Polygon({
                paths: safeZoneCoordinates,
                strokeColor: '#4CAF50',
                strokeOpacity: 0.8,
                strokeWeight: 2,
                fillColor: '#4CAF50',
                fillOpacity: 0.35
            });

            safeZone.setMap(map);
            safeZones.push(safeZone);
        } else {
            safeZones.forEach(zone => zone.setMap(null));
            safeZones = [];
        }
    });

    // Safety guidelines modal
    const modal = document.getElementById('guidelinesModal');
    const modalContent = document.getElementById('modalContent');
    const modalTitle = document.getElementById('modalTitle');

    document.querySelectorAll('.view-guidelines').forEach(button => {
        button.addEventListener('click', () => {
            const type = button.dataset.type;
            modalTitle.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Safety Guidelines`;
            modalContent.innerHTML = getGuidelines(type);
            modal.style.display = 'block';
        });
    });

    document.querySelector('.close-modal').addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Initialize display
    updateHazardAlerts();
}

// Safety guidelines content
function getGuidelines(type) {
    const guidelines = {
        flood: `
            <h3>Before Flood</h3>
            <ul>
                <li>Prepare emergency kit</li>
                <li>Know evacuation routes</li>
                <li>Move valuables to higher ground</li>
            </ul>
            <h3>During Flood</h3>
            <ul>
                <li>Avoid walking through flowing water</li>
                <li>Don't drive through flooded areas</li>
                <li>Stay informed through local news</li>
            </ul>
        `,
        fire: `
            <h3>Fire Prevention</h3>
            <ul>
                <li>Install smoke detectors</li>
                <li>Create fire escape plan</li>
                <li>Keep fire extinguisher ready</li>
            </ul>
            <h3>During Fire</h3>
            <ul>
                <li>Stay low to avoid smoke</li>
                <li>Use stairs, not elevators</li>
                <li>Call emergency services immediately</li>
            </ul>
        `,
        earthquake: `
            <h3>Earthquake Preparedness</h3>
            <ul>
                <li>Secure heavy furniture</li>
                <li>Know safe spots in each room</li>
                <li>Keep emergency supplies ready</li>
            </ul>
            <h3>During Earthquake</h3>
            <ul>
                <li>Drop, Cover, and Hold On</li>
                <li>Stay away from windows</li>
                <li>If outdoors, move to open area</li>
            </ul>
        `
    };
    return guidelines[type] || '';
}

// Map styles (same as before)
const mapStyles = [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 13
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#144b53"
            },
            {
                "lightness": 14
            },
            {
                "weight": 1.4
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#08304b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#0c4152"
            },
            {
                "lightness": 5
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b434f"
            },
            {
                "lightness": 25
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#0b3d51"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "color": "#146474"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#021019"
            }
        ]
    }
];