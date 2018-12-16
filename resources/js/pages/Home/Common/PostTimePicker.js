import DatePicker from "antd/es/date-picker/index";
import TimePicker from "antd/es/time-picker/index";
import React from "react";
import moment from 'moment';

class PostTimePicker extends React.Component{

    constructor(props) {
        super(props);

        this.disabledDate = this.disabledDate.bind(this);
    }

    disabledDate(current) {
        return current && current < moment().subtract(1, 'days');
    }

    render() {

        const {
            datePickerChange,
            timePickerChange,
            post_time
        } = this.props;

        const timeFormat = 'HH:mm';
        const dateFormat = 'YYYY-MM-DD';

        const date = moment(moment.unix(post_time).format(dateFormat));
        const time = moment(moment.unix(post_time).format(timeFormat));

        return (
            <div className='date-picker'>
                <DatePicker
                    onChange={datePickerChange}
                    defaultValue={date}
                    format={dateFormat}
                    disabledDate={this.disabledDate}
                />
                <TimePicker defaultValue={moment(time._i, timeFormat)}
                            format={timeFormat}
                            style={{maxWidth: '100px'}}
                            onChange={timePickerChange}/>
            </div>
        );
    }
}


export default PostTimePicker;