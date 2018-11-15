import React, {Fragment} from "react";
import Button from "antd/es/button/button";
import Modal from "antd/es/modal/Modal";
import Form from "antd/es/form/Form";
import Username from "../../Welcome/Fields/Username";
import Password from "../../Welcome/Fields/Password";

class AddUserModal extends React.Component {

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
        this.setState({loading: true});
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

export default Form.create()(AddUserModal);