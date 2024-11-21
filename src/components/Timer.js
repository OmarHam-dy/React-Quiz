import { useEffect } from "react";

function Timer({ remainingSeconds, dispatch }) {
  const minutes = String(Math.floor(remainingSeconds / 60)).padStart(2, "0");
  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  useEffect(
    function () {
      const id = setInterval(() => dispatch({ type: "tick" }), 1000);
      return () => clearInterval(id);
    },
    [dispatch]
  );

  if (remainingSeconds === 0) dispatch({ type: "finish" });

  return (
    <div className="timer">
      {minutes}:{seconds}
    </div>
  );
}

export default Timer;
