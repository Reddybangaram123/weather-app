import React from "react";

const WeatherCard = ({ weather }) => {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-8 mt-6 rounded-xl shadow-xl text-center w-96 mx-auto transition-transform transform hover:scale-105">
      <h2 className="text-3xl font-bold text-white drop-shadow-lg">
        {weather.name}, {weather.sys.india}
      </h2>

      <div className="flex flex-col items-center mt-4">
        {/* Weather Icon */}
        

        {/* Temperature */}
        <p className="text-6xl font-extrabold text-white drop-shadow-xl">
          {Math.round(weather.main.temp)}°C
        </p>

        {/* Weather Condition */}
        <p className="text-lg mt-2 capitalize text-white/90 font-medium">
          {weather.weather[0].description}
        </p>

        {/* Wind & Humidity */}
        <div className="flex justify-between w-full px-6 mt-4 text-white/80">
          <p className="text-md">
            💨 Wind: <span className="font-semibold">{weather.wind.speed} m/s</span>
          </p>
          <p className="text-md">
            💧 Humidity: <span className="font-semibold">{weather.main.humidity}%</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
