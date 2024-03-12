import { ChangeEvent, FormEvent, useState } from 'react'
import { INotification, SetState } from '../../types'
import Modal from '../../components/UI/Modal'
import Button, { CloseButton } from '../../components/UI/Button'
import Input, { TextArea } from '../../components/UI/Input'
import API from '../../axios'
import { useDispatch } from 'react-redux'
import { NotifActions } from '../../redux/slices/notification'
import { useSucces } from '../../hooks/useSucces'
import ErrorField from '../../components/UI/ErrorField'
import Loading from '../../components/UI/Loading'
import NotImage from '../../components/NotImage'

interface ICreateProps {
    setClose: SetState<INotification | null>,
    element: INotification,
    setData: SetState<INotification>
}

export default function Update({ setClose, element, setData }: ICreateProps) {
    const [update, setUpdate] = useState({ ...element })
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [, setSucces] = useSucces()
    const [error, setError] = useState('')
    const [images, setImages] = useState<any>()
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let key = e.target.name
        let value = e.target.value
        setUpdate(prev => ({ ...prev, [key]: value }))
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        let formData = new FormData(e.target as HTMLFormElement)
        if (!images) {
            formData.delete('image')
        }
        const response = API.put(`/notification/${element.id}/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        response
            .then(res => {
                dispatch(NotifActions.setUpdate(res.data) as any)
                setSucces(true)
                setClose(null)
                setData(res.data)
            }).catch(() => {
                setError('Не удалось изменить! Проверьте заполненные данные или сеть!')
            }).finally(() => {
                setLoading(false)
            })
    }
    return (
        <Modal handleClose={() => setClose(null)}>
            {
                error && <ErrorField setError={setError} text={error} />
            }
            {
                loading && <Loading />
            }
            <form onSubmit={handleSubmit} className='single'>
                <div>
                    <div className="head">
                        <h2>Изменение уведомление</h2>
                        <nav>
                            <Button >Добавить</Button>
                            <CloseButton type='button' onClick={() => setClose(null)} />
                        </nav>
                    </div>
                    <div className="form">
                        <div>
                            <p><span>Название</span></p>
                            <Input value={update.name} onChange={handleChange} name='name' required placeholder='Название' />
                        </div>
                    </div>
                    <div className=" body_content">
                        <TextArea value={update.content} onChange={handleChange} required name='content' placeholder='Контекст'></TextArea>
                        <label className=' img' htmlFor="image">
                            <input name='image' id='image' style={{ display: 'none' }} onChange={(e) => {
                                if (e.target.files) {
                                    setImages(e.target.files[0] as any)
                                }
                            }} accept='image/*' type="file" />
                            {
                                images ? <img src={URL.createObjectURL(images)} alt="New News Img" /> : update.image ? <img src={update.image} alt='Image' /> : <NotImage />
                            }
                        </label>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
