const SetPart = ({ children, max, onTimeChange }) => {
  let val;
  const handleWheelSetTime = (e) => {
    e.target.dataset.t = e.target.value;

    e.deltaY < 0
      ? onTimeChange(e.target.dataset.t < max
        ? ++e.target.dataset.t
        : e.target.dataset.t = '00')
      : onTimeChange(e.target.dataset.t > 0
        ? --e.target.dataset.t
        : e.target.dataset.t = max);
    e.target.value = `0${e.target.dataset.t}`.slice(-2);
  }

  const handleSetTime = (e) => {
    const prev = e.target.dataset.t;
    e.target.dataset.t = e.target.value;
    (e.target.dataset.t <= max &&
      e.target.dataset.t >= 0) ?
      onTimeChange(e.target.dataset.t) : e.target.dataset.t = prev;
    e.target.value = `0${e.target.dataset.t}`.slice(-2);
  }

  const delimiter = children !== 'SS' ? ':' : '';
  return (
    <div>
      <label>{ children }</label><br/>
      <input type="text"
             size="1"
             placeholder="00"
             value={ val }
             data-t=''
             onChange={ handleSetTime }
             onWheel={ handleWheelSetTime }/>
      <span>{ delimiter }</span>
    </div>
  );
};

export default SetPart;