import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import StatusBadge from "../components/StatusBadge.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Notification from "../components/Notification.jsx";
import PageHeader from "../components/PageHeader.jsx";

const INITIAL_FORM = {
  reporterName: "",
  contact: "",
  incidentType: "",
  location: "",
  description: "",
  severity: "Moderate",
};

export default function IncidentReporting() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const loadIncidents = () => {
    setLoading(true);
    setError(null);
    api
      .getIncidents()
      .then((res) => setIncidents(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const errors = {};
    if (!form.reporterName.trim()) errors.reporterName = "Reporter name is required.";
    if (!form.contact.trim()) errors.contact = "Contact information is required.";
    if (!form.incidentType.trim()) errors.incidentType = "Incident type is required.";
    if (!form.location.trim()) errors.location = "Location is required.";
    if (!form.description.trim()) errors.description = "Description is required.";
    if (!form.severity.trim()) errors.severity = "Severity is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setFormErrors(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }

    setSubmitting(true);
    api
      .createIncident(form)
      .then((res) => {
        setIncidents((prev) => [res.data, ...prev]);
        setForm(INITIAL_FORM);
        setFormErrors({});
        setNotification({ type: "success", message: "Incident reported successfully." });
      })
      .catch((err) => {
        setNotification({ type: "error", message: err.message });
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div>
      <PageHeader
        title="Incident Reporting"
        description="Report a non-emergency incident so it can be reviewed by community responders."
      />

      <Notification
        type={notification?.type}
        message={notification?.message}
        onClose={() => setNotification(null)}
      />

      <div className="form-panel">
        <h2>Report an Incident</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="reporterName">Reporter Name</label>
              <input
                id="reporterName"
                type="text"
                className="input"
                value={form.reporterName}
                onChange={handleChange("reporterName")}
                placeholder="e.g. Ananya Reddy"
              />
              {formErrors.reporterName && <span className="field-error">{formErrors.reporterName}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="contact">Contact Information</label>
              <input
                id="contact"
                type="text"
                className="input"
                value={form.contact}
                onChange={handleChange("contact")}
                placeholder="Phone number or email"
              />
              {formErrors.contact && <span className="field-error">{formErrors.contact}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="incidentType">Incident Type</label>
              <input
                id="incidentType"
                type="text"
                className="input"
                value={form.incidentType}
                onChange={handleChange("incidentType")}
                placeholder="e.g. Waterlogging, Fallen Tree"
              />
              {formErrors.incidentType && <span className="field-error">{formErrors.incidentType}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                className="input"
                value={form.location}
                onChange={handleChange("location")}
                placeholder="e.g. Kukatpally, Hyderabad"
              />
              {formErrors.location && <span className="field-error">{formErrors.location}</span>}
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="input textarea"
                value={form.description}
                onChange={handleChange("description")}
                placeholder="Describe what happened..."
                rows={4}
              />
              {formErrors.description && <span className="field-error">{formErrors.description}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="severity">Severity</label>
              <select id="severity" className="input select" value={form.severity} onChange={handleChange("severity")}>
                <option value="Low">Low</option>
                <option value="Moderate">Moderate</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
              {formErrors.severity && <span className="field-error">{formErrors.severity}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Incident Report"}
          </button>
        </form>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Reported Incidents</h2>
        </div>

        {loading && <LoadingState message="Loading incidents..." />}
        {!loading && error && <ErrorState message={error} onRetry={loadIncidents} />}
        {!loading && !error && incidents.length === 0 && (
          <EmptyState message="No incidents have been reported yet." />
        )}

        {!loading && !error && incidents.length > 0 && (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Incident ID</th>
                  <th>Type</th>
                  <th>Reporter</th>
                  <th>Location</th>
                  <th>Severity</th>
                  <th>Reported At</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {incidents.map((incident) => (
                  <tr key={incident.id}>
                    <td>{incident.id}</td>
                    <td>{incident.incidentType}</td>
                    <td>{incident.reporterName}</td>
                    <td>{incident.location}</td>
                    <td>
                      <StatusBadge label={incident.severity} />
                    </td>
                    <td>{new Date(incident.reportedAt).toLocaleString()}</td>
                    <td className="description-cell">{incident.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
