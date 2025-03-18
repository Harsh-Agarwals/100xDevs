import React, { useContext, useState } from 'react';
import NoteContext from '../context/NoteContext';

const NoteItem = ({ props }) => {
    const noteContext = useContext(NoteContext);
    const { deleteNote, updateNote } = noteContext;
    const { _id, title, description, tag } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [updatedTitle, setUpdatedTitle] = useState(title);
    const [updatedDescription, setUpdatedDescription] = useState(description);
    const [updatedTag, setUpdatedTag] = useState(tag);

    const handleUpdateClick = () => {
        setIsModalOpen(true);
    };

    const handleUpdateNote = () => {
        updateNote(_id, updatedTitle, updatedDescription, updatedTag);
        setIsModalOpen(false);
    };

    return (
        <div className='text-center mx-2 px-4 py-3 my-2 border-2 border-green-300 w-80'>
            <h1 className='font-bold pb-2 text-xl text-sky-500'>
                {title}{' '}
                <span>
                    <i 
                        className='fa-solid fa-trash text-red-500 text-lg ps-2 cursor-pointer hover:text-red-400' 
                        onClick={() => deleteNote(_id)}
                    ></i>
                    <i 
                        className='fa-solid fa-pen-to-square text-green-600 mx-1 text-lg cursor-pointer hover:text-green-400' 
                        onClick={handleUpdateClick}
                    ></i>
                </span>
            </h1>
            <p>{description}</p>
            <button className='text-xs font-medium tracking-wide bg-red-200 px-3 py-1 rounded-lg text-red-700 mt-2'>
                {tag}
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50'>
                    <div className='bg-white p-5 rounded-lg w-96 shadow-lg'>
                        <h2 className='text-xl font-bold mb-4'>Update Note</h2>
                        <input 
                            type='text' 
                            value={updatedTitle} 
                            onChange={(e) => setUpdatedTitle(e.target.value)} 
                            className='w-full p-2 border rounded mb-2' 
                            placeholder='Title'
                        />
                        <textarea 
                            value={updatedDescription} 
                            onChange={(e) => setUpdatedDescription(e.target.value)} 
                            className='w-full p-2 border rounded mb-2' 
                            placeholder='Description'
                        ></textarea>
                        <input 
                            type='text' 
                            value={updatedTag} 
                            onChange={(e) => setUpdatedTag(e.target.value)} 
                            className='w-full p-2 border rounded mb-2' 
                            placeholder='Tag'
                        />
                        <div className='flex justify-end gap-2'>
                            <button 
                                className='bg-red-500 text-white px-4 py-2 rounded' 
                                onClick={() => setIsModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button 
                                className='bg-green-500 text-white px-4 py-2 rounded' 
                                onClick={handleUpdateNote}
                            >
                                Update
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NoteItem;
