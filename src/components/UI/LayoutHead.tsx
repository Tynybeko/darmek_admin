import React, { ReactNode, SetStateAction, useEffect, useState } from 'react'
import Styles from '../../styles/UI.module.scss'
import useDebounce from '../../hooks/useDebounce'

interface LayoudHead {
    setClose: React.Dispatch<SetStateAction<boolean>>,
    setSearch?: React.Dispatch<SetStateAction<string>>,
    text?: string, placeText?: string,
    children?: ReactNode
}

export default function LayoutHead(
    {
        setClose, setSearch, text, placeText,
        children
    }
        :
        LayoudHead
) {
    const [search, setInputVal] = useState('')
    const debouncedVal = useDebounce(search, 500)
    useEffect(() => {
        if (setSearch) {
            setSearch(search)
        }
    }, [debouncedVal])



    return (
        <div className={`${Styles.head} sel-no`}>
            <h1 className=''>{text ?? 'Пользователи'}</h1>
            <nav>
                <input value={search} onChange={(e) => setInputVal(e.target.value)} placeholder={placeText ?? 'Search'} type="text" />
                {children}
                <button onClick={() => setClose(prev => !prev)} className={Styles['btn-action']}>Добавить</button>
            </nav>
        </div>
    )
}
