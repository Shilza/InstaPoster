import Form from "antd/es/form/Form";
import React from "react";
import Button from "antd/es/button/button";
import Icon from "antd/es/icon/index";
import Welcome from "./Welcome";
import Link from "react-router-dom/es/Link";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as AuthService from "../../services/Auth/services";
import Spin from "antd/es/spin/index";
import {withRouter} from 'react-router-dom'
import {message} from "antd/lib/index";
import Email from "./Fields/Email";
import Username from "./Fields/Username";
import Password from "./Fields/Password";
import Confirm from "./Fields/Confirm";

const FormItem = Form.Item;


class Register extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            confirmDirty: false,
            loading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword = this.validateToNextPassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {register, form, history} = this.props;

        form.validateFieldsAndScroll((err, {
            email, username, password, confirm, instagramLogin, instagramPassword
        }) => {
            if (!err) {
                this.setState({loading: true});
                register({
                    email, username, password,
                    password_confirmation: confirm,
                    instagramLogin, instagramPassword
                }).then(
                    data => {
                        message.success(data.message);
                        this.setState({loading: false});
                        history.push('/');
                    }
                ).catch(data => {
                    if (Array.isArray(data.message))
                        Object.keys(data.message).forEach(item => {
                            message.error(data.message[item]);
                        });
                    else
                        message.error(data.message);
                    this.setState({loading: false});
                });
            }
        });
    }

    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({confirmDirty: this.state.confirmDirty || !!value});
    }

    compareToFirstPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }

    validateToNextPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], {force: true});
        }
        callback();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;

        return (
            <Spin spinning={this.state.loading} indicator={antIcon} delay={150}>
                <h1 style={{textAlign: 'center'}}>Register</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Email getFieldDecorator={getFieldDecorator}/>
                    <Username getFieldDecorator={getFieldDecorator}/>
                    <Password
                        getFieldDecorator={getFieldDecorator}
                        validator={this.validateToNextPassword}
                    />
                    <Confirm
                        getFieldDecorator={getFieldDecorator}
                        validator={this.compareToFirstPassword}
                        onBlur={this.handleConfirmBlur}
                    />
                    <h3 style={{textAlign: 'center'}}>Instagram</h3>
                    <Username
                        getFieldDecorator={getFieldDecorator}
                        fieldName='instagramLogin'
                    />
                    <Password
                        getFieldDecorator={getFieldDecorator}
                        fieldName='instagramPassword'
                        validator={this.validateToNextPassword}
                    />
                    <FormItem>
                        <div className='one-line-welcome'>
                            <Button type="primary" htmlType="submit">Register</Button>
                            <Link to={'/'}>Log in</Link>
                        </div>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        register: AuthService.register
    }, dispatch);
};

const Page = () => {
    const WrappedRegister = Form.create()(connect(null, mapDispatchToProps)(withRouter(Register)));
    return <Welcome><WrappedRegister/></Welcome>
};

export default Page;