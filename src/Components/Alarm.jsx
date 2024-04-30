
import React from 'react';

const Alarm = ({ alarmTimes, removeAlarm }) => {
  return (
    <div className="alarm-times">
      {alarmTimes.map((time, index) => {
        const now = new Date();
        const [alarmHours, alarmMinutes] = time.split(':').map(Number);
        const alarmTime = new Date();
        alarmTime.setHours(alarmHours, alarmMinutes, 0, 0);

        const diff = alarmTime - now;
        const diffHours = Math.floor(diff / 1000 / 60 / 60);
        const diffMinutes = Math.floor(diff / 1000 / 60) % 60;

        return (
          <div className="alarm-time" key={index}>
            <p>Alarme programmée pour : {time} (dans {diffHours} heures et {diffMinutes} minutes)</p>
            <button onClick={() => removeAlarm(index)} className="remove-alarm-button">Supprimer</button>
          </div>
        );
      })}
    </div>
  );
};

export default Alarm;