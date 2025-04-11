import { useState } from 'react';
import Button from './Button.jsx';
import React from 'react';

const Single = React.memo( ({answers, onSelectAnswer, type, isSolution, isConfirmed, isEndAttempt}) =>
{
  
  console.log("entrooo",answers,type,isSolution)
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick=function handleClick(answer,type,index){
    onSelectAnswer(answer,type)
    setActiveIndex(index)
  }

  return (
    <ul id="answers">
      {answers.map((answer,index) => {
        return (
          <li key={answer.text} className="answer">
            <Button onClick={()=>handleClick(answer,type,index)} className={`${
            (activeIndex === index) ? "selected-button" : ""
            // (solution && answer.correct)  ? " selected-correct" : ""
          } ${
            (isEndAttempt && isSolution && answer.correct)  ? " selected-correct" : ""
          }`}>
              {answer.text}
           </Button>
          </li>
        );
      })}
    </ul>
  )
})

export default Single;