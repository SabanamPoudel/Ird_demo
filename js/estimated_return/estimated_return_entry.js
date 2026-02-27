function registerEstimatedReturn() {
    // Get form values
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const retypePassword = document.getElementById('retypePassword').value;
    const panNo = document.getElementById('panNo').value.trim();
    const fiscalYear = document.getElementById('fiscalYear').value;
    const email = document.getElementById('email').value.trim();
    const contactNo = document.getElementById('contactNo').value.trim();

    // Validation
    if (!username) {
        alert('कृपया प्रयोगकर्ताको नाम भर्नुहोस्।\nPlease enter username.');
        document.getElementById('username').focus();
        return;
    }

    if (!password) {
        alert('कृपया पासवर्ड भर्नुहोस्।\nPlease enter password.');
        document.getElementById('password').focus();
        return;
    }

    if (!retypePassword) {
        alert('कृपया पुनः पासवर्ड भर्नुहोस्।\nPlease re-enter password.');
        document.getElementById('retypePassword').focus();
        return;
    }

    if (password !== retypePassword) {
        alert('पासवर्ड मिलेन।\nPasswords do not match.');
        document.getElementById('retypePassword').focus();
        return;
    }

    if (!panNo) {
        alert('कृपया स्थायी लेखा नम्बर भर्नुहोस्।\nPlease enter PAN number.');
        document.getElementById('panNo').focus();
        return;
    }

    if (panNo.length !== 9) {
        alert('स्थायी लेखा नम्बर ९ अंकको हुनुपर्छ।\nPAN number must be 9 digits.');
        document.getElementById('panNo').focus();
        return;
    }

    if (!fiscalYear) {
        alert('कृपया आर्थिक बर्ष छान्नुहोस्।\nPlease select fiscal year.');
        document.getElementById('fiscalYear').focus();
        return;
    }

    if (!contactNo) {
        alert('कृपया सम्पर्क नम्बर भर्नुहोस्।\nPlease enter contact number.');
        document.getElementById('contactNo').focus();
        return;
    }

    if (contactNo.length !== 10) {
        alert('सम्पर्क नम्बर १० अंकको हुनुपर्छ।\nContact number must be 10 digits.');
        document.getElementById('contactNo').focus();
        return;
    }

    if (email && !validateEmail(email)) {
        alert('कृपया मान्य इमेल ठेगाना भर्नुहोस्।\nPlease enter a valid email address.');
        document.getElementById('email').focus();
        return;
    }

    // Generate submission number (timestamp + random)
    const submissionNo = Date.now().toString() + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    
    // Store data in localStorage
    const registrationData = {
        submissionNo: submissionNo,
        username: username,
        password: password,
        panNo: panNo,
        fiscalYear: fiscalYear,
        email: email,
        contactNo: contactNo,
        registrationDate: new Date().toISOString()
    };

    localStorage.setItem('estimated_return_registration_' + submissionNo, JSON.stringify(registrationData));

    // Redirect to success page with data
    window.location.href = 'estimated_return_success.html?submissionNo=' + submissionNo + 
                           '&username=' + encodeURIComponent(username) + 
                           '&panNo=' + encodeURIComponent(panNo);
}

function resetForm() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('retypePassword').value = '';
    document.getElementById('panNo').value = '';
    document.getElementById('fiscalYear').value = '';
    document.getElementById('email').value = '';
    document.getElementById('contactNo').value = '';
    
    document.getElementById('username').focus();
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Focus on first field
    document.getElementById('username').focus();
    
    // Add enter key support
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    registerEstimatedReturn();
                }
            }
        });
    });
});
