const apiKey = 'key';
const baseUrl = 'https://api.openweathermap.org/data/2.5/weather';

// Check if a cached location is available
const cachedLocation = localStorage.getItem("lastLocation");

if (cachedLocation) {
    // Use the cached location
    const location = JSON.parse(cachedLocation);
    console.log("Using cached location:", location);
    showWeather(location);
} else if (navigator.geolocation) {
    // Attempt to get the current location if no cached data exists
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const location = { lat: latitude, lon: longitude };
            localStorage.setItem("lastLocation", JSON.stringify(location)); // Cache location
            showWeather(location);
        },
        (error) => {
            console.error("Geolocation error:", error.message);
            if (localStorage.getItem("lastLocation")) {
                const cachedLocation = JSON.parse(localStorage.getItem("lastLocation"));
                showWeather(cachedLocation); // Attempt to use cached location if available
            } else {
                showError("Unable to retrieve location, and no cached location is available.");
            }
        }
    );
} else {
    // Handle case where geolocation is not supported
    alert("Geolocation is not supported by this browser.");
    showError("Geolocation and cached location are unavailable.");
}

function showWeather(location) {
    const { lat, lon } = location;
    const url = `${baseUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            // Format sunrise and sunset times
            const sunriseTime = formatTime(new Date(data.sys.sunrise * 1000));
            const sunsetTime = formatTime(new Date(data.sys.sunset * 1000));

            // Get the weather icon URL
            const weatherIcon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

            const weatherHtml = `
            <div class="weather-widget">
                <div class="main-weather">
                    <div class="left">
                        <div class="location-name">
                            <div class="icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
                                </svg>
                            </div>
                            <span>${data.name}</span>
                            <span class="muted">${data.sys.country}</span>
                        </div>
                        <div class="temperature-wrapper">
                            <div class="main-temperature">${data.main.temp.toFixed(0)}°C</div>
                            <div class="weather-description">
                                <span>${data.weather[0].description}</span>
                            </div>
                            <div class="temperature-description">
                                <span>${data.main.temp_min.toFixed(0)}°/${data.main.temp_max.toFixed(0)}°</span>
                                <span>Feels like ${data.main.feels_like.toFixed(0)}°C</span>
                            </div>
                        </div>
                    </div>
                    <div class="right">
                        <div class="weather-icon">
                            <img src="${weatherIcon}" alt="${data.weather[0].description}">
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="chip">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrows-collapse" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13A.5.5 0 0 1 1 8m7-8a.5.5 0 0 1 .5.5v3.793l1.146-1.147a.5.5 0 0 1 .708.708l-2 2a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7.5 4.293V.5A.5.5 0 0 1 8 0m-.5 11.707-1.146 1.147a.5.5 0 0 1-.708-.708l2-2a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 11.707V15.5a.5.5 0 0 1-1 0z"/>
                            </svg>
                        </div>
                        <span>${data.main.pressure} mb</span>
                    </div>
                    <div class="chip">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-droplet-fill" viewBox="0 0 16 16">
                                <path d="M8 16a6 6 0 0 0 6-6c0-1.655-1.122-2.904-2.432-4.362C10.254 4.176 8.75 2.503 8 0c0 0-6 5.686-6 10a6 6 0 0 0 6 6M6.646 4.646l.708.708c-.29.29-1.128 1.311-1.907 2.87l-.894-.448c.82-1.641 1.717-2.753 2.093-3.13"/>
                            </svg>
                        </div>
                        <span>${data.main.humidity}%</span>
                    </div>
                    <div class="chip">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                            </svg>
                        </div>
                        <span>${(data.visibility/1000).toFixed(2)} km</span>
                    </div>
                </div>
            </div>
            <div class="wrapper-row">
                <div class="compass-wrapper">
                    <header>
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-wind" viewBox="0 0 16 16">
                                <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </div>
                        <span>Wind</span>
                        <span class="muted">${(data.wind.speed*3.6).toFixed(2)} km/h</span>
                    </header>
                    <div id="compass">
                        <div class="directions">
                            <span class="north">N</span>
                            <span class="east">E</span>
                            <span class="south">S</span>
                            <span class="west">W</span>
                        </div>
                        <div class="ticks"></div>
                        <div id="needle"></div>
                    </div>
                </div>
                <div class="weather-sa-widget-wrapper">
                    <div class="weather-sa-widget">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sunrise-fill" viewBox="0 0 16 16">
                                <path d="M7.646 1.146a.5.5 0 0 1 .708 0l1.5 1.5a.5.5 0 0 1-.708.708L8.5 2.707V4.5a.5.5 0 0 1-1 0V2.707l-.646.647a.5.5 0 1 1-.708-.708zM2.343 4.343a.5.5 0 0 1 .707 0l1.414 1.414a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707m11.314 0a.5.5 0 0 1 0 .707l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0M11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </div>
                        <span>${sunriseTime}</span>
                    </div>
                    <div class="weather-sa-widget">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sunset-fill" viewBox="0 0 16 16">
                                <path d="M7.646 4.854a.5.5 0 0 0 .708 0l1.5-1.5a.5.5 0 0 0-.708-.708l-.646.647V1.5a.5.5 0 0 0-1 0v1.793l-.646-.647a.5.5 0 1 0-.708.708zm-5.303-.51a.5.5 0 0 1 .707 0l1.414 1.413a.5.5 0 0 1-.707.707L2.343 5.05a.5.5 0 0 1 0-.707zm11.314 0a.5.5 0 0 1 0 .706l-1.414 1.414a.5.5 0 1 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zM11.709 11.5a4 4 0 1 0-7.418 0H.5a.5.5 0 0 0 0 1h15a.5.5 0 0 0 0-1h-3.79zM0 10a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 0 10m13 0a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                            </svg>
                        </div>
                        <span>${sunsetTime}</span>
                    </div>
                    <div class="weather-sa-widget">
                        <div class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloudy-fill" viewBox="0 0 16 16">
                                <path d="M13.405 7.027a5.001 5.001 0 0 0-9.499-1.004A3.5 3.5 0 1 0 3.5 13H13a3 3 0 0 0 .405-5.973"/>
                            </svg>
                        </div>
                        <span>${data.clouds.all} %</span>
                    </div>
                </div>
            </div>
            `;

            // Update the weather UI
            document.getElementById('weather-widget-wrapper').innerHTML = weatherHtml;
            
            // Set the wind direction on a compass
            setTimeout(() => setCompass(data.wind.deg), 100);

            // Load compass ticks
            loadTicks();
        })
        .catch(error => console.error('Error fetching weather data:', error));
}

// Format time (hours:minutes) from a Date object
function formatTime(date) {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}

// Handle geolocation errors
function showError(message) {
    console.error('Geolocation error:', message);
}

// Set the compass direction based on wind degree
function setCompass(windDeg) {
    const needle = document.getElementById('needle');
    if (needle) {
        needle.style.transform = `rotate(${windDeg}deg)`;
    }
}

function loadTicks() {
    const ticksContainer = document.querySelector('.ticks');
    if (!ticksContainer) return;

    for (let i = 0; i < 360; i += 15) {
        if (i % 90 === 0) continue; // Skip every 90 degrees
        const tick = document.createElement('div');
        tick.classList.add('tick');
        if (i % 30 === 0) tick.classList.add('long');
        tick.style.transform = `rotate(${i}deg)`;
        ticksContainer.appendChild(tick);
    }
}

// function getWindDirection(degree) {
//     const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
//     const index = Math.round(degree / 45) % 8;
//     return directions[index];
// }
