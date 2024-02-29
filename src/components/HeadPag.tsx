import  { ReactNode, useEffect, useState } from 'react'
import { SearchInput } from './UI/Input'
import '../styles/FilterHead.styles.scss'




interface IHeadProps {
    children?: ReactNode,
    searchKeys: any[],
    setSearch: any
}


export default function HeadPag({ children, searchKeys, setSearch }: IHeadProps) {
    const [searchValue, setSearchValue] = useState<any[]>([])

    useEffect(() => {
        if (searchValue) {
            setSearch(searchValue)
        }
    }, [searchValue])

    return (
        <div className="head_pagination">
            <SearchInput setValue={setSearchValue} searchKeys={searchKeys} id='search' placeholder='Поиск' type='text' />
            {children}
        </div>

    )
}




