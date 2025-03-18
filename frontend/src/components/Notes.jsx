import React, { useContext, useEffect } from 'react'
import NoteContext from '../context/NoteContext'
import NoteItem from './NoteItem';
import AddNote from './AddNote';

const Notes = () => {
    const noteContext = useContext(NoteContext);
    const { notes, setNotes } = noteContext;

    return (
        <div className=' py-12'>
            <AddNote />
            <h2 className=' px-20 font-bold text-3xl pb-4 underline text-teal-700'>My Notes</h2>
            <div className=' flex flex-wrap flex-row mx-12'>
                {notes.map(note => {
                    return <NoteItem props={note} key={note._id || Math.random()} />
                })}
            </div>
        </div>
    )
}

export default Notes
