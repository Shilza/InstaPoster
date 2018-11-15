import Checkbox from "antd/es/checkbox/Checkbox";
import FormItem from "antd/es/form/FormItem";
import Link from "react-router-dom/es/Link";
import Button from "antd/es/button/button";
import React from "react";

const Remember = ({getFieldDecorator, remember, onChange}) => {
    return (
        <FormItem>
            {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: remember,
            })(
                <Checkbox onChange={onChange}>Remember me</Checkbox>
            )}
            <Link className="login-form-forgot" to={'/password-reset'}>Forgot password</Link>
            <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
            </Button>
            <Link style={{textAlign: 'center', display: 'block'}} to={'/register'}>Register now!</Link>
        </FormItem>
    );
};

export default Remember;