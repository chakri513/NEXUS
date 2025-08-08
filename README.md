# Zygen - Disaster Relief Platform

A comprehensive web-based disaster relief platform designed to coordinate emergency response, resource management, and community support during crisis situations.

## 🏗️ Project Structure

```
Zygen/
├── index.html                 # Main entry point
├── README.md                  # Project documentation
├── assets/
│   ├── images/               # Image assets
│   │   ├── logo.png
│   │   ├── Bed.png
│   │   ├── food.png
│   │   ├── Medical Aid.png
│   │   └── water.png
│   └── icons/               # Icon assets (future use)
├── css/                      # Stylesheets
│   ├── home.css
│   ├── donate_now.css
│   ├── volunteer_now.css
│   ├── emergency.css
│   ├── evacuation.css
│   ├── group_chat.css
│   ├── hazards.css
│   ├── request_resources.css
│   ├── resources_real.css
│   └── styles.css
├── js/                       # JavaScript files
│   ├── home.js
│   ├── donate_now.js
│   ├── volunteer_now.js
│   ├── emergency.js
│   ├── evacuation.js
│   ├── group_chat.js
│   ├── hazards.js
│   ├── request_resources.js
│   ├── resources_real.js
│   └── disaster_map.js
├── pages/                    # HTML pages
│   ├── home.html
│   ├── donate_now.html
│   ├── volunteer_now.html
│   ├── emergency.html
│   ├── evacuation.html
│   ├── group_chat.html
│   ├── hazards.html
│   ├── request_resources.html
│   ├── resources_real.html
│   ├── resources.html
│   └── disaster_map.html
└── components/              # Reusable components (future use)
```

## 🚀 Features

### Core Functionality
- **SOS Emergency System**: One-click emergency alert with location and video capture
- **Real-time Resource Management**: Track and request critical resources (food, water, shelter, medical)
- **Interactive Disaster Map**: Visual representation of incidents, resources, and hazards
- **Community Communication**: Group chat system for coordination
- **Volunteer Management**: Platform for volunteer registration and coordination
- **Donation System**: Secure donation processing for relief efforts

### Key Pages
1. **Home** (`index.html`): Main dashboard with SOS button and resource overview
2. **Disaster Map** (`pages/disaster_map.html`): Interactive map with incident tracking
3. **Donate Now** (`pages/donate_now.html`): Donation platform with impact tracking
4. **Volunteer Now** (`pages/volunteer_now.html`): Volunteer registration and management
5. **Group Chat** (`pages/group_chat.html`): Real-time communication system
6. **Resource Management** (`pages/resources_real.html`): Resource tracking and allocation
7. **Emergency Response** (`pages/emergency.html`): Emergency contact and response coordination
8. **Evacuation** (`pages/evacuation.html`): Evacuation planning and routes
9. **Hazards** (`pages/hazards.html`): Hazard monitoring and alerts

## 🛠️ Technologies Used

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Custom CSS with responsive design
- **Icons**: Font Awesome 6.0
- **Fonts**: Google Fonts (Poppins)
- **Maps**: Google Maps API
- **Real-time**: Socket.io for chat functionality

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- Desktop computers
- Tablets
- Mobile devices
- Emergency response equipment

## 🎨 Design System

### Color Palette
- Primary: Linear gradient (#FF6B6B to #4ECDC4)
- Background: Dark theme (#1A1A2E)
- Header: Semi-transparent (#16213E)
- Text: White (#FFFFFF)

### Typography
- Font Family: Poppins (Google Fonts)
- Weights: 400, 500, 600, 700

## 🔧 Setup Instructions

1. **Clone or download** the project files
2. **Open `index.html`** in a web browser
3. **Navigate** through different pages using the footer navigation
4. **Test functionality** on different devices for responsiveness

## 📋 File Organization

### Assets
- **Images**: All PNG files moved to `assets/images/`
- **Icons**: Reserved space for future icon assets

### Stylesheets
- **Component-specific**: Each page has its own CSS file
- **Global styles**: `styles.css` for shared components
- **Responsive**: All CSS files include mobile-first design

### JavaScript
- **Page-specific**: Each page has its own JS file
- **Modular**: Functions organized by feature
- **API Integration**: Google Maps, Socket.io integration

### HTML Pages
- **Organized**: All pages in `pages/` directory
- **Consistent**: Standardized header/footer across pages
- **Accessible**: Semantic HTML structure

## 🔄 Navigation Flow

```
Home (index.html)
├── Donate Now
├── Volunteer Now
├── Request Resources
├── Disaster Map
│   ├── Incidents
│   ├── Resources
│   ├── Hazards
│   └── Evacuation
├── Group Chat
└── Emergency Contact
```

## 🚨 Emergency Features

- **SOS Button**: One-click emergency alert
- **Location Services**: Automatic GPS integration
- **Video Capture**: Emergency situation documentation
- **Real-time Updates**: Live incident tracking
- **Resource Allocation**: Dynamic resource management

## 🤝 Contributing

This is a disaster relief platform. For contributions:
1. Follow the existing code structure
2. Maintain responsive design principles
3. Test on multiple devices
4. Ensure accessibility standards
5. Document any new features

## 📄 License

This project is designed for disaster relief and emergency response purposes.

---

**Zygen** - Empowering communities through coordinated disaster response.
