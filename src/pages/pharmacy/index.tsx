import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FetchAllPharmacy } from '../../redux/slices/pharmacy'
import { IRootState } from '../../redux/store'
import Loading from '../../components/UI/Loading'
import Table, { EmptyTR, TBody, TFoot, THead, TR } from '../../components/UI/Table'
import ErrorField from '../../components/UI/ErrorField'
import { PharmacyActions } from '../../redux/slices/pharmacy'
import Pagination from '../../components/UI/Pagination'
import HeadPag from '../../components/HeadPag'
import { IPharmacy } from '../../types'
import Single from './Single'


const searchKeys = [
    {
        id: 1,
        title: 'Название',
        value: 'name'
    },
]


export default function index() {
    const dispatch = useDispatch()
    const pharmacy = useSelector((state: IRootState) => state.pharmacy)
    const [search, setSearch] = useState<string[]>([searchKeys[0].value, ''])
    const [changed, setChanged] = useState<IPharmacy | null>(null)
    const [page, setPage] = useState(1)
    useEffect(() => {
        const searchKey: string = search[0];
        const query = {
            page_size: 9,
            page,
            [searchKey]: search[1],
        }
        dispatch(FetchAllPharmacy(query) as any)
    }, [search, page])

    return (
        <section className='table-page'>
            {
                pharmacy.loading && <Loading />
            }
            {
                pharmacy.error && <ErrorField setError={() => dispatch(PharmacyActions.clearError())} text={pharmacy.error} />
            }
            {
                changed && <Single element={changed} setClose={setChanged} />
            }
            <HeadPag setSearch={setSearch} searchKeys={searchKeys}>

            </HeadPag>
            <Table>
                <THead>
                    <tr>
                        <th>Название</th>
                        <th>Адрес</th>
                        <th>Cсылка адреса</th>
                    </tr>


                </THead>

                <TBody>
                    {
                        pharmacy.data && pharmacy.data.results.map(item => (
                            <TR key={item.id} onClick={() => setChanged(item)}>
                                <th>{item.name}</th>
                                <th>{item.adress}</th>
                                <th><a href={item.adrres_url ?? ''}>{item.adrres_url}</a></th>
                            </TR>
                        ))
                    }
                    {
                        pharmacy.data && !pharmacy.data.results.length ? <EmptyTR /> : null
                    }
                </TBody>
                <TFoot>
                    <tr>
                        <th><div><Pagination setPage={setPage} pageCount={Math.ceil((pharmacy.data?.count ?? 1) / 12)} page={page} /></div></th>
                    </tr>
                </TFoot>
            </Table>
        </section>
    )
}
