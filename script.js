async function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "f0b9f622e86efa07a36e2abbad013fb0";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);

        if (data.cod === 200) {
            const iconCode = data.weather[0].icon;
            const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
            const condition = data.weather[0].main.toLowerCase();

            let bgColor;
            if (condition.includes("clear")) {
                bgColor = "linear-gradient(to right, #fbc2eb, #a6c1ee)";
            } else if (condition.includes("cloud")) {
                bgColor = "linear-gradient(to right, #bdc3c7, #2c3e50)";
            } else if (condition.includes("rain")) {
                bgColor = "linear-gradient(to right, #00c6ff, #0072ff)";
            } else if (condition.includes("snow")) {
                bgColor = "linear-gradient(to right, #e0eafc, #cfdef3)";
            } else {
                bgColor = "linear-gradient(to right, #4facfe, #00f2fe)";
            }

            document.body.style.background = bgColor;

            document.getElementById("weather").innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="${iconUrl}" alt="${data.weather[0].description}">
                <p>🌡 Temperature: ${data.main.temp} °C</p>
                <p>☁ Condition: ${data.weather[0].description}</p>
                <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
            `;
        } else {
            document.getElementById("weather").innerHTML = `<p>City not found!</p>`;
        }
    } catch (error) {
        document.getElementById("weather").innerHTML = `<p>Error fetching data.</p>`;
    }
}