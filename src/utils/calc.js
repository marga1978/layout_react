export function calcPerc(risposte, type) {
  // Estrarre tutti gli oggetti e filtrare quelli corretti
  const allAnswer = risposte.flat(); // Appiattisce l'array annidato
  const results = allAnswer.filter(
    type === "correct"
      ? (risposta) => risposta.correct
      : (risposta) => !risposta.correct
  );
  // Calcolare la percentuale
  return Math.round((results.length / allAnswer.length) * 100);
}
