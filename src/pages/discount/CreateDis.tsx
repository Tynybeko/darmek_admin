import { FormEvent, useState } from 'react'
import Modal from '../../components/UI/Modal'
import { SetState } from '../../types'
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


interface ICreateDis {
    setClose: SetState<boolean>,
    pharm: any
}

export default function CreateDis({ setClose, pharm }: ICreateDis) {
    const [myImg, setImg] = useState<FileList>()
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
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

        e.preventDefault()
        let formData = new FormData(e.target as HTMLFormElement)
        let data: any = Object.fromEntries(formData.entries())
        if (myImg) {
            data = { ...data, img: myImg[0] }
        }
        data.is_active = true

        setState(prev => ({ ...prev, loading: true }))
        const response = API.post(`/pharmacy/discounts/`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        response
            .then((res) => {
                if (res && res.data) {
                    setSucces(true)
                    dispatch(DiscountActions.setData(res.data))
                    setClose(false)
                }
            })
            .catch((err) => {
                if (err.response) {
                    let obj: any = {}
                    for (let [key, item] of Object.entries(err.response.data)) {
                        obj[key] = item
                    }
                    setError(obj)
                }

            }).finally(() => {
                setState(prev => ({ ...prev, loading: false }))
            })

    }

    return (
        <Modal handleClose={() => setClose(prev => !prev)}>
            {
                state.loading && <Loading />
            }
            {
                state.error && <ErrorField setError={() => setState(prev => ({ ...prev, error: '' }))} text={state.error} />
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
                        <h2>Создание скидки</h2>
                        <nav>
                            <Button onClick={() => {
                                let a: any = document.getElementById('pharmacy')
                                if (a) {
                                    if (!a.value) {
                                        setError(prev => ({ ...prev, pharmacy: 'Выберите аптеку' }))
                                    }
                                }
                            }} type='submit'>Добавить</Button>
                            <CloseButton onClick={() => setClose(false)}  type='button' />
                        </nav>
                    </div>
                    <div className="form body grid">
                        <div>
                            <p>Аптека</p>
                            <Input onClick={(e) => {
                                e.preventDefault()
                                setError(prev => ({ ...prev, pharmacy: '' }))
                            }} style={{ display: 'none' }}>
                                <Select attr={{ required: true, name: 'pharmacy', id: 'pharmacy' }} selectData={pharm} />
                            </Input>
                            <p className='error-text'>{error.pharmacy ?? ''}</p>
                        </div>
                        <div>
                            <p>Название</p>
                            <Input required name='title' type='text' />
                            <p className='error-text'>{error.title ?? ''}</p>
                        </div>
                        <div>
                            <p>Процент скидки</p>
                            <Input required name='percentage' type='text' />
                            <p className='error-text'>{error.percentage ?? ''}</p>

                        </div>
                        <div>
                            <p>Дата начала</p>
                            <Input required name='start_date' type='date' />
                            <p className='error-text'>{error.start_date ?? ''}</p>

                        </div>
                        <div>
                            <p>Дата окончание</p>
                            <Input required name='end_date' type='date' />
                            <p className='error-text'>{error.end_date ?? ''}</p>
                        </div>
                    </div>
                    <div className="body_content">
                        <TextArea placeholder='Описание' name='description'>

                        </TextArea>
                        <label style={{ cursor: 'pointer' }} htmlFor='img'>
                            <input accept='image/*' id='img' onChange={(e) => e.target.files ? setImg(e.target.files) : null} style={{ display: 'none' }} type="file" />
                            {
                                myImg ? <img src={URL.createObjectURL(myImg[0])} alt="IMG" /> : <NotImage />
                            }
                        </label>

                    </div>
                </div>
            </form>
        </Modal>

    )
}
