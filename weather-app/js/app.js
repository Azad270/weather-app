// Function to fetch weather data from OpenWeatherMap API
async function fetchWeatherData(city) {
    const apiKey = '0c711ab2ab2a118c7089be0ecacd48d6'; // Replace with your API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);

        // Check if the response is valid
        if (!response.ok) {
            throw new Error('City not found');
        }

        // Parse JSON response
        const data = await response.json();
        console.log('Weather data:', data);

        // Display weather details on the webpage
        document.getElementById('weather-result').innerHTML = `
            <h3>Weather in ${data.name}, ${data.sys.country}</h3>
            <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
            <p><strong>Condition:</strong> ${data.weather[0].description}</p>
            <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
            <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
        `;

    } catch (error) {
        // Handle errors gracefully
        document.getElementById('weather-result').innerHTML = `
            <p style="color:red;">Error: ${error.message}</p>
        `;
        console.error('Error fetching weather data:', error);
    }
}

// Event listener for Search button
document.getElementById('search-btn').addEventListener('click', function() {
    const city = document.getElementById('city-input').value.trim();
    console.log('City entered:', city); // Keep your console log for debugging

    if (city) {
        fetchWeatherData(city); // Call the function with the entered city
    } else {
        document.getElementById('weather-result').innerHTML =
            "<p style='color:red;'>Please enter a city name.</p>";
    }
});
