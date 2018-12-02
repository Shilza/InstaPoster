import React, {Fragment} from "react";
import {connect} from "react-redux";
import PostsList from './PostsList';
import {bindActionCreators} from "redux";
import * as PostsService from "../../../services/Post/services";
import Tabs from "antd/es/tabs/index";

class PostManager extends React.Component {

    componentDidMount() {
        this.props.getPosts();
    }

    render() {
        const {posts} = this.props;

        return (
            <Fragment>
                <span className='post-manager-header'>Post manager</span>
                <div className='post-manager'>
                     <Tabs>
                        {
                            posts.map(item => {
                                return (
                                        <Tabs.TabPane
                                            tab={item.profile}
                                            key={item.profile}
                                        >
                                            {
                                                item.posts.length ?  <PostsList posts={item.posts}/>
                                                    : <div className='post-manager-empty'>Empty</div>
                                            }
                                        </Tabs.TabPane>
                                );
                            })
                        }

                    </Tabs>
                </div>
            </Fragment>
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