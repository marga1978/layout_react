export function calculatePercentage(answers, questions) {
  console.log("questions", questions);
  console.log("rispanswersoste", answers);

  const totalAnswers = answers.length;

  // Conta gli array che hanno tutte le voci corrette
  // verifico anche se il numero di risposte dall'utente per una domanda equivale al numero di corrette
  // altrimenti se ad esempio fossero la risposta A e B le corrette e l'utente rispondesse solo B verrebbe considerata corretta
  const correctArrays = answers.filter(
    (answer, index) =>
      answer &&
      questions[index].answers.filter(
        (answerJson) => answerJson.correct === true
      ).length === answer.length && //verifico se il numero di rispote dall'tuente equivale al numero di risposte corrette (risposta multipla)
      answer.every((item) => item.correct === true)
  ).length;

  // Conta gli array con almeno una risposta sbagliata
  const incorrectArrays = totalAnswers - correctArrays;

  // Calcola la percentuale di array con tutte le voci corrette
  const correctPercentage = Math.round((correctArrays / totalAnswers) * 100);

  // Calcola la percentuale di array con almeno una risposta sbagliata
  const wrongPercentage = Math.round((incorrectArrays / totalAnswers) * 100);

  return {
    correctPercentage,
    wrongPercentage,
  };
}

export function calculatePercentageCategories(answers, questions) {
  console.log("questions", questions);
  console.log("rispanswersoste", answers);

  // Mappa domande e risposte per categoria
  const categoryStats = {};

  questions.forEach((question, index) => {
    const category = question.cat;
    const userAnswers = answers[index];

    if (!categoryStats[category]) {
      categoryStats[category] = {
        total: 0,
        correct: 0,
        labelCategory:question.labelCategory
      };
    }

    

    // Consideriamo una risposta corretta se almeno una delle risposte è corretta
    const isCorrect = userAnswers.some((a) => a.correct);

    categoryStats[category].total += 1;
    
    if (isCorrect) {
      categoryStats[category].correct += 1;
    }
  });

  console.log("categoryStats",categoryStats)

  // Calcola percentuali
  //const categoryPercentages = Object.entries(categoryStats).map(
  return Object.entries(categoryStats).map(
    ([cat, stats]) => {
      console.log("cat",cat)
      const percent = (stats.correct / stats.total) * 100;
      return {
        cat,
        labelCategory:stats.labelCategory,
        percentage: Math.round(percent),
        correct: stats.correct,
        total: stats.total,
      };
    }
  );
}
