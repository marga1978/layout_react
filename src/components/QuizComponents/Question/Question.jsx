import styles from './Question.module.scss';
import { useState, useCallback, useEffect, useRef } from "react";
import Single from "../TypeSingle/Single.jsx";
import Multiple from "../TypeMultiple/Multiple.jsx";
import Button from "../../Button/Button.jsx";
import Feedback from "../Feedback/Feedback.jsx";
import QuestionTimer from "../QuestionTimer/QuestionTimer";
import { shuffleArray } from "../../../utils/shuffle";
import { checkCorrects,getNumberAnswerCorrect } from "../../../utils/checkQuestions";

export default function Question({
  index,
  questions,
  userAnswers,
  onSelectAnswer,
}) {
  const [idQuestion, setIdQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState([]);
  const [shuffledAnswers, setShuffledAnswers] = useState();
  const [attempt, setAttempt] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [solution, setSolution] = useState(false);

  const isFeedback = questions[index].feedback;
  const timer = questions[index].timer;
  const skipAnswerCalled = useRef(false); // Memorizza se skipAnswer è già stato chiamato
  

  
  // Mappa delle strategie per gestire la selezione
  const answerHandlers = {
    single: (prevUserAnswers, selectedAnswer) => [selectedAnswer], // Sovrascrive l'array
    multiple: (prevUserAnswers, selectedAnswer) => {
      return prevUserAnswers.includes(selectedAnswer)
      ? prevUserAnswers.filter(answer => answer !== selectedAnswer) // Rimuovi se già selezionato
        : [...prevUserAnswers, selectedAnswer]              // Aggiungi se non presente
    }
  };
  const endAttempt = attempt >= questions[index].attempt ? true : false;
  const handleSelectedAnswer = useCallback(
    (selectedAnswer, type) => {
      //console.log("setSelectedAnswer XXX",selectedAnswer,type)
      setSelectedAnswer((prevUserAnswers) => {
        // Se non esiste il metodo, torna lo stato precedente
        return (
          answerHandlers[type]?.(prevUserAnswers, selectedAnswer) ||
          prevUserAnswers
        );
      });
    },
    [answerHandlers]
  );

  //workaround, il problema è che il componente QuestionTimer si ricarica ogni volta che
  //rispondo alla domanda perchè cambia la funzione skipAnswer se recupero il valore dallo stato
  //scrivendo useRef evito il reload perchè cambio con current il valore 
  if (selectedAnswer)
    skipAnswerCalled.current=selectedAnswer

  useEffect(() => {
    setIdQuestion(
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    );
  }, []);

  const handleConfirmAnswer = useCallback(() => {
    console.log("selectedAnswer",selectedAnswer)
    onSelectAnswer(selectedAnswer);
    //onSetCurrentQuestion();
  }, [onSelectAnswer, selectedAnswer]);


  //invio skipAnswerCalled.current perchè se avessi messo selectedAnswer verebbe aggiornata
  //la funzione e avrebbe ricaricato il componente onTimeUp={skipAnswer}
  const skipAnswer = useCallback(() => {
    onSelectAnswer(skipAnswerCalled.current);
  }, []);

  const handleSetConfirm = function handleSetConfirm() {
    setConfirmed(true);
  };

  const handleSolutionAnswer = function handleSolutionAnswer() {
    //onSelectAnswer(selectedAnswer);
    setSolution(true);
  };

  const handleTryAgainAnswer = function handleTryAgainAnswer() {
    setConfirmed(false);
    setSelectedAnswer([]);
    setIdQuestion(
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    );
    setAttempt((prevAttempt) => prevAttempt + 1);
  };

  function renderType(type, answers, shuffle, attempt) {
    //console.log("renderType:",answers,id,shuffle)
    if (!shuffledAnswers)
      shuffle
        ? setShuffledAnswers(shuffleArray(answers))
        : setShuffledAnswers(answers);

    switch (type) {
      case "single":
        return (
          <div>
            <Single
              key={idQuestion}
              answers={shuffledAnswers}
              type={type}
              {...commonProps}
              onSelectAnswer={handleSelectedAnswer}
            />
          </div>
        );
      case "multiple":
        return (
          <div>
            <Multiple
              key={idQuestion}
              answers={shuffledAnswers}
              type={type}
              {...commonProps}
              onSelectAnswer={handleSelectedAnswer}
            />
          </div>
        );
      case "order":
        return <h1>orfinamento</h1>;
      default:
        return <h1>nessun tipo</h1>;
    }
  }

  // Raggruppa le props comuni
  const commonProps = {
    isConfirmed:confirmed,
    isAnswered:selectedAnswer.length > 0,
    isCorrect:checkCorrects(selectedAnswer, getNumberAnswerCorrect(index,questions))[questions[index].type](),
    isEndAttempt:endAttempt,
    isSolution:solution
  };

  // console.log("isFeedback",isFeedback)
  // console.log("endAttempt",endAttempt)
  // console.log("selectedAnswer.length",selectedAnswer.length)

  return (
    <div id="question">
      
      {timer &&  (
      <QuestionTimer 
        key={timer}
        timeout={timer} 
        onTimeUp={skipAnswer}
      />)}
      <h2>{questions[index].text}</h2>
      <div className={`${confirmed ? styles.disabled : ""}`}>
        {renderType(
          questions[index].type,
          questions[index].answers,
          questions[index].shuffle,
          questions[index].attempt
        )}
      </div>

      {isFeedback && (
        <>
          
          <Feedback
            {...commonProps}
            textCorrect={
              questions[index]?.feedback.correct !== undefined
                ? questions[index]?.feedback.correct
                : null
            }
            textTryAgain={
              questions[index]?.feedback.tryagain !== undefined
                ? questions[index]?.feedback.tryagain
                : null
            }
            textWrong={
              questions[index]?.feedback.wrong !== undefined
                ? questions[index]?.feedback.wrong
                : null
            }
            handleSetConfirm={handleSetConfirm}
            handleConfirmAnswer={handleConfirmAnswer}
            handleTryAgainAnswer={handleTryAgainAnswer}
            handleSolutionAnswer={handleSolutionAnswer}
          />
        </>
      )}
     
      {!isFeedback && endAttempt && selectedAnswer.length > 0 && (
        <div className="container-btn">
          <Button onClick={handleConfirmAnswer} className="btn-primary">
            Confirm
          </Button>
        </div>
      )}
    </div>
  );
}
