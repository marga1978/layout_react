import Button from "./Button.jsx";
export default function Feedback({
  isConfirmed,
  isAnswered,
  isCorrect,
  idEndAttempt,
  isSolution,
  textCorrect,
  textTryAgain,
  textWrong,
  handleSetConfirm,
  handleConfirmAnswer,
  handleTryAgainAnswer,
  handleSolutionAnswer
}) {

  console.log(isConfirmed, "XX1 isConfirmed")
  console.log(isAnswered, "XX2 isAnswered")
  console.log(isCorrect, "XX3 isCorrect")
  return (
    <>
      <div className="container-btn">
        {!isConfirmed && isAnswered && (
          <Button onClick={handleSetConfirm} className="btn-primary">
            Confirm
          </Button>
        )}

        
        {isConfirmed && isAnswered && isCorrect && (
          <>
            <p>{textCorrect}</p>
            <Button onClick={handleConfirmAnswer} className="btn-primary">
              Next Question
            </Button>
          </>
        )}

        {!idEndAttempt && isConfirmed && isAnswered && !isCorrect && (
          <>
            <p>{textTryAgain}</p>
            <Button onClick={handleTryAgainAnswer} className="btn-primary">
              Try again
            </Button>
          </>
        )}

        {idEndAttempt && isConfirmed && isAnswered && !isCorrect && (
          <>
            <p>{textWrong}</p>
            {!isSolution && (
              <Button onClick={handleSolutionAnswer} className="btn-primary">
                Solution
              </Button>
            )}
            {isSolution && (
              <Button onClick={handleConfirmAnswer} className="btn-primary">
                Next Question
              </Button>
            )}
          </>
        )}
      </div>
    </>
  );
}
