import React from "react";

export default function LoadingState({ message = "Loading data..." }) {
  return (
    <div className="state-box loading-box">
      <div className="spinner" aria-hidden="true"></div>
      <p>{message}</p>
    </div>
  );
}
