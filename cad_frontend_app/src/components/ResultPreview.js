import React from 'react';

// PUBLIC_INTERFACE
export default function ResultPreview({ thumbnailUrl }) {
  /** Display a preview thumbnail if available. */
  if (!thumbnailUrl) {
    return <div className="help">No preview available.</div>;
  }
  return (
    <img
      alt="Drawing preview"
      src={thumbnailUrl}
      style={{ width: '100%', height: 'auto', borderRadius: 8, border: '1px solid #e5e7eb' }}
    />
  );
}
