import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import he from 'he';

const Main = () => {
  console.log('component rendered');
  const URL = 'https://opentdb.com/api.php?amount=5&type=multiple';
  // const [btnState, setBtnState] = useState(false);
  const [triviaData, setTriviaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [results, setResults] = useState(false)

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
  }, []);

  // const handleClick = (isCorrect) => {
  //   console.log(isCorrect)
  //   setBtnState(prev => !prev);
  // }  

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
                  id={element.ans}
                  // className={`btn`}
                // onClick={() => handleClick(element.isCorrect)}
                />
                <label htmlFor={`${element.ans}`}>
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
          <button>Check Answers</button>
        </>
      )}
    </main>
  );
};

export default Main;