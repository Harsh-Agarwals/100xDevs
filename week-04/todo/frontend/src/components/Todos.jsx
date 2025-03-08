import React from 'react';

const Todos = ({ todos }) => {
  return (
    <div>
      {
        todos.map(todo => (
            <div key={Math.random()} className=' ps-4'>
                <h1 className=' font-semibold text-xl text-green-500 underline underline-offset-2'>{todo.title}</h1>
                <p className=' font-medium text-md ps-4 text-sky-500'>{todo.description}</p>
                <p className='ps-4 text-gray-500'><span className=' text-red-500 font-medium'>Status</span>: {todo.status}</p>
                <hr className='w-40 border-t-2 border-yellow-700 my-2' />
            </div>
        ))
      }
    </div>
  )
}

export default Todos
