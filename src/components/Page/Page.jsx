import styles from './Page.module.scss';
import { useState, useCallback, useEffect } from "react";

//import QUESTIONS from '../questions.js';
import Quiz from "../QuizComponents/Quiz/Quiz.jsx";




export default function Page() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  

  useEffect(() => {
    fetch("/data.json") // Assicurati che il file sia accessibile nel public folder
      .then((response) => {
        if (!response.ok) {
          throw new Error("Errore nel caricamento dei dati");
        }
        return response.json();
      })
      .then((dataLoaded) => {
        console.log(dataLoaded);

        setData(dataLoaded);
        console.log("dataLoaded",dataLoaded)
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []); // L'array vuoto assicura che l'effetto venga eseguito solo al montaggio
  

  if (data)
    return (
      <>
        <Quiz
          data={data}
        />
      </>
      
    );
}
