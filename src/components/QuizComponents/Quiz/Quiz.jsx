import styles from './Quiz.module.scss';
import { useState, useCallback, useRef } from "react";

//import QUESTIONS from '../questions.js';
import Question from "../Question/Question.jsx";
import Summary from "../Summary/Summary.jsx";
import CoverTest from "../CoverTest/CoverTest.jsx";
import QuestionTimer from "../QuestionTimer/QuestionTimer.jsx";
import { shuffleArray } from "../../../utils/shuffle.js";
import BackgroundContainer from "../../BackgroundContainer/BackgroundContainer.jsx"

const processQuestions = (data, shuffle = false, limit) => {
  // Estrai l'array di domande e le categorie con i relativi limiti
  const { questions, category } = data;
  
  // Array risultante
  let result = [];
  
  // Per ogni categoria nel JSON
  for (const cat in category) {
    const limit = category[cat].limit;
    const labelCategory = category[cat].label;
    
    // Filtra le domande per questa categoria
    const categoryQuestions = questions.filter(q => q.cat === cat);
    
    // Applica shuffle se richiesto
    const processedCategoryQuestions = shuffle ? 
      shuffleArray([...categoryQuestions]).slice(0, limit) : 
      [...categoryQuestions].slice(0, limit);
    
    // Aggiungi le domande al risultato
    result = [...result, ...processedCategoryQuestions.map(q => ({ ...q, cat, labelCategory }))];
  } 
  // Opzionalmente puoi rimescolare l'intero array risultante
  return shuffle ? shuffleArray(result) : result;
}


const getTotalQuestion = (categories) => {
  return Object.values(categories)
    .reduce((total, item) => total + (item.limit || 0), 0);
  // Estrai l'array di domande e le categorie con i relativi limiti
  
  //return shuffle ? shuffleArray(result) : result;
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
        limit={data.limit  ? data.limit : (data.category ? getTotalQuestion(data.category) : data.questions.length)}
        masteryscore={data.masteryscore ? data.masteryscore : 0}
      />
    );

  if (quizIsComplete) {
    return (
      <Summary
        userAnswers={userAnswers}
        questions={quiz}
        category={data.category}
        tree={data.tree}
        onSetTrackingTest={handleTrackingTest}
        masteryscore={data.masteryscore ? data.masteryscore : 0}
        review={data.review}
        onCickTryAgain={handleTryAgain}
      />
    );
  }

  return (
    <BackgroundContainer variant="dark">
     {/* <div className={styles.quiz}> */}
    <div>
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
    </BackgroundContainer>
  );
}
