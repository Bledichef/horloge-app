import React, { useState, useEffect } from 'react';
import './Horloge.css';
import moment from 'moment-timezone';


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
      '--p-text-color': '#333', 
      '--h1-text-color': '#333', 
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
      '--h1-text-color': '#fff',
        '--p-text-color': '#ddd', 

    },
  };

const Horloge = () => {

  const [timeInNewYork, setTimeInNewYork] = useState(moment().tz("America/New_York").format('HH:mm:ss'));
  const [timeInParis, setTimeInParis] = useState(moment().tz("Europe/Paris").format('HH:mm:ss'));
  const [timeInTokyo, setTimeInTokyo] = useState(moment().tz("Asia/Tokyo").format('HH:mm:ss'));



  const [date, setDate] = useState(new Date());
  const [theme, setTheme] = useState('light');
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeInNewYork(moment().tz("America/New_York").format('HH:mm:ss'));
      setTimeInParis(moment().tz("Europe/Paris").format('HH:mm:ss'));
      setTimeInTokyo(moment().tz("Asia/Tokyo").format('HH:mm:ss'));
    }, 1000);

    // N'oubliez pas de nettoyer l'intervalle lorsque le composant est démonté
    return () => clearInterval(interval);
  }, []);

  // Changez alarmTime pour être un tableau d'heures d'alarme
  const [alarmTimes, setAlarmTimes] = useState([]);

  const setAlarm = (event) => {
    event.preventDefault();
    if (hour && minute) {
      setAlarmTimes([...alarmTimes, `${hour}:${minute}`]);
  
      // Demander la permission de notification
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          // Envoyer une notification
          new Notification('Alarme programmée', {
            body: `Une alarme a été programmée pour ${hour}:${minute}.`,
          });
        }
      });
  
      setHour("");
      setMinute("");
    }
  };

  //const [alarmTimes, setAlarmTimes] = useState(["07:00", "08:00", "09:00"]); // Exemple de données

  useEffect(() => {
    let alarmTriggeredThisMinute = false;
    let alarmInterval;
    let alarmTimeout;
  
    const interval = setInterval(() => {
      const now = new Date();
      const nowHours = now.getHours();
      const nowMinutes = now.getMinutes();
  
      alarmTimes.forEach(time => {
        const [alarmHours, alarmMinutes] = time.split(':').map(Number);
  
        if (nowHours === alarmHours && nowMinutes === alarmMinutes) {
          if (!alarmTriggeredThisMinute) {
            console.log("C'est l'heure de l'alarme !");
            alarmInterval = setInterval(() => document.body.classList.toggle('alarm'), 500);
            alarmTriggeredThisMinute = true;
  
            // Supprimez l'alarme une minute après qu'elle ait été déclenchée
            alarmTimeout = setTimeout(() => {
              setAlarmTimes(alarmTimes.filter(alarmTime => alarmTime !== time));
              clearInterval(alarmInterval);
              document.body.classList.remove('alarm');
              alarmTriggeredThisMinute = false;
            }, 60000);
          }
        } else {
          if (alarmTriggeredThisMinute) {
            clearInterval(alarmInterval);
            document.body.classList.remove('alarm');
            alarmTriggeredThisMinute = false;
          }
        }
      });
    }, 1000);
  
    return () => {
      clearInterval(interval);
      clearInterval(alarmInterval);
      clearTimeout(alarmTimeout);
    };
  }, [alarmTimes, setAlarmTimes]);

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
      <div className="horloge-container">
      <p>Heure à New York : {timeInNewYork}</p>
      <p>Heure à Paris : {timeInParis}</p>
      <p>Heure à Tokyo : {timeInTokyo}</p>
      <h1>Horloge</h1>
      <p>{dayName} {dateString}</p>
      <form className="alarm-form" onSubmit={setAlarm}>
  <input type="number" min="0" max="23" value={hour} onChange={e => setHour(e.target.value)} placeholder="Heure" />
  <input type="number" min="0" max="59" value={minute} onChange={e => setMinute(e.target.value)} placeholder="Minute" />
  <button type="submit">Définir une alarme</button>
</form>

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
        <p key={index}>
          Alarme programmée pour : {time} (dans {diffHours} heures et {diffMinutes} minutes)
          <button onClick={() => {
            const newAlarmTimes = [...alarmTimes];
            newAlarmTimes.splice(index, 1);
            setAlarmTimes(newAlarmTimes);
          }}>Supprimer</button>
        </p>
      );
    })}
      </div>
    </div> 

    <button className="theme-button" onClick={toggleTheme}>Changer de Theme</button>
    </div>
  );
};

export default Horloge;