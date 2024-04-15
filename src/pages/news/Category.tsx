import { useEffect, useState } from 'react'
import Table, { EmptyTR, TBody, TFoot, THead, TR } from '../../components/UI/Table'
import Pagination from '../../components/UI/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../redux/store'
import { FetchAllNewsCat, NewsCatActions } from '../../redux/slices/newsCat'
import HeadPag from '../../components/HeadPag'
import Button from '../../components/UI/Button'
import { INewsCategory } from '../../types'
import Loading from '../../components/UI/Loading'
import Update from './category/Update'
import Confirm from '../../components/UI/Confirm'
import API from '../../axios'
import { useSucces } from '../../hooks/useSucces'
import ErrorField from '../../components/UI/ErrorField'
import { NewsActions } from '../../redux/slices/news'
import Create from './category/Create'

const searchKeys = [{
    id: 1,
    title: 'Название',
    value: 'title'
},]

type ISingleChange = INewsCategory | null

export default function Category() {
    const dispatch = useDispatch()
    const [update, setUpdate] = useState<ISingleChange>(null)
    const [, setSucces] = useSucces()
    const [loading, setLoading] = useState(false)
    const [deleted, setDelete] = useState<ISingleChange>(null)
    const [page, setPage] = useState(1)
    const [error, setError] = useState('')
    const [create, setCreate] = useState(false)
    const [search, setSearch] = useState([searchKeys[0].value, ''])
    const newsCat = useSelector((state: IRootState) => state.newsCat)
    useEffect(() => {
        let searchKey: string = search[0]
        const query = {
            page_size: 9,
            page,
            [searchKey]: search[1] ?? ''
        }
        dispatch(FetchAllNewsCat(query) as any)
    }, [page, search])

    const handleDelete = () => {
        setLoading(true)
        if (!deleted) return
        const response = API.delete(`/news-categories/${deleted.id}/`)
        response
            .then(() => {
                setSucces(true)
                dispatch(NewsCatActions.setDelete(deleted))
            })
            .catch(() => {
                setError('Не удалось удалить!')
            })
            .finally(() => {
                setDelete(null)
                setLoading(false)
            })
    }
    return (
        <div className='table-page'>
            {
                (newsCat.loading || loading) && <Loading />
            }
            {
                update && <Update element={update} setClose={setUpdate} />
            }
            {
                deleted && <Confirm setState={setDelete} callBack={handleDelete} text='Вы действительно хотите удалить!' />
            }
            {
                (newsCat.error || error) && <ErrorField text={newsCat.error || error} setError={() => (setError(''), dispatch(NewsActions.clearError()))} />
            }
            {
                create && <Create setClose={setCreate} />
            }
            <HeadPag setSearch={setSearch} searchKeys={searchKeys}>
                <nav>
                    <Button onClick={() => setCreate(true)}>
                        Добавить
                    </Button>
                </nav>
            </HeadPag>
            <Table>
                <THead>
                    <tr>
                        <th>Название</th>
                        <th>ID</th>
                        <th>Количество новостей</th>
                        <th>

                        </th>
                    </tr>
                </THead>
                <TBody>
                    {
                        newsCat.data && newsCat.data.results.map(item => (
                            <TR key={item.id}>
                                <th>
                                    {item.name}
                                </th>
                                <th>
                                    {item.id}
                                </th>
                                <th>
                                    {item.news.length}
                                </th>
                                <th>
                                    <Button disabled={!!item.news.length} onClick={() => setDelete(item)} style={{ marginRight: '10px' }} >Удалить</Button>
                                    <Button onClick={() => setUpdate(item)}>Изменить</Button>
                                </th>
                            </TR>
                        ))
                    }
                    {
                        (newsCat.data && !newsCat.data.results.length) && <EmptyTR />
                    }
                </TBody>
                <TFoot>
                    <tr>
                        <th><div><Pagination setPage={setPage} pageCount={Math.ceil((newsCat.data?.count ?? 1) / 9)} page={page} /></div></th>
                    </tr>
                </TFoot>
            </Table>
        </div>
    )
}
