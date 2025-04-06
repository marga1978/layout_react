export const checkCorrects = (selectedAnswer,numCorrects) => ({
  single: () =>
      selectedAnswer &&  selectedAnswer.length==numCorrects && selectedAnswer[0]?.correct !== undefined
      ? selectedAnswer[0].correct
      : false,
  multiple: () => selectedAnswer && selectedAnswer.length==numCorrects &&  selectedAnswer.every(answer => answer.correct === true),
});
