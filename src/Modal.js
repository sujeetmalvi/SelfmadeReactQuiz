import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {

  const { questions, index, correct, setIndex, setCorrect, isModelOpen, setIsModelOpen, setWaiting } = useGlobalContext();
  const { question, incorrect_answers, correct_answer } = questions[index];
  const answers = [...incorrect_answers, correct_answer];

  const checkAnswer = (answer) => {
    if (answer === correct_answer) {
      setCorrect(correct + 1);
    }
    nextQuestion();
  }
  const nextQuestion = () => {
    if (index == questions.length - 1) {
      setIsModelOpen(true);
      //setIndex(0);
    } else {
      setIndex(index + 1)
    }
  }

  const setModelClose = () => {
    setIsModelOpen(false);
    setCorrect(0);
    setIndex(0);
    setWaiting(true)
  }

  return (<>
    <div className={`${isModelOpen ? "modal-container isOpen" : "modal-container"}`} >
      <div className="modal-content">
        <h2>congrats!</h2>
        <p>You answered {Math.round((correct / index) * 100)}% of questions correctly</p>
        <button className="close-btn" onClick={() => { setModelClose() }}>play again</button>
      </div>
    </div>
    <section className="quiz">
      <p className="correct-answers">correct answers : {correct}/{index}</p>
      <article className="container">
        <h2 dangerouslySetInnerHTML={{ __html: question }} />
        <div className="btn-container">
          {answers.sort(function () { return 0.5 - Math.random() }).map((ans, i) => {
            return <button key={i} className="answer-btn" onClick={() => checkAnswer(ans)} dangerouslySetInnerHTML={{ __html: ans }} />
          })}
        </div>
      </article>
      <button className="next-question" onClick={() => nextQuestion()}>next question</button>
    </section>
  </>)
}

export default Modal
