function Options({ dispatch, question, answer }) {
  return (
    <div className="options">
      {question.options.map((opt, i) => (
        <button
          key={i}
          disabled={answer !== null}
          className={`btn btn-option ${i === answer ? "answer" : ""} ${
            answer === null
              ? ""
              : i === question.correctOption
              ? "correct"
              : "wrong"
          }`}
          onClick={() => dispatch({ type: "newAnswer", payload: i })}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

export default Options;
