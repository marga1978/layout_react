import { useState, useCallback, useEffect } from 'react';

//import QUESTIONS from '../questions.js';
import Question from './Question.jsx';
import Summary from './Summary.jsx';
import CoverTest from './CoverTest.jsx';

export default function Quiz() {
  const [userAnswers, setUserAnswers] = useState([]);
  const [start, setStart] = useState(false);
  const [trackingTest, setTrackingTest]=useState(null);
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  useEffect(() => {
    fetch("/data.json") // Assicurati che il file sia accessibile nel public folder
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento dei dati");
        }
        return response.json();
      })
      .then((jsonData) => {
        setQuiz(jsonData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // L'array vuoto assicura che l'effetto venga eseguito solo al montaggio

  console.log("userAnswers",userAnswers)
  console.log("trackingTest",trackingTest)
  const activeQuestionIndex = userAnswers.length;
  let quizIsComplete=false
  if (quiz){
    quizIsComplete= activeQuestionIndex === quiz.questions.length
  }
  //const quizIsComplete = activeQuestionIndex === quiz.questions.length;

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer];
    });
  },
  []);

  const handleTrackingTest = useCallback(function handleTrackingTest(objTrackingTest) {
    setTrackingTest(objTrackingTest);
  },[])

  const handleTryAgain = function handleTryAgain() {
    setUserAnswers([])
    //setTrackingTest(objTrackingTest);
  };

  

  const clickStart=function clickStart(){
    setStart(true)
  }

  if(quiz && !start)
    return <CoverTest onSelectStart={clickStart} limit={quiz.limit? quiz.limit : quiz.questions.length} masteryscore={quiz.masteryscore ? quiz.masteryscore : 0} />

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} questions={quiz.questions} onSetTrackingTest={handleTrackingTest} masteryscore={quiz.masteryscore ? quiz.masteryscore : 0} review={quiz.review} onCickTryAgain={handleTryAgain} />
  }

  return (
    <div id="quiz">
      {quiz && <Question
        key={activeQuestionIndex}
        questions={quiz.questions}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        // onSkipAnswer={handleSkipAnswer}
      />
      }
    </div>
    
  );
}
