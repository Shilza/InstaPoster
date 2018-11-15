import React from "react";
import {bindActionCreators} from "redux";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";
import Icon from "antd/es/icon/index";
import {message} from "antd/lib/index";
import * as InstagramService from "../../../services/InstagramProfiles/service";

class Profile extends React.Component {

    constructor(props){
        super(props);

        this.setProfileActive = this.setProfileActive.bind(this);
        this.deleteProfile = this.deleteProfile.bind(this);
    }

    deleteProfile() {
        const {deleteProfile, login} = this.props;
        deleteProfile({login})
            .then(data => message.success(data.message))
            .catch(err => message.error(err.message));
    }

    setProfileActive() {
        this.props.setProfileActive(this.props.login);
    }

    render() {
        const {login} = this.props;
        return (
            <div className='header-profile'>
            <span onClick={this.setProfileActive}>{login}</span>
                <Icon
                    style={{fontSize: 12}}
                    type="close"
                    onClick={this.deleteProfile}
                />
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setProfileActive: actions.setProfileActive,
        deleteProfile: InstagramService.deleteProfile
    }, dispatch);
};


export default connect(null, mapDispatchToProps)(Profile);