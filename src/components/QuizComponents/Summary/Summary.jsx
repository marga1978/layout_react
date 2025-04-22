import { useEffect } from "react";
import styles from "./Summary.module.scss";
import quizCompleteImg from "../../../assets/quiz-complete.png";
import BackgroundContainer from "../../BackgroundContainer/BackgroundContainer.jsx"
import {
  calculatePercentage,
  calculatePercentageCategories,
} from "../../../utils/calculatePercentage";
import Button from "../../Button/Button.jsx";

import {createTreeStructureQuestions} from "../../../utils/TreeStructureQuestions"
import {
  checkCorrects,
  getNumberAnswerCorrect,
  createObjIdCorrectsAnswer
} from "../../../utils/checkQuestions";
import PerformanceCategories from "../PerformanceCategories/PerformanceCategories.jsx";
import TreeQuestions from "../TreeQuestions/TreeQuestions.jsx";


export default function Summary({
  userAnswers,
  questions,
  onCickTryAgain,
  category,
  tree,
  review,
  onSetTrackingTest,
  masteryscore,
}) {
  console.log("userAnswersXXX", userAnswers);
  console.log("questionssXXX", questions);
  

  function getTextCorrectAnswer(index) {
    return questions[index].answers
      .filter((answer) => answer.correct === true)
      .map((answer) => answer.text)
      .join("<br>");
  }
  function getTextReview(index) {
    return questions[index].review.reviewText;
  }

  function getType(index) {
    //console.log("questions[index].type",questions[index].type)
    return questions[index].type;
  }

  function getAnswers(answersUser) {
    return answersUser && answersUser.map((answer) => answer.text).join("<br>");
  }


  const objCategories = calculatePercentageCategories(userAnswers, questions,questions);

  const percentages = calculatePercentage(userAnswers, questions);
  //const wrongAnswersPerc = calcPerc(userAnswers, "wrong");
  const isPassed = percentages.correctPercentage >= masteryscore ? true : false;
  

  console.log("XXXXX 1 tree",tree)
  console.log("XXXXX 1 category",category)
  console.log("XXXXX 1 correct",createObjIdCorrectsAnswer(userAnswers,questions))
  console.log("XXXXXXX",createTreeStructureQuestions(tree, category, createObjIdCorrectsAnswer(userAnswers,questions)).tree)
  //console.log("XXXXXXX",createTreeStructureQuestions(tree,category,questions))
  useEffect(() => {
    onSetTrackingTest({
      score: percentages.correctPercentage,
      isPassed: isPassed,
    });
  }, [percentages.correctPercentage, isPassed, onSetTrackingTest]); // Dipendenze per evitare loop infiniti

  const handleTryAgain = function handleTryAgain() {
    onCickTryAgain(false);
  };
  return (
    <>
    <BackgroundContainer variant="small">
    <div className={styles.summary}>
      <img src={quizCompleteImg} alt="Trophy icon" />
      {isPassed && <h2>Quiz Completed! You have passed the test.</h2>}
      {!isPassed && (
        <h2>
          Quiz Completed! You don't have passed the test.
          <br />
          masteryscore: {masteryscore}%
        </h2>
      )}
      <div className={styles["summary-stats"]}>
        <p>
          <span className={styles["number"]}>
            {percentages.correctPercentage}%
          </span>
          <span className={styles["text"]}>answered correctly</span>
        </p>
        <p>
          <span className={styles["number"]}>
            {percentages.wrongPercentage}%
          </span>
          <span className={styles["text"]}>answered incorrectly</span>
        </p>
      </div>
      {objCategories && <PerformanceCategories objCategories={objCategories} />}
      {!isPassed && (
        <div className="summary-button">
          <p>
            <Button onClick={handleTryAgain} className="btn-primary">
              Riprova!
            </Button>
          </p>
        </div>
      )}
      {review && (
        <ol>
          {userAnswers.map((answer, index) => {
            let cssClass = `${styles["user-answer"]} ${
              checkCorrects(answer, getNumberAnswerCorrect(index, questions))[
                getType(index)
              ]()
                ? styles.correct
                : styles.wrong
            }`;
            return (
              <li key={index}>
                <h3 className={styles["question-number"]}>{index + 1}</h3>
                <p className={styles.question}>{questions[index].text}</p>
                {review.showAnwswer && (
                  <p className={cssClass}>
                    User response: <br />{" "}
                    <span
                      dangerouslySetInnerHTML={{
                        __html: getAnswers(answer) ?? "Skipped",
                      }}
                    />{" "}
                    {checkCorrects(
                      answer,
                      getNumberAnswerCorrect(index, questions)
                    )[getType(index)]() && <span>- Correct</span>}{" "}
                    {!checkCorrects(
                      answer,
                      getNumberAnswerCorrect(index, questions)
                    )[getType(index)]() && <span>- Wrong</span>}
                  </p>
                )}
                {review.showCorrect &&
                  !checkCorrects(
                    answer,
                    getNumberAnswerCorrect(index, questions)
                  )[getType(index)]() && (
                    <p>
                      <strong>Correct answer:</strong>
                      <br />{" "}
                      <span
                        dangerouslySetInnerHTML={{
                          __html: getTextCorrectAnswer(index),
                        }}
                      />
                    </p>
                  )}
                {review.showReview &&
                  !checkCorrects(
                    answer,
                    getNumberAnswerCorrect(index, questions)
                  )[getType(index)]() && (
                    <p>
                      <strong> {getTextReview(index)} </strong>
                    </p>
                  )}
              </li>
            );
          })}
        </ol>
      )}    
    </div>
    </BackgroundContainer>
    <BackgroundContainer variant="large"> 
        {tree && <TreeQuestions domande={createTreeStructureQuestions(tree, category, createObjIdCorrectsAnswer(userAnswers,questions)).tree} />}
    </BackgroundContainer>
    </>
  );
}
