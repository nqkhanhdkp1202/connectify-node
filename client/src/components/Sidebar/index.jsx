import { Avatar, Box } from '@material-ui/core';
import React from 'react'
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import EmojiFlagsIcon from "@material-ui/icons/EmojiFlags";
import ChatIcon from "@material-ui/icons/Chat";
import StorefrontIcon from "@material-ui/icons/Storefront";
import VideoLibraryIcon from "@material-ui/icons/VideoLibrary";
import ExpandMoreOutlined from "@material-ui/icons/ExpandMoreOutlined";
import FavoriteIcon from '@material-ui/icons/Favorite';
import ApartmentIcon from '@material-ui/icons/Apartment';
import './index.css'

const SidebarRow = ({ src, Icon, title }) => {
    return (
        <Box className='sidebarRow'>
            {src && <Avatar src={src} />}
            {Icon && <Icon />}
            <h4>{title}</h4>
        </Box>
    );
}


const Sidebar = () => {
    return (
        <Box className='sidebar'>
            <SidebarRow Icon={LocalHospitalIcon} title='COVID-19 Information' />
            <SidebarRow Icon={EmojiFlagsIcon} title="Pages" />
            <SidebarRow Icon={ChatIcon} title="Messenger" />
            <SidebarRow Icon={StorefrontIcon} title="Marketplace" />
            <SidebarRow Icon={VideoLibraryIcon} title="Videos" />
            <SidebarRow Icon={FavoriteIcon} title="Dating" />
            <SidebarRow Icon={ApartmentIcon} title="Business Account" />
            <SidebarRow Icon={ExpandMoreOutlined} title="See More" />
        </Box>
    )
}

export default Sidebar