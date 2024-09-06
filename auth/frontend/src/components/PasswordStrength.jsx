import React from 'react'
import zxcvbn from 'zxcvbn';
import InputComponent from './InputComponent';
import {KeyRound} from 'lucide-react'
import PasswordStrengthMeter from './PasswordStrengthMeter';

export default function PasswordStrength({value, onChange}) {
    const strength = zxcvbn(value);
    const num = strength.score*100/4;
    // const [pwd, setPwd] = useState('');

    const createPasswordLabel = () => {
        switch(strength.score) {
            case 0:
                return 'Very Weak';
            case 1:
                return 'Weak';
            case 2:
                return 'Fair';
            case 3:
                return 'Good';
            case 4:
                return 'Strong';
            default:
                return '';
        }
    }

    return (
        <div className='password-input-container'>
            <InputComponent icon={KeyRound} type="password" name="userPwd" id="userPwd" placeholder="Password" value={value} onChange={onChange} />
            {/* <div className='password-strength'>
                <div className='strength-bar' style={{width: `${num}%`}}></div>
                <p className='strength-text'>{createPasswordLabel()}</p>
            </div> */}
            <PasswordStrengthMeter password={value} />
        </div>
    )
}
