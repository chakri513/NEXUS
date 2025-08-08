// Scroll to registration section
function scrollToRegistration() {
    const registrationSection = document.getElementById('registration');
    registrationSection.scrollIntoView({ behavior: 'smooth' });
}

// Handle volunteer application
function applyForOpportunity(opportunityId) {
    scrollToRegistration();
    
    // Pre-fill form based on opportunity
    const opportunities = {
        'food-distribution': {
            location: 'Vijayawada Central',
            skills: ['cooking'],
            availability: ['weekday-morning', 'weekday-evening']
        },
        'medical-camp': {
            location: 'Benz Circle',
            skills: ['medical'],
            availability: ['weekend-morning']
        },
        'supply-distribution': {
            location: 'Gandhi Nagar',
            skills: ['driving'],
            availability: ['weekday-morning']
        }
    };

    const opportunity = opportunities[opportunityId];
    if (opportunity) {
        document.getElementById('location').value = opportunity.location;
        
        // Check relevant skills
        const skillCheckboxes = document.querySelectorAll('input[name="skills"]');
        skillCheckboxes.forEach(checkbox => {
            checkbox.checked = opportunity.skills.includes(checkbox.value);
        });

        // Check relevant availability
        const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]');
        availabilityCheckboxes.forEach(checkbox => {
            checkbox.checked = opportunity.availability.includes(checkbox.value);
        });
    }
}

// Form submission handler
document.getElementById('volunteerForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Gather form data
    const formData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        location: document.getElementById('location').value,
        skills: Array.from(document.querySelectorAll('input[name="skills"]:checked')).map(cb => cb.value),
        availability: Array.from(document.querySelectorAll('input[name="availability"]:checked')).map(cb => cb.value),
        message: document.getElementById('message').value
    };

    // Validate form data
    if (!validateForm(formData)) {
        return;
    }

    // Submit form data (you would typically send this to a server)
    console.log('Form submitted:', formData);
    
    // Show success modal
    showSuccessModal();
    
    // Reset form
    this.reset();
});

// Form validation
function validateForm(formData) {
    if (!formData.fullName || !formData.email || !formData.phone || !formData.location) {
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

    if (formData.skills.length === 0) {
        alert('Please select at least one skill');
        return false;
    }

    if (formData.availability.length === 0) {
        alert('Please select at least one availability option');
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

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'flex';
}

// Close modal
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('successModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Social media sharing functionality
function initializeSocialSharing() {
    // Function to handle social media sharing
    function shareContent(platform) {
        const text = "Join us in making a difference! Volunteer with Zygen Disaster Management.";
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
                // Copy to clipboard for Instagram
                navigator.clipboard.writeText(window.location.href)
                    .then(() => {
                        alert('Link copied! You can now paste it on your Instagram story or post.');
                    })
                    .catch(() => {
                        alert('Failed to copy link. Please copy it manually: ' + window.location.href);
                    });
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'width=600,height=400');
        }
    }

    // Add click handlers to all social buttons (both in main content and modal)
    document.querySelectorAll('.social-btn.facebook, .modal-social.facebook').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            shareContent('facebook');
        });
    });

    document.querySelectorAll('.social-btn.x, .modal-social.x').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            shareContent('x');
        });
    });

    document.querySelectorAll('.social-btn.whatsapp, .modal-social.whatsapp').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            shareContent('whatsapp');
        });
    });

    document.querySelectorAll('.social-btn.instagram, .modal-social.instagram').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            shareContent('instagram');
        });
    });
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeSocialSharing();
    // ... your other initialization code ...
});

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}); 