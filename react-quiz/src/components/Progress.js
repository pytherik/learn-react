const Progress = ({idx, numQuestions, points, totalPoints, answer}) => {
  return (
    <header className="progress">
      <progress max={numQuestions} value={idx + Number(answer !== null)}/>
      <p>Question <strong>{idx + 1}</strong>/{numQuestions}</p>
      <p><strong>{points}</strong> / {totalPoints}</p>
    </header>
  );
};

export default Progress;
