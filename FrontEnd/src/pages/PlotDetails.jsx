import React, { useEffect, useState } from "react";
import {
  Tractor,
  MapPin,
  Ruler,
  Mountain,
  CloudRain,
  Wheat,
  CalendarDays,
  Sprout,
  Plus,
  Edit,
  Trash2,
  ArrowLeft,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

/* ====== InputGroup ====== */
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
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">
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

/* ====== SelectGroup ====== */
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
    <label htmlFor={id} className="block text-sm font-semibold text-gray-700 mb-1">
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
    </div>
  </div>
);

/* ====== DetailRow ====== */
const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-3">
    <Icon className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
    <div>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <p className="text-sm font-semibold text-gray-800">{value || "-"}</p>
    </div>
  </div>
);

/* ====== Plot Card ====== */
const PlotCard = ({ plot, onDelete, onEdit }) => (
  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
    <div className="flex items-center gap-4 p-5 border-b border-gray-200">
      <span className="flex-shrink-0 p-3 bg-lime-100 rounded-full">
        <Tractor className="h-6 w-6 text-lime-700" />
      </span>
      <div>
        <h3 className="text-xl font-bold text-gray-900">{plot.plotName}</h3>
        <p className="text-sm text-gray-500">{plot.cropName}</p>
      </div>
    </div>

    <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-2">
      <DetailRow icon={MapPin} label="Location" value={plot.location} />
      <DetailRow icon={Ruler} label="Area" value={plot.area} />
      <DetailRow icon={Mountain} label="Soil Type" value={plot.soilType} />
      <DetailRow icon={CloudRain} label="Irrigation" value={plot.irrigationType} />
      <DetailRow
        icon={CalendarDays}
        label="Planted On"
        value={new Date(plot.plantationDate).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        })}
      />
    </div>

    <div className="p-4 bg-gray-50 border-t border-gray-200 flex justify-end gap-3">
      <button
        onClick={() => onEdit(plot)}
        className="inline-flex items-center gap-2 px-3 py-2 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-100"
      >
        <Edit className="h-4 w-4" /> Edit
      </button>
      <button
        onClick={() => onDelete(plot._id)}
        className="inline-flex items-center gap-2 px-3 py-2 border border-transparent text-xs font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
      >
        <Trash2 className="h-4 w-4" /> Delete
      </button>
    </div>
  </div>
);

/* ====== Main Component ====== */
const PlotDetails = () => {
  const [plots, setPlots] = useState([]);
  const [editingPlot, setEditingPlot] = useState(null);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getPlotDetails();
  }, []);

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

  const handleDeletePlot = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3693/api/v1/plot/deletePlot/${id}`,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setPlots((prev) => prev.filter((plot) => plot._id !== id));
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  const handleEditPlot = (plot) => {
    setEditingPlot(plot);
    setFormData({
      plotName: plot.plotName,
      cropName: plot.cropName,
      location: plot.location,
      area: plot.area,
      soilType: plot.soilType,
      irrigationType: plot.irrigationType,
      plantationDate: plot.plantationDate.substring(0, 10),
    });
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const loc = `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
        setFormData((prev) => ({ ...prev, location: loc }));
        setLoading(false);
      },
      () => {
        alert("Unable to get location.");
        setLoading(false);
      }
    );
  };

  const handleUpdatePlot = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:3693/api/v1/plot/updatePlot/${editingPlot._id}`,
        formData,
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success("Plot updated successfully!");
        setEditingPlot(null);
        getPlotDetails();
      } else toast.error(response.data.message);
    } catch (error) {
      toast.error(error.response?.data?.error || error.message);
    }
  };

  return (
    <>
      <div
        className={`min-h-screen bg-lime-50 py-12 px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          editingPlot ? "blur-sm pointer-events-none" : ""
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900">My Plots</h2>
              <p className="mt-1 text-sm text-gray-600">Manage all your farm plots.</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="flex-shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white bg-green-600 hover:bg-green-700"
            >
              <ArrowLeft className="h-5 w-5" /> Back
            </button>
          </div>

          {plots.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plots.map((plot) => (
                <PlotCard key={plot._id} plot={plot} onDelete={handleDeletePlot} onEdit={handleEditPlot} />
              ))}
            </div>
          ) : (
            <div className="text-center bg-white p-12 rounded-xl shadow-lg border-2 border-dashed border-gray-300">
              <Sprout className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-xl font-semibold text-gray-900">No plots added yet</h3>
              <p className="mt-1 text-sm text-gray-500">Start by adding a new one.</p>
              <div className="mt-6">
                <button
                  onClick={() => navigate("/add-plot")}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white bg-green-600 hover:bg-green-700"
                >
                  <Plus className="h-5 w-5" /> Add Plot
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ===== Edit Modal with AddPlot Fields ===== */}
      {editingPlot && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-2xl w-full relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setEditingPlot(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X className="h-6 w-6" />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-green-600">Edit Plot</h2>

            <form className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5" onSubmit={handleUpdatePlot}>
              <InputGroup label="Plot Name" id="plotName" value={formData.plotName} onChange={(e) => setFormData({ ...formData, plotName: e.target.value })} icon={Tractor} />
              <InputGroup label="Crop Name" id="cropName" value={formData.cropName} onChange={(e) => setFormData({ ...formData, cropName: e.target.value })} icon={Wheat} />

              <div className="md:col-span-2">
                <InputGroup label="Location" id="location" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} icon={MapPin} />
                <button
                  type="button"
                  onClick={handleGetLocation}
                  className="flex items-center gap-2 text-green-600 hover:text-green-700 text-sm mt-2"
                >
                  <MapPin className="h-4 w-4" />
                  {loading ? "Getting location..." : "Use Current Location"}
                </button>
              </div>

              <InputGroup label="Area" id="area" value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })} icon={Ruler} />

              <InputGroup
                label="Plantation Date"
                id="plantationDate"
                type="date"
                value={formData.plantationDate}
                onChange={(e) => setFormData({ ...formData, plantationDate: e.target.value })}
                icon={CalendarDays}
              />

              <SelectGroup
                label="Soil Type"
                id="soilType"
                value={formData.soilType}
                onChange={(e) => setFormData({ ...formData, soilType: e.target.value })}
                icon={Mountain}
              >
                <option value="" disabled>Select soil type</option>
                <option value="loamy">Loamy</option>
                <option value="sandy">Sandy</option>
                <option value="clay">Clay</option>
                <option value="silty">Silty</option>
                <option value="peaty">Peaty</option>
              </SelectGroup>

              <SelectGroup
                label="Irrigation Type"
                id="irrigationType"
                value={formData.irrigationType}
                onChange={(e) => setFormData({ ...formData, irrigationType: e.target.value })}
                icon={CloudRain}
              >
                <option value="" disabled>Select irrigation type</option>
                <option value="drip">Drip Irrigation</option>
                <option value="sprinkler">Sprinkler System</option>
                <option value="surface">Surface (Flood)</option>
                <option value="manual">Manual (Rain-fed)</option>
              </SelectGroup>

              <div className="md:col-span-2 pt-4">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 shadow-lg"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default PlotDetails;
