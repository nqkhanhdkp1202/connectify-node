import React from 'react'
import { Outlet } from "react-router-dom"
import Header from '../components/Header'
import Footer from '../components/Footer'
import ContainerWrapper from '../components/ContainerWrapper'
import {Box} from "@mui/material"
import {useLocation} from "react-router-dom"
import DialogCreatePost from "../components/DialogCreatePost"
import DialogListUser from "../components/DialogListFriend"
import DialogEditProfile from "../components/DialogEditProfile"
import LoadingScreen from '../components/LoadingScreen/index';
import DialogListFriend from '../components/DialogListFriend'
import DialogListLiked from '../components/DialogListLiked/index';
import DialogComment from '../components/DialogComment'

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
            <DialogCreatePost />
            <DialogListFriend />
            <DialogListLiked />
            <DialogEditProfile />
            <DialogComment />
            <LoadingScreen />
        </React.Fragment>
    )
}