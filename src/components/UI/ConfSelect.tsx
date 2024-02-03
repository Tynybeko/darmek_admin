import React, { SetStateAction } from 'react'
import '../../styles/configurate_select_style.scss'


interface ConfsState {
    element: any,
    setClose: React.Dispatch<SetStateAction<null | any>>,
    setView: React.Dispatch<SetStateAction<null | any>>,
    setDeleted: React.Dispatch<SetStateAction<null | any>>,
    setUpdated: React.Dispatch<SetStateAction<null | any>>,
}


const ConfSelect: React.FC<ConfsState> = ({ setClose, setView, element, setDeleted, setUpdated }) => {



    return (
        <div onClick={() => setClose(null)} onMouseLeave={() => setClose(null)} className='configurate_select'>
            <ul >
                <li onClick={() => setView(element)}>Посмотреть
                    <svg className="feather feather-eye" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                </li>
                <li onClick={() => setUpdated(element)}>Изменить
                    <svg className="feather feather-edit" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" /></svg></li>
                <li onClick={() => setDeleted(element)} className='red'>Удалить
                    <svg className="feather feather-trash-2" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg></li>
            </ul>
        </div>
    )
}


export default ConfSelect