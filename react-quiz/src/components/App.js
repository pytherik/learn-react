import {useEffect, useReducer} from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import Timer from "./Timer";
import Footer from "./Footer";

const initialState = {
  //info status: loading, error, ready, active, finished
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
  secsPerQuestion: 30
};

const SECS_PER_QUESTION = 30;

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready"
      };
    case "dataFailed":
      return {...state, status: "error"};
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points
      };
    case "start":
      return {...state,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION};
    case "nextQuestion":
      return {...state, index: state.index + 1, answer: null};
    case "finish":
      return {
        ...state, status: "finished",
        highscore:
          state.points > state.highscore
            ? state.points
            : state.highscore
      };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
        highscore: state.highscore
      };
    case "tick":
      return {...state,
        secondsRemaining: state.secondsRemaining -1,
        status: state.secondsRemaining === 0
          ? "finished"
          : state.status}
    default:
      throw new Error('unknown action');
  }
}

const App = () => {
  const [
    {
      questions,
      status,
      index,
      answer,
      points,
      highscore,
      secondsRemaining}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((acc, question) => acc + question.points, 0);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();
        dispatch({type: "dataReceived", payload: data});
      } catch (error) {
        dispatch({type: "dataFailed"});
        console.error(error);
      }
    }

    fetchData();
  }, [])

  return (
    <div className="app">
      <Header/>
      <Main>
        {status === "loading" && <Loader/>}
        {status === "error" && <Error/>}
        {status === "ready" && <StartScreen numQuestions={numQuestions}
                                            dispatch={dispatch}/>}
        {status === "active" &&
          <>
            <Progress idx={index} numQuestions={numQuestions}
                      points={points}
                      totalPoints={totalPoints}
                      answer={answer}/>
            <Question question={questions[index]}
                      dispatch={dispatch}
                      answer={answer}/>
            <Footer>
              <Timer dispatch={dispatch}
                     secondsRemaining={secondsRemaining}/>
              <NextButton dispatch={dispatch}
                          answer={answer}
                          idx={index}
                          numQuestions={numQuestions}/>
            </Footer>
          </>}
        {status === "finished" &&
          <FinishScreen points={points}
                        totalPoints={totalPoints}
                        highscore={highscore}
                        dispatch={dispatch}/>}
      </Main>
    </div>
  );
};

export default App;
