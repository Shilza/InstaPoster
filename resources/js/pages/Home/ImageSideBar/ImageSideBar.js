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
import TextArea from "antd/es/input/TextArea";
import Input from "antd/es/input/Input";
import Alert from "antd/es/alert/index";

class ImageSideBar extends React.Component {

    constructor(props) {
        super(props);

        const date = moment(moment.unix(props.shownNowPic.post_time).format('YYYY-MM-DD'))._i;
        const time = moment(moment.unix(props.shownNowPic.post_time).format('HH:mm'))._i;

        this.state = {
            date,
            time,
            inputError: false
        };

        this.halfHour = 1800;
        this.maxTASize = 1000;

        this.datePickerChange = this.datePickerChange.bind(this);
        this.timePickerChange = this.timePickerChange.bind(this);
        this.submit = this.submit.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.textAreaRef = React.createRef();
    }

    handleChange(element) {
        const {setComment, shownNowPic} = this.props;

        if (element.target.value.length < this.maxTASize) {
            let image = shownNowPic;
            image.comment = element.target.value;
            setComment(image);

            if(this.state.inputError)
                this.setState({inputError: false});
        } else {
            this.textAreaRef.current.textAreaRef.value = element.target.value.substring(0, this.maxTASize);
            this.setState({inputError: true});
        }
    }

    datePickerChange(date, dateString) {
        const {time} = this.state;
        const post_time = moment(dateString + '-' + time, 'YYYY-MM-DD-HH:mm').unix();
        if (post_time > moment().unix() + this.halfHour)
            this.setState({date: dateString});
        else
            message.error("Post data is invalid");
    }

    timePickerChange(date, dateString) {
        this.setState({time: dateString});
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.shownNowPic.comment < this.maxTASize && this.state.inputError)
            this.setState({inputError: false});
        else if(nextProps.shownNowPic.comment >= this.maxTASize)
            this.setState({inputError: true});

        this.textAreaRef.current.textAreaRef.value = nextProps.shownNowPic.comment;
    }

    submit() {
        const {date, time} = this.state;

        const post_time = moment(date + '-' + time, 'YYYY-MM-DD-HH:mm').unix();
        if (post_time > moment().unix() + this.halfHour) {
            const {setDone, shownNowPic} = this.props;

            setDone({...shownNowPic, post_time, done: true});

            message.success("Submit successfully");
        } else
            message.error("Post data is invalid");
    }

    render() {
        const {shownNowPic, form} = this.props;
        const textAreaSize = {minRows: 7, maxRows: 7};
        const {inputError} = this.state;

        return (
            <div className='post-settings-container'>
                <ProfileInfo getFieldDecorator={form.getFieldDecorator}/>
                <TextArea
                    ref={this.textAreaRef}
                    autosize={textAreaSize}
                    onChange={this.handleChange}
                    placeholder='Your text'
                />
                {
                    inputError &&
                    <Alert
                        message={"Comment should not exceed " + this.maxTASize + " characters!"}
                        type="error"
                        style={{marginTop: 10, marginBottom: 10}}
                    />
                }
                <PostTimePicker
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
        setDone: action.setDone,
        setComment: action.setComment
    }, dispatch);
};

export default Form.create()(connect(null, mapDispatchToProps)(ImageSideBar));
