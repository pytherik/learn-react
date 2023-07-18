import {useState, useEffect} from "react";
import GetTotalTime from "./GetTotalTime";
// import ring from '../../assets/sounds/fahrradklingel.mp3'
// import setTime from "./SetTime";

const Start = ({totalSeconds, onCountdown}) => {
  // const [alarm, setAlarm] = useState(false);
  const sumTotalSeconds = totalSeconds
    ? totalSeconds.reduce((acc, val) => acc + val, 0)
    : 0;


  useEffect(() => {
    totalSeconds[0] > 0 && setTimeout(() => {
      onCountdown(
        totalSeconds.map((secs, idx) => idx === 0 ? --secs : secs
        ))
    }, 1000)
  }, [totalSeconds[0]]);

  if (totalSeconds[0] === 0) {
    if (sumTotalSeconds > 0) {
      totalSeconds.shift();
    }
  }

  return (
    <div>
      <h1>Gesamte Zeit:
        <GetTotalTime totalSeconds={sumTotalSeconds}/>
      </h1>
      {totalSeconds.map((total, idx) =>
        <h1 key={idx}>Started:&nbsp;
          <GetTotalTime totalSeconds={total}/>
        </h1>)}
    </div>
  );
};

export default Start;

