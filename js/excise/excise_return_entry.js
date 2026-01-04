$(document).ready(function() {
    // Update date on page load
    updateDate();

    // Load registration data from sessionStorage
    loadRegistrationData();

    // Form is ready to use - no validation or registration checks
    console.log('Excise form loaded successfully');
});

// Function to load registration data
function loadRegistrationData() {
    const registrationData = sessionStorage.getItem('excise_current_registration');
    
    if (registrationData) {
        const data = JSON.parse(registrationData);
        
        // Populate PAN field with registered PAN
        if (data.pan) {
            $('#pan').val(data.pan);
        }
        
        // Populate company name with registered username
        if (data.username) {
            $('#companyName').text(data.username);
        }
        
        // Populate address
        if (data.address) {
            $('#address').text(data.address);
        }
        
        // Populate phone number
        if (data.mobile) {
            $('#phoneNumber').text(data.mobile + ',');
        }
    }
}

// Function to update current date
function updateDate() {
    const today = new Date();
    const bsDate = convertADtoBS(today);
    $('#currentDate').text('Date: ' + bsDate);
}

// Simple AD to BS conversion function (approximate)
function convertADtoBS(adDate) {
    const year = adDate.getFullYear() + 57;
    const month = adDate.getMonth() + 1;
    const day = adDate.getDate();
    
    const bsMonths = ['बैशाख', 'जेष्ठ', 'असार', 'श्रावण', 'भाद्र', 'आश्विन', 'कार्तिक', 'मंसिर', 'पुष', 'माघ', 'फाल्गुन', 'चैत्र'];
    
    return `${year}.${String(month).padStart(2, '0')}.${String(day).padStart(2, '0')}`;
}
