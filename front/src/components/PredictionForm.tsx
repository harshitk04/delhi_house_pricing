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
        Area: area,
        Location: location,
        Bedrooms: bedrooms,
      });
      setPricePrediction(response.data.prediction[0]);
    } catch (error) {
      console.error("Error making prediction:", error);
    }
  };

  return (
    <div>
      <h2>Enter House Details</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>Location:</label>
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            <option value="">Select Location</option>
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Number of Bedrooms:</label>
          <input
            type="number"
            value={bedrooms}
            onChange={(e) => setBedrooms(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Area (in sqft):</label>
          <input
            type="number"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
          />
        </div>

        <button type="button" onClick={handlePrediction}>
          Predict Price
        </button>
      </form>

      {pricePrediction && (
        <div>
          <h3>Predicted Price: ₹{pricePrediction.toFixed(2)}</h3>
        </div>
      )}
    </div>
  );
};

export default PredictionForm;