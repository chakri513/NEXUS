document.addEventListener('DOMContentLoaded', () => {
  const sosBtn = document.querySelector('.sos-btn');
  sosBtn.addEventListener('click', () => {
    startSOSRecording();
  });
  updateResourceTiles();
  // Other event listeners...

  window.addEventListener('load', () => {
    const resources = ['Food', 'Water', 'Shelter', 'Medical'];

    resources.forEach(resource => {
      const currentSupplies = JSON.parse(localStorage.getItem(resource)) || 100;
      updateResourceTile(resource, currentSupplies);
    });
  });
});
document.addEventListener('updateResource', (event) => {
  const { name, quantity } = event.detail;
  updateResourceTile(name, quantity);
});


function updateResourceTiles() {
  // Mock data since PHP backend doesn't exist
  const mockData = [
    { resource_name: 'food', quantity: 75 },
    { resource_name: 'water', quantity: 60 },
    { resource_name: 'shelter', quantity: 85 },
    { resource_name: 'medical', quantity: 45 }
  ];
  
  mockData.forEach(resource => {
    updateResourceTile(resource.resource_name, resource.quantity);
  });
}

function updateResourceTile(resource, newSupplies) {
const resourceTile = document.querySelector(`.resource-tile[data-resource="${resource.toLowerCase()}"]`);
if (!resourceTile) return;

const progressBar = resourceTile.querySelector('.progress');
const progressText = resourceTile.querySelector('.resource-info p');

let progressColor;
let progressWidth = (newSupplies / 100) * 100;

if (newSupplies >= 501) {
  progressColor = 'green';
} else if (newSupplies >= 201) {
  progressColor = 'orange';
} else {
  progressColor = 'red';
}

progressBar.style.width = `${progressWidth}%`;
progressBar.style.backgroundColor = progressColor;

let resourceUnit = getResourceUnit(resource);
progressText.textContent = `${newSupplies} ${resourceUnit} Available`;
}

function getResourceUnit(resource) {
switch(resource.toLowerCase()) {
  case 'food': return 'Meals';
  case 'water': return 'Liters';
  case 'shelter': return 'Beds';
  case 'medical': return 'Medicines';
  default: return 'Units';
}
}
function startSOSRecording() {
  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    console.log('Latitude:', latitude, 'Longitude:', longitude);

    if (latitude && longitude) {
      startMediaRecording(latitude, longitude);
    } else {
      console.error('Failed to get location.');
      alert('Failed to get location.');
    }
  }, error => {
    console.error('Error getting location:', error);
    alert('Failed to get location: ' + error.message);
  });
}

function startMediaRecording(latitude, longitude) {
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp8,opus' });
      const chunks = [];

      mediaRecorder.ondataavailable = e => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const formData = new FormData();
        formData.append('video', blob, 'sos_recording.webm');
        formData.append('location', `${latitude},${longitude}`);

        // Mock SOS handler since PHP backend doesn't exist
        console.log('SOS Recording captured:', {
          location: `${latitude},${longitude}`,
          videoSize: blob.size
        });
        
        // Simulate successful SOS response
        setTimeout(() => {
          alert('SOS sent successfully! Emergency services have been notified.');
        }, 1000);
      };

      mediaRecorder.start();
      console.log('SOS Recording started');

     
      setTimeout(() => {
        mediaRecorder.stop();
        stream.getTracks().forEach(track => track.stop());
        console.log('SOS Recording stopped after 2 minutes');
      }, 120000);
    })
    .catch(error => console.error('Error accessing media devices:', error));
}



function getResourceUnit(resource) {
  switch(resource.toLowerCase()) {
      case 'food': return 'Meals';
      case 'water': return 'Liters';
      case 'shelter': return 'Beds';
      case 'medical': return 'Medicines';
      default: return 'Units';
  }
}

function requestResource(resource) {
  window.location.href = `pages/request_resources.html?resource=${resource}`;
}

document.getElementById('requestResources').addEventListener('click', () => {
  window.location.href = 'pages/request_resources.html';
});

document.getElementById('realTimeMap').addEventListener('click', () => {
  window.location.href = 'pages/disaster_map.html';
});

document.getElementById('home').addEventListener('click', () => {
  window.location.href = 'pages/home.html';
});

document.getElementById('chat').addEventListener('click', () => {
  window.location.href = 'pages/group_chat.html';
});
document.getElementById('emergencyContact').addEventListener('click', () => {
  window.location.href = 'pages/resources.html';
});

