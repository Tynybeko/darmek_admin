import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { FetchAllPharmacy } from '../../redux/slices/pharmacy'
import { FetchAllMedicCat } from '../../redux/slices/medicamentCat'

export default function Layout() {
    const dispath = useDispatch()
    useEffect(() => {
        dispath(FetchAllPharmacy({}) as any)
        dispath(FetchAllMedicCat() as any)
    }, [])



    return (
        <Outlet />
    )
}
