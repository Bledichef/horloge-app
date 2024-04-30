import React, { useState } from 'react';

const AlarmForm = ({ addAlarm }) => {
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  const setAlarm = (event) => {
    event.preventDefault();
    if (hour && minute) {
      addAlarm(`${hour}:${minute}`);
      setHour("");
      setMinute("");
    }
  };

  return (
    <form onSubmit={setAlarm}>
      <input type="number" value={hour} onChange={e => setHour(e.target.value)} placeholder="Heure" />
      <input type="number" value={minute} onChange={e => setMinute(e.target.value)} placeholder="Minute" />
      <button type="submit">Ajouter une alarme</button>
    </form>
  );
};

export default AlarmForm;