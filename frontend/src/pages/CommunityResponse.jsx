import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import StatusBadge from "../components/StatusBadge.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function CommunityResponse() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadVolunteers = () => {
    setLoading(true);
    setError(null);
    api
      .getVolunteers()
      .then((res) => setVolunteers(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadVolunteers();
  }, []);

  return (
    <div>
      <PageHeader
        title="Community Response"
        description="Volunteers and community responders coordinating disaster response efforts."
      />

      {loading && <LoadingState message="Loading volunteer information..." />}
      {!loading && error && <ErrorState message={error} onRetry={loadVolunteers} />}
      {!loading && !error && volunteers.length === 0 && (
        <EmptyState message="No volunteer information available." />
      )}

      {!loading && !error && volunteers.length > 0 && (
        <div className="table-wrapper">
          <table className="data-table">
            <thead>
              <tr>
                <th>Volunteer ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Area</th>
                <th>Availability</th>
                <th>Response Status</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.map((volunteer) => (
                <tr key={volunteer.id}>
                  <td>{volunteer.id}</td>
                  <td>{volunteer.name}</td>
                  <td>{volunteer.role}</td>
                  <td>{volunteer.area}</td>
                  <td>
                    <StatusBadge label={volunteer.availability} />
                  </td>
                  <td>
                    <StatusBadge label={volunteer.responseStatus} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
