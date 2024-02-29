import { useEffect, useState } from 'react'
import Table, { EmptyTR, TBody, TFoot, THead, TR } from '../../components/UI/Table'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllRates, RatesActions } from '../../redux/slices/rates'
import Pagination from '../../components/UI/Pagination'
import { IRootState } from '../../redux/store'
import Button from '../../components/UI/Button'
import { IRates } from '../../types'
import Confirm from '../../components/UI/Confirm'
import Loading from '../../components/UI/Loading'
import ErrorField from '../../components/UI/ErrorField'
import API from '../../axios'
import { useSucces } from '../../hooks/useSucces'




export default function index() {
    const dispatch = useDispatch()
    const [page, setPage] = useState(1)
    const rates = useSelector((state: IRootState) => state.rates)
    const [, setSucces] = useSucces()
    const [deleted, setDeleted] = useState<IRates | null>(null)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const handleDelete = () => {
        setLoading(true)
        const response = API.delete(`/rates/${deleted?.id}/`)
        response
            .then(() => {
                dispatch(RatesActions.setDelete(deleted))
                setSucces(true)
            })
            .catch(() => {
                setError('Не удалось удалить')
            })
            .finally(() => {
                setLoading(false)
            })
    }
    useEffect(() => {
        let query = {
            page_size: 10,
            page
        }
        dispatch(FetchAllRates(query) as any)
    }, [page])

    return (
        <div className='table-page'>
            {
                deleted && <Confirm callBack={handleDelete} setState={setDeleted} />
            }
            {
                (loading || rates.loading) && <Loading />
            }
            {
                (error || rates.error) && <ErrorField text={error || rates.error} setError={() => (setError(''), dispatch(RatesActions.clearError()))} />
            }
            <Table>
                <THead>
                    <tr>
                        <th>Название</th>
                        <th>Процент</th>
                        <th>UID</th>
                        <th></th>
                    </tr>
                </THead>
                <TBody>
                    {
                        rates.data && rates.data.results.map(item => (
                            <TR key={item.id}>
                                <th>{item.title}</th>
                                <th>{item.percentage}</th>
                                <th>{item.uid}</th>
                                <th>
                                    <Button onClick={() => setDeleted(item)} >Удалить</Button>
                                </th>
                            </TR>
                        ))
                    }
                    {
                        (rates.data && !rates.data.results.length) ? <EmptyTR /> : null
                    }

                </TBody>
                <TFoot>
                    <tr>
                        <th><div><Pagination setPage={setPage} pageCount={Math.ceil((rates.data?.count ?? 1) / 12)} page={page} /></div></th>
                    </tr>
                </TFoot>

            </Table>
        </div>
    )
}
