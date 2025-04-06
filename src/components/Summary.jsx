import { useEffect } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import { calculatePercentage } from '../utils/calculatePercentage';
import Button from "./Button.jsx";
import { checkCorrects } from "../utils/checkCorrects";
// import QUESTIONS from '../questions.js';

export default function Summary({
  userAnswers,
  questions,
  onCickTryAgain,
  review,
  onSetTrackingTest,
  masteryscore,
}) {
  
  function getTextCorrectAnswer(index){
    return questions[index].answers.find(answer => answer.correct)?.text;
  }
  function getTextReview(index){
    return questions[index].review.reviewText;
  }

  function getType(index){
    //console.log("questions[index].type",questions[index].type)
    return questions[index].type;
  }

  function getAnswers(answersUser){
    return answersUser.map(answer => answer.text).join("<br>");
  }

  function getNumberAnswerCorrect(index){
    return questions[index].answers.filter(answer => answer.correct === true).length;
  }
  const percentages = calculatePercentage(userAnswers,questions);
  //const wrongAnswersPerc = calcPerc(userAnswers, "wrong");
  const isPassed = percentages.correctPercentage >= masteryscore ? true : false;

  useEffect(() => {
    onSetTrackingTest({ score: percentages.correctPercentage, isPassed: isPassed });
  }, [percentages.correctPercentage, isPassed, onSetTrackingTest]); // Dipendenze per evitare loop infiniti

  const handleTryAgain = function handleTryAgain() {
    onCickTryAgain(false);
  };
  return (
    <div id="summary">
      <img src={quizCompleteImg} alt="Trophy icon" />
      {isPassed && <h2>Quiz Completed! You have passed the test.</h2>}
      {!isPassed && (
        <h2>
          Quiz Completed! You don't have passed the test.
          <br />
          masteryscore: {masteryscore}%
        </h2>
      )}
      <div id="summary-stats">
        <p>
          <span className="number">{percentages.correctPercentage}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{percentages.wrongPercentage}%</span>
          <span className="text">answered incorrectly</span>
        </p>
      </div>
      {!isPassed && (
        <div className="summary-button">
          <p>
            <Button onClick={handleTryAgain} className="btn-primary">
              Riprova!
            </Button>
          </p>
        </div>
      )}
      {review && <ol>
        {userAnswers.map((answer, index) => {
          let cssClass = "user-answer";

          if (checkCorrects(answer, getNumberAnswerCorrect(index))[getType(index)]())
            cssClass += " correct";
          else
            cssClass += " wrong";
          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{questions[index].text}</p>
              {review.showAnwswer && (<p className={cssClass}>User response: <br/> <span dangerouslySetInnerHTML={{ __html: getAnswers(answer)  ?? "Skipped" }} /> { checkCorrects(answer, getNumberAnswerCorrect(index))[getType(index)]() && <span>- Correct</span>} { !checkCorrects(answer, getNumberAnswerCorrect(index))[getType(index)]() && <span>- Wrong</span>}</p>)}
              {review.showCorrect && !checkCorrects(answer, getNumberAnswerCorrect(index))[getType(index)]() && <p><strong>Correct answer:</strong> {getTextCorrectAnswer(index)}</p>}
              {review.showReview && !checkCorrects(answer, getNumberAnswerCorrect(index))[getType(index)]() && <p><strong> {getTextReview(index)} </strong></p>} 


            </li>
          );
        })}
      </ol>
      }
    </div>
  );
}