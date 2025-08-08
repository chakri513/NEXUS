// Initialize variables
let selectedAmount = 1000;
let donationType = 'one-time';

// Scroll to donation section
function scrollToDonate() {
    const donationSection = document.getElementById('donateSection');
    donationSection.scrollIntoView({ behavior: 'smooth' });
}

// Handle amount selection
function selectAmount(amount) {
    selectedAmount = amount;
    document.querySelectorAll('.amount-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.textContent.replace('₹', '')) === amount) {
            btn.classList.add('active');
        }
    });
}

// Show custom amount input
function showCustomAmount() {
    document.getElementById('customAmountModal').style.display = 'flex';
}

// Set donation type
function setDonationType(type) {
    donationType = type;
    document.querySelectorAll('.type-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`.type-btn[onclick="setDonationType('${type}')"]`).classList.add('active');
}

// Handle form submission
document.getElementById('donationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Gather form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        pan: document.getElementById('pan').value,
        amount: selectedAmount,
        type: donationType,
        payment: document.querySelector('input[name="payment"]:checked').value
    };

    // Validate form data
    if (!validateForm(formData)) {
        return;
    }

    // Process payment (simulate)
    processPayment(formData);
});

// Form validation
function validateForm(formData) {
    if (!formData.name || !formData.email || !formData.phone) {
        alert('Please fill in all required fields');
        return false;
    }

    if (!validateEmail(formData.email)) {
        alert('Please enter a valid email address');
        return false;
    }

    if (!validatePhone(formData.phone)) {
        alert('Please enter a valid phone number');
        return false;
    }

    return true;
}

// Email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Phone validation
function validatePhone(phone) {
    const re = /^\d{10}$/;
    return re.test(phone.replace(/[- )(]/g, ''));
}

// Process payment
function processPayment(formData) {
    // Simulate payment processing
    setTimeout(() => {
        const transactionId = 'TXN' + Math.random().toString(36).substr(2, 9).toUpperCase();
        showSuccessModal(formData.amount, transactionId);
    }, 1500);
}

// Show success modal
function showSuccessModal(amount, transactionId) {
    const modal = document.getElementById('successModal');
    document.getElementById('donationAmount').textContent = `₹${amount}`;
    document.getElementById('transactionId').textContent = transactionId;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

// Close modal
function closeModal() {
    document.getElementById('successModal').style.display = 'none';
    document.body.style.overflow = ''; // Restore background scrolling
}

// Impact counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.count');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                counter.textContent = Math.round(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        updateCounter();
    });
}

// Social sharing
document.querySelectorAll('.modal-social').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        const platform = this.classList[1];
        const text = "I just donated to support disaster relief efforts! Join me in making a difference.";
        const url = encodeURIComponent(window.location.href);
        
        let shareUrl;
        switch(platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
                break;
            case 'x':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;
                break;
            case 'whatsapp':
                shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text + ' ' + window.location.href)}`;
                break;
            case 'instagram':
                navigator.clipboard.writeText(window.location.href).then(() => {
                    alert('Link copied! Share it on your Instagram story or post.');
                });
                return;
        }
        
        if (shareUrl) {
            window.open(shareUrl, 'share-dialog', 'width=600,height=400');
        }
    });
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    animateCounters();
    setDonationType('one-time');
    selectAmount(1000);
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const successModal = document.getElementById('successModal');
    const customModal = document.getElementById('customAmountModal');
    
    if (e.target === successModal) {
        closeModal();
    }
    if (e.target === customModal) {
        closeCustomModal();
    }
});

// Custom amount handling
function closeCustomModal() {
    document.getElementById('customAmountModal').style.display = 'none';
}

function setCustomAmount(amount) {
    document.getElementById('customAmountInput').value = amount;
}

function confirmCustomAmount() {
    const amount = parseInt(document.getElementById('customAmountInput').value);
    if (amount && amount >= 100) {
        selectedAmount = amount;
        document.querySelectorAll('.amount-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector('.amount-btn.custom').classList.add('active');
        closeCustomModal();
    } else {
        alert('Please enter a valid amount (minimum ₹100)');
    }
}

// Add escape key handler
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        closeCustomModal();
    }
}); 