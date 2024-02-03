import { NavLink } from 'react-router-dom'
import '../../styles/navbar_style.scss'


const navData = [
    { id: 1, href: '/', title: 'Пользователи' },
    { id: 2, href: '/items', title: 'Предметы' },
    // { id: 3, href: '/tarifs', title: 'Тарифы' },
    { id: 4, href: '/regions', title: 'Регионы' },
    { id: 5, href: '/cities', title: 'Города/Районы' },
    { id: 6, href: '/schools', title: 'Школы' },
    { id: 7, href: '/classes', title: 'Классы' },
]



export default function index() {
    return (
        <nav className='navbar'>
            <div className='navbar-cont sel-no'>
                {
                    navData.map(item => (
                        <NavLink key={item.id} to={item.href}>{item.title}<svg className="feather sel-no feather-chevron-down" fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><polyline points="6 9 12 15 18 9" /></svg></NavLink>
                    ))
                }
            </div>
        </nav>
    )
}
