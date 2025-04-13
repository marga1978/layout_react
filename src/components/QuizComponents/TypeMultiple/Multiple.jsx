import styles from './Multiple.module.scss';
import { useState } from 'react';
import Button from '../../Button/Button.jsx';

export default function Single({
  answers, onSelectAnswer, type, isSolution, isEndAttempt, isConfirmed
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
    <ul className={styles.answers}>
      {answers.map((answer,index) => {
        let cssClass='';
        const isActive = activeIndices.includes(index);
        if (isActive)
          cssClass="selected-button"
        console.log("answer",answer)
        
        const isCorrect = (isEndAttempt && isSolution && answer.correct);
        if (isCorrect)
         cssClass="selected-correct"
        return (
          <li key={answer.text} className={styles.answer}>
            <Button
              onClick={() => handleClick(answer, type, index)}
              className={cssClass}
              
            >
              {answer.text}
            </Button>
          </li>
        );
      })}
    </ul>
  )
}