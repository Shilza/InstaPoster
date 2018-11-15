import React, {Fragment} from "react";
import Button from "antd/es/button/button";
import Modal from "antd/es/modal/index";
import connect from "react-redux/es/connect/connect";
import {message} from "antd/lib/index";
import {bindActionCreators} from "redux";
import * as actions from "../../store/actions";
import * as PostService from "../../services/Post/service";

class SubmitErrorModal extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: false,
            loadingAll: false,
            visible: false,
            countPosted: null
        };

        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit() {
        const {images, removeAll, post} = this.props;

        let countPosted = 0;

        images.forEach(item => {
            if (item.done)
                countPosted++;
        });

        if (countPosted === 0) {
            message.error('Submit at least one photo(set publication date)');
        }
        else if (countPosted !== images.length)
            this.setState({visible: true, countPosted});
        else {
            this.setState({loadingAll: true});
            post(images).then(data => {
                this.setState({loadingAll: false});
                removeAll();
                message.success(data.message);
            }).catch(data => {
                this.setState({loadingAll: false});
                message.error(data.message)
            });
        }
    }

    handleOk() {
        this.setState({loading: true});
        setTimeout(() => {
            this.setState({loading: false, visible: false});
            this.props.removeAll();
        }, 3000);
    }

    handleCancel() {
        this.setState({visible: false});
    }

    render() {
        const {loading, visible, countPosted, loadingAll} = this.state;
        const {images} = this.props;

        return (
            <Fragment>
                <Button type='primary' onClick={this.onSubmit} loading={loadingAll}>Submit All</Button>
                <Modal
                    visible={visible}
                    title="Submit"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Cancel</Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
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
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        images: state.Images.images
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        removeAll: actions.removeAll,
        post: PostService.post
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitErrorModal);