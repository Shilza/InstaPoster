import React from "react";
import Icon from "antd/es/icon/index";
import {message} from "antd/lib/index";
import Tooltip from "antd/es/tooltip/index";
import PostTimePicker from "../Common/PostTimePicker";
import moment from 'moment';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as PostsService from "../../../services/Post/services";

class Post extends React.Component {

    constructor(props) {
        super(props);

        const date = moment(moment.unix(props.post_time).format('YYYY-MM-DD'))._i;
        const time = moment(moment.unix(props.post_time).format('HH:mm'))._i ;

        this.state = {
            date,
            time
        };

        this.datePickerChange = this.datePickerChange.bind(this);
        this.timePickerChange = this.timePickerChange.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    datePickerChange(date, dateString) {
        this.setState({date: dateString});
    }

    timePickerChange(date, dateString) {
        this.setState({time: dateString});
    }

    deletePost() {
        const {deletePost, post} = this.props;
        deletePost(post.id)
            .then(data => message.success(data))
            .catch(data => message.error(data));
    }

    render() {
        const {image, comment, post_time} = this.props.post;


        return (
            <div className='post-manager-post-card'>
                <div className='post-manager-post'>
                    <img
                        className='post-manager-image'
                        src={image}
                    />
                    <div style={{wordWrap: 'break-word'}}>
                        {comment}
                    </div>
                    <Tooltip placement="right" title='delete'>
                        <Icon
                            style={{fontSize: 12, maxHeight: 12}}
                            type="close"
                            onClick={this.deletePost}
                        />
                    </Tooltip>
                </div>
                <PostTimePicker
                    datePickerChange={this.datePickerChange}
                    timePickerChange={this.timePickerChange}
                    post_time={post_time}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        deletePost: PostsService.deletePost
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(Post);