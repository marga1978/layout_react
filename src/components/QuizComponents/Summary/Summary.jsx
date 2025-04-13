import { useEffect } from "react";
import styles from './Summary.module.scss';
import quizCompleteImg from "../../../assets/quiz-complete.png";
import { calculatePercentage, calculatePercentageCategories } from '../../../utils/calculatePercentage';
import Button from "../../Button/Button.jsx";
import { checkCorrects,getNumberAnswerCorrect } from "../../../utils/checkQuestions";
import PerformanceCategories from '../PerformanceCategories/PerformanceCategories.jsx'
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
    return questions[index].answers.filter(answer => answer.correct  === true).map(answer => answer.text).join("<br>");
  }
  function getTextReview(index){
    return questions[index].review.reviewText;
  }

  function getType(index){
    //console.log("questions[index].type",questions[index].type)
    return questions[index].type;
  }

  function getAnswers(answersUser){
    return answersUser &&  answersUser.map(answer => answer.text).join("<br>");
  }

  // function getNumberAnswerCorrect(index){
  //   return questions[index].answers.filter(answer => answer.correct === true).length;
  // }

  const objCategories=calculatePercentageCategories(userAnswers,questions)

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
    <div className={styles.summary}>
      <img src={quizCompleteImg} alt="Trophy icon" />
      {isPassed && <h2>Quiz Completed! You have passed the test.</h2>}
      {!isPassed && (
        <h2>
          Quiz Completed! You don't have passed the test.
          <br />
          masteryscore: {masteryscore}%
        </h2>
      )}
      <div className={styles['summary-stats']}>
        <p>
          <span className={styles['number']}>{percentages.correctPercentage}%</span>
          <span className={styles['text']}>answered correctly</span>
        </p>
        <p>
          <span className={styles['number']}>{percentages.wrongPercentage}%</span>
          <span className={styles['text']}>answered incorrectly</span>
        </p>
      </div>
      {objCategories &&  
        <PerformanceCategories objCategories={objCategories} />
      }
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
          let cssClass=`${styles['user-answer']} ${checkCorrects(answer, getNumberAnswerCorrect(index,questions))[getType(index)]() ? styles.correct : styles.wrong}`
          return (
            <li key={index}>
              <h3 className={styles['question-number']}>{index + 1}</h3>
              <p className={styles.question}>{questions[index].text}</p>
              {review.showAnwswer && (<p className={cssClass}>User response: <br/> <span dangerouslySetInnerHTML={{ __html: getAnswers(answer)  ?? "Skipped" }} /> { checkCorrects(answer, getNumberAnswerCorrect(index,questions))[getType(index)]() && <span>- Correct</span>} { !checkCorrects(answer, getNumberAnswerCorrect(index,questions))[getType(index)]() && <span>- Wrong</span>}</p>)}
              {review.showCorrect && !checkCorrects(answer, getNumberAnswerCorrect(index,questions))[getType(index)]() && <p><strong>Correct answer:</strong><br /> <span dangerouslySetInnerHTML={{ __html: getTextCorrectAnswer(index) }} /></p>}
              {review.showReview && !checkCorrects(answer, getNumberAnswerCorrect(index,questions))[getType(index)]() && <p><strong> {getTextReview(index)} </strong></p>} 


            </li>
          );
        })}
      </ol>
      }
    </div>
  );
}