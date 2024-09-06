import React from 'react'

export default function PasswordStrengthMeter({password}) {
    const getStrength = (password) => {
        let strength = 0;
            if (password.length >= 8) strength++;
            if ((password.match(/[a-z]/)) && (password.match(/[A-Z]/))) strength++;
            if (password.match(/\d/)) strength++;
            if (password.match(/[^a-zA-Z\d]/)) strength++;
            return strength;
        }
    const colorCode = (strength) => {
        if (strength == 0) return "bg-red-500";
        if (strength == 1) return "bg-red-400";
        if (strength == 2) return "bg-yellow-500";
        if (strength == 3) return "bg-yellow-400";
        return "bg-green-500";
    }

    const strengthText = (strength) => {
        if (strength == 0) return "Very Weak";
        if (strength == 1) return "Weak";
        if (strength == 2) return "Fair";
        if (strength == 3) return "Good";
        return "Strong";
    }
    
    let strength = getStrength(password);
    let color = colorCode(strength);
    let text = strengthText(strength);
    
    return (
        <div>
        </div>
    )
}
