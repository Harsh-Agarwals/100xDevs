import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext'

const AddNote = () => {
    const noteContext = useContext(NoteContext);
    const {addNote} = noteContext;

    const [inputs, setInputs] = useState({'title': "", 'description': "", 'tag': ""});

    const addOnClick = (e) => {
        e.preventDefault();
        addNote(inputs);
    };

    const changeInput = (e) => {
        setInputs({...inputs, [e.target.name]: e.target.value});
    }

    return (
        <div>
            <form className="max-w-sm mx-auto mb-10">
                <div className="mb-5">
                    <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Title</label>
                    <input type="text" id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Title" name='title' onChange={changeInput} required />
                </div>
                <div className="mb-5">
                    <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <input type="text" id="description" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Description' name='description' onChange={changeInput} required />
                </div>
                <div className="mb-5">
                    <label htmlFor="tag" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note Tag</label>
                    <input type="text" id="tag" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder='Tag' name='tag' onChange={changeInput} required />
                </div>
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addOnClick} disabled={inputs.title.length<5 || inputs.description.length<5}>Add Note</button>
            </form>
        </div>
  )
}

export default AddNote
