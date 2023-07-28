const FinishScreen = ({points, totalPoints, highscore, dispatch}) => {
  const percentage = Math.ceil(points / totalPoints * 100);
  let emoji;
  if (percentage === 100) emoji = "🍻";
  if (percentage < 100 && percentage >= 80) emoji = "🍪";
  if (percentage < 80 && percentage >= 50) emoji = "😆";
  if (percentage < 50 && percentage >= 20) emoji = "😗";
  if (percentage < 20) emoji = "🤮";
  return (
    <>
      <p className="result">
        {emoji} You scored <strong>{points}</strong> out of {totalPoints} points ({percentage}%)
      </p>
      <p className="highscore">(Highscore: {highscore} points)</p>
      <button className="btn btn-ui" onClick={() => dispatch({type: "restart"})}>Restart Quiz</button>
    </>
  );
};

export default FinishScreen;
