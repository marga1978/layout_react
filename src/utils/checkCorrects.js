export const checkCorrects = (selectedAnswer,numCorrects) => ({
  single: () =>
        selectedAnswer.length==numCorrects && selectedAnswer[0]?.correct !== undefined
      ? selectedAnswer[0].correct
      : false,
  multiple: () => selectedAnswer.length==numCorrects &&  selectedAnswer.every(answer => answer.correct === true),
});
