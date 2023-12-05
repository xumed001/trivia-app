

export interface QuestionAnswerArr {
    question : string;
    answer : [{id : string, ans : string, isCorrect: boolean | string}]
}

export interface DataTypes {
    type: string;
    difficulty: string;
    category: string;
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
}

export interface Props {
    toggleDarkMode?: () => void;
    darkMode?: boolean;
  }