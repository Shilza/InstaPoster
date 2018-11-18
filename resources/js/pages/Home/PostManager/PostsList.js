import Post from "./Post/Post";
import React from "react";

const PostsList = ({posts}) => {
    return (
        <div className='post-manager-posts'>
            {posts.map(item => <Post key={item.id} post={item}/>)}
        </div>
    );
};

export default PostsList;