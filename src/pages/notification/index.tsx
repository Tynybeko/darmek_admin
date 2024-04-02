import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../redux/store'
import { FetchAllNotification } from '../../redux/slices/notification'
import Table, { EmptyTR, TBody, TFoot, THead, TR } from '../../components/UI/Table'
import Pagination from '../../components/UI/Pagination'
import useDateFormat from '../../hooks/useDateFormat'
import Button from '../../components/UI/Button'
import Create from './Create'
import { INotification } from '../../types'
import Single from './Single'

export default function index() {
    const dispatch = useDispatch()
    const notification = useSelector((state: IRootState) => state.notification)
    const [page, setPage] = useState(1)
    const [create, setCreate] = useState(false)
    const [changed, setChanged] = useState<INotification | null>(null)

    useEffect(() => {
        let query = {
            page_size: 9,
            page
        }

        dispatch(FetchAllNotification(query) as any)
    }, [page])
    return (
        <div className='table-page'>
            {
                create && <Create setClose={setCreate} />
            }
            {
                changed && <Single element={changed} setClose={setChanged} />
            }
            <div className="head_pagination">
                <h3>Уведомление</h3>
                <nav>
                    <Button onClick={() => setCreate(true)}>
                        Добавить
                    </Button>
                </nav>
            </div>
            <Table>
                <THead>
                    <tr>
                        <th>Название</th>
                        <th>Создан</th>
                        <th>Изменен</th>
                        <th>Контент</th>
                    </tr>
                </THead>
                <TBody>
                    {
                        notification.data && notification.data.results.map(item => (
                            <TR onClick={() => setChanged(item)} key={item.id}>
                                <th>{item.name}</th>
                                <th>{useDateFormat(item.created_at)}</th>
                                <th>{useDateFormat(item.updated_at)}</th>
                                <th className='table-desc'>{item.content}</th>
                            </TR>
                        ))
                    }
                    {
                        notification.data && !notification.data.results.length ? <EmptyTR /> : null
                    }
                </TBody>
                <TFoot>
                    <tr>
                        <th><div><Pagination setPage={setPage} pageCount={Math.ceil((notification.data?.count ?? 1) / 12)} page={page} /></div></th>
                    </tr>
                </TFoot>
            </Table>
        </div>
    )
}
