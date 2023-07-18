import {useState} from 'react';
import Header from "./components/multiTimer/Header";
import SetTime from "./components/multiTimer/SetTime";
import ShowTimes from "./components/multiTimer/ShowTimes";
import Start from "./components/multiTimer/Start";

const MultiTimer = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds, setTotalSeconds] = useState([])
  const [times, setTimes] = useState([]);

  const handleSetTime = function (e) {
    e.preventDefault();
    if (this.reduce((acc, val) => acc + val, 0) === 0) return null;
    setTimes(times => [...times, this])
  }

  const handleDeleteTime = (idx) => {
    setTimes(times.filter((_, id) => idx !== id))
  }

  const handleStart = () => {
    setIsRunning(!isRunning);
    // console.log(times);
    setTotalSeconds(times.map(time =>
      time.reduce((acc, val, idx) => acc + val *
        (idx === 0 ? 3600: idx === 1 ? 60: 1), 0)));
  }

  const Initialize = () => {
    return (
      <>
        <SetTime onTimeSet={ handleSetTime }
                 val={'00'}/>
        {times.length > 0 &&
          <ShowTimes
            times={times}
            onDelete={handleDeleteTime}
            onClick={ handleStart }/>}
      </>
    )
  }

  return (
    <>
      <Header />
      <div className="container">
        {!isRunning
          ? <Initialize />
          : <Start
            totalSeconds={ totalSeconds }
            onCountdown={ setTotalSeconds } />}
          </div>
          </>
          );
        };

export default MultiTimer;
