// Disaster Alert and Community Response App - Backend Server
// Academic demonstration project. Uses in-memory mock data only.

const express = require("express");
const cors = require("cors");
const {
  alerts,
  incidents,
  emergencyRequests,
  safeLocations,
  volunteers,
  getNextIncidentId,
  getNextRequestId,
} = require("./data/mockData");

const app = express();
const PORT = 5000;

// ---------- Middleware ----------
app.use(
  cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
  })
);
app.use(express.json());

// Simple request logger - helpful during local demonstration/debugging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

// ---------- Validation helpers ----------
function isNonEmptyString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

// ---------- Routes ----------

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "disaster-alert-backend",
    timestamp: new Date().toISOString(),
    message: "Backend server is running.",
  });
});

// ----- Disaster Alerts -----
app.get("/api/alerts", (req, res) => {
  res.json({
    success: true,
    count: alerts.length,
    data: alerts,
  });
});

// ----- Incidents -----
app.get("/api/incidents", (req, res) => {
  res.json({
    success: true,
    count: incidents.length,
    data: incidents,
  });
});

app.post("/api/incidents", (req, res) => {
  const { reporterName, contact, incidentType, location, description, severity } = req.body || {};

  const missingFields = [];
  if (!isNonEmptyString(reporterName)) missingFields.push("reporterName");
  if (!isNonEmptyString(contact)) missingFields.push("contact");
  if (!isNonEmptyString(incidentType)) missingFields.push("incidentType");
  if (!isNonEmptyString(location)) missingFields.push("location");
  if (!isNonEmptyString(description)) missingFields.push("description");
  if (!isNonEmptyString(severity)) missingFields.push("severity");

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing or invalid required field(s): ${missingFields.join(", ")}`,
    });
  }

  const newIncident = {
    id: getNextIncidentId(),
    reporterName: reporterName.trim(),
    contact: contact.trim(),
    incidentType: incidentType.trim(),
    location: location.trim(),
    description: description.trim(),
    severity,
    reportedAt: new Date().toISOString(),
  };

  incidents.unshift(newIncident);

  res.status(201).json({
    success: true,
    message: "Incident reported successfully.",
    data: newIncident,
  });
});

// ----- Emergency Requests -----
app.get("/api/emergency-requests", (req, res) => {
  res.json({
    success: true,
    count: emergencyRequests.length,
    data: emergencyRequests,
  });
});

app.post("/api/emergency-requests", (req, res) => {
  const { requesterName, contact, location, emergencyType, description, priority } = req.body || {};

  const missingFields = [];
  if (!isNonEmptyString(requesterName)) missingFields.push("requesterName");
  if (!isNonEmptyString(contact)) missingFields.push("contact");
  if (!isNonEmptyString(location)) missingFields.push("location");
  if (!isNonEmptyString(emergencyType)) missingFields.push("emergencyType");
  if (!isNonEmptyString(description)) missingFields.push("description");
  if (!isNonEmptyString(priority)) missingFields.push("priority");

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      message: `Missing or invalid required field(s): ${missingFields.join(", ")}`,
    });
  }

  const newRequest = {
    id: getNextRequestId(),
    requesterName: requesterName.trim(),
    contact: contact.trim(),
    location: location.trim(),
    emergencyType: emergencyType.trim(),
    description: description.trim(),
    priority,
    requestedAt: new Date().toISOString(),
    status: "Pending",
  };

  emergencyRequests.unshift(newRequest);

  res.status(201).json({
    success: true,
    message: "Emergency request submitted successfully.",
    data: newRequest,
  });
});

// ----- Safe Locations -----
app.get("/api/safe-locations", (req, res) => {
  res.json({
    success: true,
    count: safeLocations.length,
    data: safeLocations,
  });
});

// ----- Volunteers / Community Response -----
app.get("/api/volunteers", (req, res) => {
  res.json({
    success: true,
    count: volunteers.length,
    data: volunteers,
  });
});

// ---------- 404 handler ----------
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.method} ${req.originalUrl}`,
  });
});

// ---------- Global error handler ----------
app.use((err, req, res, next) => {
  console.error("Unexpected server error:", err);
  res.status(500).json({
    success: false,
    message: "An unexpected server error occurred.",
  });
});

app.listen(PORT, () => {
  console.log("======================================================");
  console.log(" Disaster Alert and Community Response App - Backend");
  console.log(" Academic demonstration project (mock/in-memory data)");
  console.log("======================================================");
  console.log(`Server running at: http://localhost:${PORT}`);
  console.log(`Health check:      http://localhost:${PORT}/api/health`);
  console.log("======================================================");
});
