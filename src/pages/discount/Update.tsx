import { ChangeEvent, FormEvent, useState } from 'react'
import Modal from '../../components/UI/Modal'
import { IDiscount, SetState } from '../../types'
import Button, { CloseButton } from '../../components/UI/Button'
import Input, { TextArea } from '../../components/UI/Input'
import Select from '../../components/UI/Select'
import NotImage from '../../components/NotImage'
import Loading from '../../components/UI/Loading'
import ErrorField from '../../components/UI/ErrorField'
import API from '../../axios'
import { DiscountActions } from '../../redux/slices/discount'
import { useDispatch } from 'react-redux'
import { useSucces } from '../../hooks/useSucces'


const selectData = [
    {
        id: 1,
        title: 'Активный',
        value: true
    },
    {
        id: 2,
        title: 'Не активный',
        value: false
    },
]

interface ICreateDis {
    setClose: SetState<IDiscount | null>,
    pharm: any,
    element: IDiscount,
    setData: SetState<IDiscount>
}

export default function Update({ setClose, pharm, element, setData }: ICreateDis) {
    const [myImg, setImg] = useState<FileList>()
    const [updatedElement, setUpdatedElement] = useState<IDiscount>({ ...element })
    const [interError, setInterError] = useState('')
    const dispatch = useDispatch()
    const [, setSucces] = useSucces()
    const [error, setError] = useState({
        percentage: '',
        title: '',
        start_date: '',
        end_date: '',
        pharmacy: '',
    })
    const [state, setState] = useState({
        loading: false,
        error: ''
    })


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let key = e.target.name
        let value = e.target.value
        setUpdatedElement(prev => ({ ...prev, [key]: value }))
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        let sendedData: any = {}
        const { img, ...someData } = updatedElement
        e.preventDefault()
        if (myImg) {
            updatedElement.img = myImg[0] as any
            sendedData = { ...updatedElement }
        } else {
            sendedData = someData
        }
         
        setState(prev => ({ ...prev, loading: true }))
        const response = API.put(`/pharmacy/discounts/${updatedElement.id}/`, sendedData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        response
            .then((res) => {
                if (res && res.data) {
                    setSucces(true)
                    dispatch(DiscountActions.setUpdate(res.data))
                    setData(res.data)
                    setClose(null)

                }
            })
            .catch((err) => {
                if (err.response && err.response == 400) {
                    let obj: any = {}
                    for (let [key, item] of Object.entries(err.response.data)) {
                        obj[key] = item
                    }
                    setError(obj)
                } else if (err.response && err.response.status == 500) {
                    setInterError('Ошибка сервера')
                }
            }).finally(() => {
                setState(prev => ({ ...prev, loading: false }))
            })
    }

    return (
        <Modal handleClose={() => setClose(null)}>
            {
                state.loading && <Loading />
            }
            {
                (state.error || interError) && <ErrorField setError={() => (setState(prev => ({ ...prev, error: '' })), setInterError(''))} text={state.error} />
            }
            <form onChange={() => setError({
                percentage: '',
                title: '',
                start_date: '',
                end_date: '',
                pharmacy: '',
            })} onSubmit={(handleSubmit)} className='single'>
                <div>
                    <div className="head">
                        <h2>Изменение скидки</h2>
                        <nav>
                            <Button onClick={() => {
                                let a: any = document.getElementById('pharmacy')
                                if (a) {
                                    if (!a.value) {
                                        setError(prev => ({ ...prev, pharmacy: 'Выберите аптеку' }))
                                    }
                                }
                            }} type='submit'>Сохранить</Button>
                            <CloseButton onClick={() => setClose(null)} type='button' />
                        </nav>
                    </div>
                    <div className="form body grid">
                        <div>
                            <p>Аптека</p>
                            <Input onClick={(e) => {
                                e.preventDefault()
                                setError(prev => ({ ...prev, pharmacy: '' }))
                            }} style={{ display: 'none' }}>
                                <Select defaultValue={pharm.find((el: any) => el.value == updatedElement.pharmacy)} attr={{ required: true, name: 'pharmacy', id: 'pharmacy' }} selectData={pharm} />
                            </Input>
                            <p className='error-text'>{error.pharmacy ?? ''}</p>
                        </div>
                        <div>
                            <p>Статус</p>
                            <Input style={{ display: 'none' }}>
                                <Select attr={{ name: 'is_active', onChange: handleChange }} defaultValue={{ id: 0, value: updatedElement.is_active, title: updatedElement.is_active ? 'Активный' : 'Не активный' }} selectData={selectData}></Select>
                            </Input>
                        </div>
                        <div>
                            <p>Название</p>
                            <Input onChange={handleChange} value={updatedElement.title} required name='title' type='text' />
                            <p className='error-text'>{error.title ?? ''}</p>
                        </div>
                        <div>
                            <p>Процент скидки</p>
                            <Input value={updatedElement.percentage} onChange={handleChange} required name='percentage' type='text' />
                            <p className='error-text'>{error.percentage ?? ''}</p>

                        </div>
                        <div>
                            <p>Дата начала</p>
                            <Input onChange={handleChange} value={updatedElement.start_date} required name='start_date' type='date' />
                            <p className='error-text'>{error.start_date ?? ''}</p>
                        </div>

                        <div>
                            <p>Дата окончание</p>
                            <Input onChange={handleChange} value={updatedElement.end_date} required name='end_date' type='date' />
                            <p className='error-text'>{error.end_date ?? ''}</p>
                        </div>
                    </div>
                    <div className="body_content">
                        <TextArea onChange={handleChange} value={updatedElement.description} placeholder='Описание' name='description'>

                        </TextArea>

                        <label style={{ cursor: 'pointer' }} htmlFor='img'>
                            <input accept='image/*' id='img' onChange={(e) => e.target.files ? setImg(e.target.files) : null} style={{ display: 'none' }} type="file" />
                            {
                                (updatedElement.img && !myImg) ? <img src={updatedElement.img} alt='Img' /> : myImg ? <img src={URL.createObjectURL(myImg[0])} alt="IMG" /> : <NotImage />
                            }
                        </label>

                    </div>
                </div>
            </form>
        </Modal>

    )
}
