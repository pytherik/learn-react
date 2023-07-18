const GetTotalTime = ({ totalSeconds }) => {

  const secs = `0${Math.floor(totalSeconds % 60)}`.slice(-2);
  const mins = `0${Math.floor(totalSeconds / 60 % 60)}`.slice(-2);
  const hours = `0${Math.floor(totalSeconds / 3600 % 24)}`.slice(-2);
  const days = `0${Math.floor(totalSeconds / 3600 / 24)}`.slice(-2);

  return (
    <span>
      {days}:{hours}:{mins}:{secs}
    </span>
  );
};

export default GetTotalTime;
