"use client";

import Button from "./Button";

interface LabelledBox {
    label: string,
    placeholder: string,
    type?: string,
}

const LabelledBox = ({ label, placeholder, type }: LabelledBox) => {
    return (
        <div>
            <label className="block mb-2 text-sm text-black font-semibold pt-4">{label}</label>
            <input type={type || "text"} placeholder={placeholder} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" />
        </div>
    )
}

export default function SignIn() {
    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <a href="#" className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 ">
                <div className="px-10">
                    <div className="text-3xl font-extrabold">
                        Sign in
                    </div>
                </div>
                <div>
                    <LabelledBox label="Username" placeholder="Email" />
                    <LabelledBox label="Password" placeholder="Password" type="password" />
                    <Button />
                </div>
                </a>
            </div>
        </div>
    )
}