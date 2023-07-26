const Options = ({question, dispatch, answer}) => {
  const hasAnswered = answer !== null;
  return (
    <div>
      <div className="options">
        {question.options.map((option, idx) => (
          <button className={`btn btn-option 
          ${idx === answer ? "answer" : ""} 
          ${idx === question.correctOption && hasAnswered 
            ? "correct"
            : hasAnswered 
              ? "wrong" 
              : ""}`}
                  key={option}
                  onClick={() => dispatch(
                    {
                      type: "newAnswer",
                      payload: idx
                    })}
          disabled={hasAnswered}>
            {option}
          </button>
          ))}
      </div>
    </div>
  );
};

export default Options;
