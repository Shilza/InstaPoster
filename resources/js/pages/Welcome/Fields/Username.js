import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input/Input";
import Icon from "antd/es/icon/index";
import React from "react";

const Username = ({getFieldDecorator, fieldName}) => {
    return (
        <FormItem>
            {getFieldDecorator(fieldName, {
                rules: [{required: true, message: 'Please input your username!'}],
            })(
                <Input prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
                       placeholder="Username"/>
            )}
        </FormItem>
    );
};

Username.defaultProps = {
    fieldName: 'username'
};

export default Username;