import { useEffect, useMemo, useState } from "react";
import "./app.css"
import QandA from "./components/QandA";
import Timer from "./components/Timer";

function App() {

  const [questionNumber, setquestionNumber] = useState(1);
  const [stop, setStop] = useState(true);
  const [earned, setEarned] = useState("$ 0");


  const data = [
    {
      id: 1,
      question: "Who is your favourite actor?",
      answers: [
        {
          text: "chris evans",
          correct: false
        },
        {
          text: "Chris Hemsworth",
          correct: true
        },
        {
          text: "Tom holland",
          correct: false
        },
        {
          text: "Robert Downey Jr.",
          correct: false
        }
      ]
    },

    {
      id: 2,
      question: "What is your favourite food?",
      answers: [
        {
          text: "Chicken",
          correct: true
        },
        {
          text: "Mutton",
          correct: false
        },
        {
          text: "Biryani",
          correct: false
        },
        {
          text: "Fish",
          correct: false
        }
      ]
    },

    {
      id: 3,
      question: "Who is your fav. actor in bollywood?",
      answers: [
        {
          text: "Ranvir singh",
          correct: false
        },
        {
          text: "Ranbir kapoor",
          correct: true
        },
        {
          text: "Salman bhoi",
          correct: false
        },
        {
          text: "Akashay Kumar",
          correct: false
        }
      ]
    }
  ]


  const moneyPyramid = useMemo(()=>
    [
      { id: 1, amount: "$ 100" },
      { id: 2, amount: "$ 200" },
      { id: 3, amount: "$ 300" },
      { id: 4, amount: "$ 500" },
      { id: 5, amount: "$ 1000" },
      { id: 6, amount: "$ 2000" },
      { id: 7, amount: "$ 4000" },
      { id: 8, amount: "$ 8000" },
      { id: 9, amount: "$ 16000" },
      { id: 10, amount: "$ 32000" },
      { id: 11, amount: "$ 64000" },
      { id: 12, amount: "$ 125000" },
      { id: 13, amount: "$ 250000" },
      { id: 14, amount: "$ 500000" },
      { id: 15, amount: "$ 1000000" }
    ].reverse(),
  []);

  useEffect(()=>{
      questionNumber>1 &&
      setEarned(moneyPyramid.find((m)=> m.id === questionNumber-1 ).amount);
  },[moneyPyramid, questionNumber])

  return (
    <div className="app">
      {!stop ? (<h1 className="loseText">You eraned : {earned}</h1>) :
        (
          <>
            <div className="main">
              <div className="top">
                <div className="timer"> <Timer setStop={setStop} questionNumber={questionNumber} /> </div>
              </div>
              <div className="bottom">
                <QandA data={data} setStop={setStop} questionNumber={questionNumber} setquestionNumber={setquestionNumber} />
              </div>
            </div>
            <div className="pyramid">
              <ul className="moneylist">
                {moneyPyramid.map((m) => {
                  return (
                    <li key={m.id} className={questionNumber === m.id ? "moneylistitem active" : "moneylistitem"}>
                      <span className="moneylistitemnumber">{m.id}</span>
                      <span className="moneylistitemamount">{m.amount}</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          </>
        )}

    </div>
  );
}

export default App;
