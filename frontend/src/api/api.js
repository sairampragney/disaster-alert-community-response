// Centralized API client for talking to the backend REST API.
// All requests go to the Express backend running on http://localhost:5000

const API_BASE_URL = "https://disaster-alert-community-response.onrender.com/api";

async function handleResponse(response) {
  let body;
  try {
    body = await response.json();
  } catch (err) {
    throw new Error("Received an invalid response from the server.");
  }

  if (!response.ok) {
    const message = body && body.message ? body.message : `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return body;
}

async function request(path, options = {}) {
  let response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    });
  } catch (err) {
    // Network-level failure - backend likely not running
    throw new Error(
      "Unable to reach the backend server. Please make sure the backend is running on http://localhost:5000."
    );
  }
  return handleResponse(response);
}

export const api = {
  getHealth: () => request("/health"),

  getAlerts: () => request("/alerts"),

  getIncidents: () => request("/incidents"),
  createIncident: (payload) =>
    request("/incidents", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getEmergencyRequests: () => request("/emergency-requests"),
  createEmergencyRequest: (payload) =>
    request("/emergency-requests", {
      method: "POST",
      body: JSON.stringify(payload),
    }),

  getSafeLocations: () => request("/safe-locations"),

  getVolunteers: () => request("/volunteers"),
};

export default api;
