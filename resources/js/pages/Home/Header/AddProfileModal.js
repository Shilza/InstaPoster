import React, {Fragment} from "react";
import Button from "antd/es/button/button";
import Modal from "antd/es/modal/Modal";
import Form from "antd/es/form/Form";
import Username from "../../Common/Fields/Username";
import Password from "../../Common/Fields/Password";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import * as InstagramService from "../../../services/InstagramProfiles/service";

class AddProfileModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            loading: false
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.onAdd = this.onAdd.bind(this);
        this.showModal = this.showModal.bind(this);
    }

    handleCancel() {
        this.setState({visible: false, loading: false});
    }

    onAdd() {
        const {addProfile, form} = this.props;
        this.setState({loading: true});

        form.validateFields((err, {username, password}) => {
            if(!err){
                addProfile({instagramName: username, instagramPassword: password})
                    .then(data => {
                        this.setState({loading: false, visible: false});
                        message.success(data.message);
                    })
                    .catch(err => {
                        this.setState({loading: false});
                        message.error(err.message);
                    });
            }

        });
    }

    showModal() {
        this.setState({visible: true});
    }

    render() {
        const {visible, loading} = this.state;
        const {getFieldDecorator} = this.props.form;

        return (
            <Fragment>
                <div className='add-user-action' onClick={this.showModal}>
                    <Button size='small' shape='circle' icon='user-add'/>
                    Add
                </div>
                <Modal
                    className='add-user-modal'
                    visible={visible}
                    title="Add new Instagram user"
                    onCancel={this.handleCancel}
                    onOk={this.onAdd}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                        <Button
                            key="add"
                            htmlType="submit"
                            type="primary"
                            onClick={this.onAdd}
                            loading={loading}
                        >
                            Add
                        </Button>
                    ]}
                >

                    <Form onSubmit={this.onAdd} className="login-form">
                        <Username getFieldDecorator={getFieldDecorator}/>
                        <Password getFieldDecorator={getFieldDecorator}/>
                    </Form>
                </Modal>
            </Fragment>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        addProfile: InstagramService.addProfile
    }, dispatch);
};

export default Form.create()(connect(null, mapDispatchToProps)(AddProfileModal));