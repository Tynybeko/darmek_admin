import '../styles/header_style.scss'
import Button from './UI/Button'
import { useDispatch, } from 'react-redux'
import { FetchMyUser, logout } from '../redux/slices/auth'
import { useCallback, useEffect, useState } from 'react'
import Confirm from './UI/Confirm'
import { Link, Navigate } from 'react-router-dom'
import { useSucces } from '../hooks/useSucces'
import SuccesField from './UI/SuccesField'


export default function index() {
    const dispatch = useDispatch()
    const [isAuth, setAuth] = useState(true)
    const [succes] = useSucces()
    const [isConf, setConf] = useState(false)
    const handleClick = useCallback(() => {
        dispatch(logout())
        setAuth(false)
    }, [isAuth])
    if (!isAuth) {
        return <Navigate to={'/auth'} />
    }
    useEffect(() => {
        dispatch(FetchMyUser() as any)
    }, [])
    return (
        <header className='header'>
            {
                isConf ?
                    <Confirm text='Действительно ли хотите выйти?' callBack={handleClick} setState={setConf} />
                    : null
            }
            <div className='header-logo'>
                <Link to={'/'}>
                    <h1>ДАРМЕК</h1>
                    <svg width="9.455078" height="10.193481" viewBox="0 0 9.45508 10.1935" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">

                        <defs />
                        <path id="Vector" d="M0 10.144C4.77148 10.2858 9.43555 10.4816 9.45508 5.12781C9.47461 -0.853882 3.17383 -0.0100098 0.0449219 0.104736L0 10.144ZM6.02148 1.40784C9.2207 3.48047 9.68359 9.5094 2.70312 8.89502C3.82617 8.26709 9.01172 6.89661 6.02148 1.40784Z" fill="#E3000F" fill-opacity="1.000000" fill-rule="evenodd" />
                        <path id="Vector" d="M6.02148 1.40784C9.01172 6.89661 3.82617 8.26038 2.70312 8.89502C9.68359 9.5094 9.2207 3.48047 6.02148 1.40784Z" fill="#FFFFFF" fill-opacity="1.000000" fill-rule="evenodd" />
                    </svg>

                </Link>
            </div>
            <div className='header-body'>
                <h1 className="header-logo_title sel-no"></h1>
                <div className='header-body-nav sel-no '>
                    <Link to={'/profile'}>
                        <Button>
                            Профиль
                        </Button>
                    </Link>

                    <Button onClick={() => setConf(true)} className='sel-no'>
                        Выход</Button>
                </div>

            </div>
            {
                succes ? <SuccesField /> : null
            }
        </header>
    )
}
