function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
  return (
    <div className="progress">
      <progress max={numQuestions} value={index + Number(answer !== null)} />
      <p className="">
        <div>
          Question <strong>{index + 1}</strong> / {numQuestions}
        </div>
        <div>
          <strong>{points}</strong> / {maxPossiblePoints}
        </div>
      </p>
    </div>
  );
}

export default Progress;
