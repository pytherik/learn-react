const TipAmount = ({ children, tipAmount, onTipChange}) => {
  return (
    <div>
      <label>{ children } &nbsp;</label>
      <select value={ tipAmount } onChange={ (e) => onTipChange(e.target.value) }>
        <option value="0">War scheisse (0%)</option>
        <option value="5">War solala (5%)</option>
        <option value="10">War gut (10%)</option>
        <option value="15">War besser (15%)</option>
        <option value="20">War exzellent (20%)</option>
      </select>
    </div>
  );
};

export default TipAmount;
