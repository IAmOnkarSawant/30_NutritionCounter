import React from "react";

function QuestionCard({ question, onClick }) {
  return (
    <div
      className="question-details"
      onClick={() => onClick(question.questionNumber)}
    >
      <h4>Q.{question.questionNumber}&nbsp;</h4>
      <h5>{question.question}</h5>
    </div>
  );
}

export default QuestionCard;
