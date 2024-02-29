import Modal from '../../../components/UI/Modal'
import { IProduct, SetState } from '../../../types'
import Button, { CloseButton } from '../../../components/UI/Button'
import IsActive from '../../../components/UI/IsActive'
import { useSelector } from 'react-redux'
import { IRootState } from '../../../redux/store'
import NotImage from '../../../components/NotImage'
import { useState } from 'react'
import Confirm from '../../../components/UI/Confirm'
import API from '../../../axios'
import { useSucces } from '../../../hooks/useSucces'
import ErrorField from '../../../components/UI/ErrorField'
import Loading from '../../../components/UI/Loading'



interface ISingleProps {
    element: IProduct,
    setClose: SetState<IProduct | null>
}

export default function Single({ element, setClose }: ISingleProps) {
    const medicalCat = useSelector((state: IRootState) => state.medicalCat)
    const [deleted, setDeleted] = useState(false)
    const [loading, setLoading] = useState(false)
    const [, setSucces] = useSucces()
    const [error, setError] = useState('')
    const handleDelete = () => {
        setLoading(true)
        const response = API.delete(`/admin/medications/${element.id}/`)
        response
            .then(() => {
                setSucces(true)
                setClose(null)
            }).catch(() => {
                setError('Не удалось удалить данные!')
            })
            .finally(() => setLoading(false))
    }
    return (
        <Modal handleClose={() => setClose(null)}>
            <div className='single'>
                {
                    deleted && <Confirm callBack={handleDelete} setState={setDeleted} />
                }
                {
                    error && <ErrorField setError={setError} text={error} />
                }
                {loading && <Loading />}

                <div>
                    <div className="head">
                        <h2>Препарат</h2>
                        <nav>
                            <Button onClick={() => setDeleted(prev => !prev)}>Удалить</Button>
                            <CloseButton onClick={() => setClose(null)} />
                        </nav>
                    </div>
                    <div className='body form'>
                        <div className='grid'>
                            <div className='text-field'>
                                <p>Название:</p>
                                <h3>{element.name}</h3>
                            </div>
                            <div className='text-field'>
                                <p>Описание:</p>
                                <h3>{element.descrip}</h3>
                            </div>
                            <div className='text-field'>
                                <p>Статус:</p>
                                <h3>
                                    <IsActive text={true} status={element.is_active} />
                                </h3>
                            </div>
                            <div className='text-field'>
                                <p>Категория:</p>
                                <h3>{medicalCat.data?.results.find(el => el.id == element.category)?.title}</h3>
                            </div>
                            <div className='text-field'>
                                <p>Цена:</p>
                                <h3>{element.price}</h3>
                            </div>
                            <div className='text-field'>
                                <p>Область применение:</p>
                                <h3>{element.use_for}</h3>
                            </div>
                            <div className='text-field'>
                                <p>Характеристики:</p>
                                <h3>{element.сharacteristics}</h3>
                            </div>
                        </div>

                        <div className='body_content'>
                            {
                                !element.photos.length ? <NotImage />
                                    : <div className='mini_img'>
                                        {
                                            element.photos.map(item => (
                                                <div>
                                                    <img key={item} src={item.photo} alt="Img" />
                                                </div>
                                            ))
                                        }
                                    </div>
                            }
                            <div className='body grid form'>
                                {element.pharmacy_count.map(phar => (
                                    <div key={phar.id}>
                                        <h3>
                                            <span>
                                                Аптека
                                            </span> : {phar.pharmacy.name}
                                        </h3>
                                        <p> <span>Количетсво:</span> {phar.count}</p>
                                        <p><span>Цена:</span> {phar.price}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}
