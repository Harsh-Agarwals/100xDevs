import React from 'react'

const NoteItem = ({props}) => {
    const { title, description, tag } = props;
    
    return (
        <div className=' text-center mx-2 px-4 py-3 my-2 border-2 border-green-300 w-80 '>
            <h1 className=' font-bold pb-2 text-xl text-sky-500'>{title} <span><i className="fa-solid fa-trash text-red-500 text-lg ps-2 cursor-pointer hover:text-red-400"></i><i className="fa-solid fa-pen-to-square text-green-600 mx-1 text-lg cursor-pointer hover:text-green-400"></i></span></h1>
            <p>{description}</p>
            <button className=' text-xs font-medium tracking-wide bg-red-200 px-3 py-1 rounded-lg text-red-700 mt-2'>{tag}</button>
        </div>
    )
}

export default NoteItem
