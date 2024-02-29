import { useEffect, useState } from 'react'
import { IPharmacy, SetState } from '../../types'
import Modal from '../../components/UI/Modal'
import Button, { CloseButton } from '../../components/UI/Button'
import Confirm from '../../components/UI/Confirm'
import Loading from '../../components/UI/Loading'
import API from '../../axios'
import { useSucces } from '../../hooks/useSucces'
import { PharmacyActions } from '../../redux/slices/pharmacy'
import ErrorField from '../../components/UI/ErrorField'
import Table, { EmptyTR, TBody, TFoot, THead, TR } from '../../components/UI/Table'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllMedicaments } from '../../redux/slices/medicaments'
import { IRootState } from '../../redux/store'

interface ISingleProps {
    element: IPharmacy,
    setClose: SetState<IPharmacy | null>
}
export default function Single({ element, setClose }: ISingleProps) {
    const [deleted, setDeleted] = useState(false)
    const medicament = useSelector((state: IRootState) => state.medicaments)
    const dispatch = useDispatch()
    useEffect(() => {
        const query = {
            pharmacy_count__pharmacy: element.id
        }
        dispatch(FetchAllMedicaments(query) as any)
    }, [])



    const [, setSucces] = useSucces()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    console.log(element);

    const handleDelete = () => {
        setLoading(true)
        const response = API.delete(`/pharmacy/${element.id}/`)
        response
            .then(() => {
                dispatch(PharmacyActions.deleteData(element))
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
        <Modal handleClose={() => setClose(null)}>
            {
                deleted && <Confirm callBack={handleDelete} setState={setDeleted} />
            }
            {
                (loading || medicament.loading) ? <Loading /> : null
            }
            {
                error && <ErrorField text={error} setError={setError} />
            }
            <div className='single'>
                <div>
                    <div className="head">
                        <h2>Аптека</h2>
                        <nav>
                            <Button onClick={() => setDeleted(prev => !prev)}>Удалить</Button>
                            <CloseButton onClick={() => setClose(null)} />
                        </nav>
                    </div>
                    <div className='body'>
                        <div className="form grid">
                            <div>
                                <p>Название</p>
                                <h3>{element.name}</h3>
                            </div>
                            <div>
                                <p>Адрес</p>
                                <h3>{element.adress}</h3>
                            </div>
                            <div>
                                <p>Ссылка адреса</p>
                                <h3> <a href={element.adrres_url ?? ''}>{element.adrres_url}</a></h3>
                            </div>
                            <div>
                                <p>Время работы</p>
                                <h3>с {element.working_hours_from} до {element.working_hours_to}</h3>
                            </div>
                        </div>
                        <Table>
                            <THead>
                                <tr>
                                    <th>
                                        Название
                                    </th>
                                    <th>
                                        Количетсво
                                    </th>
                                </tr>
                            </THead>
                            <TBody>
                                {
                                    element.drugs_count.map(el => (
                                        <TR key={el.id}>
                                            <th>{medicament.data?.results.find(med => med.uid == el.drug)?.name ?? ''}</th>
                                            <th>{el.count}</th>
                                        </TR>
                                    ))
                                }
                                {
                                    !element.drugs_count.length && <EmptyTR />
                                }
                            </TBody>
                            <TFoot>
                                <tr>
                                    <th>Общее количетсво</th>
                                    <th>{element.drugs_count.reduce((acc, el) => acc += el.count, 0)}</th>
                                </tr>
                            </TFoot>
                        </Table>
                    </div>
                </div>
            </div>
        </Modal>

    )
}
