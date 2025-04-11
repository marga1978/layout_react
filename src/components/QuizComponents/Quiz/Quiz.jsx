import styles from './Quiz.module.scss';
import { useState, useCallback, useRef } from "react";

//import QUESTIONS from '../questions.js';
import Question from "../Question/Question.jsx";
import Summary from "../../Summary.jsx";
import CoverTest from "../../CoverTest.jsx";
import QuestionTimer from "../../QuestionTimer.jsx";
import { shuffleArray } from "../../../utils/shuffle.js";

const processQuestions = (data, shuffle = false, limit) => {
  // const result = [...questions]; // Crea sempre una copia dell'array originale
  // return (shuffle ? shuffleArray(result) : result).slice(
  //   0,
  //   limit ?? result.length
  // );

  // Estrai l'array di domande e le categorie con i relativi limiti
  const { questions, category } = data;
  
  // Array risultante
  let result = [];
  
  // Per ogni categoria nel JSON
  for (const cat in category) {
    const limit = category[cat];
    
    // Filtra le domande per questa categoria
    const categoryQuestions = questions.filter(q => q.cat === cat);
    
    // Applica shuffle se richiesto
    const processedCategoryQuestions = shuffle ? 
      shuffleArray([...categoryQuestions]).slice(0, limit) : 
      [...categoryQuestions].slice(0, limit);
    
    // Aggiungi le domande al risultato
    result = [...result, ...processedCategoryQuestions];
  }
  
  // Opzionalmente puoi rimescolare l'intero array risultante
  return shuffle ? shuffleArray(result) : result;
}

export default function Quiz({ data }) {
  const [userAnswers, setUserAnswers] = useState([]);
  const [start, setStart] = useState(false);
  const [trackingTest, setTrackingTest] = useState(null);
  const [quiz, setQuiz] = useState(null);
  const refUserAnswers = useRef(false); // Memorizza se skipAnswer è già stato chiamato
  const refQuiz = useRef(null); // Memorizza se skipAnswer è già stato chiamato

  const timer = data.timer;

  function startQuiz() {
    let questions = processQuestions(
      data,
      data?.shuffle,
      data?.limit,
      data
    );
    setQuiz(questions);
  }

  const activeQuestionIndex = userAnswers.length;
  let quizIsComplete = false;
  // console.log("quiz",quiz)
  // console.log("activeQuestionIndex",activeQuestionIndex)
  if (quiz) {
    quizIsComplete = activeQuestionIndex === quiz.length;
    refQuiz.current=quiz
  }

  if (userAnswers)
    refUserAnswers.current=userAnswers
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
  };

  const handleEndTimer = useCallback(() => {
    let lastIndexAnswered = refUserAnswers.current.length;    
    while (lastIndexAnswered < refQuiz.current.length) {
       setUserAnswers(prev=> [...prev,null]);
       lastIndexAnswered++;
    }

  }, []);

  const clickStart = function clickStart() {
    startQuiz();
    setStart(true);
  };
  if (!quiz) startQuiz();

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
    <div className={styles.quiz}>
      {quiz && (
        <>
          {timer && !quizIsComplete && (
            <QuestionTimer key={timer} timeout={timer} onTimeUp={handleEndTimer} />
          )}
          <Question
            key={activeQuestionIndex}
            questions={quiz}
            index={activeQuestionIndex}
            onSelectAnswer={handleSelectAnswer}
            // onSkipAnswer={handleSkipAnswer}
          />
        </>
      )}
    </div>
  );
}
