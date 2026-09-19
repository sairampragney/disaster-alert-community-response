import React from "react";

export default function ErrorState({ message, onRetry }) {
  return (
    <div className="state-box error-box">
      <span className="state-icon" aria-hidden="true">
        ⚠️
      </span>
      <p>{message || "Something went wrong while loading data."}</p>
      {onRetry && (
        <button className="btn btn-secondary" onClick={onRetry}>
          Try Again
        </button>
      )}
    </div>
  );
}
