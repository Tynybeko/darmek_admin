import { FormEvent, useState } from 'react'
import Modal from '../../../components/UI/Modal'
import Button, { CloseButton } from '../../../components/UI/Button'
import { SetState } from '../../../types'
import Input from '../../../components/UI/Input'
import API from '../../../axios'
import { useDispatch } from 'react-redux'
import { NewsCatActions } from '../../../redux/slices/newsCat'
import { useSucces } from '../../../hooks/useSucces'
import Loading from '../../../components/UI/Loading'
interface ISingleProps {
    setClose: SetState<boolean>
}


export default function Create({ setClose }: ISingleProps) {
    const [, setSucces] = useSucces()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formData = new FormData(e.target as HTMLFormElement)
        let data = Object.fromEntries(formData.entries())
        setLoading(true)
        const response = API.post(`/news-categories/`, data)
        response
            .then(res => {
                setClose(false)
                dispatch(NewsCatActions.setData(res.data))
                setSucces(true)
            })
            .catch(err => {
                if (err && err.response && err.response.status == 400) {
                    setError('Введите другое название')
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <Modal handleClose={() => setClose(false)}>
            {
                loading && <Loading />
            }
            <form onSubmit={handleSubmit} className='single'>
                <div>
                    <div className="head">
                        <h2>Категория новостей</h2>
                        <nav>
                            <Button type='submit'>
                                Сохранить
                            </Button>
                            <CloseButton type='button' onClick={() => setClose(false)} />
                        </nav>
                    </div>
                    <div className='body'>
                        <div>
                            <p><span>Название</span></p>
                            <Input name='name' type='text' required />
                            <p className='error-text'>{error}</p>
                        </div>
                    </div>
                </div>
            </form>
        </Modal>
    )
}
