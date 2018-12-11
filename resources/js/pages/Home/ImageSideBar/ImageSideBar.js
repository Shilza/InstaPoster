import React from "react";
import moment from 'moment';
import Drawer from "antd/es/drawer/index";
import Button from "antd/es/button/button";
import Tooltip from "antd/es/tooltip/index";
import {connect} from "react-redux";
import * as action from "../../../store/actions/index";
import {bindActionCreators} from "redux";
import {message} from "antd/lib/index";
import Form from "antd/es/form/Form";
import ProfileInfo from "./ProfileInfo";
import Comment from "../../Common/Fields/Comment";
import PostTimePicker from "../Common/PostTimePicker";
import DatePicker from "antd/es/date-picker/index";

class ImageSideBar extends React.Component {

    constructor(props) {
        super(props);

        const date = moment(moment.unix(props.shownNowPic.post_time).format('YYYY-MM-DD'))._i;
        const time = moment(moment.unix(props.shownNowPic.post_time).format('HH:mm'))._i ;

        this.state = {
            date,
            time
        };

        this.halfHour = 1800;

        this.datePickerChange = this.datePickerChange.bind(this);
        this.timePickerChange = this.timePickerChange.bind(this);
        this.submit = this.submit.bind(this);
        this.disabledDate = this.disabledDate.bind(this);
    }

    datePickerChange(date, dateString) {
        const {time} = this.state;
        const post_time = moment(dateString + '-' + time, 'YYYY-MM-DD-HH:mm').unix();
        if(post_time > moment().unix() + this.halfHour)
            this.setState({date: dateString});
        else
            message.error("Post data is invalid");
    }

    timePickerChange(date, dateString) {
        this.setState({time: dateString});
    }

    submit() {
        const {date, time} = this.state;
        const {form} = this.props;

        const post_time = moment(date + '-' + time, 'YYYY-MM-DD-HH:mm').unix();
        if(post_time > moment().unix() + this.halfHour) {
            const {setDone, shownNowPic} = this.props;
            form.validateFields((err, {comment}) => {
                if (!err){
                    comment = comment ? comment : "";
                    setDone({...shownNowPic, post_time, comment, done: true});
                }
            });
            message.success("Submit successfully");
        } else
            message.error("Post data is invalid");
    }

    disabledDate(current) {
        return current > moment(moment.now()).add(6, 'M');
    }

    render() {
        const {shownNowPic, form} = this.props;

        return (
            <div className='post-settings-container'>
                <ProfileInfo getFieldDecorator={form.getFieldDecorator}/>
                <Comment
                    getFieldDecorator={form.getFieldDecorator}
                />
                <PostTimePicker
                    disabledDate={this.disabledDate}
                    datePickerChange={this.datePickerChange}
                    timePickerChange={this.timePickerChange}
                    post_time={shownNowPic.post_time}
                />
                <div className='submit-image-container'>
                <Button type="primary" onClick={this.submit}>Submit</Button>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setDone: action.setDone
    }, dispatch);
};

export default Form.create()(connect(null, mapDispatchToProps)(ImageSideBar));
