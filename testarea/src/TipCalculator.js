import {useState} from 'react';
import BillAmount from "./components/tipCalculator/BillAmount";
import TipAmount from "./components/tipCalculator/TipAmount";
import Calculated from "./components/tipCalculator/Calculated";
import Reset from "./components/tipCalculator/Reset";

const TipCalculator = () => {
  const [billAmount, setBillAmount] = useState('');
  const [tipAmount, setTipAmount] = useState(10);
  const [contentment, setContentment] = useState(10);

  const handleReset = () => {
    setBillAmount('');
    setTipAmount(10);
    setContentment(10);
  }

  return (
    <div className="container">
      <BillAmount billAmount={billAmount}
                  onAmountChange={setBillAmount}/>
      <TipAmount tipAmount={tipAmount}
                 onTipChange={setTipAmount}>
        Wie war der Service?
      </TipAmount>
      <TipAmount tipAmount={contentment}
                 onTipChange={setContentment}>
        Und deine Freunde?
      </TipAmount>
      { billAmount && <>
        <Calculated billAmount={Number(billAmount)}
                    tipAmount={Number(tipAmount)}
                    contentment={Number(contentment)}/>
        <Reset onReset={handleReset}/>
      </> }
        </div>
        );
      };

export default TipCalculator