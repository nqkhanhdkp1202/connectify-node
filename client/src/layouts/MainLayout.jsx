import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Sidebar from '../components/SideBar'
import Feed from '../pages/Home'
import MessageSender from '../components/MessagesSender'
import Messenger from '../components/Messenger'

export default function MainLayout() {
    return (
        <React.Fragment>
            <Header />
            <div className="app__body">
            <Sidebar />
            <Outlet />
            <Messenger/>
          </div>
        </React.Fragment>
    )
}