import { ReactNode, SetStateAction } from 'react'
import '../../styles/modal_style.scss'

export default function Modal({ children, handleClose }: { children: ReactNode, handleClose?: React.Dispatch<SetStateAction<any>> }) {

    return (
        <div onClick={handleClose} className='modal'>
            <div onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    )
}
