import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import Styles from '../../styles/UI.module.scss'



interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children?: ReactNode;
}
export default function Button({ children, ...attr }: ButtonProps) {
    let { className, ...someAttr } = attr

    return (
        <button className={`${Styles['btn-action']} ${className}`} {...someAttr}>{children}</button>
    )
}



export const CloseButton: React.FC<ButtonProps> = ({ children, ...attr }) => {
    let { className, ...someAttr } = attr

    return (
        <button className={`${Styles['btn-action']} ${className}`} {...someAttr}><svg className="sel-no feather feather-x" fill="none" height="24" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
            <line x1="18" x2="6" y1="6" y2="18" />
            <line x1="6" x2="18" y1="6" y2="18" />
        </svg></button> 
    )
}

