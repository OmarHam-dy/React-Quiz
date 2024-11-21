import { useEffect, useReducer } from "react";

import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextQuestion from "./NextQuestion";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const SECONDS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  remainingSeconds: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "successFetching":
      return { ...state, questions: action.payload, status: "ready" };
    case "failFetching":
      return { ...state, status: "error" };
    case "start":
      return {
        ...state,
        status: "active",
        remainingSeconds: state.questions.length * SECONDS_PER_QUESTION,
      };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "newAnswer":
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          state.points +
          (question.correctOption === action.payload ? question.points : 0),
      };
    case "finish":
      return {
        ...state,
        status: "finish",
        highScore: Math.max(state.highScore, state.points),
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highScore: state.highScore,
      };
    case "tick":
      return { ...state, remainingSeconds: state.remainingSeconds - 1 };
    default:
      throw new Error("Unknown action");
  }
}

function Main() {
  const [
    { questions, status, index, answer, points, highScore, remainingSeconds },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce((sum, q) => sum + q.points, 0);

  useEffect(function () {
    async function questionsFetch() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        if (!res.ok) throw new Error("Faild fetching data");
        const questions = await res.json();
        // console.log(questions);
        dispatch({ type: "successFetching", payload: questions });
      } catch (err) {
        dispatch({ type: "failFetching" });
      }
    }

    questionsFetch();
  }, []);

  return (
    <div className="main">
      {status === "loading" && <Loader>Loading questions ...</Loader>}
      {status === "ready" && (
        <StartScreen dispatch={dispatch} numQuestions={numQuestions} />
      )}
      {status === "active" && (
        <>
          <Progress
            index={index}
            answer={answer}
            points={points}
            numQuestions={numQuestions}
            maxPossiblePoints={maxPossiblePoints}
          />
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
          <Footer>
            <>
              <Timer remainingSeconds={remainingSeconds} dispatch={dispatch} />
              <NextQuestion
                dispatch={dispatch}
                answer={answer}
                numQuestions={numQuestions}
                index={index}
              />
            </>
          </Footer>
        </>
      )}

      {status === "finish" && (
        <FinishScreen
          points={points}
          maxPossiblePoints={maxPossiblePoints}
          highScore={highScore}
          dispatch={dispatch}
        />
      )}
    </div>
  );
}

export default Main;
