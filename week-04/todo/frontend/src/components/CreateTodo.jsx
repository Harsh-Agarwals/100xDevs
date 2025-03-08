import React, { useState } from 'react'

const CreateTodo = ({ addNewTodo }) => {

  const [todo, setTodo] = useState({"title": "", "description": "", "status": "not-started"});

  const changeInput = (e) => {
    console.log(e.target.name, e.target.value);
    setTodo({...todo, [e.target.name]: e.target.value});
  }

  const submitTodo = (e) => {
    console.log(todo);
    e.preventDefault();
    addNewTodo(todo);
  };
  
  return (
    <div>
      <input type='text' placeholder='Title' name='title' onChange={changeInput} required className='border-2 border-green-800 outline-none text-xs px-2 py-1 rounded-md tracking-wide text-orange-700 font-bold mx-6 my-2' /><br />
      <input type='text' placeholder='Description' name='description' onChange={changeInput} required className='border-2 border-green-800 outline-none text-xs px-2 py-1 rounded-md tracking-wide text-orange-700 font-bold mx-6 mb-2' /><br />
      <div className='mx-6 mb-2'>
        <label className=' text-sm text-sky-500 font-medium pe-2'>Status</label>
        <select name='status' onChange={changeInput} className='text-xs outline-none border-[1px] border-gray-500 px-1 py-[2px]'>
            <option value='not-started' className=' bg-green-300 font-medium text-green-700'>Not Started</option>
            <option value='completed' className=' bg-amber-500 font-medium text-red-800'>Completed</option>
            <option value='in-progress' className=' bg-sky-400 font-medium text-blue-800'>In Progress</option>
        </select><br />
      </div>
      <button className=' bg-green-500 px-4 py-1 border-green-900 rounded-md text-white font-medium tracking-wide hover:bg-green-600 mx-6 text-sm' onClick={submitTodo}>Create todo</button>
    </div>
  )
}

export default CreateTodo
