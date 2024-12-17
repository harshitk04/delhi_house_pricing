"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const PredictionForm = () => {
  const [location, setLocation] = useState<string>("");
  const [bedrooms, setBedrooms] = useState<number>(0);
  const [pricePrediction, setPricePrediction] = useState<number | null>(null);
  const [locations, setLocations] = useState<string[]>([]);
  const [area, setArea] = useState<number>(0);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:5001/locations");
        setLocations(response.data.locations);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  const handlePrediction = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5001/predict", {
        Location: location,
        Bedrooms: bedrooms,
        Area: area,
      });
      setPricePrediction(response.data.prediction[0]);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Enter House Details
        </h2>
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Location Selection */}
          <div>
            <label
              htmlFor="location"
              className="block text-sm font-semibold text-gray-600"
            >
              Location:
            </label>
            <select
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Location</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {/* Bedrooms Input */}
          <div>
            <label
              htmlFor="bedrooms"
              className="block text-sm font-semibold text-gray-600"
            >
              Number of Bedrooms:
            </label>
            <input
              id="bedrooms"
              type="number"
              value={bedrooms}
              onChange={(e) => setBedrooms(Number(e.target.value))}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Area Input */}
          <div>
            <label
              htmlFor="area"
              className="block text-sm font-semibold text-gray-600"
            >
              Area (in sqft):
            </label>
            <input
              id="area"
              type="number"
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="mt-1 block w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Predict Button */}
          <div>
            <button
              type="button"
              onClick={handlePrediction}
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Predict Price
            </button>
          </div>
        </form>

        {/* Price Prediction */}
        {pricePrediction !== null && (
          <div className="mt-6 text-center">
            <h3 className="text-xl font-semibold text-gray-800">
              Predicted Price: ₹{pricePrediction.toFixed(2)}
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default PredictionForm;
