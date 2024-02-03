import { FormEvent, useState } from 'react'
import Modal from '../../components/UI/Modal'
import '../../styles/Auth_style.scss'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import { useDispatch, useSelector } from 'react-redux'
// import { FetchLogin } from '../../redux/slice/auth'

import { Navigate } from 'react-router-dom'
import Loading from '../../components/UI/Loading'


export default function index() {
    const dispatch = useDispatch()
    const [view, setView] = useState(false)
    const user = useSelector((state: any) => state.user)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formData = new FormData(e.target as HTMLFormElement)
        let data = Object.fromEntries(formData.entries())
        // dispatch(FetchLogin(data as any) as any)
        let res = e.target as HTMLFormElement
        res.reset()
    }

    if (user?.data) {
        return (
            <Navigate to={'/'} />
        )
    }

    return (
        <Modal>
            {
                user?.loading ? <Loading /> : null
            }
            <div className='registration_form'>
                <form onSubmit={handleSubmit} action="">
                    <h1>Авторизация</h1>
                    {
                        user?.error ? <h3 className='error'>{user?.error}</h3> : null
                    }
                    <div>
                        <h3>Логин:</h3>
                        <Input placeholder='Иван' required name='username' />
                    </div>
                    <div>
                        <h3>Пароль:</h3>
                        <Input placeholder='qwerty123' required type={view ? 'text' : 'password'} name='password' />
                    </div>

                    <Button disabled={user?.loading} type='submit'>Вход</Button>
                </form>
            </div>
        </Modal>

    )
}
