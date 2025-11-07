import React, { useEffect, useState } from "react";
import {
  Sun,
  CloudRain,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  ThermometerSun,
  ThermometerSnowflake,
  SunMedium,
  Sprout,
  CalendarDays,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

// --- Helper Functions ---

const formatFullDate = (dateString) => {
  const options = { weekday: "long", month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const formatShortDate = (dateString) => {
  const options = { month: "short", day: "numeric" };
  return new Date(dateString).toLocaleDateString("en-US", options);
};

const getDayLabel = (dateString, index) => {
  if (index === 0) return "Today";
  if (index === 1) return "Tomorrow";
  return formatShortDate(dateString);
};

const formatTime = (dateString) => {
  if (!dateString) return "-";
  const options = { hour: "2-digit", minute: "2-digit", hour12: true };
  return new Date(dateString).toLocaleTimeString("en-US", options);
};

// Icon Mapper
const WeatherIcon = ({ code }) => {
  if (code === 1000) {
    return <Sun className="h-20 w-20 sm:h-24 sm:w-24 text-yellow-500" />;
  }
  if (code >= 1100 && code <= 2100) {
    return <CloudRain className="h-20 w-20 sm:h-24 sm:w-24 text-blue-400" />;
  }
  return <Sun className="h-20 w-20 sm:h-24 sm:w-24 text-yellow-500" />;
};

// Small detail card
const DetailCard = ({ icon: Icon, label, value, unit }) => (
  <div className="bg-lime-50 p-4 rounded-xl shadow-sm flex items-center gap-3">
    <div className="flex-shrink-0 p-2 bg-white rounded-full shadow">
      <Icon className="h-6 w-6 text-green-700" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-xl font-bold text-gray-900">
        {value !== undefined && value !== null ? value : "-"}
        {unit && <span className="text-sm font-normal ml-1">{unit}</span>}
      </p>
    </div>
  </div>
);

const Weatherdashboard = ({ plotLocation }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // ✅ Extract lat/lon dynamically from location string (like "23.8315,91.2868")
  const parseLocation = (location) => {
    try {
      const [lat, lon] = location.split(",").map((val) => val.trim());
      return `${lat},${lon}`;
    } catch {
      return "23.8315,91.2868"; // fallback
    }
  };

  const getWeatherData = async () => {
    try {
      const coords = parseLocation(plotLocation);
      const response = await axios.get(
        `https://api.tomorrow.io/v4/weather/forecast?location=${coords}&timesteps=daily&apikey=YjaVzKQCLW8W0AO0rtxawrQMxlC43LTv`
      );
      setWeatherData(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch weather data.");
    }
  };

  useEffect(() => {
    if (plotLocation) getWeatherData();
  }, [plotLocation]);

  if (!weatherData || !weatherData.timelines) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-lime-50">
        <p className="text-green-700 font-semibold text-lg">
          Loading weather data for your plot...
        </p>
      </div>
    );
  }

  const dailyForecasts = weatherData.timelines.daily;
  const selectedDay = dailyForecasts[selectedDayIndex].values;

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Farm Weather Forecast
          </h2>
          {weatherData.location && (
            <p className="mt-2 text-lg text-gray-600">
              Location:{" "}
              {weatherData.location.lat.toFixed(2)},{" "}
              {weatherData.location.lon.toFixed(2)}
            </p>
          )}
        </div>

        {/* Day Tabs */}
        <div className="flex space-x-2 p-1 bg-white rounded-xl shadow-md overflow-x-auto mb-6">
          {dailyForecasts.map((day, index) => (
            <button
              key={day.time}
              onClick={() => setSelectedDayIndex(index)}
              className={`flex-1 min-w-max flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold rounded-lg transition-all
                ${
                  selectedDayIndex === index
                    ? "bg-green-600 text-white shadow-lg"
                    : "text-gray-700 hover:bg-lime-50"
                }`}
            >
              <CalendarDays className="h-4 w-4" />
              {getDayLabel(day.time, index)}
            </button>
          ))}
        </div>

        {/* Main Weather Overview */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-6 bg-gradient-to-br from-green-500 to-lime-400 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <WeatherIcon code={selectedDay.weatherCodeMax} />
              <div>
                <p className="text-lg font-medium">
                  {formatFullDate(dailyForecasts[selectedDayIndex].time)}
                </p>
                <p className="text-4xl font-extrabold">
                  {Math.round(selectedDay.temperatureApparentAvg)}°C
                </p>
                <p className="text-lg font-medium">Feels Like</p>
              </div>
            </div>
            <div className="flex sm:flex-col gap-4 sm:gap-2 text-right">
              <div className="flex items-center gap-2">
                <ThermometerSun className="h-6 w-6" />
                <span className="text-xl font-bold">
                  {Math.round(selectedDay.temperatureMax)}°C High
                </span>
              </div>
              <div className="flex items-center gap-2">
                <ThermometerSnowflake className="h-6 w-6" />
                <span className="text-xl font-bold">
                  {Math.round(selectedDay.temperatureMin)}°C Low
                </span>
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-6">
            {/* Precipitation & Humidity */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Precipitation & Humidity
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailCard
                  icon={CloudRain}
                  label="Rain Chance"
                  value={selectedDay.precipitationProbabilityAvg}
                  unit="%"
                />
                <DetailCard
                  icon={Droplets}
                  label="Rain Amount"
                  value={selectedDay.rainAccumulationSum.toFixed(1)}
                  unit="mm"
                />
                <DetailCard
                  icon={Droplets}
                  label="Avg. Humidity"
                  value={Math.round(selectedDay.humidityAvg)}
                  unit="%"
                />
              </div>
            </div>

            {/* Wind & Farming Vitals */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Wind & Farming Vitals
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailCard
                  icon={Wind}
                  label="Wind Speed"
                  value={selectedDay.windSpeedAvg.toFixed(1)}
                  unit="m/s"
                />
                <DetailCard
                  icon={Wind}
                  label="Max Gusts"
                  value={selectedDay.windGustMax.toFixed(1)}
                  unit="m/s"
                />
                <DetailCard
                  icon={Sprout}
                  label="Evapotranspiration"
                  value={selectedDay.evapotranspirationSum.toFixed(1)}
                  unit="mm"
                />
              </div>
            </div>

            {/* Sun & UV */}
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Sun & UV</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <DetailCard
                  icon={Sunrise}
                  label="Sunrise"
                  value={formatTime(selectedDay.sunriseTime)}
                />
                <DetailCard
                  icon={Sunset}
                  label="Sunset"
                  value={formatTime(selectedDay.sunsetTime)}
                />
                <DetailCard
                  icon={SunMedium}
                  label="Max UV Index"
                  value={selectedDay.uvIndexMax || "N/A"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weatherdashboard;
