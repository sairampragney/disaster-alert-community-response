import React, { useEffect, useState } from "react";
import api from "../api/api.js";
import StatusBadge from "../components/StatusBadge.jsx";
import LoadingState from "../components/LoadingState.jsx";
import ErrorState from "../components/ErrorState.jsx";
import EmptyState from "../components/EmptyState.jsx";
import Notification from "../components/Notification.jsx";
import PageHeader from "../components/PageHeader.jsx";

const INITIAL_FORM = {
  requesterName: "",
  contact: "",
  location: "",
  emergencyType: "",
  description: "",
  priority: "Medium",
};

export default function EmergencyRequests() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState(INITIAL_FORM);
  const [formErrors, setFormErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [notification, setNotification] = useState(null);

  const loadRequests = () => {
    setLoading(true);
    setError(null);
    api
      .getEmergencyRequests()
      .then((res) => setRequests(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const validate = () => {
    const errors = {};
    if (!form.requesterName.trim()) errors.requesterName = "Requester name is required.";
    if (!form.contact.trim()) errors.contact = "Contact information is required.";
    if (!form.location.trim()) errors.location = "Location is required.";
    if (!form.emergencyType.trim()) errors.emergencyType = "Emergency type is required.";
    if (!form.description.trim()) errors.description = "Description is required.";
    if (!form.priority.trim()) errors.priority = "Priority is required.";
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
      .createEmergencyRequest(form)
      .then((res) => {
        setRequests((prev) => [res.data, ...prev]);
        setForm(INITIAL_FORM);
        setFormErrors({});
        setNotification({ type: "success", message: "Emergency request submitted successfully." });
      })
      .catch((err) => {
        setNotification({ type: "error", message: err.message });
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <div>
      <PageHeader
        title="Emergency Requests"
        description="Submit and track urgent requests for assistance during a disaster event."
      />

      <Notification
        type={notification?.type}
        message={notification?.message}
        onClose={() => setNotification(null)}
      />

      <div className="form-panel">
        <h2>Submit an Emergency Request</h2>
        <form onSubmit={handleSubmit} noValidate>
          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="requesterName">Requester Name</label>
              <input
                id="requesterName"
                type="text"
                className="input"
                value={form.requesterName}
                onChange={handleChange("requesterName")}
                placeholder="e.g. Lakshmi Narayana"
              />
              {formErrors.requesterName && <span className="field-error">{formErrors.requesterName}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="contact">Contact</label>
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
              <label htmlFor="location">Location</label>
              <input
                id="location"
                type="text"
                className="input"
                value={form.location}
                onChange={handleChange("location")}
                placeholder="e.g. Riverside Colony, Hyderabad"
              />
              {formErrors.location && <span className="field-error">{formErrors.location}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="emergencyType">Emergency Type</label>
              <input
                id="emergencyType"
                type="text"
                className="input"
                value={form.emergencyType}
                onChange={handleChange("emergencyType")}
                placeholder="e.g. Rescue Assistance, Medical Assistance"
              />
              {formErrors.emergencyType && <span className="field-error">{formErrors.emergencyType}</span>}
            </div>

            <div className="form-field form-field-wide">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                className="input textarea"
                value={form.description}
                onChange={handleChange("description")}
                placeholder="Describe the emergency and what assistance is needed..."
                rows={4}
              />
              {formErrors.description && <span className="field-error">{formErrors.description}</span>}
            </div>

            <div className="form-field">
              <label htmlFor="priority">Priority</label>
              <select id="priority" className="input select" value={form.priority} onChange={handleChange("priority")}>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Critical">Critical</option>
              </select>
              {formErrors.priority && <span className="field-error">{formErrors.priority}</span>}
            </div>
          </div>

          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? "Submitting..." : "Submit Emergency Request"}
          </button>
        </form>
      </div>

      <div className="panel">
        <div className="panel-header">
          <h2>Emergency Requests</h2>
        </div>

        {loading && <LoadingState message="Loading emergency requests..." />}
        {!loading && error && <ErrorState message={error} onRetry={loadRequests} />}
        {!loading && !error && requests.length === 0 && (
          <EmptyState message="No emergency requests have been submitted yet." />
        )}

        {!loading && !error && requests.length > 0 && (
          <div className="table-wrapper">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Request ID</th>
                  <th>Type</th>
                  <th>Requester</th>
                  <th>Location</th>
                  <th>Priority</th>
                  <th>Requested At</th>
                  <th>Status</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.emergencyType}</td>
                    <td>{request.requesterName}</td>
                    <td>{request.location}</td>
                    <td>
                      <StatusBadge label={request.priority} />
                    </td>
                    <td>{new Date(request.requestedAt).toLocaleString()}</td>
                    <td>
                      <StatusBadge label={request.status} />
                    </td>
                    <td className="description-cell">{request.description}</td>
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
