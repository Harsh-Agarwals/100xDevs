"use client";

import React from "react";

export default function Button() {
    function btnClick(e: React.SyntheticEvent) {
        e.preventDefault();
        console.log(e.target);        
    }

    return (
        <div>
            <button type="button" className="mt-8 w-full text-white bg-gray-800 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2" onClick={btnClick}>Sign in</button>
        </div>
    )
}