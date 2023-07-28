const NextButton = ({dispatch, answer, idx, numQuestions}) => {
  if (answer === null) return null;
  if (idx < numQuestions -1) return (
    <div>
      <button className="btn btn-ui"
              onClick={() => dispatch({type: 'nextQuestion'})}>
        Next
      </button>
    </div>
  );


  if (idx === numQuestions -1) return (
    <div>
      <button className="btn btn-ui"
              onClick={() => dispatch({type: 'finish'})}>
        Finish
      </button>
    </div>
  );
};

export default NextButton;
