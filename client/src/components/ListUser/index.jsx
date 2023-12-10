import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import DefaultUser from '../../assets/images/default-user.png'
import ButtonRoot from '../ButtonRoot'
import { useLocation } from "react-router-dom"
import { useSelector, useDispatch } from "react-redux"
import { addFriendReady, getListUserReady, getUserInfoReady } from '../../store/redux/reducers/userReducer';
import ListEmpty from '../ListEmpty'

const ListUser = ({ listData }) => {
    const { listUser, user } = useSelector(state => state.userReducer);
    const [infoUser, setInfoUser] = useState({});
    const [listTemp, setListTemp] = useState([]);
    useEffect(() => {
        if(listUser){
        setListTemp(listUser);
        }
    },[listUser])
    const dispatch = useDispatch();
    useEffect(() => {
        if (user) {
            setInfoUser(user);
        }
    }, [user]);

    const User = ({ avatar, email, fullName, id }) => {
        const me = id === infoUser?.id;
        const [isAdding, setIsAdding] = useState(false);
        const friend = infoUser?.friends?.some(item => item?.id === id);
        const handleAddFriend = (id) => {
            setIsAdding(true);
            dispatch(addFriendReady({ friendId: id }));
            dispatch(getUserInfoReady());
            dispatch(getListUserReady());
            window.location.reload();
        }
        return (
            <>
                {
                    infoUser?.friends?.includes(id) ? <></> :
                        <Box sx={{ display: "flex", padding: "12px 0px" }}>
                            <Box component={"img"} src={avatar ? avatar : DefaultUser} sx={{ width: "36px", height: "36px", borderRadius: "50%", outline: "1px solid rgba(0,0,0,0.1)", cursor: "pointer", marginRight: "12px", objectFit: "cover" }}></Box>
                            <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
                                <Box sx={{ display: "flex", border: "1px solid rbga(0,0,0,0.1)", justifyContent: "space-between", width: "100%" }}>
                                    <Box sx={{ display: "flex", flexDirection: "column", width: "400%" }}>
                                        <Typography sx={{ cursor: "pointer", fontSize: "15px", fontWeight: "600", lineHeight: "21px" }}>{fullName ? fullName : "Default Username"}</Typography>
                                        <Typography sx={{ fontSize: "15px", fontWeight: "400", lineHeight: "21px", color: "#999" }}>{email ? email : "Default Username"}</Typography>
                                    </Box>
                                    {
                                        !me && <ButtonRoot onClick={() => handleAddFriend(id)} disabled={friend || isAdding} style={{ fontSize: "12px !important", padding: "0px 16px !important", fontWeight: "600", border: "1px solid rgba(0,0,0,0.1)", textTransform: "unset", lineHeight: "0px !important", fontWeight: "600", borderRadius: "16px" }} bgColor='white' textColor='black' text={friend || isAdding ? "Bạn bè" : "Thêm bạn"}></ButtonRoot>
                                    }
                                </Box>
                                {
                                    !me && !friend && <Typography sx={{ marginTop: "12px", fontSize: "14px", color: "rgba(0,0,0,0.2)", minHeight: "12px" }}>{!me && "Người có thể bạn sẽ biết ..."}</Typography>
                                }
                                <hr style={{ color: "rgba(0,0,0,0.15)" }} />
                            </Box>
                        </Box>
                }
            </>
        )
    }

    return (
        <Box>
            {
                listData?.length > 0 ? listData?.map((e, i) => (
                    <User key={i} avatar={e?.avatarUrl} email={e?.email} fullName={e?.fullName} id={e?.id} />
                )) : <ListEmpty></ListEmpty>
            }
        </Box>
    )
}

export default ListUser