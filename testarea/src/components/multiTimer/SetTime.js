import { useState } from 'react';
import SetPart from "./SetPart";

const SetTime = ({ onTimeSet }) => {
  const hourMax = 23;
  const minMax = 59;
  const secMax = 59;

  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);


  return (
    <div className="time-input">
      <form onSubmit={ onTimeSet.bind([hours, mins, secs]) }>
        <SetPart onTimeChange={ setHours } max={hourMax}>
          Hours
        </SetPart>
        <SetPart onTimeChange={ setMins } max={minMax}>
          Minutes
        </SetPart>
        <SetPart onTimeChange={ setSecs } max={secMax}>
          Seconds
        </SetPart>
        <button>dieseZeit</button>
      </form>
    </div>
  );
};

export default SetTime;
