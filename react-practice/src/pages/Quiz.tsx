import React from 'react'
import { useState, useEffect } from 'react'
import axiosInstance from '../axiosInstance'
import { Link } from 'react-router-dom'

interface Question {
  _id: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

const Quiz = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [quizStarted, setQuizStarted] = useState<Boolean>(false)
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<{[key : string]: string}>({})
  const [result, setResult] = useState<String>('')

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axiosInstance.get<Question[]>('http://localhost:2000/questions')
        setQuestions(response.data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchQuestions()
  }, [])

  const startQuiz = () => {
    const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5)
    setSelectedQuestions(shuffledQuestions.slice(0,10))
    setQuizStarted(true)
    setResult('')
    setAnswers({})
  }

  const handleAnswerChange = (questionId: string, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer}))
  }

  const checkAnswers = () => {
    let correctCount = 0;
    console.log(selectedQuestions)
    console.log(answers)
  
    selectedQuestions.forEach((question) => {
      const userAnswer = answers[question._id]; // User's selected answer
      if (userAnswer === question.correctAnswer) {
        correctCount++;
      }
    });
  
    const strResult = `You got ${correctCount} out of ${selectedQuestions.length} correct!`
    setResult(strResult)
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    checkAnswers()
  }

  return (
    <div>
        <h1>Trivia</h1>
        <br/>
        {!quizStarted ? (
          <button onClick={startQuiz}>Start Quiz</button>
        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              {selectedQuestions.map((question, index) => (
                <div key={question._id}>
                  <h3>
                    Q{index+1}: {question.text}
                  </h3>
                    {question.options.map((option, i) => (
                      <div key={i}>
                        <input type='radio' id={`q${index}-option${i}`} name={`question-${index}`} value={option} onChange={() => handleAnswerChange(question._id, option)}/>
                        <label htmlFor={`q${index}-option${i}`}>{option}</label>
                      </div>
                    ))}
                </div>
              ))}
              <button type='submit'>Submit</button>
              <p>{result}</p>
            </form>
            <button onClick={startQuiz}>Restart</button>
          </div>
        )}
        <br/>
        <Link to='add'>Want to add your own questions?</Link>
        <br/>
        <Link to='delete'>Want to delete your questions?</Link>
    </div>
);
};

export default Quiz
