import { InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import Styles from '../../styles/UI.module.scss'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
}

export default function Input({ children, ...attr }: InputProps) {
    const [view, setView] = useState(false)
    const { type, ...someAttr } = attr
    
    const [myType, setType] = useState(type)

    useEffect(() => {
        if (myType == 'password') {
            setType('text')
        } else {
            setType('password')
        }
    }, [view])


    return (
        <label className={Styles["input--field"]}>
            <input   {...someAttr} type={myType} />
            {
                type && type == 'password' ?
                    <button type='button'>
                        {
                            view ?
                                <svg onClick={() => setView(prev => !prev)} className="feather feather-eye" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                :
                                <svg onClick={() => setView(prev => !prev)} className="feather feather-eye-off" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" x2="23" y1="1" y2="23" /></svg>
                        }
                    </button>
                    : null
            }
            {children}
        </label>
    );
}
