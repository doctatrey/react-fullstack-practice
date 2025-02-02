import React from 'react'
import { useState } from 'react'

const RandomFacts = () => {
  const [fact, setFact] = useState('')

  const fetchFact = async() => {
    const response = await fetch('https://uselessfacts.jsph.pl/api/v2/facts/random')
    const data = await response.json()
    setFact(data.text)
  }

  return ( 
    <div>
      <h1>Random Facts</h1>
      <p>{fact}</p>
      <button onClick={fetchFact}>Get a Random Fact</button>
    </div>
  )
}

export default RandomFacts
