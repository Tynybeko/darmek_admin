import { useEffect } from 'react'
import Styles from '../../styles/UI.module.scss'
import { useSucces } from '../../hooks/useSucces'

export default function SuccesField() {
    const [, setSucces] = useSucces()
    useEffect(() => {
        const TimerId = setTimeout(() => {
            setSucces(prev => !prev)
        }, 2300)

        return () => clearTimeout(TimerId)
    }, [])
    return (
        <section className={Styles['succes-field'] + ' sel-no'}>
            <div>
                <div>
                    <svg type='succes' className="feather feather-check-circle" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" /></svg>
                    <h1>{'Успешно!'}</h1>
                </div>
            </div>

        </section>
    )
}
