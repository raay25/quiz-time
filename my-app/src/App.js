import React from "react";
import topRight from './images/top-right.png';
import bottomLeft from './images/bottom-left.png';
import Questions from "./Questions";
import Confetti from 'react-confetti'

import TitleScreen from "./TitleScreen";
import './styles.css';

function App() {
  //  -------------------------- VARIABLES --------------------

  const [restart,setRestart] = React.useState(0)

  // quizState: 1 = menu, 2 = quiz, 3 = reveal answers
  const [quizState, setQuizState] = React.useState(1);

  // Holding all the questions 
  const [allQuestions, setAllQuestions] = React.useState({});

  // Reveal Answer boolean
  const [checkAnswer, setCheckAnswer] = React.useState(false)

  // Number of correct answers
  const [numCorrect, setNumCorrect] = React.useState(0)

  // For resizing windows
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth)

  // ------------------------- FUNCTIONS AND USE EFFECT -------------------------
  function changeState() {
    setQuizState(oldQuizState => {
      if (oldQuizState===3) {
        return 1;
      }
      else return oldQuizState + 1;
    })
  }

  // To check answer, and then restart the game 
  function handleCheckAnswer() {
    if (checkAnswer===false) setCheckAnswer(true)
    else {
      setCheckAnswer(false)
      setNumCorrect(0)
      setQuizState(2)
      setRestart(prev => prev + 1)
    }
  }

  function updateNumCorrect() {
    setNumCorrect(prev => prev + 1)
  }

  // Use Effect
  React.useEffect(() => {
      fetch("https://opentdb.com/api.php?amount=5")
      .then(res => res.json())
      .then(data => setAllQuestions(data))
  }, [restart])

  React.useEffect(() => {
    function watchWidth() {
      setWindowWidth(window.innerWidth)
    }
    window.addEventListener("resize", watchWidth)
    return function() {
        window.removeEventListener("resize", watchWidth)
    }
  }, [])

 // ----------------------------- THE ACTUAL COMPONENT PART -----------------------------

  return (
    <div className="main-container">
      {numCorrect===5 && <Confetti />}
      // {windowWidth>1000 && 
      //   <>
      //     <img src={topRight} alt="topright" className="topRight" width="200rem"/>
      //     <img src={bottomLeft} alt="bottomleft" className="bottomLeft" width="200rem"/>
      //   </>
      // }
      {quizState===1 && <TitleScreen quizState={quizState} changeState={changeState} />}
      {quizState===2 && 
        <div className="questions-container">
        <Questions question={allQuestions.results[0]} checkAnswer={checkAnswer} numCorrect={numCorrect} updateNumCorrect={updateNumCorrect} restart={restart}/>
        <Questions question={allQuestions.results[1]} checkAnswer={checkAnswer} numCorrect={numCorrect} updateNumCorrect={updateNumCorrect} restart={restart}/>
        <Questions question={allQuestions.results[2]} checkAnswer={checkAnswer} numCorrect={numCorrect} updateNumCorrect={updateNumCorrect} restart={restart}/>
        <Questions question={allQuestions.results[3]} checkAnswer={checkAnswer} numCorrect={numCorrect} updateNumCorrect={updateNumCorrect} restart={restart}/>
        <Questions question={allQuestions.results[4]} checkAnswer={checkAnswer} numCorrect={numCorrect} updateNumCorrect={updateNumCorrect} restart={restart}/>
        <div className="end"> 
          {checkAnswer && 
            <p className="score">
              You scored {numCorrect}/5
            </p>
          }
            <button className="check" onClick={handleCheckAnswer}>{checkAnswer ? "Play Again" : "Check Answers"}</button>
          </div>
        </div>
      }
    </div>
  );
}

export default App;
