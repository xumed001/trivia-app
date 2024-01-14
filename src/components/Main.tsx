import { useEffect, useState, useRef } from 'react';
import { nanoid } from 'nanoid';
import he from 'he';
import { DataTypes, Props, QuestionAnswerArr } from '../types/types';

const Main = (props: Props) => {
  //console.log('component rendered');
  const URL = 'https://opentdb.com/api.php?amount=5&category=15&type=multiple';
  const [triviaData, setTriviaData] = useState<QuestionAnswerArr[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);  
  const [toggleRestart, setToggleRestart] = useState(false);
  const [count, setCount] = useState(0);
  const [toggleStyle, setToggleStyle] = useState(false)

  const allAns = useRef<string[]>([]);
  const userAns = new Array(5).fill('');

  const shuffle = (array : object[]) => {
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
    //console.log('effect ran');
    async function getAPI() {
      const arr: any[] = [];
      const res = await fetch(URL);
      const data = await res.json();
      data.results?.forEach((element : DataTypes) => {
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

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = event.target
    userAns[Number((name).slice(-1))] = value
    //console.log(userAns)
    allAns.current = [...userAns]
    //console.log(allAns)
  }

  const checkAnswers = () => { 
    if (allAns.current?.includes('')) {
      return
    } else {
      setToggleRestart(true)
    }
    setToggleStyle(true)
  }  

  const restartGame = () => {
    allAns.current = new Array(5).fill(null);
    setCount(prev => prev + 1)
    setToggleRestart(false)
    setToggleStyle(false)
  }

  const questionAnswerContainer = triviaData?.map((item : QuestionAnswerArr, index: number) => {
    return (
      <div key={index} className="question-container">
        <h2 className='question'>{item.question}</h2>       
          <div className={`answers-container ${props.darkMode ? 'dark' : ''}`}>
            {item.answer.map((element) => (
              <div key={element.id}>
                <input 
                  type='radio'
                  name={`answerGroup${index}`}
                  id={`${element.ans}${index}`}
                  value={`${element.isCorrect}`}
                  className={`${toggleStyle ? (element.isCorrect ? 'correct' : 'incorrect') : ''}`}
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
    <main className={props.darkMode ? 'dark' : ''} >
      {isLoading ? (
        'Loading...'
      ) : (
        <>
          {questionAnswerContainer}
          {toggleRestart ? 
          <div className='trivia-results'>
            <p>You answered {`${allAns.current?.filter(x => x === 'true').length}`}/5 questions correctly!</p>
            <button type='button' onClick={restartGame}>Restart</button>
          </div>
          :
          <button className='btnCheckAns' type='button' onClick={checkAnswers}>Check Answers</button>
          }
        </>
      )}
    </main>
  );
};

export default Main;