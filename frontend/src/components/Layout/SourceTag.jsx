import React from 'react';

/**
 * Renders standardized data provenance badges:
 * - REAL GOVERNMENT DATA
 * - SIMULATED SCENARIO
 * - MODEL PREDICTION
 * - ANALYTICAL SCORE
 */
export default function SourceTag({ type = "REAL", text }) {
  let className = "data-tag-real";
  let defaultText = "REAL GOVERNMENT DATA";

  if (type === "SIMULATED") {
    className = "data-tag-simulated";
    defaultText = "SIMULATED SCENARIO";
  } else if (type === "PREDICTION") {
    className = "data-tag-prediction";
    defaultText = "MODEL PREDICTION";
  } else if (type === "ANALYTICAL") {
    className = "data-tag-analytical";
    defaultText = "ANALYTICAL SCORE";
  }

  return (
    <span className={`data-tag ${className}`}>
      ● {text || defaultText}
    </span>
  );
}
