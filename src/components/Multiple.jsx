export default function Multiple({
  answers, onSelectAnswer
}){
  console.log("Multiple",answers)

  return (
    <ul id="answers">
      {answers.map((answer) => {
        // const isSelected = selectedAnswer === answer;
        // let cssClass = '';

        // if (answerState === 'answered' && isSelected) {
        //   cssClass = 'selected';
        // }

        // if (
        //   (answerState === 'correct' || answerState === 'wrong') &&
        //   isSelected
        // ) {
        //   cssClass = answerState;
        // }

        return (
          <li key={answer.text} className="answer">
            <button
              onClick={() => onSelectAnswer(answer)}
              // className={cssClass}
              // disabled={answerState !== ''}
            >
              {answer.text}
            </button>
          </li>
        );
      })}
    </ul>
  )
}
// import { useRef } from 'react';

// export default function Single({
//   answers,
//   selectedAnswer,
//   answerState,
//   onSelect,
// }) {
//   const shuffledAnswers = useRef();

//   // console.log("ricarico answer")
//   // console.log("answers",answers)
//   // console.log("answerState",answerState)
//   // console.log("selectedAnswer",selectedAnswer)
//   // console.log("shuffledAnswers.current ",shuffledAnswers.current)
//   if (!shuffledAnswers.current) {
//     //console.log("mischio")
//     shuffledAnswers.current = [...answers];
//     shuffledAnswers.current.sort(() => Math.random() - 0.5);
//   }

//   return (
//     <ul id="answers">
//       {shuffledAnswers.current.map((answer) => {
//         const isSelected = selectedAnswer === answer;
//         let cssClass = '';

//         if (answerState === 'answered' && isSelected) {
//           cssClass = 'selected';
//         }

//         if (
//           (answerState === 'correct' || answerState === 'wrong') &&
//           isSelected
//         ) {
//           cssClass = answerState;
//         }

//         return (
//           <li key={answer} className="answer">
//             <button
//               onClick={() => onSelect(answer)}
//               className={cssClass}
//               disabled={answerState !== ''}
//             >
//               {answer}
//             </button>
//           </li>
//         );
//       })}
//     </ul>
//   );
// }
