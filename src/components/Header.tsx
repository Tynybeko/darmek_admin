import '../../styles/header_style.scss'
import Button from './UI/Button'
import { useDispatch } from 'react-redux'
// import { logout } from '../../redux/slice/auth'
import { useState } from 'react'
import Confirm from './UI/Confirm'
import { Link } from 'react-router-dom'
import { useSucces } from '../hooks/useSucces'
import SuccesField from './UI/SuccesField'


export default function index() {
    // const dispatch = useDispatch()
    const [succes] = useSucces()
    const [isConf, setConf] = useState(false)
    const handleClick = () => {
        // dispatch(logout())
    }
    return (
        <header className='header'>
            {
                isConf ?
                    <Confirm text='Действительно ли хотите выйти?' callBack={handleClick} setState={setConf} />
                    : null
            }
            <div className='header-logo'>
                <Link to={'/'}>
                    <img className='sel-no' src="/logo.svg" alt="Logo" />
                </Link>
            </div>
            <div className='header-body'>
                <h1 className="header-logo_title sel-no">Админка</h1>
                <div className='header-body-nav sel-no '>
                    <Link to={'profile'} className='btn-action'>Профиль</Link>
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
