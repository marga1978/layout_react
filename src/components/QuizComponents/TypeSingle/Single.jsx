import styles from './Single.module.scss';
import { useState } from 'react';
import Button from '../../Button/Button.jsx';
import React from 'react';

const Single = React.memo( ({answers, onSelectAnswer, type, isSolution, isConfirmed, isEndAttempt}) =>
{
  const [activeIndex, setActiveIndex] = useState(null);
  const handleClick=function handleClick(answer,type,index){
    onSelectAnswer(answer,type)
    setActiveIndex(index)
  }

  
  return (
    <ul className={styles.answers}>
      {answers.map((answer,index) => {
        let cssClass='';
        if (activeIndex==index)
          cssClass="selected-button"

        if (isEndAttempt && isSolution && answer.correct)
          cssClass="selected-correct"

        return (
          <li key={answer.text} className={styles.answer}>
          <Button onClick={()=>handleClick(answer,type,index)}
          className={cssClass}>
              {answer.text}
           </Button>
          </li>
        );
      })}
    </ul>
  )
})

export default Single;