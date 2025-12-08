import React, { useState, useRef } from 'react';
import { 
  Camera, 
  Upload, 
  X, 
  ScanLine, 
  Bug, 
  Sprout, 
  CheckCircle2, 
  AlertTriangle, 
  Loader2,
  ArrowRight,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MOCK_RESULT = {
  pestName: "Fall Armyworm",
  confidence: 94,
  severity: "High",
  description: "The Fall Armyworm is a destructive pest that attacks maize and other crops. It feeds on leaves, creating ragged holes and leaving sawdust-like excrement.",
  remedies: [
    "Apply Neem oil (5ml/liter) or Beauveria bassiana as a bio-control.",
    "Install pheromone traps @ 5-10/acre to monitor moth activity.",
    "If infestation is severe, spray Emamectin Benzoate 5% SG (0.4g/liter).",
    "Handpick and destroy egg masses and larvae in early stages."
  ]
};

const PestDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [file,setFile] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    if (!file.type.startsWith('image/')) return;
    setFile(file)
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      setResult(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async() => {
    setIsAnalyzing(true);
    const formData = new FormData();
    formData.append("file", file);
    const response = await axios.post(
      "https://developersa-plantdiseasefastapi.hf.space/predict",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );
    console.log(response);
    setTimeout(() => {
      setIsAnalyzing(false);
      setResult(MOCK_RESULT);
    }, 2500);
  };



  const handleReset = () => {
    setSelectedImage(null);
    setResult(null);
    setIsAnalyzing(false);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-lime-50 to-green-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Top bar with back button */}
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={()=>navigate(-1)}
            className="inline-flex items-center gap-2 text-sm sm:text-base px-3 py-2 rounded-full bg-white/90 border border-emerald-100 shadow-sm hover:bg-emerald-50 active:scale-95 transition"
          >
            <ArrowLeft className="h-4 w-4 text-emerald-700" />
            <span className="text-emerald-900">Back</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center p-3 bg-gradient-to-tr from-emerald-100 to-lime-100 rounded-full mb-3 sm:mb-4 shadow-sm">
            <Bug className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-700" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-emerald-950 tracking-tight">
            AI Pest Detector
          </h1>
          <p className="mt-2 text-sm sm:text-base text-emerald-800/80 max-w-2xl mx-auto">
            Take a photo or upload an image of your crop. Our AI will identify pests and recommend immediate, farmer-friendly solutions.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl overflow-hidden border border-emerald-100">
          {/* Card top accent */}
          <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-lime-400 to-green-500" />

          <div className="p-4 sm:p-6 md:p-8">
            {/* 1. Upload state */}
            {!selectedImage && (
              <div
                className={`border-2 border-dashed rounded-2xl min-h-[260px] sm:h-80 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200 px-4
                  ${isDragging 
                    ? 'border-emerald-500 bg-emerald-50/80 shadow-inner' 
                    : 'border-emerald-200/70 bg-gradient-to-br from-white via-emerald-50/30 to-lime-50/60 hover:border-emerald-400 hover:bg-emerald-50/60'
                  }`}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDrop={onDrop}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="p-3 sm:p-4 bg-emerald-100 rounded-full mb-3 sm:mb-4 shadow-sm">
                  <Camera className="h-8 w-8 sm:h-10 sm:w-10 text-emerald-700" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-emerald-950">
                  Tap to Take Photo
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800/70 mt-1 mb-4 sm:mb-6">
                  or drag and drop an image here
                </p>
                <button className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-lime-500 text-white text-sm sm:text-base font-medium rounded-lg shadow-md hover:from-emerald-700 hover:to-lime-600 transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-emerald-50">
                  <Upload className="h-4 w-4" />
                  Upload Image
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  capture="environment"
                  className="hidden"
                />
              </div>
            )}

            {/* 2. Preview + analyze */}
            {selectedImage && !result && (
              <div className="flex flex-col items-center">
                <div className="relative w-full max-w-xs sm:max-w-md aspect-square rounded-2xl overflow-hidden shadow-xl border border-emerald-100 mb-6 sm:mb-8 bg-emerald-900 mx-auto">
                  <img 
                    src={selectedImage} 
                    alt="Crop Preview" 
                    className={`w-full h-full object-cover transition-opacity ${isAnalyzing ? 'opacity-50' : 'opacity-100'}`} 
                  />

                  {/* corner gradient overlay */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-emerald-900/10" />

                  {!isAnalyzing && (
                    <button 
                      onClick={handleReset}
                      className="absolute top-3 right-3 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors backdrop-blur-sm border border-white/20"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}

                  {isAnalyzing && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="absolute inset-0 bg-emerald-500/20 animate-pulse" />
                      <div className="w-full h-1 bg-emerald-400 absolute top-0 animate-scan shadow-[0_0_15px_rgba(16,185,129,0.7)]" />
                      <div className="flex flex-col items-center z-10">
                        <Loader2 className="h-10 w-10 sm:h-12 sm:w-12 text-emerald-50 animate-spin mb-2 sm:mb-3" />
                        <p className="text-emerald-50 font-bold text-base sm:text-lg drop-shadow-md">
                          Analyzing Crop...
                        </p>
                        <p className="text-xs text-emerald-100/80 mt-1">
                          This usually takes a few seconds
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {!isAnalyzing && (
                  <div className="w-full max-w-xs sm:max-w-md grid grid-cols-2 gap-3 sm:gap-4">
                    <button 
                      onClick={handleReset}
                      className="px-4 py-2.5 sm:py-3 border border-emerald-200 text-sm sm:text-base text-emerald-900 font-semibold rounded-xl bg-white hover:bg-emerald-50 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-300 focus:ring-offset-2"
                    >
                      Retake
                    </button>
                    <button 
                      onClick={handleAnalyze}
                      className="px-4 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-600 to-lime-500 text-white text-sm sm:text-base font-bold rounded-xl shadow-lg hover:from-emerald-700 hover:to-lime-600 hover:shadow-xl transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2"
                    >
                      <ScanLine className="h-5 w-5" />
                      Detect Pest
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* 3. Result */}
            {result && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                  {/* Left: Image */}
                  <div className="md:w-1/3 flex flex-col gap-3 sm:gap-4">
                    <div className="aspect-square rounded-2xl overflow-hidden shadow-lg border border-emerald-100 relative w-full max-w-xs md:max-w-none mx-auto md:mx-0 bg-emerald-900">
                      <img src={selectedImage} alt="Analyzed Crop" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      <div className="absolute bottom-0 inset-x-0 bg-black/50 p-2 text-center backdrop-blur-sm border-t border-white/10">
                        <span className="text-emerald-50 text-xs font-medium">
                          Analyzed Image
                        </span>
                      </div>
                    </div>
                    <button 
                      onClick={handleReset}
                      className="w-full py-2.5 flex items-center justify-center gap-2 text-sm sm:text-base text-emerald-900 bg-gradient-to-r from-emerald-50 to-lime-50 hover:from-emerald-100 hover:to-lime-100 rounded-xl font-medium transition-colors border border-emerald-100 shadow-sm"
                    >
                      <RefreshCw className="h-4 w-4 text-emerald-700" />
                      Scan New Image
                    </button>
                  </div>

                  {/* Right: Details */}
                  <div className="md:w-2/3 space-y-5 sm:space-y-6">
                    {/* Diagnosis */}
                    <div className="rounded-2xl overflow-hidden border border-red-100 shadow-sm bg-gradient-to-br from-rose-50 via-red-50 to-orange-50">
                      <div className="h-1 w-full bg-gradient-to-r from-red-500 via-orange-400 to-yellow-400" />
                      <div className="p-4 sm:p-5">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div>
                            <p className="text-xs sm:text-sm font-bold text-red-600 uppercase tracking-wide mb-1">
                              Detected Issue
                            </p>
                            <h2 className="text-2xl sm:text-3xl font-extrabold text-red-950 break-words">
                              {result.pestName}
                            </h2>
                          </div>
                          <div className="text-left sm:text-right space-y-1">
                            <div className="inline-flex items-center gap-1 bg-white/80 px-3 py-1 rounded-full shadow-sm border border-red-100">
                              <AlertTriangle className="h-4 w-4 text-orange-500" />
                              <span className="text-xs sm:text-sm font-bold text-red-900">
                                {result.confidence}% Match
                              </span>
                            </div>
                            <p className="text-xs text-red-900/80">
                              Severity:{' '}
                              <span
                                className={`font-semibold px-2 py-0.5 rounded-full text-[11px] sm:text-xs ${
                                  result.severity === 'High'
                                    ? 'bg-red-100 text-red-700 border border-red-200'
                                    : 'bg-amber-100 text-amber-700 border border-amber-200'
                                }`}
                              >
                                {result.severity}
                              </span>
                            </p>
                          </div>
                        </div>
                        <p className="mt-2 sm:mt-3 text-sm sm:text-base text-red-900/90 leading-relaxed">
                          {result.description}
                        </p>
                      </div>
                    </div>

                    {/* Recommended actions */}
                    <div>
                      <h3 className="flex items-center gap-2 text-lg sm:text-xl font-bold text-emerald-950 mb-3 sm:mb-4">
                        <div className="p-1.5 rounded-full bg-emerald-100 border border-emerald-200">
                          <Sprout className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-700" />
                        </div>
                        Farmer-friendly Recommended Actions
                      </h3>
                      <div className="bg-gradient-to-br from-emerald-50 via-white to-lime-50 rounded-2xl border border-emerald-100 shadow-sm overflow-hidden">
                        <ul className="divide-y divide-emerald-100/80">
                          {result.remedies.map((remedy, idx) => (
                            <li 
                              key={idx} 
                              className="p-3 sm:p-4 flex gap-3 hover:bg-emerald-50/60 transition-colors odd:bg-white/60 even:bg-emerald-50/40"
                            >
                              <div className="mt-0.5 flex-shrink-0">
                                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                              </div>
                              <span className="text-sm sm:text-base text-emerald-950/90">
                                {remedy}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* CTA */}
                    <div className="pt-1 sm:pt-2">
                      <button className="inline-flex items-center text-sm sm:text-base text-emerald-700 font-semibold hover:text-emerald-900 hover:underline decoration-emerald-500">
                        View detailed advisory for {result.pestName}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Scan animation */}
      <style>{`
        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan {
          animation: scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default PestDetection;
``
