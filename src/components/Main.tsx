import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import he from 'he';

const Main = () => {
  console.log('component rendered');
  const URL = 'https://opentdb.com/api.php?amount=5&type=multiple';
  // const [score, setScore] = useState(0);
  const [triviaData, setTriviaData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // const [results, setResults] = useState(false)
  // const [currentQuestion, setCurrentQuestion] = useState(0)

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

  // console.log(triviaData)

  // const handleClick = (isCorrect: boolean) => {
  //   if (isCorrect) {
  //     setScore((prevScore) => prevScore + 1);
  //   }

    // if (currentQuestion + 1 < cleanData.length) {
    //     setCurrentQuestion(currentQuestion + 1)
    // } else {
    //     setResults(true)
    //}
  //};

  const questionAnswerContainer = triviaData?.map((item, index) => {
    return (
      <div key={index} className="question-container">
        <h2>{item.question}</h2>       
          <div className="answers-container">
            {item.answer.map((element) => (
              <button key={element.id}>
                {element.ans}
              </button>
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
        </>
      )}
    </main>
  );
};

export default Main;