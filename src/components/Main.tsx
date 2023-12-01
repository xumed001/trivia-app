import { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import he from 'he';

const Main = () => {
  console.log('component rendered');
  const URL = 'https://opentdb.com/api.php?amount=5&category=15&type=multiple';
  const [triviaData, setTriviaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);  
  // const [checkDisabled, setCheckDisabled] = useState(true);
  const [toggleRestart, setToggleRestart] = useState(false);
  const [count, setCount] = useState(0);
  let allAns = useRef([] as any);

  const userAns = new Array(5).fill(null);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex > 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  };

  useEffect(() => {
    console.log('effect ran');
    async function getAPI() {
      const arr = [];
      const res = await fetch(URL);
      const data = await res.json();
      data.results.forEach((element) => {
        arr.push({
          question: he.decode(element.question),
          answer: shuffle([
            {
              id: nanoid(),
              ans: he.decode(element.incorrect_answers[0]),
              isCorrect: false,
            },
            {
              id: nanoid(),
              ans: he.decode(element.incorrect_answers[1]),
              isCorrect: false,
            },
            {
              id: nanoid(),
              ans: he.decode(element.incorrect_answers[2]),
              isCorrect: false,
            },
            {
              id: nanoid(),
              ans: he.decode(element.correct_answer),
              isCorrect: true,
            },
          ]),
        });
        setTriviaData(arr);
        setIsLoading(false);
      });
    }
    getAPI();
  }, [count]);

  const handleRadioChange = (event) => {
    const {name, value} = event.target
    userAns[Number((name).slice(-1))] = value
    // console.log(userAns)
    allAns.current = [...userAns]
    console.log(allAns)
  }

  const checkAnswers = () => {   
    if (allAns.current.includes(null) || allAns.current.length === 0) {
      return
    } else {
        const results = allAns.current.reduce((prev, cur) => {
          prev[cur] = (prev[cur] || 0) + 1;
          return prev
        }, {})
        console.log(results)  
        setToggleRestart(true)
    }
  }  

  const restartGame = () => {
    setCount(prev => prev + 1)
    setToggleRestart(false)
    // setCheckDisabled(true)
  }


  const questionAnswerContainer = triviaData?.map((item, index) => {
    return (
      <div key={index} className="question-container">
        <h2 className='question'>{item.question}</h2>       
          <div className="answers-container">
            {item.answer.map((element) => (
              <div key={element.id}>
                <input 
                  type='radio'
                  name={`answerGroup${index}`}
                  id={`${element.ans}${index}`}
                  value={element.isCorrect}
                  // className={`${updateClassName}`}
                  onChange={handleRadioChange}
                />
                <label htmlFor={`${element.ans}${index}`}>
                  {element.ans}
                </label>
              </div>
            ))}
          </div>
      </div>
    )
  })
 
  return (
    <main>
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          {questionAnswerContainer}
          {toggleRestart ? 
          <>
            <p>You Scored {`${allAns.current.filter(x => x === 'true').length}`}/5 correct answers</p>
            <button type='button' onClick={restartGame}>Restart</button>
          </>
          :
          <button type='button' onClick={checkAnswers}>Check Answers</button>}
        </>
      )}
    </main>
  );
};

export default Main;