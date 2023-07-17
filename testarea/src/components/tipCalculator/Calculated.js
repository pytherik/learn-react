const Calculated = ({ billAmount, tipAmount, contentment }) => {
  const tip = (+(billAmount * (tipAmount + contentment) / 2 / 100)).toFixed(2);
  const total = (billAmount + +tip).toFixed(2);

  return (
    <div><br/>
      <h3>Du zahlst €{ total } (€{billAmount} + €{ tip } Trinkgeld)</h3>
    </div>
  );
};

export default Calculated;
