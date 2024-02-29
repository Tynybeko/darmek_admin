import Modal from './Modal'
import Style from '../../styles/UI.module.scss'
import LoadingIcon from '/loading.png'

export default function Loading() {
    return (
        <Modal>
            <div className={Style['loading--spin']}>
                <img className='sel-no' src={LoadingIcon} alt="Loading" />
            </div>
        </Modal>
    )
}

