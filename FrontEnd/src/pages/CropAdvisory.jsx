import React, { useState, useEffect } from "react";
import {
  Sprout,
  Droplets,
  Calendar,
  ChevronRight,
  Info,
  Lightbulb,
  MapPin,
  Ruler,
  Shovel,
} from "lucide-react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

/* ------------------------ Helper Functions ------------------------ */

const formatDate = (isoString) => {
  if (!isoString) return "N/A";
  const d = new Date(isoString);
  return d.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const isFutureDate = (date) => {
  if (!date) return false;
  return new Date(date) > new Date();
};

const statusStyles = (status = "") => {
  const s = status.toLowerCase();
  if (s.includes("good") || s.includes("healthy")) {
    return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  }
  if (s.includes("critical") || s.includes("poor")) {
    return "bg-red-100 text-red-700 border border-red-200";
  }
  return "bg-amber-100 text-amber-700 border border-amber-200";
};

const FieldTag = ({ icon: Icon, label, value }) => (
  <div className="flex items-start gap-2 text-sm">
    <Icon className="h-4 w-4 text-gray-400 mt-0.5" />
    <div>
      <p className="text-[11px] uppercase tracking-wide text-gray-400 font-medium">
        {label}
      </p>
      <p className="text-gray-800 font-semibold">{value || "—"}</p>
    </div>
  </div>
);

/* ------------------------ FIXED AdvisorySection ------------------------ */

const AdvisorySection = ({ title, content,id }) => {
  const { label, color } = title;
  const [previousAdvisory, setPreviousAdvisory] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // When crop changes -> reset data and close section
    setIsOpen(false);
    setPreviousAdvisory([]);
  }, [id]);


   const getPreviousAdvisory = async () => {
    try {
      setIsLoading(true);
      console.log("lkjhg")
      const response = await axios.get(
        `http://localhost:4003/api/messages/${id}`,
        { withCredentials: true }
      );
     console.log(response)
      if (response.data.success) {
        const sorted = [...response.data.messages].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt) // latest first
        );
        setPreviousAdvisory(sorted);
        setIsOpen(true);
      }
    } catch (error) {
      console.log(error)
      toast.error("Failed to fetch previous advisories");
    } finally {
      setIsLoading(false);
    }
  };
   console.log(previousAdvisory);
   
  const colorMap = {
    green: "text-green-500",
    yellow: "text-yellow-500",
    red: "text-red-500",
  };

  return (
    <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/70">
      {/* Previous advisories (sorted, on top) */}
      {isOpen && previousAdvisory.length > 0 && (
        <div className="mb-3 space-y-2">
          {previousAdvisory.map((item) => (
            <div
              key={item._id}
              className="p-2 rounded-lg bg-white/80 border text-sm text-gray-800"
            >
              <div className="text-xs text-gray-500 mb-1">
                {new Date(item.createdAt).toLocaleString()}
              </div>
              <div>{item.message}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center gap-3 mb-2">
        <h4 className={`font-bold ${colorMap[color] || "text-gray-700"}`}>
          {label}
        </h4>
      </div>

      <p className="text-sm text-gray-700 leading-relaxed">{content}</p>

      <button
        onClick={getPreviousAdvisory}
        className="mt-3 text-sm underline text-blue-600"
      >
        {isLoading ? "Loading..." : "Get Previous Advisory"}
      </button>
    </div>
  );
};

/* ------------------------ Advisory Title (Option 2 - stable) ------------------------ */

const getAdvisoryTitle = (status = "") => {
  const s = status.toLowerCase();

  if (!s || s === "unknown")
    return { label: "General Advisory", color: "green" };

  if (s.includes("moderate"))
    return { label: "Moderate Condition Advisory", color: "yellow" };

  if (s.includes("critical") || s.includes("stress") || s.includes("poor"))
    return { label: "Severe Condition Advisory", color: "red" };

  return { label: "General Advisory", color: "green" };
};

/* ------------------------ MAIN COMPONENT ------------------------ */

const CropAdvisory = () => {
  const [selectedCropId, setSelectedCropId] = useState(null);
  const [plots, setPlots] = useState([]);
  const navigate = useNavigate();

  const selectedCrop = plots.find((c) => c._id === selectedCropId);

  const getPlotDetails = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3693/api/v1/plot/getAllPlots",
        { withCredentials: true }
      );

      if (response.data.success) {
        const fetched = response.data.plots || [];
        setPlots(fetched);

        if (fetched.length > 0 && !selectedCropId) {
          setSelectedCropId(fetched[0]._id);
        }
      } else {
        toast.error(response.data.message || "Failed to load plots");
      }
    } catch (err) {
      toast.error(err.response?.data?.error || err.message);
    }
  };

  useEffect(() => {
    getPlotDetails();
  }, []);

  /* ================================================================= */

  return (
    <div className="min-h-screen bg-lime-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        {/* Back Button */}
        {selectedCrop && (
          <button
            onClick={() => navigate(-1)}
            className="mb-4 flex items-center gap-2 text-sm font-medium bg-green-500 text-white rounded-md px-3 py-2 hover:bg-green-600 transition"
          >
            ← Back
          </button>
        )}

        {/* Page Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900">
              Crop Advisories
            </h1>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              View AI-powered guidance for each of your plots based on crop,
              soil and recent conditions.
            </p>
          </div>

          {plots.length > 0 && (
            <div className="text-xs sm:text-sm text-gray-500 bg-white px-3 py-2 rounded-xl shadow border border-gray-100">
              <span className="font-semibold text-gray-700">
                {plots.length}
              </span>{" "}
              plots monitored
            </div>
          )}
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* LEFT COLUMN */}
          <div className="lg:col-span-4">
            <h2 className="text-lg font-semibold text-gray-700 mb-2 px-1">
              Your Plots
            </h2>

            <div className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 custom-scrollbar">

              {plots.length === 0 ? (
                <div className="text-sm text-gray-500 bg-white border border-dashed border-gray-300 rounded-xl p-6 text-center">
                  No plots found. Add a plot to start getting advisories.
                </div>
              ) : (
                plots.map((crop) => {
                  const statusLabel = crop.status || "unknown";

                  return (
                    <button
                      key={crop._id}
                      onClick={() => setSelectedCropId(crop._id)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 
                        ${
                          selectedCropId === crop._id
                            ? "bg-white border-green-500 shadow-md ring-1 ring-green-500"
                            : "bg-white border-gray-200 hover:border-green-300 hover:shadow-sm"
                        }`}
                    >
                      <div className="flex items-start gap-4">

                        <div className="h-12 w-12 rounded-lg flex items-center justify-center bg-green-100 text-green-600">
                          <Sprout className="h-6 w-6" />
                        </div>

                        <div className="flex-grow space-y-1">

                          <div className="flex items-center justify-between gap-2">
                            <h3
                              className={`font-bold text-base ${
                                selectedCropId === crop._id
                                  ? "text-green-700"
                                  : "text-gray-800"
                              }`}
                            >
                              {crop.plotName || "Untitled Plot"}
                            </h3>

                            <span
                              className={`text-[10px] px-2 py-0.5 rounded-full capitalize ${statusStyles(
                                statusLabel
                              )}`}
                            >
                              {statusLabel}
                            </span>
                          </div>

                          <p className="text-xs text-gray-500">
                            Crop:{" "}
                            <span className="font-semibold capitalize">
                              {crop.cropName}
                            </span>
                          </p>

                          <p className="text-[11px] text-gray-400">
                            {isFutureDate(crop.plantationDate)
                              ? "Plantation scheduled"
                              : "Planted"}{" "}
                            on {formatDate(crop.plantationDate)}
                          </p>

                        </div>

                        <ChevronRight
                          className={`mt-1 h-5 w-5 transition-all ${
                            selectedCropId === crop._id
                              ? "text-green-600 opacity-100 translate-x-0"
                              : "text-gray-300 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-200 min-h-[500px] overflow-hidden">

              {!selectedCrop ? (
                <div className="h-full flex flex-col items-center justify-center p-12 text-center text-gray-400">
                  <Sprout className="h-16 w-16 opacity-50 mb-4" />
                  <p className="text-xl text-gray-500">No plot selected</p>
                </div>
              ) : (
                <>

                  {/* HEADER */}
                  <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 text-white">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">

                      <div className="space-y-2">

                        <div className="flex items-center gap-2 text-green-100 text-xs font-medium">
                          <Sprout className="h-4 w-4" />
                          <span className="uppercase tracking-wide">
                            {selectedCrop.cropName}
                          </span>
                        </div>

                        <h2 className="text-3xl font-bold">
                          {selectedCrop.plotName || "Untitled Plot"}
                        </h2>

                        <div className="flex flex-wrap items-center gap-2 mt-1">

                          <span className="inline-flex item-center gap-2 px-3 py-1 text-xs bg-white/20 rounded-full">
                            <Calendar className="h-4 w-4" />
                            {isFutureDate(selectedCrop.plantationDate)
                              ? `Plantation scheduled for ${formatDate(
                                  selectedCrop.plantationDate
                                )}`
                              : `Planted on ${formatDate(
                                  selectedCrop.plantationDate
                                )}`}
                          </span>

                          <span
                            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusStyles(
                              selectedCrop.status || "unknown"
                            )}`}
                          >
                            {selectedCrop.status || "unknown"}
                          </span>

                        </div>
                      </div>

                      {/* Weather box */}
                      <div className="bg-white/10 p-3 rounded-xl border border-white/20 min-w-[160px]">
                        <p className="text-[11px] text-green-100">
                          Status: {selectedCrop.status || "unknown"}
                        </p>
                        <p className="text-[10px] text-green-100/80 mt-1">
                          Last Message: {formatDate(selectedCrop.lastUpdated)}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* DETAILS */}
                  <div className="p-8 space-y-6">

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      <FieldTag icon={Shovel} label="Soil Type" value={selectedCrop.soilType} />
                      <FieldTag icon={Droplets} label="Irrigation" value={selectedCrop.irrigationType} />
                      <FieldTag icon={Ruler} label="Area" value={`${selectedCrop.area} acre`} />
                      <FieldTag icon={MapPin} label="Location" value={selectedCrop.location} />
                      <FieldTag icon={Calendar} label="Created At" value={formatDate(selectedCrop.createdAt)} />
                    </div>

                    {/* ADVISORY TITLE */}
                    <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                      {isFutureDate(selectedCrop.plantationDate) ? (
                        <>
                          <Shovel className="h-5 w-5 text-amber-500" />
                          Pre-Plantation Advisory
                        </>
                      ) : (
                        <>
                          <Lightbulb className="h-5 w-5 text-yellow-500" />
                          AI Advisory & Recommendations
                        </>
                      )}
                    </h3>

                    {/* ADVISORY CARD */}
                    <AdvisorySection
                      title={getAdvisoryTitle(selectedCrop.status)}
                      content={
                        isFutureDate(selectedCrop.plantationDate)
                          ? "Field preparation recommended: clean weeds, prepare beds/ridges, check soil moisture, and ensure irrigation systems are functional before sowing."
                          : selectedCrop.message || "No advisory available."
                      }
                      id={selectedCropId}
                    />

                  </div>

                  {/* FOOTER */}
                  <div className="px-8 pb-8 border-t bg-gray-50">
                    <div className="flex items-start gap-3 p-4 bg-white rounded-lg border">
                      <Info className="h-5 w-5 text-gray-500 mt-1" />
                      <p className="text-xs text-gray-500 leading-relaxed">
                        These advisories are generated based on seasonal and
                        crop-specific patterns. For critical decisions, always
                        consult your local agricultural expert.
                      </p>
                    </div>
                  </div>

                </>
              )}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CropAdvisory;
