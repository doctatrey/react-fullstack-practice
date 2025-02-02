import React from 'react'
import { useRef, useState, useEffect } from 'react'

const URPractice = () => {
    const [name, setName] = useState('')
    const inputRef = useRef<HTMLInputElement | null>(null)
    const prevName = useRef('')

   useEffect(() => {
    prevName.current = name
   }, [name])

  return (
    <div>
        <input ref={inputRef} value={name} onChange={(e) => {setName(e.target.value)}}></input>
        <div>My name is {name} and it used to be {prevName.current}</div>
        <button onClick={focus}>Focus</button>
    </div>
  )
}

export default URPractice
