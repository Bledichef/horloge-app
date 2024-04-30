import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

const CityTime = ({ city, timezone }) => {
  const [time, setTime] = useState(moment().tz(timezone).format('HH:mm:ss'));

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().tz(timezone).format('HH:mm:ss'));
    }, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  return (
    <div>
      <h2>{city}</h2>
      <p>{time}</p>
    </div>
  );
};

export default CityTime;