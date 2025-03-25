import { useState } from 'react'
import '../App.css'
import ShowTodos from './ShowTodos'
import { addTodo } from '../features/todo/todoSlice';
import { useDispatch } from 'react-redux';

const Todos = () => {
    const [input, setInput] = useState("");
    const [completed, setCompleted] = useState(false);
    const dispatch = useDispatch();

    const btnClick = (e: any) => {
        e.preventDefault();
        console.log(e.target);
        console.log(e.target.checked);
        
        dispatch(addTodo({text: input}));
        setInput("");
        setCompleted(false);
    }

  return (
    <div>
      <form onSubmit={btnClick}>
        <div className="text-label">
            <label id='text'>Text</label>
            <input type="text" name="text" id="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='todo' required />
        </div>
        <div className="completed-label">
            <label id='completed'>Completed</label>
            <input type="checkbox" name="completed" id="completed" checked={completed} onChange={(e) => setCompleted(e.target.checked)} />
        </div>
        <input type="submit" value="Submit" className='btn'/>
      </form>
      <h2 className='todo-heading'>Todos</h2>
      <ShowTodos />
    </div>
  )
}

export default Todos
