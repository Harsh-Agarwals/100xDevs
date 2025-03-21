import React, { useContext, useEffect } from 'react'
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import NoteContext from '../context/NoteContext'

const NotesOnLogin = () => {
    const noteContext = useContext(NoteContext);
    const { notes, setNotes, getNotes } = noteContext;

    useEffect(() => {
        const token = sessionStorage.getItem("accessToken") || undefined;
        console.log(`Token: ${token}`);
        
        if (!token) return;
        getNotes();
    }, [sessionStorage.getItem("accessToken")])

  return (
    <div>
        <AddNote />
        <h2 className=' px-20 font-bold text-3xl pb-4 underline text-teal-700'>My Notes</h2>
        {
            notes.length == 0 ? 
            (<h1 className=" px-20 font-semibold tracking-wide text-sky-400">No notes available</h1>) : (
                <div className=' flex flex-wrap flex-row mx-12'>
                    {notes.map(note => {
                        return <NoteItem props={note} key={note._id || Math.random()} />
                    })}
                </div>
            )
        }
    </div>
  )
}

export default NotesOnLogin
