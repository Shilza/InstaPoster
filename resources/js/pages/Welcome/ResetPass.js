import Form from "antd/es/form/Form";
import React from "react";
import Button from "antd/es/button/button";
import Icon from "antd/es/icon/index";
import Welcome from "./Welcome";
import Link from "react-router-dom/es/Link";
import * as AuthService from "../../services/Auth/services";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import Spin from "antd/es/spin/index";
import {message} from "antd/lib/index";
import {withRouter} from 'react-router-dom'
import Confirm from "./Fields/Confirm";
import Password from "./Fields/Password";
import Email from "./Fields/Email";

const FormItem = Form.Item;

class ResetPass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleConfirmBlur = this.handleConfirmBlur.bind(this);
        this.compareToFirstPassword = this.compareToFirstPassword.bind(this);
        this.validateToNextPassword = this.validateToNextPassword.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {form, updatePassword, match, history} = this.props;
        form.validateFields((err, {password, confirm}) => {
            if (!err) {
                this.setState({loading: true});
                updatePassword({
                    email: match.params.email.replace("29gnmLTv686QsnV", "@"),
                    token: match.params.token,
                    password_confirmation: confirm,
                    password,
                }).then(data => {
                    this.setState({loading: false});
                    message.success(data.message);
                    history.push('/');
                }).catch(err => {
                    this.setState({loading: false});
                    message.error(err.message);
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
                <h1 style={{textAlign: 'center'}}>Reset password</h1>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Email
                        getFieldDecorator={getFieldDecorator}
                        initialValue={this.props.match.params.email.replace("29gnmLTv686QsnV", "@")}
                    />
                    <Password
                        getFieldDecorator={getFieldDecorator}
                        validator={this.validateToNextPassword}
                    />
                    <Confirm
                        getFieldDecorator={getFieldDecorator}
                        validator={this.compareToFirstPassword}
                        onBlur={this.handleConfirmBlur}
                    />
                    <FormItem>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Reset
                        </Button>
                        <div className='one-line-welcome'>
                            <Link to={'/'}>Log in</Link>
                            <Link to={'/register'}>Register</Link>
                        </div>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        updatePassword: AuthService.updatePassword,
    }, dispatch);
};

const Page = props => {
    const WrappedResetPass = Form.create()(connect(null, mapDispatchToProps)(withRouter(ResetPass)));
    return <Welcome><WrappedResetPass {...props}/></Welcome>
};

export default Page;