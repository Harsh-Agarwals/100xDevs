import './App.css'
import CreateTodo from './components/CreateTodo'
import Todos from './components/Todos'
import todos from '../todos'
import { useEffect, useRef, useState } from 'react'

function App() {

  const hasFetched = useRef(false);
  const [todos, setTodos] = useState([]);

  const response = async () => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    let todo = await fetch("http://localhost:3000/todos/67c46943f3c742ba84375119");
    todo = await todo.json();
    let todoList = todo.todo
    setTodos([todoList]);
    console.log(todoList);
  }

  useEffect(() => {
    response();
  }, []);

  const addNewTodo = (todo) => {
    setTodos(todos.concat(todo));
  }

  return (
    <>
      <h1 className=' text-red-600'>Hello, Harsh!</h1>
      <Todos todos={todos} />
      <CreateTodo addNewTodo={addNewTodo} />
    </>
  )
}

export default App
