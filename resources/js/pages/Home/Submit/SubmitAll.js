import React, {Fragment} from "react";
import Button from "antd/es/button/button";
import connect from "react-redux/es/connect/connect";
import {message} from "antd/lib/index";
import {bindActionCreators} from "redux";
import * as actions from "../../../store/actions/index";
import * as PostService from "../../../services/Post/service";
import SubmitAllModal from "./SubmitAllModal";
import getActiveProfile from "../../../store/selectors/profiles";

class SubmitAll extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadingAll: false,
            visible: false,
            countPosted: 0
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.postImages = this.postImages.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleCancel() {
        this.setState({visible: false});
    }

    onSubmit() {
        const {images} = this.props;

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
        else
            this.postImages();
    }

    postImages(){
        const {images, removeAll, post, activeProfile} = this.props;

        this.setState({loadingAll: true});
        post({images, poster: activeProfile.login}).then(data => {
            this.setState({loadingAll: false});
            removeAll();
            message.success(data.message);
        }).catch(data => {
            this.setState({loadingAll: false});
            message.error(data.message)
        });
    }

    render() {
        const {visible, countPosted, loadingAll} = this.state;

        return (
            <Fragment>
                <Button type='primary' onClick={this.onSubmit} loading={loadingAll}>Submit All</Button>
                <SubmitAllModal
                    countPosted={countPosted}
                    visible={visible}
                    submit={this.postImages}
                    handleCancel={this.handleCancel}
                />
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        images: state.images.images,
        activeProfile: getActiveProfile(state)
    }
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        removeAll: actions.removeAll,
        post: PostService.post
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitAll);