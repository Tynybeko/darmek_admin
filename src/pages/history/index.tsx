import { useEffect, useState } from 'react'
import Table, { TBody, TFoot, THead, TR } from '../../components/UI/Table'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../redux/store'
import { FetchAllHistory } from '../../redux/slices/historyPay'
import Pagination from '../../components/UI/Pagination'

export default function index() {
    const dispatch = useDispatch()
    const history = useSelector((state: IRootState) => state.history)
    const [page, setPage] = useState(1)
    useEffect(() => {
        const query = {
            page
        }
        dispatch(FetchAllHistory(query) as any)
    }, [])
    return (
        <section className='table-page'>

            <Table>
                {/* <HeadPag></HeadPag> */}
                <THead>
                    <tr>
                        <th>Имя продавца</th>
                    </tr>
                </THead>
                <TBody>
                    {
                        history.data && history.data.results.map(item => (
                            <TR key={item.id}>
                                <th>{item.salse_person}</th>
                            </TR>
                        ))
                    }

                </TBody>
                <TFoot>
                    <tr>
                        <th><div><Pagination setPage={setPage} pageCount={Math.ceil((history.data?.count ?? 1) / 12)} page={page} /></div></th>
                    </tr>
                </TFoot>
            </Table>
        </section>
    )
}
