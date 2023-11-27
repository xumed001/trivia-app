import { useEffect, useState } from "react"
import data from "../assets/data"


const Main = () => {
  console.log('component rendered')
  const [results, setResults] = useState(false)
  const [score, setScore] = useState(0)
  const [currentQuestion, setCurrentQuestion] = useState(0)
//   const [triviaData, setTriviaData] = useState(null)
  const rawData = data;

  const cleanData = rawData.map((ans) => {
    const dataMap = {
        'question' : ans.question,
        'answer': [
            {'id': 0, 'ans': ans.incorrect_answers[0], isCorrect: false},
            {'id': 1, 'ans': ans.incorrect_answers[1], isCorrect: false},
            {'id': 2, 'ans': ans.incorrect_answers[2], isCorrect: false},
            {'id': 3, 'ans': ans.correct_answer, isCorrect: true},
        ]
    }
    return dataMap
  })

//   console.log(cleanData)

  const handleClick = (isCorrect : boolean) => {
    if (isCorrect) {
        setScore(score + 1)
    }

    if (currentQuestion + 1 < cleanData.length) {
        setCurrentQuestion(currentQuestion + 1)
    } else {
        setResults(true)
    }
  }

  const restartGame = () => {
    setCurrentQuestion(0)
    setScore(0)
    setResults(false)
  }

  const shuffle = (array) => {
    let currentIndex = array.length,  randomIndex;

    while (currentIndex > 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  return (
    <main>
        <h3>current score: {score}</h3>

        {results ?   
            <div className="final-results">
                <h3>Final results</h3>
                <p>{score} out of {cleanData.length} correct - ({(score/cleanData.length * 100).toFixed(0)}%)</p>
                <button onClick={() => restartGame()}>Restart game</button>
            </div>
        :
            <div className="question-card">
                <h2 className="questions">{cleanData[currentQuestion].question}</h2>

                <ul className="answers">
                    {shuffle(cleanData[currentQuestion].answer).map((item) => {
                        return (
                            <li 
                                key={item.id}
                                onClick={() => handleClick(item.isCorrect)}
                            >
                                {item.ans}
                            </li>
                        )
                    })}
                </ul>
            </div>
        }


    </main>
  )
}

export default Main