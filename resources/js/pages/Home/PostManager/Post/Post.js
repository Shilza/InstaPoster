import React from "react";
import Icon from "antd/es/icon/index";
import {message} from "antd/lib/index";
import Tooltip from "antd/es/tooltip/index";
import PostTimePicker from "../../Common/PostTimePicker";
import moment from 'moment';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as PostsService from "../../../../services/Post/services";
import SaveButton from "./SaveButton";
import Form from "antd/es/form/Form";
import Comment from "../../../Common/Fields/Comment";

class Post extends React.Component {

    constructor(props) {
        super(props);

        const date = moment(moment.unix(props.post.post_time).format('YYYY-MM-DD'))._i;
        const time = moment(moment.unix(props.post.post_time).format('HH:mm'))._i;

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
        const {
            image,
            comment,
            post_time
        } = this.props.post;
        const {form} = this.props;
        const {date, time} = this.state;

        const new_post_time = moment(date + '-' + time, 'YYYY-MM-DD-HH:mm').unix();

        return (
            <div className='post-manager-post-card'>
                <div className='post-manager-content'>
                    <img
                        className='post-manager-image'
                        src={image}
                    />
                    <Comment
                        getFieldDecorator={form.getFieldDecorator}
                        autoSize={{minRows: 4, maxRows: 4}}
                        style={{marginLeft: '4%', marginRight: '2%'}}
                        initialValue={comment}
                    />
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
                <SaveButton
                    post={this.props.post}
                    form={form}
                    post_time={new_post_time}
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

export default Form.create()(connect(null, mapDispatchToProps)(Post));