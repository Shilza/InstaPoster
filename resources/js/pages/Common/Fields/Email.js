import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input/Input";
import Icon from "antd/es/icon/index";
import React from "react";

const Email = ({getFieldDecorator, initialValue}) => {
    return (
        <FormItem>
            {getFieldDecorator('email', {
                rules: [{
                    type: 'email', message: 'The input is not valid Email!',
                }, {
                    required: true, message: 'Please input your Email!',
                }],
                initialValue
            })(
                <Input prefix={<Icon type="mail" style={{color: 'rgba(0,0,0,.25)'}}/>} placeholder="Email"/>
            )}
        </FormItem>
    );
};

Email.defaultProps = {
    initialValue: null
};

export default Email;