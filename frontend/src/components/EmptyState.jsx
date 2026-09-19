import React from "react";

export default function EmptyState({ message = "No records found." }) {
  return (
    <div className="state-box empty-box">
      <span className="state-icon" aria-hidden="true">
        📭
      </span>
      <p>{message}</p>
    </div>
  );
}
