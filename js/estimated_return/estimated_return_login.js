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

    // Demo credentials for testing
    const validSubmission = '123456789012';
    const validUsername = 'demo';
    const validPassword = 'demo123';

    if (submissionNo === validSubmission && username === validUsername && password === validPassword) {
        alert('सफलतापूर्वक लगइन भयो!\nLogin Successful!\n\nEstimated Return Entry page will be loaded.');
        // Redirect to estimated return entry page when available
        // window.location.href = 'estimated_return_entry.html';
    } else {
        alert('अवैध सब्मिशन नं., प्रयोगकर्ताको नाम वा पासवर्ड।\nInvalid Submission Number, Username or Password.\n\nDemo Credentials:\nSubmission No: 123456789012\nUsername: demo\nPassword: demo123');
    }
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
