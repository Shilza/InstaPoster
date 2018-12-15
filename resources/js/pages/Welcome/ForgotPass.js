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
import Email from "../Common/Fields/Email";

const FormItem = Form.Item;

class ForgotPass extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const {form, resetPassword} = this.props;
        form.validateFields((err, {email}) => {
            if (!err) {
                this.setState({loading: true});
                resetPassword({email})
                    .then(data => {
                        this.setState({loading: false});
                        message.success(data);
                    })
                    .catch(data => {
                        this.setState({loading: false});
                        message.error(data);
                    });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const {loading} = this.state;
        const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;

        return (
            <Spin spinning={loading} indicator={antIcon} delay={150}>
                <h1 style={{textAlign: 'center'}}>Reset password</h1>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Email getFieldDecorator={getFieldDecorator}/>
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
        resetPassword: AuthService.resetPassword
    }, dispatch);
};

const Page = () => {
    const WrappedResetPass = Form.create()(connect(null, mapDispatchToProps)(ForgotPass));
    return <Welcome><WrappedResetPass/></Welcome>
};

export default Page;