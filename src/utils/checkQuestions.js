export const checkCorrects = (selectedAnswer,numCorrects) => ({
  single: () => {return selectedAnswer && selectedAnswer.length==numCorrects && (selectedAnswer[0]?.correct !== undefined
    ? selectedAnswer[0].correct
    : false)},
      
  multiple: () => {return selectedAnswer && selectedAnswer.length==numCorrects &&  selectedAnswer.every(answer => answer.correct === true)}
});

// un'altra funzione da esportare
export const getNumberAnswerCorrect = (index,questions) => {
  return questions[index].answers.filter(answer => answer.correct === true).length;
};

