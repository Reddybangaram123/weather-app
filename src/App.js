import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./components/WeatherCard";

const App = () => {
  const [location, setLocation] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if (!location) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const API_KEY = "4154c58b9da9483e1242b155c33c1c1e";

      // Step 1: Convert location (city/village) to coordinates
      const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${location},IN&limit=1&appid=${API_KEY}`;
      const geoResponse = await axios.get(geoUrl);
      if (geoResponse.data.length === 0) {
        throw new Error("Location not found. Try a different name.");
      }

      const { lat, lon, name } = geoResponse.data[0];

      // Step 2: Fetch Weather using Latitude & Longitude
      const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      const weatherResponse = await axios.get(weatherUrl);

      setWeather({ ...weatherResponse.data, locationName: name });
    } catch (err) {
      setError(err.message || "Error fetching weather data.");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 to-purple-700 p-6">
      {/* Glassmorphic Card */}
      <div className="bg-white/20 backdrop-blur-md rounded-lg shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-lg">
          Weather App 🌤️
        </h1>

        {/* Search Box */}
        <div className="mt-5 flex gap-3">
          <input
            type="text"
            placeholder="Enter city or village"
            className="px-5 py-3 border border-white/50 bg-white/30 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white placeholder-white/70 w-full"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-500 transition-all duration-300 shadow-md"
          >
            Search
          </button>
        </div>

        {/* Status Messages */}
        {loading && <p className="mt-5 text-white animate-pulse">Loading...</p>}
        {error && <p className="mt-5 text-red-300 font-semibold">{error}</p>}

        {/* Weather Card */}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </div>
  );
};

export default App;
