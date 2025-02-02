import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Directory</h1>
      <Link to='/todo'>Todo</Link>
      <br></br>
      <Link to='/uepractice'>UE Practoce</Link>
      <br></br>
      <Link to='/urpractice'>UR Practice</Link>
      <br></br>
      <Link to='/counter'>Counter</Link>
      <br></br>
      <Link to='/randomfact'>Random Fact</Link>
      <br></br>
      <Link to='/chatbot'>ChatBot</Link>
      <br></br>
      <Link to='/quiz'>Trivia</Link>
      <br></br>
      <Link to='/blog'>Blog</Link>
    </div>
  )
}

export default Home
