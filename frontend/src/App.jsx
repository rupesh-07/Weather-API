import React, { useState } from "react";
import "./app.css";
import axios from "axios";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    // Clear previous weather data and error
    setWeather(null);
    setError(null);

    try {
      const response = await axios.get(
        // `http://localhost:5000/api/weather?city=${city}`
        `https://weather-api-backend-zbcc.onrender.com/api/weather?city=${city}`
      );

      // console.log(response.data);

      if (response.data && response.data.main) {
        setWeather(response.data);
      } else {
        throw new Error("Invalid data structure");
      }
    } catch (err) {
      // console.error(err);
      setError("City not found");
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value.toUpperCase())}
        placeholder="Enter city name"
      />
      <button onClick={fetchWeather}>Get Weather</button>

      {error && <p className="error-msg">{error}</p>}

      {weather && (
        <div className="weather-info">
          <h2>{weather.name}</h2>
          <p>Temperature: {weather.main.temp} °C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <p>Humidity: {weather.main.humidity} %</p>
        </div>
      )}
    </div>
  );
}

export default App;
