import React from 'react'
import StoryReel from '../StoryReel'
import MessageSender from '../MessagesSender'
import './index.css'
const Feed = () => {
    return (
        <div className="feed">
            <StoryReel />
            <MessageSender />
            {/* {posts.map((post) => (
                <Post key={post.data.id} profilePic={post.data.profilePic} message={post.data.message} timestamp={post.data.timestamp} username={post.data.username} image={post.data.image} />
            ))} */}
        </div>
    )
}

export default Feed