import React, { useEffect, useMemo, useState } from "react";
import api from "../api/api.js";
import StatusBadge from "../components/StatusBadge.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import PageHeader from "../components/PageHeader.jsx";

const SEVERITY_OPTIONS = ["All", "Low", "Moderate", "High", "Critical"];

export default function Alerts() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");

  const loadAlerts = () => {
    setLoading(true);
    setError(null);
    api
      .getAlerts()
      .then((res) => setAlerts(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadAlerts();
  }, []);

  const filteredAlerts = useMemo(() => {
    return alerts.filter((alert) => {
      const matchesSeverity = severityFilter === "All" || alert.severity === severityFilter;
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch =
        term.length === 0 ||
        alert.disasterType.toLowerCase().includes(term) ||
        alert.location.toLowerCase().includes(term) ||
        alert.description.toLowerCase().includes(term);
      return matchesSeverity && matchesSearch;
    });
  }, [alerts, searchTerm, severityFilter]);

  return (
    <div>
      <PageHeader
        title="Disaster Alerts"
        description="Current and past disaster alerts across monitored regions."
      />

      {loading && <LoadingState message="Loading alerts..." />}
      {!loading && error && <ErrorState message={error} onRetry={loadAlerts} />}

      {!loading && !error && (
        <>
          <div className="toolbar">
            <input
              type="text"
              className="input"
              placeholder="Search by disaster type, location, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="input select"
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
            >
              {SEVERITY_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option === "All" ? "All Severities" : option}
                </option>
              ))}
            </select>
          </div>

          {filteredAlerts.length === 0 ? (
            <EmptyState message="No alerts match your search/filter criteria." />
          ) : (
            <div className="table-wrapper">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Alert ID</th>
                    <th>Type</th>
                    <th>Location</th>
                    <th>Severity</th>
                    <th>Date/Time</th>
                    <th>Description</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlerts.map((alert) => (
                    <tr key={alert.id}>
                      <td>{alert.id}</td>
                      <td>{alert.disasterType}</td>
                      <td>{alert.location}</td>
                      <td>
                        <StatusBadge label={alert.severity} />
                      </td>
                      <td>{new Date(alert.dateTime).toLocaleString()}</td>
                      <td className="description-cell">{alert.description}</td>
                      <td>
                        <StatusBadge label={alert.status} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}
