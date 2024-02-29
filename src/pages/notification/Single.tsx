import { useState } from 'react'
import Modal from '../../components/UI/Modal'
import { INotification, SetState } from '../../types'
import Button, { CloseButton } from '../../components/UI/Button'
import NotImage from '../../components/NotImage'
import Update from './Update'
import API from '../../axios'
import { useDispatch } from 'react-redux'
import { NotifActions } from '../../redux/slices/notification'
import { useSucces } from '../../hooks/useSucces'
import Loading from '../../components/UI/Loading'
import ErrorField from '../../components/UI/ErrorField'
import Confirm from '../../components/UI/Confirm'

interface ISingleProps {
    element: INotification,
    setClose: SetState<INotification | null>
}

export default function
    ({ element, setClose }: ISingleProps) {
    const [myData, setMyData] = useState({ ...element })
    const dispatch = useDispatch()
    const [, setSucces] = useSucces()
    const [update, setUpdate] = useState<INotification | null>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const handleDelete = () => {
        setLoading(true)
        const response = API.delete(`/notification/${element.id}/`)
        response
            .then(() => {
                dispatch(NotifActions.setDelete(element))
                setSucces(true)
                setClose(null)
            })
            .catch(() => {
                setError('Не удалось удалить данные!')
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <Modal handleClose={() => setClose(null)}>
            {
                update && <Update element={update} setClose={setUpdate} setData={setMyData} />
            }
            {
                loading && <Loading />
            }
            {
                error && <ErrorField text={error} setError={setError} />
            }
            {
                deleted && <Confirm callBack={handleDelete} setState={setDeleted} />
            }
            <div className='single'>
                <div>
                    <div className="head">
                        <h2>Уведомление</h2>
                        <nav>
                            <Button onClick={() => setDeleted(true)}>
                                Удалить
                            </Button>
                            <Button onClick={() => setUpdate(myData)}>
                                Изменить
                            </Button>
                            <CloseButton onClick={() => setClose(null)} />
                        </nav>
                    </div>
                    <div className="form body">
                        <div>
                            <p><span>Название</span></p>
                            <h3>{myData.name}</h3>
                        </div>
                        <div className='body_content'>
                            <div className='form'>
                                <p><span>Контекст</span></p>
                                <h3>{myData.content}</h3>
                            </div>
                            {
                                myData.image ? <img src={myData.image} alt='Image' /> : <NotImage />
                            }
                        </div>
                    </div>

                </div>
            </div>
        </Modal>

    )
}
