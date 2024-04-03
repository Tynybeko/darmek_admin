import { NavLink } from 'react-router-dom'
import '../styles/navbar_style.scss'


const navData = [
    { id: 6, href: '/sales', title: 'Скидки' },
    {
        id: 7, href: '/news/category', title: 'Категория новостей', children: [
            {
                href: '/news',
                title: 'Новости'
            },
        ]
    },
    { id: 9, href: '/notification', title: 'Уведомление' },

]

const c1Nav = [
    {
        id: 2, href: '/medicaments/category', title: 'Категория препаратов', children: [
            {
                href: '/medicaments',
                title: 'Препараты'
            },
        ]
    },
    { id: 4, href: '/pharma', title: 'Аптеки' },
    { id: 8, href: '/rates', title: 'Тарифы' },

    // { id: 5, href: '/buys', title: 'Покупки' },
]



export default function index() {
    return (
        <nav className='navbar'>
            <div className='navbar-cont sel-no'>
                <div className='navbar-cont-items'>
                    {
                        navData.map(item => {
                            if (!item.children?.length) {
                                return (
                                    <NavLink key={item.id} to={item.href}>{item.title}</NavLink>
                                )
                            } else {
                                return (
                                    <>
                                        <NavLink key={item.id} to={item.href}>{item.title}</NavLink>
                                        <div className="children">
                                            <ul>
                                                {
                                                    item.children.map((el, index) => (
                                                        <li key={index}><NavLink to={el.href}>{el.title}</NavLink></li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </>

                                )
                            }
                        })
                    }
                    <h1>1C</h1>
                    <NavLink to={"/"}>Пользователи</NavLink>

                    {
                        c1Nav.map(item => {
                            if (!item.children?.length) {
                                return (
                                    <NavLink key={item.id} to={item.href}>{item.title}</NavLink>
                                )
                            } else {
                                return (
                                    <>
                                        <NavLink key={item.id} to={item.href}>{item.title}</NavLink>
                                        <div className="children">
                                            <ul>
                                                {
                                                    item.children.map((el, index) => (
                                                        <li key={index}><NavLink to={el.href}>{el.title}</NavLink></li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    </>
                                )
                            }
                        })
                    }
                </div>

            </div>
        </nav>
    )
}
