import { useEffect, useMemo, useState } from 'react'
import Table, { EmptyTR, TBody, TFoot, THead, TR } from '../../components/UI/Table'
import { FetchAllNews } from '../../redux/slices/news'
import { FetchAllNewsCat } from '../../redux/slices/newsCat'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../redux/store'
import Loading from '../../components/UI/Loading'
import ErrorField from '../../components/UI/ErrorField'
import { NewsActions } from '../../redux/slices/news'
import HeadPag from '../../components/HeadPag'
import Pagination from '../../components/UI/Pagination'
import Select from '../../components/UI/Select'
import Input from '../../components/UI/Input'
import { INews } from '../../types'
import Single from './news/Single'
import Create from './news/Create'
import Button from '../../components/UI/Button'

const searchKeys = [
    {
        id: 1,
        title: 'Заголовок',
        value: 'title__contains'
    },
    {
        id: 2,
        title: 'Под заголовок',
        value: 'seo_title__contains'
    },
    {
        id: 3,
        title: 'Описание',
        value: 'description__contains'
    },
]

export default function News() {
    const dispatch = useDispatch()
    const { newsCat, news } = useSelector((state: IRootState) => state)
    const [changed, setChanged] = useState<INews | null>(null)
    const [filterCat, setFilterCat] = useState<any>()
    const [create, setCreate] = useState(false)
    const catSelectData = useMemo(() => {
        let data: any = []
        let base = {
            id: 0,
            title: 'Все',
            value: ''
        }
        if (newsCat.data) {
            data = newsCat.data.results.map(el => ({ id: el.id, title: el.name, value: el.id }))
        }
        return [base, ...data]
    }, [newsCat])
    const [page, setPage] = useState(1)
    const [search, setSearch] = useState([searchKeys[0].value, ''])
    useEffect(() => {
        let searchKey: string = search[0]
        const query = {
            [searchKey]: search[1],
            page_size: 9,
            page,
            category: filterCat ? filterCat.value : ''
        }
        dispatch(FetchAllNews(query) as any)
        if (!newsCat.data) {
            dispatch(FetchAllNewsCat({}) as any)
        }
    }, [search, page, filterCat])
    return (
        <div className='table-page'>
            {
                news.loading && <Loading />
            }
            {
                news.error && <ErrorField text={news.error} setError={() => dispatch(NewsActions.clearError())} />
            }
            {
                changed && <Single categories={newsCat.data?.results} element={changed} setClose={setChanged} />
            }
            {
                create && <Create setClose={setCreate} categories={newsCat.data?.results} />
            }
            <HeadPag setSearch={setSearch} searchKeys={searchKeys}>
                <nav>
                    <Button onClick={() => setCreate(prev => !prev)}>
                        Добавить
                    </Button>
                    <Input style={{ display: 'none' }}>
                        Категория
                        <Select bg handleChange={setFilterCat} defaultValue={catSelectData[0]} selectData={catSelectData} />
                    </Input>
                </nav>
            </HeadPag>
            <Table>
                <THead>
                    <tr>
                        <th>Категория</th>
                        <th>Заголовок</th>
                        <th>Описание</th>
                    </tr>
                </THead>
                <TBody>
                    {
                        news.data && news.data.results.map(item => (
                            <TR key={item.id} onClick={() => setChanged(item)}>
                                <th>{newsCat.data ? newsCat.data?.results.find(el => el.id == item.category)?.name : ''}</th>
                                <th className='table-desc'>
                                    {item.title}
                                </th>
                                <th className='table-desc'>
                                    {item.description}
                                </th>
                            </TR>
                        ))
                    }
                    {
                        news.data && !news.data.results.length ? <EmptyTR /> : null
                    }
                </TBody>
                <TFoot>
                    <tr>
                        <th colSpan={100}><div><Pagination setPage={setPage} pageCount={Math.ceil((news.data?.count ?? 1) / 12)} page={page} /></div></th>
                    </tr>
                </TFoot>
            </Table>
        </div>
    )
}
