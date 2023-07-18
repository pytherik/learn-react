const DisplayTime = ({ time, idx, onDelete }) => {
  const hh = `0${time[0]}`.slice(-2)
  const mm = `0${time[1]}`.slice(-2)
  const ss = `0${time[2]}`.slice(-2)

  return (
    <div className="time-set">
      <span>Zeit { idx+1 }</span>
      <button className="btn btn-delete"
              onClick={() => onDelete(idx)}>
        &times;
      </button>
      <span>{ hh }:{ mm }:{ ss }</span>
    </div>
  );
};

export default DisplayTime;
