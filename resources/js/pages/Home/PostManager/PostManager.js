import React, {Fragment} from "react";
import {connect} from "react-redux";
import Posts from './Posts';
import {bindActionCreators} from "redux";
import * as PostsService from "../../../services/Post/services";

class PostManager extends React.Component{

    componentDidMount(){
        this.props.getPosts();
    }

    render() {
        const {posts} = this.props;
        return (
            <div className='postManager'>
                <span>Post manager</span>
                {
                    posts.map(item => {
                        return (
                            <Fragment key={item.profile}>
                                <span>{item.profile}</span>
                                <Posts posts={item.posts}/>
                            </Fragment>
                        );
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts.posts
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getPosts: PostsService.getPosts
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PostManager);