const SetPart = ({ children, max, onTimeChange, val }) => {

  const handleWheelSetTime = (e) => {
    e.deltaY < 0
      ? onTimeChange(e.target.value < max ? ++e.target.value: 0)
      : onTimeChange(e.target.value > 0 ? --e.target.value: max);
  }

  return (
    <div>
      <label>{ children }</label><br/>
      <input type="text"
             value={val}
             onChange={(e) => onTimeChange((e.target.value < max && e.target.value >= 0) && e.target.value )}
             onWheel={ handleWheelSetTime }/>
    </div>
  );
};

export default SetPart;
