import React, {Fragment} from "react";
import Button from "antd/es/button/button";
import Modal from "antd/es/modal/Modal";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import * as InstagramService from "../../../services/InstagramProfiles/service";
import Icon from "antd/es/icon/index";

class DeleteProfileModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            loading: false
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.showModal = this.showModal.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
    }

    handleCancel() {
        this.setState({visible: false, loading: false});
    }

    deleteProfile() {
        const {deleteProfile, login} = this.props;

        this.setState({loading: true});
        deleteProfile({login})
            .then(data => {
                message.success(data.message);
                this.setState({visible: false, loading: false});
            })
            .catch(err => {
                message.error(err.message);
                this.setState({loading: false});
            });
    }

    showModal() {
        const {instagramProfiles} = this.props;

        if (instagramProfiles.length > 1)
            this.setState({visible: true});
        else
            message.error('Profile cannot be deleted, at least one account must be linked');
    }

    render() {
        const {visible, loading} = this.state;

        return (
            <Fragment>
                <Icon
                    style={{fontSize: 12}}
                    type="close"
                    onClick={this.showModal}
                />
                <Modal
                    className='add-user-modal'
                    visible={visible}
                    title={'Delete ' + this.props.login + ' profile'}
                    onCancel={this.handleCancel}
                    onOk={this.deleteProfile}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                        <Button
                            key="delete"
                            htmlType="submit"
                            type="primary"
                            onClick={this.deleteProfile}
                            loading={loading}
                        >
                            Delete
                        </Button>
                    ]}
                >
                    <span>
                        When deleting an account, the scheduled posts will not be published. Are you sure?
                    </span>
                </Modal>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        instagramProfiles: state.instagramProfiles.profiles
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        deleteProfile: InstagramService.deleteProfile
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(DeleteProfileModal);