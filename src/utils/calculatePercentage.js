export function calculatePercentage(answers, questions) {
  console.log("rispanswersoste",answers)

  const totalAnswers = answers.length;
  // Conta gli array che hanno tutte le voci corrette
  // verifico anche se il numero di risposte dall'utente per una domanda equivale al numero di corrette
  // altrimenti se ad esempio fossero la risposta A e B le corrette e l'utente rispondesse solo B verrebbe considerata corretta
  const correctArrays = answers.filter((answer,index) => 
  answer && questions[index].answers.filter(answerJson => answerJson.correct === true).length===answer.length && //verifico se il numero di rispote dall'tuente equivale al numero di risposte corrette (risposta multipla)
  answer.every(item => item.correct === true)).length;

  // Conta gli array con almeno una risposta sbagliata
  const incorrectArrays = totalAnswers - correctArrays;

  // Calcola la percentuale di array con tutte le voci corrette
  const correctPercentage = Math.round((correctArrays / totalAnswers) * 100);

  // Calcola la percentuale di array con almeno una risposta sbagliata
  const wrongPercentage =Math.round((incorrectArrays / totalAnswers) * 100);

  return {
    correctPercentage,
    wrongPercentage
  };
}
