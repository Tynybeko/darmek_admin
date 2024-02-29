import { useEffect, useMemo, useState } from 'react'
import { IUser } from '../../types'
import '../../styles/My_Single.style.scss'
import Button from '../../components/UI/Button'
import NotImage from '../../components/NotImage'
import BonusCard from '../../components/BonusCard'
// import Update from './Update'
import { useNavigate, useParams } from 'react-router-dom'
import API from '../../axios'
import Loading from '../../components/UI/Loading'
import ErrorField from '../../components/UI/ErrorField'
import Confirm from '../../components/UI/Confirm'
import { useSucces } from '../../hooks/useSucces'




export default function Single() {
    const navigate = useNavigate()
    const { userId } = useParams()
    const [, setSucces] = useSucces()
    const [deleted, setDeleted] = useState<IUser | null>(null)
    const [element, setElement] = useState<IUser | null>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (userId) {
            setLoading(true)
            const response = API.get(`/users/${userId}`)
            response
                .then(({ data }) => {
                    setElement(data)
                })
                .catch(() => {
                    setError('Не удалось получить данные!')
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }, [])

    const userELement = useMemo(() => {
        if (element) {
            let data = { ...element }
            for (let key in data) {
                if (key == 'image') continue;
                if (!data[key]) {
                    data[key] = 'Не указано'
                }
            }
            return data
        }
    }, [element])

    // const [update, setUpdate] = useState<NullLable<IUser>>(null)
    const handleDelete = () => {
        if (!deleted) return
        setLoading(true)
        const response = API.delete(`/users/${deleted.id}`)
        response
            .then(() => {
                setSucces(true)
                navigate(-1)
            })
            .catch(() => {
                setError('Не удалось удалить!')
            })
            .finally(() => {
                setLoading(false)
                setDeleted(null)
            })
    }


    return (
        <div className='user_single'>
            {/* {
                update && <Update element={update} setClose={setUpdate} />
            } */}
            {
                loading && <Loading />
            }
            {
                error && <ErrorField text={error} setError={setError} />
            }
            {
                deleted && <Confirm setState={setDeleted} callBack={handleDelete} />
            }
            <section className='single'>
                <div className='user'>
                    <div className="head sel-no">
                        <h2>Пользователь</h2>
                        <nav>
                            <Button onClick={() => setDeleted(element)}>
                                Удалить
                            </Button>
                            {/* <Button onClick={() => setUpdate(element)}>
                                Изменить
                            </Button> */}
                            <Button onClick={() => navigate(-1)}>
                                Назад
                            </Button>
                        </nav>
                    </div>
                    {
                        userELement ? <div className='user_body body'>
                            <div className='grid'>
                                <div className='text-field'>
                                    <p>ФИО:</p>
                                    <h3>{userELement.full_name}</h3>
                                </div>
                                <div className='text-field'>
                                    <p>Номер:</p>
                                    <h3>{userELement.phone}</h3>
                                </div>
                                <div className='text-field'>
                                    <p>Email:</p>
                                    <h3>{userELement.email}</h3>
                                </div>
                                <div className='text-field'>
                                    <p>Дата рождение:</p>
                                    <h3>{userELement.date_of_birth}</h3>
                                </div>
                                <div className='text-field'>
                                    <p>Город:</p>
                                    <h3>{userELement.city}</h3>
                                </div>
                                <div className='text-field'>
                                    <p>Статус:</p>
                                    <h3>{userELement.role}</h3>
                                </div>
                                <div className='text-field'>
                                    <p>Семейное положение:</p>
                                    <h3>{userELement.marital_status}</h3>
                                </div>
                                <div className='text-field'>
                                    <p>Пол:</p>
                                    <h3>{userELement.gender}</h3>
                                </div>
                            </div>
                            <div className='body_content'>
                                {
                                    userELement.image ?
                                        <img src={userELement.image} alt="Avatar" />
                                        :
                                        <NotImage />
                                }
                                <BonusCard id={userELement.id} />
                            </div>
                        </div>
                            : null
                    }
                </div>
            </section>
        </div>

    )
}
