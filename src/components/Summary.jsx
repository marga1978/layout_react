import { useEffect } from "react";
import quizCompleteImg from "../assets/quiz-complete.png";
import { calcPerc } from '../utils/calc';
import Button from "./Button.jsx";
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
  const correctAnswersPerc = calcPerc(userAnswers, "correct");
  const wrongAnswersPerc = calcPerc(userAnswers, "wrong");
  const isPassed = correctAnswersPerc >= masteryscore ? true : false;

  useEffect(() => {
    onSetTrackingTest({ score: correctAnswersPerc, isPassed: isPassed });
  }, [correctAnswersPerc, isPassed, onSetTrackingTest]); // Dipendenze per evitare loop infiniti

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
          <span className="number">{correctAnswersPerc}%</span>
          <span className="text">answered correctly</span>
        </p>
        <p>
          <span className="number">{wrongAnswersPerc}%</span>
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

          if (answer[0].correct)
            cssClass += " correct";
          else
            cssClass += " wrong";


            //console.log("answer",answer[0].text)

          
          // if (answer === null) {
          //   cssClass += " skipped";
          // } else if (answer.correct) {
          //   cssClass += " correct";
          // } else {
          //   cssClass += " wrong";
          // }

          return (
            <li key={index}>
              <h3>{index + 1}</h3>
              <p className="question">{questions[index].text}</p>
              {review.showAnwswer && (<p className={cssClass}>User response: {answer[0].text ?? "Skipped"} { answer[0].correct && <span>- Correct</span>}</p>)}
              {review.showCorrect && !answer[0].correct && <p><strong>Correct answer:</strong> {getTextCorrectAnswer(index)}</p>}
              {review.showReview && !answer[0].correct && <p><strong> {getTextReview(index)} </strong></p>} 
            </li>
          );
        })}
      </ol>
      }
    </div>
  );
}

// export default function Summary({ userAnswers }) {
//   const skippedAnswers = userAnswers.filter((answer) => answer === null);
//   const correctAnswers = userAnswers.filter(
//     (answer, index) => answer === QUESTIONS[index].answers[0]
//   );

//   const skippedAnswersShare = Math.round(
//     (skippedAnswers.length / userAnswers.length) * 100
//   );
//   const correctAnswersShare = Math.round(
//     (correctAnswers.length / userAnswers.length) * 100
//   );
//   const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

//   return (
//     <div id="summary">
//       <img src={quizCompleteImg} alt="Trophy icon" />
//       <h2>Quiz Completed!</h2>
//       <div id="summary-stats">
//         <p>
//           <span className="number">{skippedAnswersShare}%</span>
//           <span className="text">skipped</span>
//         </p>
//         <p>
//           <span className="number">{correctAnswersShare}%</span>
//           <span className="text">answered correctly</span>
//         </p>
//         <p>
//           <span className="number">{wrongAnswersShare}%</span>
//           <span className="text">answered incorrectly</span>
//         </p>
//       </div>
//       <ol>
//         {userAnswers.map((answer, index) => {
//           let cssClass = 'user-answer';

//           if (answer === null) {
//             cssClass += ' skipped';
//           } else if (answer === QUESTIONS[index].answers[0]) {
//             cssClass += ' correct';
//           } else {
//             cssClass += ' wrong';
//           }

//           return (
//             <li key={index}>
//               <h3>{index + 1}</h3>
//               <p className="question">{QUESTIONS[index].text}</p>
//               <p className={cssClass}>{answer ?? 'Skipped'}</p>
//             </li>
//           );
//         })}
//       </ol>
//     </div>
//   );
// }
