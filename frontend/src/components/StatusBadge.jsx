import React from "react";

// Maps a severity/priority/status word to a CSS modifier class.
function toModifier(value) {
  if (!value) return "default";
  return value.toString().trim().toLowerCase().replace(/\s+/g, "-");
}

export default function StatusBadge({ label }) {
  const modifier = toModifier(label);
  return <span className={`badge badge-${modifier}`}>{label}</span>;
}
