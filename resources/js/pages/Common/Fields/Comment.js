import React from "react";
import TextArea from "antd/es/input/TextArea";
import FormItem from "antd/es/form/FormItem";

const Comment = ({getFieldDecorator}) => {
    return (
        <FormItem>
            {getFieldDecorator('comment', {
                rules: [{
                    max: 1000, message: 'Comment should not exceed 1000 characters!'
                }]
            })(
                <TextArea autosize={{minRows: 7, maxRows: 7}} placeholder="Your text"/>
            )}
        </FormItem>
    );
};

export default Comment;