import { useState, useCallback, useEffect } from "react";

//import QUESTIONS from '../questions.js';
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";
import CoverTest from "./CoverTest.jsx";
import { shuffleArray } from "../utils/shuffle.js";

const processQuestions = (questions, shuffle = false, limit) => {
  const result = [...questions]; // Crea sempre una copia dell'array originale
  return (shuffle ? shuffleArray(result) : result).slice(0, limit ?? result.length);
};

export default function Quiz({data}) {
  const [userAnswers, setUserAnswers] = useState([]);
  const [start, setStart] = useState(false);
  const [trackingTest, setTrackingTest] = useState(null);
  const [quiz, setQuiz] = useState(null);


  function startQuiz(){
    let questions=processQuestions(
      data?.questions,
      data?.shuffle,
      data?.limit
    );
    setQuiz(questions);
  }

  const activeQuestionIndex = userAnswers.length;
  let quizIsComplete = false;
  // console.log("quiz",quiz)
  // console.log("activeQuestionIndex",activeQuestionIndex)
  if (quiz) {
    quizIsComplete = activeQuestionIndex === quiz.length;
  }
  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    //console.log("handleSelectAnswer")
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleTrackingTest = useCallback(function handleTrackingTest(
    objTrackingTest
  ) {
    setTrackingTest(objTrackingTest);
  },
  []);

  const handleTryAgain = function handleTryAgain() {
    setUserAnswers([]);
    
    //setTrackingTest(objTrackingTest);
  };

  const clickStart = function clickStart() {
    startQuiz()
    setStart(true);
  };
  if (!quiz)
    startQuiz()

  if (quiz && !start)
    return (
      <CoverTest
        onSelectStart={clickStart}
        limit={data.limit ? data.limit : data.questions.length}
        masteryscore={data.masteryscore ? data.masteryscore : 0}
      />
    );

  if (quizIsComplete) {
    return (
      <Summary
        userAnswers={userAnswers}
        questions={quiz}
        onSetTrackingTest={handleTrackingTest}
        masteryscore={data.masteryscore ? data.masteryscore : 0}
        review={data.review}
        onCickTryAgain={handleTryAgain}
      />
    );
  }

  return (
    <div id="quiz">
      {quiz && (
        <Question
          key={activeQuestionIndex}
          questions={quiz}
          index={activeQuestionIndex}
          onSelectAnswer={handleSelectAnswer}
          // onSkipAnswer={handleSkipAnswer}
        />
      )}
    </div>
  );
}
