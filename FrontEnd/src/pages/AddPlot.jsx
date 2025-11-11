import React, { useState } from "react";
import {
  Tractor,
  MapPin,
  Ruler,
  Mountain,
  CloudRain,
  Wheat,
  CalendarDays,
  Sprout,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const InputGroup = ({
  label,
  id,
  type = "text",
  value,
  onChange,
  placeholder,
  required = true,
  icon: Icon,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative rounded-md shadow-sm group">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="h-5 w-5 text-green-500 group-focus-within:text-green-600 transition-colors" />
      </span>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 sm:text-sm transition-all duration-300 ease-in-out ${
          type === "date" && !value ? "text-gray-400" : ""
        }`}
      />
    </div>
  </div>
);

const SelectGroup = ({
  label,
  id,
  value,
  onChange,
  required = true,
  icon: Icon,
  children,
}) => (
  <div>
    <label
      htmlFor={id}
      className="block text-sm font-semibold text-gray-700 mb-1"
    >
      {label}
    </label>
    <div className="relative rounded-md shadow-sm group">
      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
        <Icon className="h-5 w-5 text-green-500 group-focus-within:text-green-600 transition-colors" />
      </span>
      <select
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        required={required}
        className="block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-green-500 sm:text-sm transition-all"
      >
        {children}
      </select>
      <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 9l4-4 4 4m0 6l-4 4-4-4"
          />
        </svg>
      </span>
    </div>
  </div>
);

const AddPlot = () => {
  const [plotName, setPlotName] = useState("");
  const [location, setLocation] = useState("");
  const [area, setArea] = useState("");
  const [soilType, setSoilType] = useState("");
  const [irrigationType, setIrrigationType] = useState("");
  const [cropName, setCropName] = useState("");
  const [plantationDate, setPlantationDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const formatted = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        setLocation(formatted);
        setLoading(false);
      },
      (error) => {
        alert("Unable to retrieve your location.");
        console.error(error);
        setLoading(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      plotName,
      location,
      area,
      soilType,
      irrigationType,
      cropName,
      plantationDate,
    };
    try {
      const response = await axios.post(
        "http://localhost:3693/api/v1/plot/addPlot",
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setPlotName("");
        setLocation("");
        setArea("");
        setSoilType("");
        setIrrigationType("");
        setCropName("");
        setPlantationDate("");
        navigate('/get-all-plots');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-lime-50 to-emerald-100 flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full space-y-8">
        <div className="bg-white/90 backdrop-blur-md p-8 sm:p-10 rounded-2xl shadow-2xl border border-green-100">
          <div className="flex items-center gap-4 mb-8">
            <span className="flex-shrink-0 p-3 bg-green-100 rounded-full shadow-sm">
              <Sprout className="h-8 w-8 text-green-600" />
            </span>
            <div>
              <h2 className="text-3xl font-extrabold text-green-500 tracking-tight">
                Add a New Plot
              </h2>
              <p className="mt-1 text-sm text-gray-600">
                Provide details about your new farm plot below.
              </p>
            </div>
          </div>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5"
            onSubmit={handleSubmit}
          >
            <InputGroup
              label="Plot Name"
              id="plotName"
              value={plotName}
              onChange={(e) => setPlotName(e.target.value)}
              placeholder="e.g., North Field 1"
              icon={Tractor}
            />

            <InputGroup
              label="Crop Name"
              id="cropName"
              value={cropName}
              onChange={(e) => setCropName(e.target.value)}
              placeholder="e.g., Corn, Tomatoes"
              icon={Wheat}
            />

            <div className="md:col-span-2">
              <InputGroup
                label="Location"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Latitude, Longitude"
                icon={MapPin}
              />
              <button
                type="button"
                onClick={handleGetLocation}
                className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm mt-2"
              >
                <MapPin className="h-4 w-4" />
                {loading ? "Getting location..." : "Use Current Location"}
              </button>
            </div>

            <InputGroup
              label="Area"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="e.g., 5.2 acres"
              icon={Ruler}
            />

            <InputGroup
              label="Plantation Date"
              id="plantationDate"
              type="date"
              value={plantationDate}
              onChange={(e) => setPlantationDate(e.target.value)}
              placeholder="Select a date"
              icon={CalendarDays}
            />

            <SelectGroup
              label="Soil Type"
              id="soilType"
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              icon={Mountain}
            >
              <option value="" disabled>
                Select soil type
              </option>
              <option value="loamy">Loamy</option>
              <option value="sandy">Sandy</option>
              <option value="clay">Clay</option>
              <option value="silty">Silty</option>
              <option value="peaty">Peaty</option>
            </SelectGroup>

            <SelectGroup
              label="Irrigation Type"
              id="irrigationType"
              value={irrigationType}
              onChange={(e) => setIrrigationType(e.target.value)}
              icon={CloudRain}
            >
              <option value="" disabled>
                Select irrigation type
              </option>
              <option value="drip">Drip Irrigation</option>
              <option value="sprinkler">Sprinkler System</option>
              <option value="surface">Surface (Flood)</option>
              <option value="manual">Manual (Rain-fed)</option>
            </SelectGroup>

            <div className="md:col-span-2 pt-4">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:ring-4 focus:ring-green-300 transition-all duration-300 ease-in-out shadow-lg"
              >
                Add Plot
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            <button
              onClick={() => navigate(-1)}
              className="font-semibold text-green-600 hover:text-green-700 transition-all"
            >
              ← Back
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AddPlot;
