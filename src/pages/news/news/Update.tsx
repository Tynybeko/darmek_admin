import { ChangeEvent, FormEvent, useMemo, useState } from 'react'
import Modal from '../../../components/UI/Modal'
import { INews, INewsCategory, SetState } from '../../../types'
import Button, { CloseButton } from '../../../components/UI/Button'
import Input, { TextArea } from '../../../components/UI/Input'
import Select from '../../../components/UI/Select'
import API from '../../../axios'
import { useSucces } from '../../../hooks/useSucces'
import { useDispatch } from 'react-redux'
import { NewsActions } from '../../../redux/slices/news'
import Loading from '../../../components/UI/Loading'
import NotImage from '../../../components/NotImage'

interface IUpdateProps {
    element: INews,
    setClose: SetState<boolean>
    setData: SetState<INews>,
    categories: INewsCategory[]
}

export default function Update({ element, setClose, setData, categories }: IUpdateProps) {
    const [update, setUpdate] = useState({ ...element })
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState<any>()
    const [, setSucces] = useSucces()
    const [error, setError] = useState({
        category: '',
        img: ''
    })
    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        let key = e.target.name
        let value = e.target.value
        setUpdate(prev => ({ ...prev, [key]: value }))
    }
    const catSelectData = useMemo(() => {
        return categories.map(el => ({ id: el.id, value: el.id, title: el.name }))
    }, [categories])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        let { img, photos, ...someData } = update
        const response = API.put(`/news/${update.id}/`, images ? { img: images, ...someData } : someData, { headers: { 'Content-Type': 'multipart/form-data' } })
        response
            .then(res => {
                console.log(res.data);
                setClose(false)
                dispatch(NewsActions.setUpdate(res.data))
                setSucces(true)
                setData(res.data)
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
                            <Input required name='title' onChange={handleChange} value={update.title} />
                        </div>
                        <div>
                            <p>
                                <span>
                                    Под заголовок
                                </span>
                            </p>
                            <Input required name='seo_title' onChange={handleChange} value={update.seo_title} />
                        </div>
                        <div>
                            <p><span>Категория</span></p>
                            <Input onClick={() => setError(prev => ({ ...prev, category: '' }))} style={{ display: 'none' }}>
                                <Select handleChange={(st:any) => setUpdate(prev => ({...prev, category: st.value}))} attr={{ required: true, name: 'category', onChange: handleChange, id: 'category' }} defaultValue={catSelectData.find(el => el.id == update.category)} selectData={catSelectData} />
                            </Input>
                            <p className='error-text'>{error.category}</p>
                        </div>

                        <div className='body_content'>
                            <TextArea required title='Описание' placeholder='Описание' onChange={handleChange} name='description' value={update.description} />
                            <label className={`image-adder img ${error.img ? 'error-border' : ''}`} htmlFor="image">
                                <input name='img' id='image' style={{ display: 'none' }} onChange={(e) => {
                                    if (e.target.files) {
                                        setImages(e.target.files[0] as any)
                                    }
                                }} accept='image/*' type="file" />
                                {
                                    images ? <img src={URL.createObjectURL(images)} alt="New News Img" /> : update.img ? <img src={update.img} alt="Img" /> : <NotImage />
                                }

                            </label>
                        </div>

                    </div>
                </div>
            </form>

        </Modal>
    )
}
