import { useTimer } from '../hooks/useTimer';

export default function QuestionTimer({ timeout, onTimeUp, mode }) {
  const timeLeft = useTimer(timeout, onTimeUp);
  return  (
    <progress 
      id="question-time" 
      max={timeout} 
      value={timeLeft} 
      className={mode}
    />
  )
}
