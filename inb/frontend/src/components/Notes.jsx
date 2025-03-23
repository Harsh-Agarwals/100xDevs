import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import NotesOnLogin from './NotesOnLogin'

const Notes = () => {
    const navigate = useNavigate();
    const token = sessionStorage.getItem("accessToken") || undefined;
    console.log(token);

    useEffect(() => {
        if (!token) navigate("/login");
    }, []);

    return (
        <div className=' py-12'>
            <NotesOnLogin />
        </div>
    )
}

export default Notes
