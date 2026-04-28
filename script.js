async function getWeather() {
    const city = document.getElementById("city").value; // Gets the city name typed by user
    const apiKey = "f0b9f622e86efa07a36e2abbad013fb0"; // Your personal key from OpenWeatherMap
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    // Builds the request URL with city + API key

    try {
        const response = await fetch(url); // Sends request to OpenWeatherMap
        const data = await response.json(); console.log(data);
        // Converts response into usable JSON

    if (data.cod === 200) {
  const iconCode = data.weather[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  const condition = data.weather[0].main.toLowerCase(); // e.g. "Clear", "Rain", "Snow"

  // Change background based on condition
  let bgColor;
  if (condition.includes("clear")) {
    bgColor = "linear-gradient(to right, #fbc2eb, #a6c1ee)"; // sunny
  } else if (condition.includes("cloud")) {
    bgColor = "linear-gradient(to right, #bdc3c7, #2c3e50)"; // cloudy
  } else if (condition.includes("rain")) {
    bgColor = "linear-gradient(to right, #00c6ff, #0072ff)"; // rainy
  } else if (condition.includes("snow")) {
    bgColor = "linear-gradient(to right, #e0eafc, #cfdef3)"; // snowy
  } else {
    bgColor = "linear-gradient(to right, #4facfe, #00f2fe)"; // default
  }

  document.body.style.background = bgColor;

  document.getElementById("weather").innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <img src="${iconUrl}" alt="${data.weather[0].description}">
    <p>🌡 Temperature: ${data.main.temp} °C</p>
    <p>☁ Condition: ${data.weather[0].description}</p>
    <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
  `;
}
   


    else {
            document.getElementById("weather").innerHTML = `<p>City not found!</p>`;
        }
    } catch (error) {
        document.getElementById("weather").innerHTML = `<p>Error fetching data.</p>`;
    }
}




async function getForecast(city, apiKey) {
  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "200") {
      let forecastHTML = "<h3>Upcoming Forecast</h3><div class='forecast'>";

      // Show the first 5 forecast entries (3-hour intervals)
      data.list.slice(0, 5).forEach(item => {
        const dateTime = new Date(item.dt_txt).toLocaleString();
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        forecastHTML += `
          <div class="day">
            <p>${dateTime}</p>
            <img src="${iconUrl}" alt="${item.weather[0].description}">
            <p>${item.main.temp} °C</p>
            <p>${item.weather[0].description}</p>
          </div>
        `;
      });

      forecastHTML += "</div>";
      document.getElementById("forecast").innerHTML = forecastHTML;
    }
  } catch (error) {
    document.getElementById("forecast").innerHTML = "<p>Error loading forecast.</p>";
  }
}
