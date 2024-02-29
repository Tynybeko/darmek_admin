import { useEffect, useState } from 'react'
import Table, { EmptyTR, TBody, THead, TR } from '../../components/UI/Table'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux/store'
import HeadPag from '../../components/HeadPag'
// import Button from '../../components/UI/Button'


const searchKeys = [
  {
    id: 1,
    title: 'UID',
    value: 'uid'
  },
  {
    id: 2,
    title: 'Название',
    value: 'title'
  },
]



export default function Category() {
  const medicalCat = useSelector((state: IRootState) => state.medicalCat)
  const [data, setData] = useState(medicalCat.data?.results)
  const [search, setSearch] = useState([searchKeys[0].value, ''])
  useEffect(() => {
    const searchKey: string = search[0];
    if (searchKey && search[1]) {
      setData(medicalCat.data?.results.filter(item => searchKey in item ? item[searchKey].includes(search[1]) : item))
    } else {
      setData(medicalCat.data?.results)
    }
  }, [search, medicalCat.data?.results])
  return (
    <div className='table-page'>
      <HeadPag
        searchKeys={searchKeys}
        setSearch={setSearch}
      >
        {/* <Button>Добавить</Button> */}
      </HeadPag>
      <Table>
        <THead>
          <tr>
            <th>
              Название
            </th>

            <th>ID</th>
            <th className='table-desc'>UID</th>
            <th>
              Описание
            </th>
          </tr>
        </THead>
        <TBody>
          {
            data && data.map(item => (
              <TR>
                <th>{item.title}</th>
                <th>{item.id}</th>
                <th className='table-desc'>{item.uid}</th>
                <th className='table-desc'>{item.description || 'Нету'}</th>

              </TR>
            ))
          }
          {
            data && !data.length ? <EmptyTR /> : null
          }
        </TBody>
      </Table>



    </div>
  )
}
