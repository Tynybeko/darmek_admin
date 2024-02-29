import { combineReducers } from 'redux';
import AuthReducer from './slices/auth'
import UserReducer from './slices/users'
import DrugReducer from './slices/medicaments'
import PharmacyReducer from './slices/pharmacy';
import MedicalCat from './slices/medicamentCat';
import HistoryReducer from './slices/historyPay'
import DiscountReducer from './slices/discount'
import NewsReducer from './slices/news'
import NewsCatReducer from './slices/newsCat'
import RatesReducer from './slices/rates'
import NotifReducer from './slices/notification'

export const rootReducer = combineReducers({
    auth: AuthReducer,
    users: UserReducer,
    medicaments: DrugReducer,
    pharmacy: PharmacyReducer,
    medicalCat: MedicalCat,
    history: HistoryReducer,
    discount: DiscountReducer,
    news: NewsReducer,
    newsCat: NewsCatReducer,
    rates: RatesReducer,
    notification: NotifReducer
})
    


