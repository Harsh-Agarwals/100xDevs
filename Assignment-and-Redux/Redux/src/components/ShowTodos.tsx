import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeTodo, toggleTodo } from '../features/todo/todoSlice'

const ShowTodos = () => {
    const todos = useSelector((state: any) => state.todos.todos);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log(todos);
    }, [todos])

  return (
    <div>
        {
            todos.map((todo: any) => {
                return (
                    <div key={todo.id}>
                        <h3>{todo.text}</h3>
                        <p>{todo.completed ? "Y" : "N"}</p>
                        <button onClick={() => dispatch(removeTodo({id: todo.id}))}>Remove</button>
                        <button onClick={() => dispatch(toggleTodo({id: todo.id}))}>Update</button>
                    </div>
                )
            })
        }
    </div>
  )
}

export default ShowTodos
