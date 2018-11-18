import DatePicker from "antd/es/date-picker/index";
import TimePicker from "antd/es/time-picker/index";
import React from "react";
import moment from 'moment';

const PostTimePicker = props => {
    const{
        datePickerChange,
        timePickerChange,
        post_time
    } = props;

    const timeFormat = 'HH:mm';
    const dateFormat = 'YYYY-MM-DD';

    const date = moment(moment.unix(post_time).format(dateFormat));
    const time = moment(moment.unix(post_time).format(timeFormat));

    return (
        <div className='date-picker'>
            <DatePicker onChange={datePickerChange} defaultValue={date} format={dateFormat}/>
            <TimePicker defaultValue={moment(time._i,timeFormat)}
                        format={timeFormat}
                        style={{maxWidth: '100px'}}
                        onChange={timePickerChange}/>
        </div>
    );
};

export default PostTimePicker;