$(document).ready(function() {
    // Update date on page load
    updateDate();

    // Load saved PAN on page load
    loadSavedData();

    // Auto-fill fields when PAN is entered
    $('#pan').on('input', function() {
        const pan = $(this).val().trim();
        
        // Save PAN to sessionStorage
        sessionStorage.setItem('d01_pan', pan);
        
        // When PAN reaches 9 digits, auto-fill the fields
        if (pan.length === 9 && /^\d+$/.test(pan)) {
            // Auto-fill business name
            $('#businessName').val('PAN नम्बर भएको व्यक्ति/फर्मको नाम');
            
            // Auto-fill address
            $('#address').val('Company भएको Location');
            
            // Auto-fill mobile number with masked format
            $('#mobile').val('98XXXXXXXX');
            
            // Save all fields
            saveFormData();
        }
    });

    // Save other fields on input
    $('#businessName, #address, #mobile, #email').on('input', function() {
        saveFormData();
    });

    // Register button functionality
    $('#registerBtn').on('click', function(e) {
        e.preventDefault(); // Prevent any default behavior
        
        const username = $('#username').val().trim();
        const password = $('#password').val().trim();
        const confirmPassword = $('#confirmPassword').val().trim();
        const pan = $('#pan').val().trim();
        const email = $('#email').val().trim();
        const mobile = $('#mobile').val().trim();

        if (!username) {
            alert('कृपया प्रयोगकर्ताको नाम भर्नुहोस् । (Please enter Username)');
            return;
        }

        if (!password) {
            alert('कृपया पासवर्ड भर्नुहोस् । (Please enter Password)');
            return;
        }

        if (!confirmPassword) {
            alert('कृपया पुन: पासवर्ड भर्नुहोस् । (Please confirm Password)');
            return;
        }

        if (password !== confirmPassword) {
            alert('पासवर्ड मिलेन । (Passwords do not match)');
            return;
        }

        if (!pan) {
            alert('कृपया स्थायी लेखा नम्बर भर्नुहोस् । (Please enter PAN Number)');
            return;
        }

        if (pan.length !== 9 || !/^\d+$/.test(pan)) {
            alert('स्थायी लेखा नम्बर ९ अंकको हुनुपर्छ । (PAN must be 9 digits)');
            return;
        }

        if (!mobile) {
            alert('कृपया सम्पर्क नम्बर भर्नुहोस् । (Please enter Contact Number)');
            return;
        }

        if (mobile.length !== 10) {
            alert('सम्पर्क नम्बर १० अंकको हुनुपर्छ । (Contact number must be 10 digits)');
            return;
        }

        // Save to localStorage
        const exciseEntry = {
            username: username,
            password: password,
            pan: pan,
            mobile: mobile,
            email: email,
            registeredDate: new Date().toISOString()
        };

        let exciseEntries = JSON.parse(localStorage.getItem('exciseEntries') || '[]');
        exciseEntries.push(exciseEntry);
        localStorage.setItem('exciseEntries', JSON.stringify(exciseEntries));

        // Save current registration to sessionStorage for the next page
        sessionStorage.setItem('excise_current_registration', JSON.stringify(exciseEntry));

        // Redirect to Excise form page
        window.location.href = 'excise_form.html';
    });

    // Reset button functionality
    $('#resetBtn').on('click', function() {
        clearForm();
    });

    // Enter key support
    $('.form-control').on('keypress', function(e) {
        if (e.which === 13) {
            $('#registerBtn').click();
        }
    });
});

// Function to clear form
function clearForm() {
    $('#pan').val('');
    $('#businessName').val('');
    $('#address').val('');
    $('#mobile').val('');
    $('#email').val('');
    
    // Clear from sessionStorage
    sessionStorage.removeItem('d01_pan');
    sessionStorage.removeItem('d01_businessName');
    sessionStorage.removeItem('d01_address');
    sessionStorage.removeItem('d01_mobile');
    sessionStorage.removeItem('d01_email');
}

// Function to save form data
function saveFormData() {
    sessionStorage.setItem('d01_pan', $('#pan').val());
    sessionStorage.setItem('d01_businessName', $('#businessName').val());
    sessionStorage.setItem('d01_address', $('#address').val());
    sessionStorage.setItem('d01_mobile', $('#mobile').val());
    sessionStorage.setItem('d01_email', $('#email').val());
}

// Function to load saved data
function loadSavedData() {
    const savedPan = sessionStorage.getItem('d01_pan');
    const savedBusinessName = sessionStorage.getItem('d01_businessName');
    const savedAddress = sessionStorage.getItem('d01_address');
    const savedMobile = sessionStorage.getItem('d01_mobile');
    const savedEmail = sessionStorage.getItem('d01_email');
    
    if (savedPan) $('#pan').val(savedPan);
    if (savedBusinessName) $('#businessName').val(savedBusinessName);
    if (savedAddress) $('#address').val(savedAddress);
    if (savedMobile) $('#mobile').val(savedMobile);
    if (savedEmail) $('#email').val(savedEmail);
}

// Function to convert AD to BS (Bikram Sambat)
function convertADtoBS(adDate) {
    const adYear = adDate.getFullYear();
    const adMonth = adDate.getMonth() + 1;
    const adDay = adDate.getDate();
    
    let bsYear = adYear + 57;
    let bsMonth = adMonth + 8;
    let bsDay = adDay + 14;
    
    if (bsMonth > 12) {
        bsMonth -= 12;
    }
    
    if (adMonth <= 4) {
        bsYear = adYear + 56;
    }
    
    const daysInMonth = 30;
    if (bsDay > daysInMonth) {
        bsDay -= daysInMonth;
        bsMonth += 1;
        if (bsMonth > 12) {
            bsMonth = 1;
            bsYear += 1;
        }
    }
    
    return bsYear + '.' + String(bsMonth).padStart(2, '0') + '.' + String(bsDay).padStart(2, '0');
}

// Update date display
function updateDate() {
    const today = new Date();
    const bsDate = convertADtoBS(today);
    const dateLabel = $('#currentDate');
    if (dateLabel.length) {
        dateLabel.text('Date: ' + bsDate);
    }
}

// Toggle menu function
function toggleMenu(element) {
    const $element = $(element);
    const $submenu = $element.siblings('.submenu');
    
    if ($submenu.length) {
        $submenu.slideToggle(200);
        $submenu.toggleClass('show');
    }
}

// Function to load page in parent iframe (for navigation from D-01 to other forms)
function loadInParentIframe(url) {
    // Check if this page is opened in a new window/tab (not in iframe)
    if (window.opener) {
        // Opened via window.open(), close current window and load in opener's iframe
        window.opener.postMessage({
            action: 'loadContent',
            url: url
        }, '*');
        window.close();
    } else if (window.parent !== window) {
        // Opened in iframe, navigate parent to taxpayer portal with the new content
        window.parent.location.href = '../taxpayer_portal.html#' + url;
    } else {
        // Standalone window, redirect to taxpayer portal
        window.location.href = '../taxpayer_portal.html#' + url;
    }
}
