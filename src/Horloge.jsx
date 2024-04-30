import React, { useState, useEffect } from 'react';
import './Horloge.css';
import { themes } from './Components/Theme';
import CityTime from './Components/Citytime';
import HourMarkers from './Components/HourMarker';
import MinuteMarkers from './Components/MinuteMarker';
import AlarmForm from './Components/AlarmForm';
import Alarm from './Components/Alarm';


const date = new Date();
const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const dayName = days[date.getDay()];
const dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;

const Horloge = () => {

  const [alarmTimes, setAlarmTimes] = useState([]);
  const [date, setDate] = useState(new Date());
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const interval = setInterval(() => {

    }, 1000);

    // N'oubliez pas de nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);


  
  const addAlarm = (time) => {
    setAlarmTimes([...alarmTimes, time]);

    // Demander la permission de notification
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        // Envoyer une notification
        new Notification('Alarme programmée', {
          body: `Une alarme a été programmée pour ${time}.`,
        });
      }
    });
  };

  const removeAlarm = (index) => {
    const newAlarmTimes = [...alarmTimes];
    newAlarmTimes.splice(index, 1);
    setAlarmTimes(newAlarmTimes);
  };


  useEffect(() => {
    const timerID = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timerID);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    const themeProperties = themes[theme];
    Object.entries(themeProperties).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const seconds = date.getSeconds() * 6;
  const minutes = date.getMinutes() * 6 + (seconds / 60);
  const hours = ((date.getHours() % 12) / 12) * 360 + (minutes / 12);

  return (
    
    <div className="horloge-container">
      <div className="horloge">
      <HourMarkers />
      <MinuteMarkers />
        <div className="hand hour-hand" style={{ transform: `rotate(${hours}deg)` }} />
        <div className="hand minute-hand" style={{ transform: `rotate(${minutes}deg)` }} />
        <div className="hand second-hand" style={{ transform: `rotate(${seconds}deg)` }} />
      </div>
      <div className="horloge-container">
      <CityTime city="New York" timezone="America/New_York" />
      <CityTime city="Paris" timezone="Europe/Paris" />
      <CityTime city="Tokyo" timezone="Asia/Tokyo" />
      <h1>Horloge</h1>
      <p>{dayName} {dateString}</p>

        <AlarmForm addAlarm={addAlarm} />
      <Alarm alarmTimes={alarmTimes} removeAlarm={removeAlarm} />
      <div className="alarm-times">
      {alarmTimes.map((time, index) => {

      const [alarmHours, alarmMinutes] = time.split(':').map(Number);
      const alarmTime = new Date();
      alarmTime.setHours(alarmHours, alarmMinutes, 0, 0);

    }
    )}
      </div>
    </div> 

    <button className="theme-button" onClick={toggleTheme}>Changer de Theme</button>
    </div>
  );
};

export default Horloge;