import { useState, useCallback, useEffect } from "react";
import Single from "./Single.jsx";
import Multiple from "./Multiple.jsx";
import Button from "./Button.jsx";
import Feedback from "./Feedback.jsx";
import { shuffleArray } from "../utils/shuffle";
import { checkCorrects } from "../utils/checkCorrects";

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

  // Mappa delle strategie per gestire la selezione
  const answerHandlers = {
    single: (prevUserAnswers, selectedAnswer) => [selectedAnswer], // Sovrascrive l'array
    multiple: (prevUserAnswers, selectedAnswer) => {
      return prevUserAnswers.includes(selectedAnswer)
      ? prevUserAnswers.filter(answer => answer !== selectedAnswer) // Rimuovi se già selezionato
        : [...prevUserAnswers, selectedAnswer]              // Aggiungi se non presente
    }
  };

  // const checkCorrect={
  //   single: () => selectedAnswer[0]?.correct !== undefined ? selectedAnswer[0].correct : false,
  //   multiple: () => {
  //     return selectedAnswer[0]?.correct !== undefined ? selectedAnswer[0].correct : false
  //   }
  // }


  const endAttempt = attempt >= questions[index].attempt ? true : false;
  const handleSelectedAnswer = useCallback(
    (selectedAnswer, type) => {
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

  useEffect(() => {
    setIdQuestion(
      Date.now().toString(36) + Math.random().toString(36).substr(2, 5)
    );
  }, []);

  const handleConfirmAnswer = useCallback(() => {
    onSelectAnswer(selectedAnswer);
    //onSetCurrentQuestion();
  }, [onSelectAnswer, selectedAnswer]);

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
              solution={solution}
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

  // console.log("isFeedback",isFeedback)
  // console.log("endAttempt",endAttempt)
  // console.log("selectedAnswer.length",selectedAnswer.length)

  return (
    <div id="question">
      <h2>{questions[index].text}</h2>
      <div className={` ${confirmed ? "disabled-button" : ""}`}>
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
            isConfirmed={confirmed}
            isAnswered={selectedAnswer.length > 0}
            // isCorrect={
            //   selectedAnswer[0]?.correct !== undefined
            //     ? selectedAnswer[0].correct
            //     : false
            // }
            isCorrect={checkCorrects(selectedAnswer)[questions[index].type]}
            idEndAttempt={endAttempt}
            isSolution={solution}
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

          {/* {!confirmed && selectedAnswer.length > 0 && (
            <div className="container-btn">
              <Button onClick={handleSetConfirm} className="btn-primary">
                Confirm
              </Button>
            </div>
          )} */}

          {/* <div className="container-btn">
            {confirmed &&
              selectedAnswer.length > 0 &&
              selectedAnswer[0].correct && (
                <>
                  <p>{questions[index].feedback.correct}</p>
                  <Button onClick={handleConfirmAnswer} className="btn-primary">
                    Next Question
                  </Button>
                </>
              )}
            {!endAttempt &&
              confirmed &&
              selectedAnswer.length > 0 &&
              !selectedAnswer[0].correct && (
                <>
                  <p>{questions[index].feedback.tryagain}</p>
                  <Button
                    onClick={handleTryAgainAnswer}
                    className="btn-primary"
                  >
                    Try again
                  </Button>
                </>
              )}
            {endAttempt &&
              confirmed &&
              selectedAnswer.length > 0 &&
              !selectedAnswer[0].correct && (
                <>
                  <p>{questions[index].feedback.wrong}</p>
                  {!solution && <Button
                    onClick={handleSolutionAnswer}
                    className="btn-primary"
                  >
                    Solution
                  </Button>
                  }
                  {solution && <Button onClick={handleConfirmAnswer} className="btn-primary">
                    Next Question
                  </Button>
                  }
                </>
              )}

            
          </div> */}
        </>
      )}
     
      {!isFeedback && endAttempt && selectedAnswer.length > 0 && (
        <div className="container-btn">
          <Button onClick={handleConfirmAnswer} className="btn-primary">
            Confirm XX
          </Button>
        </div>
      )}
      {/* {!endAttempt && selectedAnswer.length > 0 && (
        <div className="container-btn">
          <Button onClick={handleConfirmAnswer} className="btn-primary">
            Confirm
          </Button>
        </div>
      )} */}
    </div>
  );
}
