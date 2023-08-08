import React, { useState, useEffect } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  useEffect(()=>{
    const timer = setInterval(()=>{
      const newTime = timeRemaining-1
      setTimeRemaining(newTime)
    }, 1000)
    
    return function cleanup(){
      clearInterval(timer)
    }
  }, [timeRemaining])

  useEffect(()=>{
    const timeOut = setTimeout(()=>{
      handleAnswer(false)
      setTimeRemaining(10)
    }, 11000)
    return function cleanup(){
      clearTimeout(timeOut)
    }
  }, [question])

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
