import React from 'react'
import { useState, useEffect } from 'react'

const UEPractice = () => {
    const [resourceType, setResourceType] = useState('posts')
    const [items, setItems] = useState([])

    useEffect(() => {
        if (resourceType == "posts") {
          fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            .then(response => response.json())
            .then(json => setItems(json))
        } else if (resourceType == "users") {
          fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
           .then(response => response.json())
           .then(json => setItems(json))
        } else if (resourceType == "comments") {
          fetch(`https://jsonplaceholder.typicode.com/${resourceType}`)
            .then(response => response.json())
            .then(json => setItems(json))
        }
    }, [resourceType])

  return (
    <>
      <button onClick={() => {setResourceType('posts')}}>View Posts</button>
      <button onClick={() => {setResourceType('users')}}>View Users</button>
      <button onClick={() => {setResourceType('comments')}}>View Comments</button>
      <h1>Current Resource: {resourceType}</h1>
        {items.map(item => {
            return <pre>{JSON.stringify(item)}</pre>
        })}
    </> 
  )
}

export default UEPractice
