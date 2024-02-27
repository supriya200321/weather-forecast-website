document.addEventListener('DOMContentLoaded', function () {
    const cityInput = document.getElementById('cityInput');
    const searchBtn = document.getElementById('searchBtn');
    const weatherCards = document.getElementById('weatherCards');
    const locationBtn = document.getElementById('locationBtn');

    const API_KEY = 'e61285ebc1c7ccc789f67be0179b0f94'; // Replace with your OpenWeatherMap API key

    searchBtn.addEventListener('click', function () {
        const cityName = cityInput.value.trim();
        if (cityName === '') return;

        getWeather(cityName);
    });

    locationBtn.addEventListener('click', function () {
        getUserLocation();
    });

    function getWeather(location) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    function getUserLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                position => {
                    const latitude = position.coords.latitude;
                    const longitude = position.coords.longitude;

                    getWeatherByCoordinates(latitude, longitude);
                },
                error => {
                    console.error('Error getting user location:', error);
                }
            );
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    }

    function getWeatherByCoordinates(latitude, longitude) {
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    }

    function displayWeather(data) {
        weatherCards.innerHTML = '';

        for (let i = 0; i < data.list.length; i += 8) {
            const forecast = data.list[i];
            const date = new Date(forecast.dt * 1000);
            const day = date.toLocaleDateString('en-US', { weekday: 'short' });

            const card = document.createElement('div');
            card.classList.add('card');

            card.innerHTML = `
                <h3>${day}</h3>
                <p>${date.toLocaleDateString()}</p>
                <p>Temperature: ${forecast.main.temp} °C</p>
                <p>Wind: ${forecast.wind.speed} m/s</p>
                <p>Humidity: ${forecast.main.humidity} %</p>
            `;

            weatherCards.appendChild(card);
        }
    }
});
