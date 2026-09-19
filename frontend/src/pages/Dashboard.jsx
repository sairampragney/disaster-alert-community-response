import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import StatCard from "../components/StatCard.jsx";
import StatusBadge from "../components/StatusBadge.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import PageHeader from "../components/PageHeader.jsx";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [emergencyRequests, setEmergencyRequests] = useState([]);
  const [safeLocations, setSafeLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadDashboardData = () => {
    setLoading(true);
    setError(null);

    Promise.all([
      api.getAlerts(),
      api.getIncidents(),
      api.getEmergencyRequests(),
      api.getSafeLocations(),
    ])
      .then(([alertsRes, incidentsRes, requestsRes, locationsRes]) => {
        setAlerts(alertsRes.data);
        setIncidents(incidentsRes.data);
        setEmergencyRequests(requestsRes.data);
        setSafeLocations(locationsRes.data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div>
        <PageHeader
          title="Dashboard"
          description="Live overview of disaster alerts, incidents, emergency requests, and shelter availability."
        />
        <LoadingState message="Loading dashboard data from the backend..." />
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <PageHeader
          title="Dashboard"
          description="Live overview of disaster alerts, incidents, emergency requests, and shelter availability."
        />
        <ErrorState message={error} onRetry={loadDashboardData} />
      </div>
    );
  }

  const activeAlerts = alerts.filter((a) => a.status === "Active").length;
  const totalAvailableCapacity = safeLocations.reduce((sum, loc) => sum + loc.currentAvailability, 0);

  const recentAlerts = [...alerts]
    .sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime))
    .slice(0, 4);
  const recentIncidents = [...incidents]
    .sort((a, b) => new Date(b.reportedAt) - new Date(a.reportedAt))
    .slice(0, 4);
  const criticalRequests = emergencyRequests.filter((r) => r.priority === "Critical" || r.priority === "High");

  return (
    <div>
      <PageHeader
        title="Dashboard"
        description="Live overview of disaster alerts, incidents, emergency requests, and shelter availability."
      />

      <div className="demo-banner">
        This dashboard displays demonstration data for an academic project. It does not represent a real
        government emergency alert system.
      </div>

      <section className="stats-grid">
        <StatCard icon="🚨" label="Active Disaster Alerts" value={activeAlerts} accent="red" />
        <StatCard icon="📋" label="Reported Incidents" value={incidents.length} accent="blue" />
        <StatCard icon="🆘" label="Emergency Requests" value={emergencyRequests.length} accent="orange" />
        <StatCard icon="🏠" label="Available Safe Locations" value={safeLocations.length} accent="green" />
      </section>

      <section className="dashboard-columns">
        <div className="panel">
          <div className="panel-header">
            <h2>Recent Disaster Alerts</h2>
          </div>
          {recentAlerts.length === 0 ? (
            <p className="muted-text">No alerts to display.</p>
          ) : (
            <ul className="simple-list">
              {recentAlerts.map((alert) => (
                <li key={alert.id} className="simple-list-item">
                  <div className="simple-list-main">
                    <span className="simple-list-title">
                      {alert.disasterType} — {alert.location}
                    </span>
                    <span className="simple-list-sub">{new Date(alert.dateTime).toLocaleString()}</span>
                  </div>
                  <StatusBadge label={alert.severity} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="panel">
          <div className="panel-header">
            <h2>Recent Incidents</h2>
          </div>
          {recentIncidents.length === 0 ? (
            <p className="muted-text">No incidents to display.</p>
          ) : (
            <ul className="simple-list">
              {recentIncidents.map((incident) => (
                <li key={incident.id} className="simple-list-item">
                  <div className="simple-list-main">
                    <span className="simple-list-title">
                      {incident.incidentType} — {incident.location}
                    </span>
                    <span className="simple-list-sub">{new Date(incident.reportedAt).toLocaleString()}</span>
                  </div>
                  <StatusBadge label={incident.severity} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="panel">
        <div className="panel-header">
          <h2>Emergency Response Snapshot</h2>
        </div>
        <div className="response-snapshot">
          <div className="response-snapshot-item">
            <span className="response-snapshot-value">{criticalRequests.length}</span>
            <span className="response-snapshot-label">High/Critical priority emergency requests</span>
          </div>
          <div className="response-snapshot-item">
            <span className="response-snapshot-value">{totalAvailableCapacity}</span>
            <span className="response-snapshot-label">Total available capacity across safe locations</span>
          </div>
          <div className="response-snapshot-item">
            <span className="response-snapshot-value">{safeLocations.length}</span>
            <span className="response-snapshot-label">Registered safe locations across the city</span>
          </div>
        </div>
      </section>
    </div>
  );
}
