import React from "react";
import PageHeader from "../components/PageHeader.jsx";

export default function About() {
  return (
    <div>
      <PageHeader title="About This Project" />

      <div className="panel about-panel">
        <p>
          The <strong>Disaster Alert and Community Response App</strong> is designed to organize disaster
          information, incident reports, emergency requests, safe locations, and community coordination to
          support faster disaster response.
        </p>

        <p>
          It brings together disaster alerts, citizen-reported incidents, emergency assistance requests, a
          directory of safe locations (shelters, hospitals, and relief centers), and a view of community
          volunteers coordinating on-the-ground response — all in a single dashboard.
        </p>

        <div className="demo-banner">
          This project is an academic demonstration built for a B.Tech CSIT coursework submission. It is
          <strong> not a real emergency service</strong> and should not be used to report or respond to actual
          disasters. In a real emergency, please contact your local emergency services.
        </div>

        <h2>Current Version</h2>
        <p>
          This version uses a Node.js/Express backend with realistic in-memory mock data and a React + Vite
          frontend that communicates with the backend over REST APIs. There is no persistent database yet —
          data added during a session (such as new incident reports or emergency requests) resets when the
          backend server restarts.
        </p>

        <h2>Planned Future Development</h2>
        <ul>
          <li>Integration with a MySQL database for persistent storage</li>
          <li>User authentication for reporters, volunteers, and administrators</li>
          <li>Real-time notifications for new alerts and emergency requests</li>
          <li>Map-based visualization of alerts, incidents, and safe locations</li>
        </ul>
      </div>
    </div>
  );
}
