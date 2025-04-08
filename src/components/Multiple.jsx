import { useState } from 'react';
import Button from './Button.jsx';

export default function Single({
  answers, onSelectAnswer, type, solution, endAttempt, confirmed
}){
  
  const [activeIndices, setActiveIndices] = useState([]);
  const handleClick = (answer, type, index) => {
    onSelectAnswer(answer, type);

    setActiveIndices(prev => 
      prev.includes(index)
        ? prev.filter(i => i !== index) // Rimuovi se già selezionato
        : [...prev, index]              // Aggiungi se non presente
    );
  };


  return (
    <ul id="answers">
      {answers.map((answer,index) => {
        const isActive = activeIndices.includes(index);
        console.log("answer",answer)
        const isCorrect = (endAttempt && solution && answer.correct);
        return (
          <li key={answer.text} className="answer">
            <Button
              onClick={() => handleClick(answer, type, index)}
              className={`
                ${isActive ? 'selected-button' : ''}
                ${isCorrect ? 'selected-correct' : ''}
              `}
            >
              {answer.text}
            </Button>
          </li>
        );
      })}
    </ul>
  )
}