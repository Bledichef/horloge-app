import React from 'react';
import './Horloge.css';

class Horloge extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    const { date } = this.state;
    const seconds = date.getSeconds() * 6;
    const minutes = date.getMinutes() * 6 + (seconds / 60);
    const hours = ((date.getHours() % 12) / 12) * 360 + (minutes / 12);
  
    const hourMarkers = Array(12).fill(null).map((_, i) => (
        <div
          key={i}
          className="hour-marker"
          style={{ transform: `rotate(${i * 30}deg)` }}
        >
          <span>{i === 0 ? 12 : i}</span> {/* Afficher le chiffre de l'heure */}
        </div>
      ));
  
      return (
        <div className="horloge">
          {hourMarkers}
          <div className="hand hour-hand" style={{ transform: `rotate(${hours}deg)` }} />
          <div className="hand minute-hand" style={{ transform: `rotate(${minutes}deg)` }} />
          <div className="hand second-hand" style={{ transform: `rotate(${seconds}deg)` }} />
        </div>
      );
  }
}

export default Horloge;