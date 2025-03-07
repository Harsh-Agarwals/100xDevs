import { useState } from 'react';
import NoteContext from './NoteContext';

const NoteState = (props) => {

    const initialNotes = [{
        "_id":"67c83bfc37e53f74a1df8f47",
        "title":"A second chance",
        "description":"Notes on principles",
        "tag":"spiritual",
        "userId":"67c83a5737e53f74a1df8f40",
        "createdAt":"1741175804480",
        "updatedAt":"1741175804480",
        "__v":"0"
    }, {
        "_id":"67c83bfc37e53f74a1df8f48",
        "title":"A second chance 2.0",
        "description":"Notes on principles of second chance",
        "tag":"philosophy",
        "userId":"67c83a5737e53f74a1df8f40",
        "createdAt":"1741175804480",
        "updatedAt":"1741175804480",
        "__v":"0"
    }, {
        "_id":"67c83bfc37e53f74a1df8f49",
        "title":"A second chance 3.4",
        "description":"Notes on principles",
        "tag":"spiritual",
        "userId":"67c83a5737e53f74a1df8f40",
        "createdAt":"1741175804480",
        "updatedAt":"1741175804480",
        "__v":"0"
    }, {
        "_id":"67c83bfc37e53f74a1df8f50",
        "title":"A second chance chance chance chance 3.0",
        "description":"Notes on principles of second chance",
        "tag":"philosophy",
        "userId":"67c83a5737e53f74a1df8f40",
        "createdAt":"1741175804480",
        "updatedAt":"1741175804480",
        "__v":"0"
    }];
    const [ notes, setNotes ] = useState(initialNotes);
    
    return (
        <NoteContext.Provider value={{notes, setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;