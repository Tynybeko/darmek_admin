import { useMemo, useState } from 'react'
import Modal from '../../components/UI/Modal'
import { IDiscount, IPharmacy, SetState } from '../../types'
import Button, { CloseButton } from '../../components/UI/Button'
import NotImage from '../../components/NotImage'
import Update from './Update'
import Loading from '../../components/UI/Loading'
import API from '../../axios'
import { useDispatch } from 'react-redux'
import { DiscountActions } from '../../redux/slices/discount'
import { useSucces } from '../../hooks/useSucces'
import ErrorField from '../../components/UI/ErrorField'
import Confirm from '../../components/UI/Confirm'
interface ISingleProps {
    element: IDiscount,
    setClose: SetState<IDiscount | null>,
    pharmacy: IPharmacy[] | undefined
}

export default function Single({ element, setClose, pharmacy }: ISingleProps) {
    const [update, setUpdate] = useState<IDiscount | null>(null)
    const [myData, setData] = useState<IDiscount>(element)
    const [deleted, setDeleted] = useState(false)
    const dispatch = useDispatch()
    const [, setSucces] = useSucces()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const pharSelect = useMemo(() => {
        let data: any[] = []
        let init = {
            id: 0,
            value: '',
            title: 'Все'
        }
        if (pharmacy) {
            data = pharmacy.map(el => ({ id: el.id, value: el.id, title: el.name }))
        }
        return [init, ...data]
    }, [pharmacy])

    const handleDelete = () => {
        setLoading(true)
        const response = API.delete(`/pharmacy/discounts/${element.id}/`)
        response
            .then(() => {
                dispatch(DiscountActions.setDelete(element))
                setClose(null)
                setSucces(true)
            })
            .catch(() => {
                setError('Не удалось удалить!')
            })
            .finally(() => {
                setLoading(false)
            })
    }
    return (
        <Modal>
            {
                update && <Update setData={setData} pharm={pharSelect} setClose={setUpdate} element={update} />
            }
            {
                loading && <Loading />
            }
            {
                error && <ErrorField setError={setError} text={error} />
            }
            {
                deleted && <Confirm callBack={handleDelete} setState={setDeleted} />
            }
            <div className='single'>
                <div>
                    <div className="head">
                        <h2>Скидка</h2>
                        <nav>
                            <Button onClick={() => setDeleted(true)}>Удалить</Button>
                            <Button onClick={() => setUpdate(element)}>Изменить</Button>
                            <CloseButton onClick={() => setClose(null)} />
                        </nav>
                    </div>
                    <div className="body grid form">
                        <div>
                            <p>Название</p>
                            <h3>{myData.title}</h3>
                        </div>
                        <div>
                            <p>Дата старта</p>
                            <h3>{myData.start_date}</h3>
                        </div>
                        <div>
                            <p>Дата окончание</p>
                            <h3>{myData.end_date}</h3>
                        </div>
                        <div>
                            <p>Аптека</p>
                            <h3>{pharmacy ? pharmacy.find(el => el.id === myData.pharmacy)?.name : 'Неизвестно'}</h3>
                        </div>
                        <div>
                            <p>Сумма скидки(%)</p>
                            <h3>{myData.percentage}</h3>
                        </div>
                    </div>
                    <div className="body_content">
                        <div className="form body body_container">
                            <div>
                                <p><span>
                                    Описание
                                </span></p>
                                <h3>{myData.description || 'Нету'}</h3>
                            </div>
                            <div></div>
                        </div>
                        {myData.img ? <img src={myData.img} alt="Img" /> : <NotImage />}
                    </div>

                </div>
            </div>
        </Modal>

    )
}
