function loginEstimatedReturn() {
    const submissionNo = document.getElementById('submissionNoInput').value.trim();
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();

    // Validation
    if (!submissionNo) {
        alert('कृपया सब्मिशन नं. प्रविष्ट गर्नुहोस्।\nPlease enter Submission Number.');
        document.getElementById('submissionNoInput').focus();
        return;
    }

    if (!username) {
        alert('कृपया प्रयोगकर्ताको नाम प्रविष्ट गर्नुहोस्।\nPlease enter Username.');
        document.getElementById('usernameInput').focus();
        return;
    }

    if (!password) {
        alert('कृपया पासवर्ड प्रविष्ट गर्नुहोस्।\nPlease enter Password.');
        document.getElementById('passwordInput').focus();
        return;
    }

    // Allow any submission number - redirect to form
    // Get PAN number from localStorage if available, otherwise use submission number
    const storedDataKey = 'estimated_return_registration_' + submissionNo;
    const storedData = localStorage.getItem(storedDataKey);
    let panNo = submissionNo; // Default to submission number
    
    if (storedData) {
        const registrationData = JSON.parse(storedData);
        panNo = registrationData.panNo || submissionNo;
    }
    
    // Redirect to form with iframe
    window.location.href = `estimated_return_main.html?submissionNo=${submissionNo}&username=${username}&panNo=${panNo}`;
}

// Add Enter key support
document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.login-input');
    inputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                loginEstimatedReturn();
            }
        });
    });
});
