import React, { useEffect, useState } from "react";
import Post from "../../components/Post";
import PostCreate from "../../components/PostCreate";
import ListPost from "../../components/ListPost";
import {useDispatch} from "react-redux"
import { getListPostReady } from "../../store/redux/reducers/postReducer";
import {useSelector} from "react-redux"

const Home = () => {
  const {listPost} = useSelector(state => state.postReducer);
  const [list, setList] = useState([])
  const dispatch = useDispatch();
  useEffect(() => {
    if(listPost){
      setList(listPost)
    }
  }, [listPost])
  useEffect(() => {
    dispatch(getListPostReady());    
  },[dispatch])

  return (
    <>
      <PostCreate />
      <ListPost listPost={list} />
    </>
  );
};

export default Home;
