import Modal from "antd/es/modal/Modal";
import Button from "antd/es/button/button";
import React from "react";
import {connect} from "react-redux";

class SubmitAllModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    render() {
        const {countPosted, images, submit, visible, handleCancel} = this.props;
        const {loading} = this.state;

        return (
            <Modal
                visible={visible}
                title="Submit"
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>Cancel</Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={submit}>
                        Submit
                    </Button>
                ]}
            >
                <p>
                    <strong>{countPosted} </strong>
                    out of
                    <strong> {images.length} </strong>
                    photos will be published
                </p>
            </Modal>
        );
    }
}

const mapStateToProps = state => {
    return {
        images: state.images.images
    }
};

export default connect(mapStateToProps)(SubmitAllModal);