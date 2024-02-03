import { InputHTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

interface SelectItem {
    id: number;
    value: string | number;
    title: string;
}

interface SelectProps {
    children?: ReactNode;
    selectData?: SelectItem[] | any[];
    attr?: InputHTMLAttributes<HTMLInputElement>;
    defaultValue?: SelectItem | null;
    bg?: boolean;
    handleChange?: any
}

export default function Select({ children, selectData, attr, defaultValue, bg, handleChange }: SelectProps) {
    const [open, setOpen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);

    const handleCloseModal = (event: MouseEvent) => {
        if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setOpen((prev) => !prev);
        }
    };

    useEffect(() => {
        if (open) {
            document.addEventListener('mousedown', handleCloseModal);
        } else {
            document.removeEventListener('mousedown', handleCloseModal);
        }

        return () => {
            document.removeEventListener('mousedown', handleCloseModal);
        };
    }, [open]);

    const [state, setState] = useState<SelectItem>(defaultValue ?? { id: 0, value: '', title: 'Выберите' });


    useEffect(() => {
        if (handleChange) {
            handleChange(state)
        }
    }, [state])

    return (
        <div ref={modalRef} className={`selector sel-no ${bg ? 'secondary-select' : ''}`}>
            <div onClick={() => setOpen((prev) => !prev)} className='selector-action'>
                <p>{state.title}</p>
                {children}
                <input  value={state.value} {...attr} hidden type="text" />
            </div>
            <div className='rel'>
                <div className={`selector-select ${open ? 'actived' : ''} `}>
                    <ul>
                        {selectData &&
                            selectData.map((item) => (
                                <li key={item.id} onClick={() => { setState(item); setOpen(false); }}>
                                    {item.title}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}
