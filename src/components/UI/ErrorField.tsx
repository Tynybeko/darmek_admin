import React, { SetStateAction } from 'react'
import Modal from '../Modal'
import Styles from '../../styles/UI.module.scss'

export default function ErrorField({ text, setError }: { text?: string, setError: React.Dispatch<SetStateAction<string>> }) {
    return (
        <Modal>
            <section className={Styles['confirm_modal'] + ' sel-no'}>
                <div>
                    <svg className="feather feather-frown" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" /><path d="M16 16s-1.5-2-4-2-4 2-4 2" /><line x1="9" x2="9.01" y1="9" y2="9" /><line x1="15" x2="15.01" y1="9" y2="9" /></svg>
                    <h1>{text ?? 'Что то пошло не так!'}</h1>
                </div>
                <nav>
                    <button onClick={() => setError('')} className='cancel'>
                        Закрыть
                    </button>
                </nav>
            </section>
        </Modal>
    )
}
