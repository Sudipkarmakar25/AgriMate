import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Tractor,
  MapPin,
  Ruler,
  Mountain,
  CloudRain,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Weatherdashboard from "../components/Weatherdashboard"; // import properly

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <div className="p-2 bg-green-100 rounded-lg flex items-center justify-center">
      <Icon className="h-5 w-5 text-green-700" />
    </div>
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value || "-"}</p>
    </div>
  </div>
);

const PlotCard = ({ plot, onSeeWeather }) => (
  <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
    <div className="flex items-center gap-4 p-5 border-b border-green-200 bg-white/60 rounded-t-2xl">
      <span className="flex-shrink-0 p-3 bg-green-200 rounded-full shadow-inner">
        <Tractor className="h-6 w-6 text-green-800" />
      </span>
      <div>
        <h3 className="text-xl font-bold text-gray-900">{plot.plotName}</h3>
        <p className="text-sm text-gray-500 italic">{plot.cropName}</p>
      </div>
    </div>

    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-3">
      <DetailRow icon={MapPin} label="Location" value={plot.location} />
      <DetailRow icon={Ruler} label="Area" value={`${plot.area} acres`} />
      <DetailRow icon={Mountain} label="Soil Type" value={plot.soilType} />
      <DetailRow icon={CloudRain} label="Irrigation" value={plot.irrigationType} />
    </div>

    <div className="p-5 pt-0">
      <button
        onClick={() => onSeeWeather(plot.location)}
        className="w-full mt-2 px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold rounded-lg hover:from-green-600 hover:to-blue-600 transition-all shadow-md"
      >
        See Weather
      </button>
    </div>
  </div>
);

const Weather = () => {
  const [plots, setPlots] = useState([]);
  const [showDashboard, setShowDashboard] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const navigate = useNavigate();

  const getPlotDetails = async () => {
    try {
      const response = await axios.get("http://localhost:3693/api/v1/plot/getAllPlots", {
        withCredentials: true,
      });
      if (response.data.success) setPlots(response.data.plots);
      else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  useEffect(() => {
    getPlotDetails();
  }, []);

  const handleSeeWeather = (location) => {
    setSelectedLocation(location);
    setShowDashboard(true);
  };

  const handleBack = () => {
    if (showDashboard) {
      setShowDashboard(false);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-green-50 to-sky-100 py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {!showDashboard ? (
          <>
            {/* Centered Header */}
            <div className="text-center mb-10">
              <h2 className="text-3xl font-extrabold text-green-800 flex items-center justify-center gap-2">
                <CloudRain className="h-8 w-8 text-green-600" /> Your Plot Details
              </h2>
              <p className="mt-2 text-md text-green-600 font-medium">
                View weather forecasts according to your plots 🌾
              </p>
            </div>

            {/* Plot Cards */}
            {plots.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {plots.map((plot) => (
                  <PlotCard key={plot._id} plot={plot} onSeeWeather={handleSeeWeather} />
                ))}
              </div>
            ) : (
              <div className="text-center bg-white/80 backdrop-blur-lg p-12 rounded-2xl shadow-lg border-2 border-dashed border-green-300 mb-10">
                <p className="text-green-500 text-lg font-bold">
                  You have not added any plot yet
                </p>
              </div>
            )}
          </>
        ) : (
          <Weatherdashboard plotLocation={selectedLocation} />
        )}

        {/* Back Button at the Bottom */}
        <div className="flex justify-center mt-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 px-8 py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 shadow-lg transition-all"
          >
            <ArrowLeft className="h-5 w-5" /> Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Weather;
