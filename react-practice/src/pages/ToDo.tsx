import { useState } from 'react'

interface Todo {
  id: string;
  title: string;
}
const ToDo = () => {
  const [input, setInput] = useState("")
  const [todos, setTodo] = useState<Todo[]>([])

  const addTodo = () => {
    setTodo([...todos, { id: crypto.randomUUID(), title: input}])
    setInput("")
  }

  const deleteTodo = (id: string) => {
    setTodo(todos => {
      return todos.filter((todo) => todo.id != id)
    })
  }

  const deleteAll = () => {
    setTodo([])
  }

  return (
    <div>
      <h1>To-Do List</h1>
      <ul>
        {todos.map((todo, index) => (
          <div>
            <li key={index}>{todo.title}</li>
            <button onClick={e => {deleteTodo(todo.id)}}>X</button>
          </div>
        ))}
      </ul>
      <input type="text" placeholder="Add a new todo" value={input} onChange={(e) => {setInput(e.target.value)}}/>
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={deleteAll}>Delete All Todos</button>
    </div>
  )
}

export default ToDo
