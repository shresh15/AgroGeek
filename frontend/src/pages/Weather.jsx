import React, { useState, useEffect } from "react";
import { WiHumidity, WiStrongWind } from "react-icons/wi";
import BgVideo from "./BgVideo";

const API_KEY = "bd5e378503939ddaee76f12ad7a97608"; // Replace with your API key

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [weeklyForecast, setWeeklyForecast] = useState([]);
    const [city, setCity] = useState("New York"); // Default city

    // Function to map weather conditions to emojis
    const getWeatherEmoji = (condition) => {
        if (condition.includes("clear")) return "☀️";
        if (condition.includes("few clouds")) return "🌤️";
        if (condition.includes("clouds")) return "☁️";
        if (condition.includes("rain")) return "🌧️";
        if (condition.includes("thunderstorm")) return "⛈️";
        if (condition.includes("snow")) return "❄️";
        if (condition.includes("mist") || condition.includes("fog")) return "🌫️";
        return "❓"; // Default emoji for unknown weather
    };

    // Fetch Weather Data by City Name
    const fetchWeather = async (searchCity = city) => {
        try {
            const res = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&units=metric&appid=${API_KEY}`
            );
            const data = await res.json();
            setWeatherData(data);

            // Fetch 7-Day Forecast
            const forecastRes = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${data.coord.lat}&lon=${data.coord.lon}&cnt=7&units=metric&appid=${API_KEY}`
            );
            const forecastData = await forecastRes.json();
            setWeeklyForecast(forecastData.list);
        } catch (error) {
            console.error("Error fetching weather data", error);
        }
    };

    // Fetch Weather Data by Current Location
    const fetchWeatherByLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const { latitude, longitude } = position.coords;
                    try {
                        const res = await fetch(
                            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
                        );
                        const data = await res.json();
                        setWeatherData(data);
                        setCity(data.name);

                        // Fetch 7-Day Forecast
                        const forecastRes = await fetch(
                            `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=7&units=metric&appid=${API_KEY}`
                        );
                        const forecastData = await forecastRes.json();
                        setWeeklyForecast(forecastData.list);
                    } catch (error) {
                        console.error("Error fetching weather data", error);
                    }
                },
                (error) => {
                    console.error("Geolocation error:", error);
                    alert("Unable to access location. Please allow location access.");
                }
            );
        } else {
            alert("Geolocation is not supported by your browser.");
        }
    };

    useEffect(() => {
        fetchWeather();
    }, []);

    return (
        <div
            className="flex flex-col items-center bg-gray-100 min-h-screen p-4"
            style={{}}
        >
            <BgVideo />
            <div
                style={{ position: "relative" }}
                className="flex flex-col justify-center items-center top-20"
            >
                <h1 className="text-2xl font-semibold mb-4">Weather Forecast</h1>

                {/* Search Bar & Current Location Button */}
                <div className="mb-4 flex space-x-2">
                    <input
                        type="text"
                        className="border p-2 rounded"
                        placeholder="Enter City Name"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <button
                        onClick={() => fetchWeather(city)}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Search
                    </button>
                    <button
                        onClick={fetchWeatherByLocation}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        📍 Use Current Location
                    </button>
                </div>

                {/* Current Weather */}
                {weatherData && (
                    <div className="bg-white p-4 rounded shadow-md w-80 text-center">
                        <h2 className="text-xl font-semibold">{weatherData.name}</h2>
                        <p className="text-gray-600">
                            {weatherData.weather[0].description}
                        </p>
                        <p className="text-3xl font-bold">{weatherData.main.temp}°C</p>
                        <div className="flex justify-center mt-2">
                            <WiHumidity className="text-blue-500 text-2xl mr-2" />
                            <p>Humidity: {weatherData.main.humidity}%</p>
                        </div>
                        <div className="flex justify-center mt-2">
                            <WiStrongWind className="text-gray-500 text-2xl mr-2" />
                            <p>Wind: {weatherData.wind.speed} m/s</p>
                        </div>
                    </div>
                )}

                {/* Weekly Forecast */}
                <h2 className="text-xl font-semibold mt-6">Weekly Forecast</h2>
                <div className="flex overflow-x-scroll mt-4 space-x-4 p-4">
                    {weeklyForecast.map((day, index) => (
                        <div
                            key={index}
                            className="bg-white p-3 rounded shadow-md min-w-[120px] text-center"
                        >
                            <p className="font-semibold">
                                {new Date(day.dt * 1000).toLocaleDateString()}
                            </p>
                            <p className="text-2xl">
                                {getWeatherEmoji(day.weather[0].description)}
                            </p>{" "}
                            {/* ✅ Emoji */}
                            <p className="text-lg font-bold">{Math.round(day.temp.day)}°C</p>
                            <p className="text-gray-600">{day.weather[0].description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Weather;
