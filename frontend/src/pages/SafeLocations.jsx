import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function SafeLocations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadLocations = () => {
    setLoading(true);
    setError(null);
    api
      .getSafeLocations()
      .then((res) => setLocations(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadLocations();
  }, []);

  return (
    <div>
      <PageHeader
        title="Safe Locations"
        description="Shelters, hospitals, and relief centers available to the community."
      />

      {loading && <LoadingState message="Loading safe locations..." />}
      {!loading && error && <ErrorState message={error} onRetry={loadLocations} />}
      {!loading && !error && locations.length === 0 && <EmptyState message="No safe locations available." />}

      {!loading && !error && locations.length > 0 && (
        <div className="card-grid">
          {locations.map((location) => {
            const percentAvailable = Math.round((location.currentAvailability / location.capacity) * 100);
            return (
              <div key={location.id} className="location-card">
                <div className="location-card-header">
                  <h3>{location.name}</h3>
                  <span className="location-type-tag">{location.type}</span>
                </div>
                <p className="location-address">{location.address}</p>
                <div className="location-capacity">
                  <div className="location-capacity-bar">
                    <div
                      className="location-capacity-fill"
                      style={{ width: `${percentAvailable}%` }}
                    ></div>
                  </div>
                  <span className="location-capacity-text">
                    {location.currentAvailability} / {location.capacity} spaces available
                  </span>
                </div>
                <p className="location-contact">📞 {location.contact}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
