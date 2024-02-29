import SuccesProvider from '../hooks/useSucces'
import Header from '../components/Header'
import { Navigate, Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

export default function index() {
    const token = localStorage.getItem('token')
    if (!token) {
        return <Navigate to={'/auth'} />
    }

    return (
        <SuccesProvider>
            <Header />
            <main className='main'>
                <Navbar />
                <Outlet />
            </main>
        </SuccesProvider>
    )
}
