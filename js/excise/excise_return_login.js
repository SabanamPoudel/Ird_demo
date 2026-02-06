// Excise Return Login JavaScript

// Toggle menu function
function toggleMenu(element) {
    const submenu = element.nextElementSibling;
    const parent = element.parentElement;
    
    if (submenu && submenu.classList.contains('submenu')) {
        const isOpen = submenu.style.display === 'block';
        submenu.style.display = isOpen ? 'none' : 'block';
        parent.classList.toggle('open');
    }
}

// Login function
function loginExciseReturn() {
    const submissionNo = document.getElementById('submissionNoInput').value.trim();
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;

    // Validation
    if (!submissionNo) {
        alert('कृपया सब्मिशन नं. भर्नुहोस्।\nPlease enter Submission Number.');
        document.getElementById('submissionNoInput').focus();
        return;
    }

    if (!username) {
        alert('कृपया प्रयोगकर्ताको नाम भर्नुहोस्।\nPlease enter Username.');
        document.getElementById('usernameInput').focus();
        return;
    }

    if (!password) {
        alert('कृपया पासवर्ड भर्नुहोस्।\nPlease enter Password.');
        document.getElementById('passwordInput').focus();
        return;
    }

    // Store login data
    const loginData = {
        submissionNo: submissionNo,
        username: username,
        loginTime: new Date().toISOString()
    };

    localStorage.setItem('excise_return_login', JSON.stringify(loginData));

    // Success message
    alert('सफलतापूर्वक लगइन भयो!\nLogin Successful!\n\nSubmission No: ' + submissionNo + '\nUsername: ' + username);
    
    // Redirect or load excise form
    window.location.href = 'excise_form.html';
}

// Update current date
function updateCurrentDate() {
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const now = new Date();
        const nepaliDate = convertToNepaliDate(now);
        dateElement.textContent = 'Date: ' + nepaliDate;
    }
}

// Simple Nepali date converter (placeholder)
function convertToNepaliDate(date) {
    return '2082.07.23';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCurrentDate();
    
    // Auto-expand active menu
    const activeLink = document.querySelector('.nav-link.active');
    if (activeLink) {
        const submenu = activeLink.nextElementSibling;
        if (submenu && submenu.classList.contains('submenu')) {
            submenu.style.display = 'block';
            activeLink.parentElement.classList.add('open');
        }
    }

    // Focus on first input
    document.getElementById('submissionNoInput').focus();

    // Add enter key support
    const inputs = document.querySelectorAll('.login-input');
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    loginExciseReturn();
                }
            }
        });
    });
});
