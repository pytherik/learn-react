import {useEffect, useReducer} from "react";
import Header from "./Header";
import Main from "./Main";
import Error from "./Error";
import Loader from "./Loader";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";

const initialState = {
  //info status: loading, error, ready, active, finished
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0
};

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
      return {...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points};
    case "start":
      return {...state, status: "active"};
    case "nextQuestion":
      return {...state, index: state.index + 1, answer: null};
    default:
      throw new Error('unknown action');
  }
}

const App = () => {
  const [{questions, status, index, answer}, dispatch] = useReducer(reducer, initialState);
  const numQuestions = questions.length;

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
      <Main>
        <Header />
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScreen numQuestions={numQuestions}
                                            dispatch={dispatch}/>}
        {status === "active" && <Question question={questions[index]}
                                          dispatch={dispatch}
                                          answer={answer}/>}
        <NextButton dispatch={dispatch} answer={answer}/>

      </Main>
    </div>
  );
};

export default App;
