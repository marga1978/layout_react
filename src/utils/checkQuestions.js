export const checkCorrects = (selectedAnswer,numCorrects) => ({
  single: () => {return selectedAnswer && selectedAnswer.length==numCorrects && (selectedAnswer[0]?.correct !== undefined
    ? selectedAnswer[0].correct
    : false)},
      
  multiple: () => {return selectedAnswer && selectedAnswer.length==numCorrects &&  selectedAnswer.every(answer => answer.correct === true)}
});

// un'altra funzione da esportare
export const getNumberAnswerCorrect = (index,questions) => {
  //console.log("AAAA",questions)
  return questions[index].answers.filter(answer => answer.correct === true).length;
};

export const createObjIdCorrectsAnswer = (userAnswers,questions)=>{
  let objCorrect=[]
  userAnswers.map((answer, index) => {
    //console.log("questions(index).type",questions[index].type)
    const val=checkCorrects(answer, getNumberAnswerCorrect(index, questions))[
      questions[index].type
    ]()
    objCorrect.push({id:questions[index].id, cat:questions[index].cat, isCorrect:val, answers:questions[index].answers, type:questions[index].type})
   
  })
  console.log("objCorrect",objCorrect)
  return objCorrect;
}

