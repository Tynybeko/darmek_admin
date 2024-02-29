import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllMedicaments } from '../../redux/slices/medicaments'
import { IRootState } from '../../redux/store'
import Table, { EmptyTR, TBody, TFoot, THead, TR } from '../../components/UI/Table'
import Loading from '../../components/UI/Loading'
import HeadPag from '../../components/HeadPag'
import Select from '../../components/UI/Select'
import Input from '../../components/UI/Input'
import Pagination from '../../components/UI/Pagination'
import { IProduct } from '../../types'
import Single from './medicaments/Single'


export interface SelectItem {
    id: number;
    value: string | number;
    title: string;
}
const SearchKeys = [
    {
        id: 1,
        title: 'Название',
        value: 'name'
    }
]

export default function Medicaments() {
    const dispath = useDispatch()
    const { medicaments, medicalCat } = useSelector((state: IRootState) => state)
    const [page, setPage] = useState(1)
    // const [create, setCreate] = useState(false)
    const [changed, setChanged] = useState<IProduct | null>(null)
    const selectData = useMemo(() => {
        let phar: SelectItem[] = []
        let data =
        {
            id: 0,
            title: 'Все',
            value: ''
        }
        if (medicalCat.data) {
            phar = medicalCat.data.results.map(el => ({ id: el.id, value: el.id, title: el.title }))
        }
        return [data, ...phar]
    }, [medicalCat.data])
    const [catId, setCatId] = useState(selectData[0])
    const [search, setSearch] = useState('')
    useEffect(() => {
        let query = {
            page_size: 9,
            page,
            category: catId.value ?? '',
            [search[0] ?? 'test']: search[1] ?? ''
        }
        dispath(FetchAllMedicaments({ query }) as any)
    }, [catId, search])


    return (
        <div className='table-page'>
            {
                medicaments.loading && <Loading />
            }
            {
                changed && <Single element={changed} setClose={setChanged} />
            }
            {/* {
                create && <CreateMedical setClose={setCreate} />
            } */}
            <HeadPag setSearch={setSearch} searchKeys={SearchKeys} >
                <nav>
                    {/* <Button onClick={() => setCreate(prev => !prev)}>Добавить</Button> */}
                    <Input style={{ display: 'none' }}>
                        Категория
                        <Select defaultValue={{
                            id: 0,
                            title: 'Все',
                            value: ''
                        }} handleChange={setCatId} selectData={selectData} ></Select>
                    </Input>
                </nav>
            </HeadPag>
            <Table>
                <THead>
                    <tr>
                        <th>Название</th>
                        <th>ID</th>
                        <th>Категория</th>
                        <th>Цена</th>
                    </tr>
                </THead>
                <TBody>
                    {

                        medicaments.data && medicaments.data.results.map(item => (
                            <TR key={item.id} onClick={() => setChanged(item)}>
                                <th>{item.name}</th>
                                <th>{item.id}</th>
                                <th>{medicalCat.data ? medicalCat.data.results.find(el => el.id == item.category)?.title : 'Неизвестно'}</th>
                                <th>{item.price}</th>
                            </TR>
                        ))
                    }
                    {
                        medicaments.data && !medicaments.data.results.length ?
                            <EmptyTR />

                            : null
                    }

                </TBody>
                <TFoot>
                    <tr>
                        <th><div><Pagination setPage={setPage} pageCount={Math.ceil((medicaments.data?.count ?? 1) / 12)} page={page} /></div></th>
                    </tr>
                </TFoot>
            </Table>

        </div>
    )
}
