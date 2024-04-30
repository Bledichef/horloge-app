// MinuteMarkers.jsx
import React from 'react';

const MinuteMarkers = () => {
  return (
    <>
      {Array(60).fill(null).map((_, i) => (
        <div
          key={i}
          className="minute-marker"
          style={{ transform: `rotate(${i * 6}deg)` }}
        />
      ))}
    </>
  );
};

export default MinuteMarkers;