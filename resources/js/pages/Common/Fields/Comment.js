import React from "react";
import TextArea from "antd/es/input/TextArea";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input/Input";

const Comment = ({getFieldDecorator, autoSize, style, initialValue}) => {

    return (
        <FormItem style={style}>
            {getFieldDecorator('comment', {
                rules: [{
                    max: 1000, message: 'Comment should not exceed 1000 characters!'
                }],
                initialValue
            })(
                <TextArea
                    autosize={autoSize}
                    placeholder="Your text"
                />
            )}
        </FormItem>
    );
};

Comment.defaultProps = {
    autoSize: {minRows: 7, maxRows: 7},
    style: {}
};

export default Comment;