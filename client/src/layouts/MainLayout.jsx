import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContainerWrapper from '../components/ContainerWrapper'

export default function MainLayout() {
    return (
        <React.Fragment>
            <Header />
            <ContainerWrapper>
                <Outlet />
            </ContainerWrapper>
            <Footer />
        </React.Fragment>
    )
}