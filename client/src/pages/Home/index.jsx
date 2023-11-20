import React from 'react'
import StoryReel from '../../components/StoryReel'
import MessageSender from '../../components/MessagesSender'
import './index.css'
import Post from '../../components/Feed/Post'
const Home = () => {
    const posts = [{ data: { id: 1, message: "ABC", timestamp: undefined, username: "ABC", image: "../../d" } }, , { data: { id: 1, message: "ABC", timestamp: undefined, username: "ABC", image: "../../d" } }, { data: { id: 1, message: "ABC", timestamp: undefined, username: "ABC", image: "../../d" } }, { data: { id: 1, message: "ABC", timestamp: undefined, username: "ABC", image: "../../d" } }, { data: { id: 1, message: "ABC", timestamp: undefined, username: "ABC", image: "../../d" } }]
    // profilePic, image, username, timestamp, message 
    return (
        <div className="feed">
            <StoryReel />
            <MessageSender />
            {posts.map((post) => (
                <Post key={post.data.id} profilePic={post.data.profilePic} message={post.data.message} timestamp={post.data.timestamp} username={post.data.username} image={post.data.image} />
            ))}
        </div>
    )
}

export default Home