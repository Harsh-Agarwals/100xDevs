import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext'
import NoteItem from './NoteItem';

const Notes = () => {
    const noteContext = useContext(NoteContext);
    const { notes, setNotes } = noteContext;

    return (
        <div className=' flex flex-wrap flex-row mx-12'>
            {notes.map(note => {
                return <NoteItem props={note} key={note._id} />
            })}
        </div>
    )
}

export default Notes
