import React, { useEffect } from "react";

export default function Notification({ type = "success", message, onClose }) {
  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(() => {
      onClose && onClose();
    }, 4500);
    return () => clearTimeout(timer);
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`notification notification-${type}`} role="status">
      <span className="notification-icon" aria-hidden="true">
        {type === "success" ? "✅" : "⚠️"}
      </span>
      <span className="notification-message">{message}</span>
      <button className="notification-close" onClick={onClose} aria-label="Dismiss notification">
        ✕
      </button>
    </div>
  );
}
