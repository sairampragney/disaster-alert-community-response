import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const NAV_LINKS = [
  { to: "/", label: "Dashboard" },
  { to: "/alerts", label: "Disaster Alerts" },
  { to: "/incidents", label: "Incident Reporting" },
  { to: "/emergency-requests", label: "Emergency Requests" },
  { to: "/safe-locations", label: "Safe Locations" },
  { to: "/community-response", label: "Community Response" },
  { to: "/about", label: "About" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-brand">
          <span className="navbar-brand-icon" aria-hidden="true">
            🛡️
          </span>
          <div className="navbar-brand-text">
            <span className="navbar-title">Disaster Alert &amp; Community Response</span>
            <span className="navbar-subtitle">Academic Demonstration Project</span>
          </div>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setIsOpen((open) => !open)}
          aria-label="Toggle navigation menu"
          aria-expanded={isOpen}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <nav className={`navbar-links ${isOpen ? "navbar-links-open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) => `navbar-link ${isActive ? "navbar-link-active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
