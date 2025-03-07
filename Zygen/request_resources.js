document.addEventListener('DOMContentLoaded', () => {
  const categoryButtons = document.querySelectorAll('.category-button');
  const quantityInput = document.getElementById('quantity');
  const urgencySelect = document.getElementById('urgency');
  const nameInput = document.getElementById('name');
  const contactInput = document.getElementById('contact');
  const submitButton = document.querySelector('.submit-button');
  let selectedCategories = [];

  const urlParams = new URLSearchParams(window.location.search);
  const preSelectedResource = urlParams.get('resource');
  if (preSelectedResource) {
    const button = document.getElementById(preSelectedResource);
    if (button) {
      button.classList.add('active');
      selectedCategories.push(preSelectedResource);
    }
  }

  function validateForm() {
    if (selectedCategories.length > 0 && quantityInput.value && urgencySelect.value && nameInput.value && validateContact(contactInput.value)) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      if (button.classList.contains('active')) {
        button.classList.remove('active');
        selectedCategories = selectedCategories.filter(category => category !== button.id);
      } else {
        button.classList.add('active');
        selectedCategories.push(button.id);
      }
      validateForm();
    });
  });

  quantityInput.addEventListener('input', validateForm);
  urgencySelect.addEventListener('change', validateForm);
  nameInput.addEventListener('input', validateForm);
  contactInput.addEventListener('input', validateForm);

  submitButton.addEventListener('click', async () => {
    const quantity = parseInt(quantityInput.value);
    const urgency = urgencySelect.value;
    const name = nameInput.value;
    const contact = contactInput.value;
    const location = await getCurrentLocation();

    const requestData = {
      categories: selectedCategories,
      quantity,
      urgency,
      name,
      contact,
      location
    };

    console.log('Request Data:', requestData);

    fetch('submit_request.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestData)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      showPopupMessage(requestData);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    // Update resource quantities
    selectedCategories.forEach(category => {
      let currentSupply = parseInt(localStorage.getItem(category)) || 100;
      currentSupply = Math.max(0, currentSupply - quantity);
      localStorage.setItem(category, currentSupply.toString());
    });
  });

  function validateContact(contact) {
    const contactRegex = /^[0-9]{10}$/;
    return contactRegex.test(contact);
  }

  contactInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });

  function showPopupMessage(requestData) {
    const popupScreen = document.getElementById('popup-screen');
    const popupMessage = document.getElementById('popup-message');

    let message = `Request Submitted!<br><br>`;
    requestData.categories.forEach(category => {
      message += `You've successfully requested ${category} (Quantity: ${requestData.quantity}).<br>`;
    });
    message += `<br>Your location has been recorded.<br><br>We expect to deliver your supplies within approximately 10 mins. This is an estimate and may vary depending on resource availability and current conditions.`;

    popupMessage.innerHTML = message;
    popupScreen.style.display = 'flex';

    document.getElementById('close-popup-btn').addEventListener('click', function () {
      popupScreen.style.display = 'none';
      location.href = 'home.html';
    });
  }

  async function getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        }, () => {
          resolve(null);
        });
      } else {
        resolve(null);
      }
    });
  }

  validateForm();
});

document.getElementById('home').addEventListener('click', () => {
  window.location.href = 'home.html';
});
document.getElementById('requestResources').addEventListener('click', () => {
  window.location.href = 'request_resources.html';
});

document.getElementById('realTimeMap').addEventListener('click', () => {
  window.location.href = 'disaster_map.html';
});

document.getElementById('home').addEventListener('click', () => {
  window.location.href = 'home.html';
});

document.getElementById('chat').addEventListener('click', () => {
  window.location.href = 'group_chat.html';
});
document.getElementById('emergencyContact').addEventListener('click', () => {
  window.location.href = 'resources.html';
});

