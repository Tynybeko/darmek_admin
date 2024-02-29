import { useState } from 'react'
import Modal from '../../../components/UI/Modal'
import Button, { CloseButton } from '../../../components/UI/Button'
import { INewsCategory, SetState } from '../../../types'
import Input from '../../../components/UI/Input'
import API from '../../../axios'
import { useDispatch } from 'react-redux'
import { NewsCatActions } from '../../../redux/slices/newsCat'
import { useSucces } from '../../../hooks/useSucces'
import Loading from '../../../components/UI/Loading'
interface ISingleProps {
    element: INewsCategory,
    setClose: SetState<INewsCategory | null>
}


export default function Update({ element, setClose }: ISingleProps) {
    const [old, setOld] = useState({ ...element })
    const [, setSucces] = useSucces()
    const dispatch = useDispatch()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const handleSubmit = () => {
        setLoading(true)
        const response = API.put(`/news-categories/${element.id}/`, old)
        response
            .then(res => {
                setClose(null)
                dispatch(NewsCatActions.setUpdate(res.data))
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
        <Modal handleClose={() => setClose(null)}>
            {
                loading && <Loading />
            }
            <div className='single'>
                <div>
                    <div className="head">
                        <h2>Категория новостей</h2>
                        <nav>
                            <Button onClick={handleSubmit}>
                                Сохранить
                            </Button>
                            <CloseButton onClick={() => setClose(null)} />
                        </nav>
                    </div>
                    <div className='body'>
                        <div>
                            <p><span>Название</span></p>
                            <Input type='text' required value={old.name} onChange={(e) => (setOld(prev => ({ ...prev, name: e.target.value })), setError(''))} />
                            <p className='error-text'>{error}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
