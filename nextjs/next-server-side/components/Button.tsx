"use client";

export default function Button() {
    function btnClick(e: any) {
        e.preventDefault();
        console.log(e);        
    }
    return (
        <div>
            <button onClick={btnClick}>Sign In</button>
        </div>
    )
}