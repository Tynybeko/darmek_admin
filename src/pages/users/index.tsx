import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IRootState } from '../../redux/store'
import { FetchAllUser, userAction } from '../../redux/slices/users'
import Table, { EmptyTR, TBody, TFoot, THead, TR } from '../../components/UI/Table'
import HeadPag from '../../components/HeadPag'
import Select from '../../components/UI/Select'
import Loading from '../../components/UI/Loading'
import Pagination from '../../components/UI/Pagination'
import { useNavigate } from 'react-router-dom'
import ErrorField from '../../components/UI/ErrorField'

const searchData = [
    {
        id: 1,
        value: 'phone',
        title: 'По номеру'
    },
    {
        id: 2,
        value: 'full_name',
        title: 'По ФИО'
    },
    {
        id: 3,
        value: 'city',
        title: 'По городу'
    },
]



const sexFilter = [
    {
        id: 1,
        value: '',
        title: 'Все'
    },
    {
        id: 2,
        value: 'M',
        title: 'Муж'
    },
    {
        id: 3,
        value: 'F',
        title: 'Жен'
    },
]
export default function index() {
    const navigate = useNavigate()
    const { users, auth } = useSelector((state: IRootState) => state)
    const [search, setSearch] = useState<any[]>([null, ''])
    const [page, setPage] = useState(1)
    const [gender, setGender] = useState(sexFilter[0])
    const dispatch = useDispatch()
    useEffect(() => {
        const query = {
            [search[0]]: search[1],
            page_size: 12,
            gender: gender?.value,
            page: page
        }
        dispatch(FetchAllUser(query) as any)
    }, [search, gender, page])


    return (
        <section className='table-page'>
            {
                users.loading && <Loading />
            }
            {
                users.error && <ErrorField text={users.error} setError={() => dispatch(userAction.clearError())}/>
            }
            <HeadPag setSearch={setSearch} searchKeys={searchData}>
                <div className='head_pagination_item sel-no'>
                    <p>Пол:</p>
                    <Select handleChange={setGender} bg={true} defaultValue={sexFilter[0]} selectData={sexFilter} />
                </div>
            </HeadPag>
            <Table>
                <THead>
                    <tr>
                        <th>ФИО</th>
                        <th>ID</th>
                        <th>Email</th>
                        <th>Номер</th>
                        <th>Город</th>
                        <th>Статус</th>
                    </tr>
                </THead>
                <TBody>
                    {
                        users.data && users.data.results.map((item) => {
                            if (item.id != auth.user?.id) {
                                return (
                                    <TR onClick={() => navigate(`user/${item.id}`)} >
                                        <th>
                                            {item.full_name}
                                        </th>
                                        <th>{item.id}</th>
                                        <th>{item.email || 'Неизвестно'}</th>
                                        <th>{item.phone || 'Неизвестно'}</th>
                                        <th>{item.city || 'Неизвестно'}</th>
                                        <th>{item.role || 'Неизвестно'}</th>
                                    </TR>
                                )
                            }
                        })
                    }
                    {
                        !users.error && (Number(users.data?.results.length) - 1 < 0) ? <EmptyTR /> : null
                    }
                </TBody>
                <TFoot>
                    <tr>
                        <th><div><Pagination setPage={setPage} pageCount={Math.ceil((users.data?.count ?? 1) / 12)} page={page} /></div></th>
                    </tr>
                </TFoot>
            </Table>
        </section>

    )
}
