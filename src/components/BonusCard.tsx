import { useEffect, useState } from 'react'
import { IBonusCard, } from '../types'
import API from '../axios'
import IsActive from './UI/IsActive'
import Loading from './UI/Loading'
import Button from './UI/Button'
import ErrorField from './UI/ErrorField'
import HistoryPay from './HistoryPay'

interface IBonusProps {
    id: Number | undefined
}



export default function BonusCard({ id }: IBonusProps) {
    const [bonusCard, setBonusCard] = useState<IBonusCard | null>(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [history, setHistory] = useState(false)
    useEffect(() => {
        if (!id) return
        setLoading(true)
        const response = API.get(`/users-card/?owner__id=${id}`)
        response
            .then(({ data }) => {
                let [card] = data.results
                setBonusCard(card)
            })
            .catch(() => {
                setError('Не удалось получить данные карты!')
            }).finally(() => setLoading(false))

    }, [id])

    return (
        <div className='bonus_card'>
            <h2>Бонусная карта</h2>
            {
                loading && <Loading />
            }
            {
                error && <ErrorField setError={setError} text={error} />
            }
            {
                history ? <HistoryPay hisData={bonusCard ? bonusCard.pays : []} setClose={setHistory} /> : null
            }
            <div className='bonus_card-body'>
                <div>
                    <h2>Номер карты:</h2>
                    <p>#{bonusCard ? bonusCard.card_number : ''}</p>
                </div>
                <div>
                    <h2>Баланс:</h2>
                    <p className='balance'>{bonusCard ? bonusCard.balance : ''}</p>
                </div>
                <div>
                    <h2>Статус:</h2>
                    <IsActive text={true} status={!!bonusCard?.is_active} />
                </div>
            </div>
            <Button onClick={() => setHistory(prev => !prev)}>История платежей</Button>
        </div>
    )
}
