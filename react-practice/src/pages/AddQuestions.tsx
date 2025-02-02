import React from 'react'
import { Link } from 'react-router-dom'
import axiosInstance from '../axiosInstance'
import { useState } from'react'

const AddQuestions = () => {

    const [formData, setFormData] = useState({
        "text": "",
        "option1": "",
        "option2": "",
        "option3": "",
        "option4": "",
        "correctAnswer": "",
    })
    const [id, setId] = useState("")

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({...formData, [name]: value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await axiosInstance.post('/questions', {
                text: formData.text,
                options: [
                    formData.option1,
                    formData.option2,
                    formData.option3,
                    formData.option4
                ],
                correctAnswer: formData.correctAnswer,
            })
            const createdQuestion = response.data
            console.log(createdQuestion)
            setId(createdQuestion._id)
            alert('Question added successfully!')
            setFormData({
                "text": "",
                "option1": "",
                "option2": "",
                "option3": "",
                "option4": "",
                "correctAnswer": "",
            })
        } catch (err) {
            console.error("There was an error adding the data. Error(s): " + err)
        }
    }

  return (
    <div>
     <Link to='/quiz'>Back to Quiz</Link>
     <br/>   
     <br/>
     <form onSubmit={handleSubmit}>
        <label>Add Question: </label>
        <input type='text' name='text' placeholder='Question' value={formData.text} onChange={handleChange} required/>
        <br/>
        <br/>
        <label>Options: </label>
        <br/>
        <input type='text' name='option1' placeholder='Option 1' value={formData.option1} onChange={handleChange} required/>
        <br/>
        <input type='text' name='option2' placeholder='Option 2' value={formData.option2} onChange={handleChange} required/>
        <br/>
        <input type='text' name='option3' placeholder='Option 3' value={formData.option3} onChange={handleChange} required/>
        <br/>
        <input type='text' name='option4' placeholder='Option 4' value={formData.option4} onChange={handleChange} required/>
        <br/>
        <br/>
        <label>Correct Answer: </label>
        <select id='correctAnswer' name='correctAnswer' value={formData.correctAnswer} onChange={handleChange}>
            <option value="" disabled>Select the Correct Answer</option>
            <option value={formData.option1}>{formData.option1}</option>
            <option value={formData.option2}>{formData.option2}</option>
            <option value={formData.option3}>{formData.option3}</option>
            <option value={formData.option4}>{formData.option4}</option>
        </select>
        <br/>
        <br/>
        <input type='submit' value='Add Question'/>
     </form>
     <p>If you want to delete your question, you can using this ID: {id}</p>
    </div>
  )
}

export default AddQuestions
