import { useState, useEffect, useMemo, FormEvent } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../redux/store'
import { FetchAllDiscount } from '../../redux/slices/discount'
import Table, { EmptyTR, TBody, TFoot, THead, TR } from '../../components/UI/Table'
import Pagination from '../../components/UI/Pagination'
import Input from '../../components/UI/Input'
import Button from '../../components/UI/Button'
import Select from '../../components/UI/Select'
import { FetchAllPharmacy } from '../../redux/slices/pharmacy'
import Loading from '../../components/UI/Loading'
import IsActive from '../../components/UI/IsActive'
import CreateDis from './CreateDis'
import { IDiscount } from '../../types'
import Single from './Single'

export default function index() {
    const dispatch = useDispatch()
    const { discount, pharmacy } = useSelector((state: IRootState) => state)
    const [queryParams, setQuery] = useState<{ [key: string]: any }>()
    const [create, setCreate] = useState(false)
    const [changed, setChanged] = useState<IDiscount | null>(null)
    const [page, setPage] = useState(1)
    const pharSelect = useMemo(() => {
        let data: any[] = []
        let init = {
            id: 0,
            value: '',
            title: 'Все'
        }
        if (pharmacy.data) {
            data = pharmacy.data.results.map(el => ({ id: el.id, value: el.id, title: el.name }))
        }
        return [init, ...data]
    }, [pharmacy.data])
    const handleSearch = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let formData = new FormData(e.target as HTMLFormElement)
        for (let [key, item] of formData.entries()) !item ? formData.delete(key) : null
        let queryData = Object.fromEntries(formData.entries())
        setQuery(queryData)
    }

    useEffect(() => {
        const query = {
            page,
            page_size: 9,
            ...queryParams
        }
        dispatch(FetchAllDiscount(query) as any)
        if (!pharmacy.data) {
            dispatch(FetchAllPharmacy({}) as any)
        }
    }, [queryParams, page])
    
    return (
        <section className='table-page'>
            {
                discount.loading && <Loading />
            }
            {
                create && <CreateDis pharm={pharSelect} setClose={setCreate} />
            }
            {
                changed && <Single pharmacy={pharmacy.data?.results} element={changed} setClose={setChanged} />
            }
            <form onSubmit={handleSearch} className="head_pagination">
                <nav>
                    {/* <Input name='start_date' type='date' >С</Input>
                    <Input name='end_date' type='date' >По</Input>
                 
                */}

                    <Input style={{ display: 'none' }}>
                        Aптека
                        <Select attr={{ name: 'pharmacy' }} defaultValue={pharSelect[0]} selectData={pharSelect} />
                    </Input>
                    <Button disabled={discount.loading}>Поиск</Button>
                    <Button type='reset' onClick={() => setQuery({})} disabled={discount.loading}>Очистить</Button>

                </nav>
                <Button onClick={() => setCreate(pr => !pr)} type='button'>Добавить</Button>
            </form>
            <Table>
                <THead>
                    <tr>
                        <th>Название</th>
                        <th>ID</th>
                        <th>Cтатус</th>
                        <th>Начало/Конец</th>
                        <th>Описание</th>
                    </tr>
                </THead>
                <TBody>
                    {
                        discount.data && discount.data.results.map(item => (
                            <TR key={item.id} onClick={() => setChanged(item)}>
                                <th>{item.title}</th>
                                <th>{item.id}</th>
                                <th><IsActive text={true} status={item.is_active} /></th>
                                <th>{item.start_date}/{item.end_date}</th>
                                <th className='table-desc'>{item.description || 'Нету'}</th>

                            </TR>
                        ))
                    }
                    {
                        discount.data && !discount.data.results.length ? <EmptyTR /> : null
                    }
                </TBody>
                <TFoot>
                    <tr>
                        <th><div><Pagination setPage={setPage} pageCount={Math.ceil((discount.data?.count ?? 1) / 9)} page={page} /></div></th>
                    </tr>
                </TFoot>
            </Table>
        </section>
    )
}
