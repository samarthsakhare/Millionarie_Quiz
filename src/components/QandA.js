import React, { useEffect, useState } from 'react'

export default function QandA({
  data,
  setStop,
  questionNumber,
  setquestionNumber
}) {

  const [question, setQuestion] = useState(null);
  const [selectedanswer, setSelectedanswer] = useState(null);
  const [className, setClassName] = useState("answer");

  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  const delay = (duration, callback) => {
    setTimeout(() => {
      callback();
    }, duration);
  }

  const handleClick = (a) => {
    setSelectedanswer(a);
    setClassName("answer active");

    delay(1000, ()=>{
      setClassName(a.correct ? "answer correct" : "answer wrong");
    })

    delay(4000, ()=>{
      if(a.correct){
        setquestionNumber((prev)=>prev+1);
        setSelectedanswer(null);
      }
      else{
        setStop(false);
      }
    })

  }

  return (
    <div className='qanda'>
      <div className="question">{question?.question}</div>
      <div className="answers">
        {
          question?.answers.map((a) => {
            return <div className={selectedanswer === a ? className : "answer"} onClick={() => {handleClick(a)}}>{a.text}</div>
          })
        }
      </div>
    </div>
  )
}
