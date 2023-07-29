import {useEffect} from "react";

const Timer = ({dispatch, secondsRemaining}) => {
  useEffect(() => {
    const id = setInterval(() => {
      dispatch({type: "tick"});
    }, 1000);

    return () => clearInterval(id)
  }, [dispatch])

  const minsRemaining = `0${Math.floor(secondsRemaining / 60)}`.slice(-2);
  const secsRemaining = `0${secondsRemaining % 60}`.slice(-2);
  return (
    <div className="timer">
      {minsRemaining}:{secsRemaining}
    </div>
  );
};

export default Timer;
