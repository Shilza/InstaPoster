import Form from "antd/es/form/Form";
import React from "react";
import Icon from "antd/es/icon/index";
import {bindActionCreators} from "redux";
import * as AuthService from "../../services/Auth/services";
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import {withRouter} from 'react-router-dom'
import Spin from "antd/es/spin/index";
import Password from "./Fields/Password";
import Remember from "./Fields/Remember";
import Email from "./Fields/Email";

class Login extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            remember: true
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeRemember = this.changeRemember.bind(this);
    }

    changeRemember() {
        this.setState((prevState) => ({remember: !prevState.remember}));
    }

    handleSubmit(e) {
        e.preventDefault();
        const {form, login, history} = this.props;
        const {remember} = this.state;

        form.validateFields((err, {email, password}) => {
            if (!err) {
                this.setState({loading: true});
                login({email, password, remember})
                    .then(() => history.push('/home'))
                    .catch(err => {
                        this.setState({loading: false});
                        message.error(err.response.data.message);
                    });
            }
        });
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;
        const {remember} = this.state;

        return (
            <Spin spinning={this.state.loading} indicator={antIcon}>
                <h1 style={{textAlign: 'center'}}>Login</h1>
                <Form onSubmit={this.handleSubmit}>
                    <Email getFieldDecorator={getFieldDecorator}/>
                    <Password
                        getFieldDecorator={getFieldDecorator}
                        validator={this.validateToNextPassword}
                    />
                    <Remember getFieldDecorator={getFieldDecorator}
                              remember={remember}
                              onChange={this.changeRemember}
                    />
                </Form>
            </Spin>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        login: AuthService.login,
    }, dispatch);
};

export default Form.create()(connect(null, mapDispatchToProps)(withRouter(Login)));