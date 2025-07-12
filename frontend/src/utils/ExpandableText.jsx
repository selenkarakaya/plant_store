import React, { useState } from "react";

const ExpandableText = ({ text, limit = 150, className = "" }) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return null;

  const isLong = text.length > limit;
  const visibleText = expanded || !isLong ? text : text.slice(0, limit) + "...";

  return (
    <p className={` ${className}`}>
      {visibleText}
      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="ml-2 text-green-600 font-semibold hover:underline"
        >
          {expanded ? "Less" : "More"}
        </button>
      )}
    </p>
  );
};

export default ExpandableText;
