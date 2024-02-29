import Styles from '../../styles/UI.module.scss'

export default function IsActive({ status, text }: { status: boolean, text?: boolean }) {
    return (
        <div title={status ? 'active' : 'noactived'} className={Styles['isActive']}>
            {
                text ? <p>{status ? 'Активный' : 'Не активный'}</p> : null
            }
        </div>
    )
}
