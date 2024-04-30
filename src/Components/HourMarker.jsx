// HourMarkers.jsx
import React from 'react';

const HourMarkers = () => {
  return (
    <>
      {Array(12).fill(null).map((_, i) => (
        <div
          key={i}
          className="hour-marker"
          style={{ transform: `rotate(${i * 30}deg)` }}
        >
          <span>{i === 0 ? 12 : i}</span>
        </div>
      ))}
    </>
  );
};

export default HourMarkers;