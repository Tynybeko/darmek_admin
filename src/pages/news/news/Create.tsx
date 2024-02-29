import { FormEvent, useMemo, useState } from 'react'
import Modal from '../../../components/UI/Modal'
import { INewsCategory, SetState } from '../../../types'
import Button, { CloseButton } from '../../../components/UI/Button'
import Input, { TextArea } from '../../../components/UI/Input'
import Select from '../../../components/UI/Select'
import API from '../../../axios'
import { useSucces } from '../../../hooks/useSucces'
import { useDispatch } from 'react-redux'
import { NewsActions } from '../../../redux/slices/news'
import Loading from '../../../components/UI/Loading'

interface IUpdateProps {
    setClose: SetState<boolean>
    categories: INewsCategory[] | undefined
}

export default function Create({ setClose, categories }: IUpdateProps) {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<any>()
    const [, setSucces] = useSucces()
    const [error, setError] = useState({
        category: '',
        photos: ''
    })
    const catSelectData = useMemo(() => {
        if (categories) {
            return categories.map(el => ({ id: el.id, value: el.id, title: el.name }))
        }
        return []
    }, [categories])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        let formData = new FormData(e.target as HTMLFormElement)
        const response = API.post(`/news/`,
            formData
            , {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
        response
            .then(res => {
                setClose(false)
                dispatch(NewsActions.setData(res.data))
                setSucces(true)
            })
            .catch(err => {

                if (err && err.response) {
                    let obj: any = {}
                    for (let [key, item] of Object.entries(err.response.data)) {
                        obj[key] = item
                    }
                    setError(obj)
                }
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Modal handleClose={() => setClose(false)} >
            {
                loading && <Loading />
            }
            <form onSubmit={handleSubmit} className='single'>
                <div>
                    <div className="head">
                        <h2>Изменение новостя</h2>
                        <nav>
                            <Button onClick={() => {
                                let check: any = document.getElementById('category')
                                if (check) {
                                    let value = check.value
                                    if (!value) {
                                        setError(prev => ({ ...prev, category: 'Выберите категорию!' }))
                                    }
                                }

                            }} type='submit'>Сохранить</Button>
                            <CloseButton type='button' onClick={() => setClose(false)} />
                        </nav>
                    </div>
                    <div className='body form'>
                        <div>
                            <p><span>Заголовок</span></p>
                            <Input required name='title' />
                        </div>
                        <div>
                            <p>
                                <span>
                                    Под заголовок
                                </span>
                            </p>
                            <Input required name='seo_title' />
                        </div>
                        <div>
                            <p><span>Категория</span></p>
                            <Input onClick={() => setError(prev => ({ ...prev, category: '' }))} style={{ display: 'none' }}>
                                <Select attr={{ required: true, name: 'category', id: 'category' }} defaultValue={catSelectData[0]} selectData={catSelectData} />
                            </Input>
                            <p className='error-text'>{error.category}</p>
                        </div>

                        <div className='body_content'>
                            <TextArea required title='Описание' placeholder='Описание' name='description' />
                            <label className='image-adder img' htmlFor="image">
                                <input name='img' id='image' style={{ display: 'none' }} onChange={(e) => {
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
                </div>
            </form>

        </Modal>
    )
}
