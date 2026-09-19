import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Alerts from "./pages/Alerts.jsx";
import IncidentReporting from "./pages/IncidentReporting.jsx";
import EmergencyRequests from "./pages/EmergencyRequests.jsx";
import SafeLocations from "./pages/SafeLocations.jsx";
import CommunityResponse from "./pages/CommunityResponse.jsx";
import About from "./pages/About.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <main className="app-main">
        <div className="app-container">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/incidents" element={<IncidentReporting />} />
            <Route path="/emergency-requests" element={<EmergencyRequests />} />
            <Route path="/safe-locations" element={<SafeLocations />} />
            <Route path="/community-response" element={<CommunityResponse />} />
            <Route path="/about" element={<About />} />
            <Route
              path="*"
              element={
                <div className="not-found">
                  <h1>404</h1>
                  <p>The page you are looking for does not exist.</p>
                </div>
              }
            />
          </Routes>
        </div>
      </main>
      <footer className="app-footer">
        <p>
          Disaster Alert &amp; Community Response App — Academic Demonstration Project. Not a real emergency
          service.
        </p>
      </footer>
    </div>
  );
}
