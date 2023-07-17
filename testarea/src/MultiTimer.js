import { useState } from 'react';
import Header from "./components/multiTimer/Header";
import SetTime from "./components/multiTimer/SetTime";

const MultiTimer = () => {
  // const [isRunning, setIsRunning] = useState(false);
  const [times, setTimes] = useState([]);

  const handleSetTime = function(e) {
    e.preventDefault();
    setTimes([...times, this])
    console.log(times);
  }

  return (
    <>
      <Header />
      <div className="container">
        <SetTime onTimeSet={ handleSetTime }/>
      </div>
    </>
  );
};

export default MultiTimer;
