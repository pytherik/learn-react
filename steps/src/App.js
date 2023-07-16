import { useState } from 'react';

const messages = [
  "Learn React ⚛️",
  "Geh scheissen 💼",
  "Scheiss nicht ins Wohnzimmer 🤑",
];

const Button = ({ textColor, bgColor, handleAction, children }) => {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor}}
      onClick={ handleAction }>
      { children }
    </button>
  )
}

const StepMessage = ({ step, children }) => {
  return (
    <div className="message">
      <h3>Step {step}</h3>
      { children }
    </div>
  )
}

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
          <StepMessage step={step}>
            {messages[step - 1]}
            <div className="buttons">
              <Button bgColor="#66aaee"
                      textColor="#fff"
                      handleAction={() => alert("aufs Klohoo!")}>
                <span>💩</span> Shit
              </Button>
            </div>
          </StepMessage>
          <div className="buttons">
          <Button bgColor="#7950f2"
                  textColor="#fff"
                  handleAction={handlePrevious}>
            <span>👈🏻</span> Previous
          </Button>
          <Button bgColor="#7950f2"
                  textColor="#fff"
                  handleAction={handleNext}>
            Next <span>👉🏼</span>
          </Button>
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
      {/*<Steps/>*/}
    </>
  )
};

export default App;
