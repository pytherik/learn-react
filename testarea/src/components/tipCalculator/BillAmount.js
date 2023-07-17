const BillAmount = ( { billAmount, onAmountChange}) => {
  return (
    <div>
      <label>Wie hoch ist die Rechnung?</label>
      <input type="text"
             value={ billAmount }
             onChange={ (e) => onAmountChange(e.target.value) }/>
    </div>
  );
};

export default BillAmount;
