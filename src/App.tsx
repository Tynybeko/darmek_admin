import { Route, Routes } from "react-router-dom"
import Auth from './pages/auth'
import Layout from './pages'
import Users from './pages/users'
import './styles/Component.style.scss'
import MedicamentLayout from './pages/medicaments/Layout'
import MedicamentCategory from './pages/medicaments/Category'
import Medicament from './pages/medicaments/Medicaments'
import Pharmacy from './pages/pharmacy'
// import Order from './pages/history'
import Notif from './pages/notification'
import Dicsount from './pages/discount'
import News from './pages/news/News'
import NewsCategory from './pages/news/Category'
import Rates from './pages/rates'
import Single from "./pages/users/Single"
import MyProfile from './pages/myProfile'



function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout />} >
        <Route index element={<Users />} />
        <Route path="user/:userId" element={<Single />} />
        <Route path="medicaments" element={<MedicamentLayout />} >
          <Route index element={<Medicament />} />
          <Route path="/medicaments/category" element={<MedicamentCategory />} />
        </Route>
        {/* <Route path="buys" element={<Order />} /> */}
        <Route path="pharma" element={<Pharmacy />} />
        <Route path="sales" element={<Dicsount />} />
        <Route path="news" element={<News />} />
        <Route path="news/category" element={<NewsCategory />} />
        <Route path="rates" element={<Rates />} />
        <Route path="notification" element={<Notif />} />
        <Route path="profile" element={<MyProfile />} />
      </Route>
      <Route path="/auth" element={<Auth />} />

    </Routes>
  )
}

export default App
