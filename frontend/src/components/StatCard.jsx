import React from "react";

export default function StatCard({ icon, label, value, accent = "blue" }) {
  return (
    <div className={`stat-card stat-card-${accent}`}>
      <div className="stat-card-icon" aria-hidden="true">
        {icon}
      </div>
      <div className="stat-card-body">
        <span className="stat-card-value">{value}</span>
        <span className="stat-card-label">{label}</span>
      </div>
    </div>
  );
}
