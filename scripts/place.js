// Static weather data 
const temperature = 28; // °C
const windSpeed = 10; // km/h

// Function to calculate wind chill factor
function calculateWindChill(temp, wind) {
    // Wind chill formula for Celsius: 13.12 + 0.6215*T - 11.37*(V^0.16) + 0.3965*T*(V^0.16)
    // Where T = temperature in °C, V = wind speed in km/h
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(wind, 0.16) + 0.3965 * temp * Math.pow(wind, 0.16);
}

// Function to display wind chill
function displayWindChill() {
    const windChillElement = document.getElementById('wind-chill');
    
    // Check conditions for viable wind chill calculation
    // Metric: Temperature <= 10°C AND Wind speed > 4.8 km/h
    if (temperature <= 10 && windSpeed > 4.8) {
        const windChill = calculateWindChill(temperature, windSpeed);
        windChillElement.textContent = `${Math.round(windChill)}°C`;
    } else {
        windChillElement.textContent = 'N/A';
    }
}

// Function to update footer information
function updateFooter() {
    // Set current year
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
    
    // Set last modified date
    const lastModified = document.lastModified;
    document.getElementById('last-modified').textContent = lastModified;
}


function initializePage() {
    updateFooter();
    displayWindChill();
}


document.addEventListener('DOMContentLoaded', initializePage);


initializePage();