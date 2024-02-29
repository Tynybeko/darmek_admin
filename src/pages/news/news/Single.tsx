import { useState } from 'react'
import Button, { CloseButton } from '../../../components/UI/Button'
import { INews, INewsCategory, SetState } from '../../../types'
import Modal from '../../../components/UI/Modal'
import NotImage from '../../../components/NotImage'
import Update from './Update'
import Confirm from '../../../components/UI/Confirm'
import API from '../../../axios'
import ErrorField from '../../../components/UI/ErrorField'
import { useDispatch } from 'react-redux'
import { NewsActions } from '../../../redux/slices/news'
import { useSucces } from '../../../hooks/useSucces'
import Loading from '../../../components/UI/Loading'

interface ISingleProps {
    element: INews,
    setClose: SetState<INews | null>,
    categories: INewsCategory[] | undefined

}

export default function Single({ element, setClose, categories }: ISingleProps) {
    const dispatch = useDispatch()
    const [myElem, setMyElem] = useState({ ...element })
    const [, setSucces] = useSucces()
    const [update, setUpdate] = useState(false)
    const [deleted, setDeleted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleDelete = () => {
        setLoading(true)
        const response = API.delete(`/news/${element.id}/`)
        response
            .then(() => {
                dispatch(NewsActions.setDelete(element))
                setSucces(true)
                setClose(null)
            })
            .catch(() => {
                setError('Не удалось удалить!')
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Modal handleClose={() => setClose(null)}>
            {
                update && <Update setClose={setUpdate} categories={categories ? categories : []} element={myElem} setData={setMyElem} />
            }
            {
                error && <ErrorField setError={setError} text={error} />
            }
            {
                deleted && <Confirm callBack={handleDelete} setState={setDeleted} />
            }
            {
                loading && <Loading />
            }
            <div className='single'>
                <div>
                    <div className="head">
                        <h2>Новость</h2>
                        <nav>
                            <Button onClick={() => setDeleted(true)}>
                                Удалить
                            </Button>
                            <Button onClick={() => setUpdate(true)}>
                                Изменить
                            </Button>
                            <CloseButton onClick={() => setClose(null)} />
                        </nav>
                    </div>
                    <div className='body form'>
                        <div>
                            <p><span>Заголовок</span></p>
                            <h3>{myElem.title}</h3>
                        </div>
                        <div>
                            <p><span>Категория</span></p>
                            <h3>{categories ? categories.find(el => el.id == myElem.category)?.name : ''}</h3>
                        </div>
                        <div>
                            <p>
                                <span>
                                    Под заголовок
                                </span>
                            </p>
                            <h3>{myElem.seo_title}</h3>
                        </div>
                        <div className='body_content'>
                            <div>
                                <p> <span>Описание</span></p>
                                <h3>{myElem.description}</h3>
                            </div>
                            {
                                myElem.img ?
                                    <img src={myElem.img} alt="News IMG" />
                                    : <NotImage />
                            }
                        </div>

                    </div>
                </div>
            </div>
        </Modal>
    )
}
