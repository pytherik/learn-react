import {useState} from 'react';
import SetPart from "./SetPart";

const SetTime = ({ onTimeSet, val }) => {
  const hourMax = 23;
  const minMax = 59;
  const secMax = 59;

  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);


  return (
    <div className="time-input">
      <form onSubmit={onTimeSet.bind([hours, mins, secs])}>
        <div className="form-input">
          <SetPart onTimeChange={setHours}
                   max={hourMax}
                   val={ val }>
            HH
          </SetPart>
          <SetPart onTimeChange={setMins}
                   max={minMax}
                   val={ val }>
            MM
          </SetPart>
          <SetPart onTimeChange={setSecs}
                   max={secMax}
                   val={ val }>
            SS
          </SetPart>
        </div>
      <button className="btn btn-save">dieseZeit</button>
      </form>
    </div>
  );
};

export default SetTime;
