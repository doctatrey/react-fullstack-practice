import React from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../axiosInstance'

import { useState } from 'react'

const DeleteQuestions = () => {

    const [questionId, setQuestionId] = useState('')
    const [response, setResponse] = useState('')

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.delete(`/questions/${questionId}`)
            console.log(response)
            setResponse('Question deleted successfully!')
        } catch (err) {
            console.error(`ERROR: ${err}`)
        }
    }

  return (
    <div>
     <Link to='/quiz'>Back to Quiz</Link>
     <br/>
     <br/>
      <h1>Delete Questions</h1>
      <form onSubmit={handleSubmit}>
        <label>Enter the ID of the question you want to delete:</label>
        <input type='text' name='questionId' onChange={(e) => {setQuestionId(e.target.value)}} required/>
        <br/>
        <br/>
        <input type='submit' value='Delete Question'/>
      </form>
      <h1>{response}</h1>
    </div>
  )
}

export default DeleteQuestions
