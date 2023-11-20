import React, { useEffect, useState } from 'react'
import StoryReel from '../../components/StoryReel'
import MessageSender from '../../components/MessagesSender'
import './index.css'
import Post from '../../components/Feed/Post'
import feedServices from '../../service/feedServices'
import { toast } from 'react-toastify'
const Home = () => {
    const [listPosts, setListPosts] = useState([]);
    
    useEffect(() => {
        const getListPost = async () => {
            try {
                let response = await feedServices.getListPosts();
                if(response?.status === 200 || response?.status === 201){
                    console.log(response);
                    setListPosts(response?.data?.posts);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getListPost();
    }, [])


    return (
        <div className="feed">
            <StoryReel />
            <MessageSender />
            {listPosts.map((post) => (
                <Post key={post.data.id} profilePic={post.data.profilePic} message={post.data.message} timestamp={post.data.timestamp} username={post.data.username} image={post.data.image} />
            ))}
        </div>
    )
}

export default Home