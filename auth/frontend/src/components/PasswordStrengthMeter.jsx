import React from 'react'
import {Check, X} from 'lucide-react'

const PasswordCriteria = ({password}) => {
    
    const criteria = [
        {label:'Password length greater than 8', met: password.length >= 8},
        {label:'Contains UPPER case', met: /[A-Z]/.test(password)},
        {label:'Contains lower case', met: /[a-z]/.test(password)},
        {label:'Contains number', met: /\d/.test(password)},
        {label:'Contains special characters', met: /[^a-zA-Z\d]/.test(password)}
    ]
    return (
        <div className='mt-4'>
            {criteria.map((item) => (
                <div key={item.label} className='flex text-xs my-[2px]'>
                    {
                        item.met? <Check className=' text-green-600 size-4 mr-2' /> : <X className=' text-red-400 size-4 mr-2' />
                    }
                    <span className={item.met? 'text-green-600': 'text-gray-400'}>{item.label}</span>
                </div>
            ))}
        </div>
    )
}

export default function PasswordStrengthMeter({password}) {
    const getStrength = (pass) => {
        let strength = 0;
        if (pass.length >= 8) strength++;
        if (pass.match(/[a-z]/) && pass.match(/[A-Z]/)) strength++;
        if (pass.match(/\d/)) strength++;
        if (pass.match(/[^a-zA-Z\d]/)) strength++;
        return strength;
    }
    const colorCode = (strength) => {
        if (strength === 0) return "bg-red-500";
        if (strength === 1) return "bg-red-400";
        if (strength === 2) return "bg-yellow-500";
        if (strength === 3) return "bg-yellow-400";
        return "bg-green-500";
    }

    const strengthText = (strength) => {
        if (strength === 0) return "Very Weak";
        if (strength === 1) return "Weak";
        if (strength === 2) return "Fair";
        if (strength === 3) return "Good";
        return "Strong";
    }
    
    let strength = getStrength(password);
    let color = colorCode(strength);
    let text = strengthText(strength);

    return (
        <div className='mt-2'>
            <div className=' flex justify-between items-center'>
                <span className='text-xs text-gray-400'>Password Strength</span>
                <span className='text-xs text-gray-400'>{text}</span>
            </div>
            <div className='flex space-x-1 mt-2'>
                {[...Array(4)].map((_, index) => (
                    <div key={index} className={`h-1 w-1/4 rounded-full ${index < strength ? color : 'bg-gray-600'}`} />
                ))}
            </div>
            <PasswordCriteria password={password} />
        </div>
    )
}
