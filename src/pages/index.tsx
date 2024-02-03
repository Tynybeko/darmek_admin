import React from 'react'
import SuccesProvider from '../hooks/useSucces'
import Header from '../components/Header'
import { Outlet } from 'react-router-dom'

export default function index() {
    return (
        <SuccesProvider>
            <Header />
            <main>
                <Outlet />
            </main>
        </SuccesProvider>
    )
}
