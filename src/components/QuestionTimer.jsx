import { useTimer } from '../hooks/useTimer';
import { convertToTimer } from '../utils/convertToTimer';

export default function QuestionTimer({ timeout, onTimeUp, mode }) {
  const totalTimer=timeout;
  const timeLeft = useTimer(timeout, onTimeUp);
  //console.log("totalTimer",totalTimer,timeLeft)
  let spendTime=totalTimer-timeLeft;
  let percTime=Math.round(spendTime*100/totalTimer);
  //console.log("percTime",percTime)
  let cssClass="blue";
  if (percTime>=70 && percTime<=90)
    cssClass="orange"

  if (percTime>90)
    cssClass="red"


  return  (
    <>
    <progress 
      id="question-time" 
      max={timeout} 
      value={timeLeft} 
      className={mode}
    />
    <br />
    <div className={`question-time-text ${cssClass}`}>{convertToTimer(timeLeft+1000)}</div>
    </>
  )
}
