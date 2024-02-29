import React, { ReactNode } from 'react'
import Styles from '../../styles/UI.module.scss'


type IChildProps<T> = {
    children?: ReactNode,
    attr?: T

}

type TableAttr = React.TableHTMLAttributes<HTMLTableElement>;
type TableRowAttr = React.HTMLAttributes<HTMLTableRowElement>;
// type TableCellAttr = React.HTMLAttributes<HTMLTableCellElement>;
interface TrProps extends React.HTMLAttributes<HTMLTableRowElement> {
    children: ReactNode
}

export default function Table({ children, attr }: IChildProps<TableAttr>) {
    return (
        <table {...attr} className={Styles.table}>{children}</table>
    )
}


export const THead: React.FC<IChildProps<TableAttr>> = ({ children }) => {

    return (<thead className={Styles.thead}>
        {children}
    </thead>)
}


export const TBody: React.FC<IChildProps<TableAttr>> = ({ children, }) => {

    return (<tbody className={Styles.tbody}>
        {children}
    </tbody>)
}


export const TFoot: React.FC<IChildProps<TableAttr>> = ({ children }) => {

    return (
        <tfoot className={Styles.tfoot}>
            {children}
        </tfoot>
    )
}


export const TR: React.FC<TrProps> = ({ children, ...attr }) => {
    return (
        <tr {...attr} className={Styles.tr}>
            {children}
        </tr>)
}


export const EmptyTR: React.FC<IChildProps<TableRowAttr>> = ({ attr }) => {
    return (
        <tr {...attr} className={Styles.tr}>
            <th colSpan={10}>Пусто</th>
        </tr>)
}
