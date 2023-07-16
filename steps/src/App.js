import { useState } from 'react';

const messages = [
  "Learn React ⚛️",
  "Geh scheissen 💼",
  "Scheiss nicht ins Wohnzimmer 🤑",
];

const Steps = () => {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(true);

  const handlePrevious = () => {
    step > 1 && setStep(step - 1);
  }

  const handleNext = () => {
    step < 3 && setStep(s => s + 1); //info updating a state based on the current value
                                     // of a state should be done using a callback f
  }

  return (
    <div>
      <button className="close" onClick={ () => setIsOpen(is => !is) }>
        &times;
      </button>
      { isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={ step >= 1 ? "active" : ""}>1</div>
            <div className={ step >= 2 ? "active" : ""}>2</div>
            <div className={ step === 3 ? "active" : ""}>3</div>
          </div>
          <p className="message">Step {step}: {messages[step - 1]}</p>
          <div className="buttons">
            <button style={{ backgroundColor: '#7950f2', color: '#fff' }}
                    onClick={ () => handlePrevious() }>
              Previous
            </button>
            <button style={{ backgroundColor: '#7950f2', color: '#fff' }}
                    onClick={ ()=> handleNext() }>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const App = () => {
  return (
    <>
      <Steps/>
      <Steps/>
    </>
  )
};

export default App;
