import  { ButtonHTMLAttributes, ReactNode } from 'react'
import Styles from '../../styles/UI.module.scss'



interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
}
export default function Button({ children, ...attr }: ButtonProps) {
    let { className, ...someAttr } = attr

    return (
        <button className={`${Styles['btn-action']} ${className}`} {...someAttr}>{children}</button>
    )
}
