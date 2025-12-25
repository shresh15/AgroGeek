import React, { useState, useEffect } from "react";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import BgVideo from "./BgVideo";

const API_KEY = "bd5e378503939ddaee76f12ad7a97608"; // your key

const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState("New York");
  const [error, setError] = useState("");

  const getWeatherEmoji = (desc) => {
    const d = desc.toLowerCase();
    if (d.includes("clear")) return "☀️";
    if (d.includes("cloud")) return "☁️";
    if (d.includes("rain")) return "🌧️";
    if (d.includes("thunder")) return "⛈️";
    if (d.includes("snow")) return "❄️";
    if (d.includes("mist") || d.includes("fog")) return "🌫️";
    return "🌍";
  };

  const fetchWeather = async (searchCity = city) => {
    try {
      setError("");

      // 🌤 Current Weather
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${API_KEY}`
      );
      const data = await res.json();
      if (data.cod !== 200) throw new Error(data.message);
      setWeatherData(data);

      // 📅 5-day Forecast (FREE API)
      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${data.coord.lat}&lon=${data.coord.lon}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      // Pick 1 forecast per day (every 24 hrs)
      const daily = forecastData.list.filter((_, i) => i % 8 === 0);
      setForecast(daily);
    } catch (err) {
      setError(err.message || "Failed to fetch weather");
    }
  };

  const fetchWeatherByLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;

        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          const data = await res.json();
          setWeatherData(data);
          setCity(data.name);

          const forecastRes = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          );
          const forecastData = await forecastRes.json();
          setForecast(forecastData.list.filter((_, i) => i % 8 === 0));
        } catch (err) {
          setError("Unable to fetch weather");
        }
      },
      () => alert("Location access denied")
    );
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="relative min-h-screen">
      <BgVideo />

      {/* CONTENT */}
      <div className="relative z-10 flex flex-col items-center p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">Weather Forecast</h1>

        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input
            className="p-2 rounded text-black"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city"
          />
          <button
            onClick={() => fetchWeather(city)}
            className="bg-blue-600 px-4 py-2 rounded"
          >
            Search
          </button>
          <button
            onClick={fetchWeatherByLocation}
            className="bg-green-600 px-4 py-2 rounded"
          >
            📍 Location
          </button>
        </div>

        {error && <p className="text-red-400">{error}</p>}

        {/* Current Weather */}
        {weatherData && (
          <div className="bg-black/50 p-6 rounded-lg text-center w-80">
            <h2 className="text-xl font-semibold">{weatherData.name}</h2>
            <p className="text-lg">
              {getWeatherEmoji(weatherData.weather[0].description)}{" "}
              {weatherData.weather[0].description}
            </p>
            <p className="text-4xl font-bold">
              {Math.round(weatherData.main.temp)}°C
            </p>

            <div className="flex justify-between mt-4">
              <div className="flex items-center">
                <WiHumidity size={28} />
                <span>{weatherData.main.humidity}%</span>
              </div>
              <div className="flex items-center">
                <WiStrongWind size={28} />
                <span>{weatherData.wind.speed} m/s</span>
              </div>
            </div>
          </div>
        )}

        {/* Forecast */}
        <h2 className="text-2xl mt-8 mb-4">Next Days</h2>
        <div className="flex gap-4 overflow-x-auto">
          {forecast.map((day, i) => (
            <div
              key={i}
              className="bg-black/50 p-4 rounded-lg min-w-[120px] text-center"
            >
              <p>{new Date(day.dt * 1000).toLocaleDateString()}</p>
              <p className="text-2xl">
                {getWeatherEmoji(day.weather[0].description)}
              </p>
              <p className="font-bold">{Math.round(day.main.temp)}°C</p>
              <p className="text-sm">{day.weather[0].description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Weather;
