import { useEffect, useState } from "react";

export function useTimer(duration, onTimeUp) {
  const [remainingTime, setRemainingTime] = useState(duration);

  //console.log("duration",duration)
  //console.log("onTimeout", onTimeout);
  useEffect(() => {
    //console.log("ended")
    const timer = setTimeout(onTimeUp, duration);
    return () => {
      clearTimeout(timer);
    };
  }, [duration, onTimeUp]);

  useEffect(() => {
    //console.log('SETTING INTERVAL');
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return remainingTime;
}
