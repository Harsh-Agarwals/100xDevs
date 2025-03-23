import { useState, useContext } from 'react';
import NoteContext from './NoteContext';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AlertContext } from './AlertState';

const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST

const NoteState = (props) => {
    const host = `http://localhost:${BACKEND_HOST}`;
    const [ notes, setNotes ] = useState([]);
    const navigate = useNavigate();
    const {style, message, color, alertNow, setStyle, setMessage, setColor, setAlert} = useContext(AlertContext);

    const getAuthHeaders = () => {
        // const token = localStorage.getItem('accessToken');
        const token = sessionStorage.getItem("accessToken")
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImhhcnNoQWc4MTEyIiwiaWF0IjoxNzQyMzUwMTE0LCJleHAiOjE3NDIzNTA3MTR9.oqVGX88-FdW8KMyozh2VdyorBteYX9MMSPC0ydMvDxQ"
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }

    const refreshAccessToken = async () => {
        try {
            const url = `${host}/api/auth/refresh`;
            const response = await axios.post(url, {
                headers: getAuthHeaders(),
                withCredentials: true
            });
            if (response.data.success) {
                sessionStorage.setItem("accessToken", response.data.accessToken);
                return response.data.accessToken;
            } else {
                console.log("Session expired, please login again");
            }
        } catch (error) {
            console.log(`Error in refresh token: ${error}`);
        }
    }

    const getNotes = async () => {
        try {
            const url = `${host}/api/notes/get-notes`;
            const response = await axios.get(url, {
                headers: getAuthHeaders(),
                withCredentials: true
            });
            console.log(response);
            
            if (response.data.success) {
                console.log(response.data.message);
                setNotes(response.data.notes);
            } else {
                if (error.response.status == 401) {
                    const token = await refreshAccessToken();
                    if (token) return getNotes();
                }
                console.log(response.data.message);
            }
        } catch (error) {
            if (error.response.data.message == "Error: TokenExpiredError: jwt expired") {
                sessionStorage.removeItem("accessToken");
                await setTimeout(() => {
                    alert("Please login again...");
                    navigate("/login");
                }, 200);
            }
        }
    }

    const addNote = async ({title, description, tag}) => {
        try {
            let note = {'title': title, 'description': description, 'tag': tag};
            const url = `${host}/api/notes/create`;
            const response = await axios.post(url, note, {
                headers: getAuthHeaders(),
                withCredentials: true
            });
            if (response.data.success) {
                console.log(response.data.message);
                setMessage("Note added successfully! 🎉");
                setColor("text-green-700");
                setStyle("bg-green-300");
                setAlert(true);
                console.log(alertNow);
                
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
                headers: getAuthHeaders(),
                withCredentials: true
            });
            if (response.data.success) {
                console.log(response.data.message);
                setNotes(notes.filter((note) => note._id != id));
                setMessage("Note deleted successfully! 🎉");
                setColor("text-red-700");
                setStyle("bg-red-300");
                setAlert(true);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            if (error.response.data.message == "Error: TokenExpiredError: jwt expired") {
                sessionStorage.removeItem("accessToken");
                await setTimeout(() => {
                    alert("Please login again...");
                    navigate("/login");
                }, 200);
            }
        }
    };

    const updateNote = async (id, title, description, tag) => {
        try {
            const url = `${host}/api/notes/update/${id}`;
            const response = await axios.put(url, { title, description, tag }, {
                headers: getAuthHeaders(),
                withCredentials: true
            });
            if (response.data.success) {
                console.log(response.data.message);
                getNotes();
                setMessage("Note updated successfully! 🎉");
                setColor("text-orange-700");
                setStyle("bg-yellow-300");
                setAlert(true);
            } else {
                console.log(response.data.message);
            }
        } catch (error) {
            console.error('Error updating note:', error);
        }
    };
    
    return (
        <NoteContext.Provider value={{notes, setNotes, getNotes, addNote, deleteNote, updateNote}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;