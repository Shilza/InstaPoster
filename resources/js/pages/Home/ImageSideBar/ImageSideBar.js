import React from "react";
import moment from 'moment';
import DatePicker from "antd/es/date-picker/index";
import TimePicker from "antd/es/time-picker/index";
import Drawer from "antd/es/drawer/index";
import Button from "antd/es/button/button";
import Tooltip from "antd/es/tooltip/index";
import {connect} from "react-redux";
import * as action from "../../../store/actions/index";
import {bindActionCreators} from "redux";
import TextArea from "antd/es/input/TextArea";
import {message} from "antd/lib/index";
import Form from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import ProfileInfo from "./ProfileInfo";

class ImageSideBar extends React.Component {

    constructor(props) {
        super(props);

        const date = moment(moment.unix(props.shownNowPic.post_time).format('YYYY-MM-DD'))._i;
        const time = moment(moment.unix(props.shownNowPic.post_time).format('HH:mm'))._i ;

        this.state = {
            visible: false,
            date,
            time
        };

        this.onCh = this.onCh.bind(this);
        this.tt = this.tt.bind(this);
        this.drawer = this.drawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.submit = this.submit.bind(this);
    }

    onCh(date, dateString) {
        this.setState({date: dateString});
    }

    tt(date, dateString) {
        this.setState({time: dateString});
    }

    drawer() {
        this.setState((prevState) => ({visible: !prevState.visible}));
    }

    onClose() {
        this.setState({visible: false});
    }

    submit() {
        const {date, time} = this.state;
        const {form} = this.props;

        if(moment(date + '-' + time, 'YYYY-MM-DD-HH:mm').unix() > moment().unix()) {
            const {setDone, shownNowPic} = this.props;
            const post_time = moment(date + '-' + time, 'YYYY-MM-DD-HH:mm').unix();
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

    render() {
        const {shownNowPic, form} = this.props;

        return (
            <div className='post-settings-container'>
                <ProfileInfo getFieldDecorator={form.getFieldDecorator}/>
                <LocalDatePicker onCh={this.onCh} tt={this.tt} post_time={shownNowPic.post_time}/>
                <SubmitPreview submit={this.submit} drawer={this.drawer}/>

                <Drawer
                    width={640}
                    placement="right"
                    closable={false}
                    onClose={this.onClose}
                    visible={this.state.visible}
                >
                    <Button onClick={this.onClose}>Close</Button>
                </Drawer>
            </div>
        );
    }
}

const SubmitPreview = ({submit, drawer}) => {
    return (
        <div className='submit-preview-container'>
            <Button type="primary" onClick={submit}>Submit</Button>
            <Tooltip placement="right" title={'Preview'}>
                <a onClick={drawer}>Preview</a>
            </Tooltip>
        </div>
    );
};

const LocalDatePicker = ({onCh, tt, post_time}) => {
    const timeFormat = 'HH:mm';
    const dateFormat = 'YYYY-MM-DD';

    const date = moment(moment.unix(post_time).format(dateFormat));
    const time = moment(moment.unix(post_time).format(timeFormat));

    return (
        <div className='date-picker'>

            <DatePicker onChange={onCh} defaultValue={date} format={dateFormat}/>
            <TimePicker defaultValue={moment(time._i,timeFormat)} format={timeFormat} style={{maxWidth: '100px'}}
                        onChange={tt}/>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setDone: action.setDone
    }, dispatch);
};

export default Form.create()(connect(null, mapDispatchToProps)(ImageSideBar));
