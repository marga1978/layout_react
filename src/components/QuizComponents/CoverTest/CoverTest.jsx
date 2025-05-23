import styles from './CoverTest.module.scss';
import quizCompleteImg from '../../../assets/quiz-complete.png';
import Button from '../../Button/Button.jsx';
import BackgroundContainer from "../../BackgroundContainer/BackgroundContainer.jsx"
// import QUESTIONS from '../questions.js';

export default function CoverTest({onSelectStart, limit, masteryscore}) {

  const handleStart= function handleStart(){
    onSelectStart(true)
  }

  
  return(
    <BackgroundContainer variant="small">
       <div className={styles.intro}>
          <p>il test si compone di {limit} domande <br />la soglia di superamento è {masteryscore}%</p>
       </div>
       <div className={styles['cover-button']}>
       <p><Button onClick={handleStart} className="btn-primary">
          Start
        </Button></p>
       </div>
    </BackgroundContainer>
  )
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
