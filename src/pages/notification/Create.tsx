import { FormEvent, useState } from 'react'
import { SetState } from '../../types'
import Modal from '../../components/UI/Modal'
import Button, { CloseButton } from '../../components/UI/Button'
import Input, { TextArea } from '../../components/UI/Input'
import API from '../../axios'
import { useDispatch } from 'react-redux'
import { NotifActions } from '../../redux/slices/notification'
import { useSucces } from '../../hooks/useSucces'
import ErrorField from '../../components/UI/ErrorField'
import Loading from '../../components/UI/Loading'

interface ICreateProps {
    setClose: SetState<boolean>
}

export default function Create({ setClose }: ICreateProps) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [, setSucces] = useSucces()
    const [error, setError] = useState('')
    const [images, setImages] = useState<any>()
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        let formData = new FormData(e.target as HTMLFormElement)
        const response = API.post(`/notification/`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        response
            .then(res => {
                dispatch(NotifActions.setData(res.data) as any)
                setSucces(true)
                setClose(false)
            }).catch(() => {
                setError('Не удалось создать! Проверьте заполненные данные или сеть!')
            }).finally(() => {
                setLoading(false)
            })
    }
    return (
        <Modal handleClose={() => setClose(false)}>
            {
                error && <ErrorField setError={setError} text={error} />
            }
            {
                loading && <Loading />
            }
            <form onSubmit={handleSubmit} className='single'>
                <div>
                    <div className="head">
                        <h2>Создать уведомление</h2>
                        <nav>
                            <Button >Добавить</Button>
                            <CloseButton type='button' onClick={() => setClose(false)} />
                        </nav>
                    </div>
                    <div className="form">
                        <div>
                            <p><span>Название</span></p>
                            <Input name='name' required placeholder='Название' />
                        </div>
                    </div>
                    <div className=" body_content">
                        <TextArea required name='content' placeholder='Контекст'></TextArea>
                        <label className='image-adder img' htmlFor="image">
                            <input name='image' id='image' style={{ display: 'none' }} onChange={(e) => {
                                if (e.target.files) {
                                    setImages(e.target.files[0] as any)
                                }
                            }} accept='image/*' type="file" />
                            {
                                images ? <img src={URL.createObjectURL(images)} alt="New News Img" /> : '+'
                            }
                        </label>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
