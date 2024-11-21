function FinishScreen({ points, maxPossiblePoints, highScore, dispatch }) {
  const percentage = Math.ceil((points / maxPossiblePoints) * 100);

  let emoji = "🎈";
  if (percentage === 100) {
    emoji = "🥇";
  } else if (percentage >= 80) {
    emoji = "😊";
  } else if (percentage >= 60) {
    emoji = "🤔";
  } else {
    emoji = "👎";
  }

  return (
    <div className="finish-screen">
      <div>
        {emoji} you scored {points} out of {maxPossiblePoints} ({percentage}%)
      </div>
      <div>(high score: {highScore} points)</div>
      <button className="btn" onClick={() => dispatch({ type: "restart" })}>
        Restart quiz
      </button>
    </div>
  );
}

export default FinishScreen;
