import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContainerWrapper from '../components/ContainerWrapper'
import {Box} from "@mui/material"
import {useLocation} from "react-router-dom"
import CreateDialog from '../components/CreateDialog'

export default function MainLayout() {
    const {pathname} = useLocation();
    return (
        <React.Fragment>
            <Header />
            <Box sx={{marginTop:"72px"}}>
                <ContainerWrapper>
                    <Outlet />
                </ContainerWrapper>
            </Box>
            {
                pathname !== '/' && <Footer />
            }
            <CreateDialog />
        </React.Fragment>
    )
}