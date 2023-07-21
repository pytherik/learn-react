import {useState, useEffect} from 'react';

export default function CurrencyConversion() {
  const [fromCurrency, setFromCurrency] = useState("EUR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState(1)
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getExchangeRate = async () => {
      try {
        setIsLoading(true);
        const res = await
          fetch(
            `https://api.frankfurter.app/latest?
            amount=${amount}&
            from=${fromCurrency}&
            to=${toCurrency}`
          )
        const data = await res.json();
        setConverted(data.rates[toCurrency]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    getExchangeRate();
  }, [amount, fromCurrency, toCurrency])

  const handleToggleCurrencies = (e) => {
    e.preventDefault();
    const tempCurrency = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(tempCurrency);
  }

  return (
    <div className="container">
      <input type="text"
             value={amount}
             placeholder="Umrechnungsbetrag"
             onChange={(e) => setAmount(Number(e.target.value))}/>
      <div className="btn-container" onClick={handleToggleCurrencies}>
      <select value={fromCurrency}
              onChange={(e) => toCurrency !== e.target.value &&
                setFromCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
        <button className="btn btn-toggle">&#8651;</button>
      <select  value={toCurrency}
               onChange={(e) => fromCurrency !== e.target.value &&
                 setToCurrency(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      </div>
      <p className="output">{isLoading ? 'wait..⌛': converted}</p>
    </div>
  );
}

