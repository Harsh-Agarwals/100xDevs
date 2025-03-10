import { useEffect, useRef, useState } from "react";

// Create a component with a text input field and a button. When the component mounts or the button is clicked, automatically focus the text input field using useRef.

export function Assignment6() {
    const [inp, setInp] = useState("");
    const refernce = useRef()
    useEffect(() => {
        refernce.current.focus();
    }, []);

    const handleButtonClick = (e) => {
        e.preventDefault();
        setInp("");
        // document.getElementById("inputText").focus();
        refernce.current.focus();
    };

    return (
        <div>
            <input type="text" id="inputText" placeholder="Enter text here" onChange={e => setInp(e.target.value)} value={inp} ref={refernce} />
            <button onClick={handleButtonClick}>Focus Input</button>
        </div>
    );
};