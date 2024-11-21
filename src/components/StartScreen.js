function StartScreen({ numQuestions, dispatch }) {
  return (
    <div className="start-screen">
      <h2>Welcome to The React Qiuz!</h2>
      <p>{numQuestions} questions to test your React mastery</p>
      <button className="btn" onClick={() => dispatch({ type: "start" })}>
        Let's start
      </button>
    </div>
  );
}

export default StartScreen;
