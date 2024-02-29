import React, {  InputHTMLAttributes, ReactNode, useEffect, useState } from 'react';
import Styles from '../../styles/UI.module.scss'
import { SetState } from '../../types';
import Select from './Select';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode;
    setValue?: SetState<string>
}
interface TextAreaProps extends InputHTMLAttributes<HTMLTextAreaElement> {
    children?: ReactNode;
    setValue?: SetState<string>
}
export default function Input({ children, setValue, ...attr }: InputProps) {
    const [view, setView] = useState(true)
    const { type, ...someAttr } = attr
    const [myType, setType] = useState(type)
    useEffect(() => {
        if (type == 'password') {
            if (myType == 'password' && !view) {
                setType('text')
            } else if (view) {
                setType('password')
            }
        }
    }, [view])

    return (
        <label className={Styles["input--field"]}>
            <input   {...someAttr} type={myType} />
            {
                type && type == 'password' ?
                    <button type='button'>
                        {
                            view ?
                                <svg onClick={() => setView(prev => !prev)} className="feather feather-eye" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" /></svg>
                                :
                                <svg onClick={() => setView(prev => !prev)} className="feather feather-eye-off" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" /><line x1="1" x2="23" y1="1" y2="23" /></svg>
                        }
                    </button>
                    : null
            }
            {children}
        </label>
    );
}

export const TextArea: React.FC<TextAreaProps> = ({ children, ...attr }) => {
    return (
        <label className={Styles["text-area"]}>
            <textarea   {...attr} />
            {children}
        </label>
    )
}


interface SearchInput extends InputProps {
    searchKeys: any[],
    setValue: any
}


export const SearchInput: React.FC<SearchInput> = ({ children, setValue, searchKeys, ...attr }) => {
    const [search, setSearch] = useState('')
    const [myKey, setMyKey] = useState(searchKeys[0])
    return (
        <div className={Styles["input--field"]}>
            <Select bg={true} defaultValue={searchKeys[0]} selectData={searchKeys} handleChange={setMyKey} />
            <input onKeyDown={(e) => e.code === 'Enter' ? setValue([myKey.value, search]) : null} value={search} onChange={(e) => { e.target.value ? setSearch(e.target.value) : setValue([myKey.value, e.target.value]), setSearch(e.target.value) }}  {...attr} />
            <button onClick={() =>
                setValue ? setValue([myKey.value, search]) : null
            } title='search'>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" width="40px" height="40px">
                    <path d="M 13 3 C 7.4889971 3 3 7.4889971 3 13 C 3 18.511003 7.4889971 23 13 23 C 15.396508 23 17.597385 22.148986 19.322266 20.736328 L 25.292969 26.707031 A 1.0001 1.0001 0 1 0 26.707031 25.292969 L 20.736328 19.322266 C 22.148986 17.597385 23 15.396508 23 13 C 23 7.4889971 18.511003 3 13 3 z M 13 5 C 17.430123 5 21 8.5698774 21 13 C 21 17.430123 17.430123 21 13 21 C 8.5698774 21 5 17.430123 5 13 C 5 8.5698774 8.5698774 5 13 5 z" />
                </svg>
            </button>
            {children}
        </div>
    )
}