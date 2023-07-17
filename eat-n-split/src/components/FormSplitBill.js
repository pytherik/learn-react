import { useState } from "react";
import Button from "./Button";

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState('');
  const [expense, setExpense] = useState('');
  const [whoPays, setWhoPays] = useState('user');
  const youPay = bill ? bill - expense: '';

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!bill || !expense) return null;
    const value = whoPays === 'user' ? youPay : -expense;
    onSplitBill(value);
  }
  return (
    <form className="form-split-bill" onSubmit={ handleSubmit }>
      <h2>Rechnung mit {selectedFriend.name} teilen</h2>
      <label>💰 Totale Rechnung</label><br/>
      <input type="text"
             value={bill}
             onChange={(e) => (e.target.value > 0 || e.target.value === '') && setBill(Number(e.target.value))}/><br/>
      <label>💩 Dein Anteil</label><br/>
      <input type="text"
             value={expense}
             onChange={(e) =>  e.target.value <= bill && setExpense(Number(e.target.value))}/><br/>
      <label>💩 {selectedFriend.name}s Anteil</label><br/>
      <input type="text" value={ youPay } disabled /><br/>
      <label>Wer bezahlt?</label><br/>
      <select value={ whoPays } onChange={(e) => setWhoPays(e.target.value)}>
        <option value="user">Du</option>
        <option value="fiend">{ selectedFriend.name }</option>
      </select>
      <Button>Teilen</Button>
    </form>
  )
}

export default FormSplitBill;