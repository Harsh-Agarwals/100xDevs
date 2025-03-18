import { useState, useEffect } from 'react';
import NoteContext from './NoteContext';
import axios from 'axios';

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST

const NoteState = (props) => {
    const host = `http://localhost:${BACKEND_HOST}`;
    const [ notes, setNotes ] = useState([]);

    const getAuthHeaders = () => {
        const token = localStorage.getItem('token');
        return token ? { 'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnNoQWc4MTEyIiwiaWF0IjoxNzQyMzMxMTczLCJleHAiOjE3NDIzMzE3NzN9.XY77_QojXCipD4Fr0Luuocf12nvQ8ptlmATlEnfvrxA` } : {};
    }

    const getNotes = async () => {
        try {
            const url = `${host}/api/notes/get-notes`;
            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnNoQWc4MTEyIiwiaWF0IjoxNzQyMzMxMTczLCJleHAiOjE3NDIzMzE3NzN9.XY77_QojXCipD4Fr0Luuocf12nvQ8ptlmATlEnfvrxA`
                }
            });
            if (response.data.success) {
                console.log(response.data.message);
                setNotes(response.data.notes);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }

    useEffect(() => {
        getNotes();
    }, [setNotes]);

    const addNote = async ({title, description, tag}) => {
        try {
            let note = {'title': title, 'description': description, 'tag': tag};
            const url = `${host}/api/notes/create`;
            const response = await axios.post(url, note, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnNoQWc4MTEyIiwiaWF0IjoxNzQyMzMxMTczLCJleHAiOjE3NDIzMzE3NzN9.XY77_QojXCipD4Fr0Luuocf12nvQ8ptlmATlEnfvrxA`
                }
            });
            if (response.data.success) {
                console.log(response.data.message);
                getNotes();
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error adding notes:', error);
        }
    };

    const deleteNote = async (id) => {
        try {
            const url = `${host}/api/notes/delete/${id}`;
            const response = await axios.delete(url, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnNoQWc4MTEyIiwiaWF0IjoxNzQyMzMxMTczLCJleHAiOjE3NDIzMzE3NzN9.XY77_QojXCipD4Fr0Luuocf12nvQ8ptlmATlEnfvrxA`
                }
            });
            if (response.data.success) {
                console.log(response.data.message);
                setNotes(notes.filter((note) => note._id != id));
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const updateNote = async (id, title, description, tag) => {
        try {
            const url = `${host}/api/notes/update/${id}`;
            const response = await axios.put(url, { title, description, tag }, {
                headers: {
                    'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnNoQWc4MTEyIiwiaWF0IjoxNzQyMzMxMTczLCJleHAiOjE3NDIzMzE3NzN9.XY77_QojXCipD4Fr0Luuocf12nvQ8ptlmATlEnfvrxA`
                }
            });
            if (response.data.success) {
                console.log(response.data.message);
                getNotes();
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };
    
    return (
        <NoteContext.Provider value={{notes, setNotes, addNote, deleteNote, updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;