import React, { useState, useEffect } from 'react';
import './Horloge.css';

const date = new Date();
const days = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
const dayName = days[date.getDay()];
const dateString = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}`;


const themes = {
    light: {
        
      '--background-color': '#f4f4f4',
      '--text-color': '#333',
      '--hand-color': '#333',
      '--button-color': '#333',
      '--button-background-color': '#fff',
      '--hour-marker-color': '#ccc',
      '--horloge-background-color': '#fff',
      '--horloge-border-color': '#333',
      '--hand-color-hour': '#333',
      '--hand-color-minute': '#666',
      '--hand-color-second': '#999',
      '--number-color': '#333',
      '--horloge-border-radius': '50%',
      '--horloge-background': '#fff',
    },
    dark: {
      '--background-color': '#1f4037',
      '--text-color': '#fff',
      '--hand-color': '#ccc',
      '--button-color': '#fff',
      '--button-background-color': '#333',
      '--hour-marker-color': '#fff',
      '--horloge-background-color': '#333',
      '--horloge-border-color': '#fff',
      '--hand-color-hour': '#ccc',
      '--hand-color-minute': '#aaa',
      '--hand-color-second': '#bbb',
      '--number-color': '#fff',
      '--horloge-border-radius': '50%',
      '--horloge-background': '#333',
    },
  };

const Horloge = () => {
  const [date, setDate] = useState(new Date());
  const [theme, setTheme] = useState('light');

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

  const hourMarkers = Array(12).fill(null).map((_, i) => (
    <div
      key={i}
      className="hour-marker"
      style={{ transform: `rotate(${i * 30}deg)` }}
    >
      <span>{i === 0 ? 12 : i}</span>
    </div>
  ));

  const minuteMarkers = Array(60).fill(null).map((_, i) => (
    <div
      key={i}
      className="minute-marker"
      style={{ transform: `rotate(${i * 6}deg)` }}
    />
  ));

  return (
    <div className="horloge-container">
      <div className="horloge">
        {hourMarkers}
        {minuteMarkers}
        <div className="hand hour-hand" style={{ transform: `rotate(${hours}deg)` }} />
        <div className="hand minute-hand" style={{ transform: `rotate(${minutes}deg)` }} />
        <div className="hand second-hand" style={{ transform: `rotate(${seconds}deg)` }} />
      </div>
      {/* Ajoutez ces lignes pour afficher la date et le jour de la semaine */}
      <div className={`date-container ${theme}`}>
    <p>{dayName}, {dateString}</p>
</div>
      <button onClick={toggleTheme}>Changer de Theme</button>
    </div>
  );
};

export default Horloge;