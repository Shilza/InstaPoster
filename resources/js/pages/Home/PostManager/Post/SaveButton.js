import React from "react";
import {connect} from "react-redux";
import Button from "antd/es/button/button";
import {bindActionCreators} from "redux";
import * as PostsService from "../../../../services/Post/services";
import {message} from "antd/lib/index";
import moment from 'moment';

class SaveButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };

        this.updatePost = this.updatePost.bind(this);
    }

    updatePost() {
        const {post, updatePost, post_time, form} = this.props;
        this.setState({loading: true});

        if(post_time > moment().unix()) {
            form.validateFields((err, {comment}) => {
                if (!err){
                    comment = comment ? comment : "";

                    const newPost = {...post, post_time, comment};
                    if(post.comment !== newPost.comment ||
                        post.post_time !== newPost.post_time) {
                        updatePost(newPost)
                            .then(data => {
                                message.success(data);
                                this.setState({loading: false});
                            })
                            .catch(data => {
                                message.error(data);
                                this.setState({loading: false});
                            });
                    } else {
                        message.warning('To update the post you need to change the data');
                        this.setState({loading: false});
                    }
                }
            });
        } else {
            message.error("Post data is invalid");
            this.setState({loading: false});
        }
    }

    render() {
        return (
            <div className='post-manager-save'>
                <Button
                    type='primary'
                    loading={this.state.loading}
                    onClick={this.updatePost}
                >
                    Save
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updatePost: PostsService.updatePost
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(SaveButton);