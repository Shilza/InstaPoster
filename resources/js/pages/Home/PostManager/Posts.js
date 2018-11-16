import Post from "./Post";
import React from "react";

const Posts = ({posts}) => {
    return (
        <div className='post-manager-posts'>
            {posts.map(item => <Post/>)}
        </div>
    );
};

export default Posts;