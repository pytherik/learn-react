import DisplayTime from "./DisplayTime";

const ShowTimes = ({ times, onDelete, onClick }) => {
  return (
    <aside className="sidebar">
      { times.map((time, idx) => <DisplayTime
        time={ time }
        key={ idx }
        idx={ idx }
        onDelete={ onDelete }/>)}
      <button className="btn btn-start" onClick={ onClick }>Start</button>
    </aside>
  );
};

export default ShowTimes;
