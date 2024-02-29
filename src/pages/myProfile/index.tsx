import Button from '../../components/UI/Button'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { IRootState } from '../../redux/store'
import NotImage from '../../components/NotImage'
import BonusCard from '../../components/BonusCard'
import Loading from '../../components/UI/Loading'

export default function index() {
    const navigate = useNavigate()
    const { user, ...some } = useSelector((state: IRootState) => state.auth)
    // const [myUser, setMyUser] = useState({ ...user })
    // const [update, setUpdate] = useState<IUser | null>(null)

    return (
        <div className='user_single'>
            {
                some.loading && <Loading />
            }
            {/* {
                update && <Update setData={setMyUser} setClose={setUpdate} element={update} />
            } */}
            <div className='single'>
                <div className="user">
                    <div className="head sel-no">
                        <h2>Мой профиль</h2>
                        <nav>
                            {/* <Button onClick={() => setUpdate(user ? user : null)}>
                                Изменить
                            </Button> */}
                            <Button onClick={() => navigate(-1)}>
                                Назад
                            </Button>
                        </nav>
                    </div>
                    <div className="body form grid">
                        <div>
                            <p><span>ФИО</span></p>
                            <h3>{user?.full_name || 'Нету'}</h3>
                        </div>
                        <div>
                            <p><span>Дата рождение</span></p>
                            <h3>{user?.date_of_birth || 'Нету'}</h3>
                        </div>
                        <div>
                            <p><span>Город</span></p>
                            <h3>{user?.city || 'Нету'}</h3>
                        </div>
                        <div>
                            <p><span>Роль</span></p>
                            <h3>{user?.role || 'Нету'}</h3>
                        </div>
                        <div>
                            <p><span>Номер</span></p>
                            <h3>{user?.phone || 'Нету'}</h3>
                        </div>
                        <div>
                            <p><span>Пол</span></p>
                            <h3>{user?.gender || 'Не указано'}</h3>
                        </div>
                        <div>
                            <p><span>Семейное положение</span></p>
                            <h3>{user?.marital_status || 'Не указано'}</h3>
                        </div>
                    </div>
                    <div className="body_content">
                        {
                            user?.image ? <img src={user.image} alt="IMG" /> : <NotImage />
                        }
                        <BonusCard id={user?.id} />
                    </div>
                </div>

            </div>
        </div>
    )
}
