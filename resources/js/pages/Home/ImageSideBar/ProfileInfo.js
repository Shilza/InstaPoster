import React from "react";
import {connect} from "react-redux";
import getActiveProfile from '../../../store/selectors/profiles';

const ProfileInfo = ({getFieldDecorator, activeProfile}) => {
    const {login, avatar} = activeProfile;

    return (
        <div id='comment-profile-container'>
            <img id='comment-profile-image'
                 src={avatar}/>
            <a href={'https://instagram.com/' + login}
               target='_blank'>
                {login}
            </a>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        activeProfile: getActiveProfile(state)
    }
};

export default connect(mapStateToProps)(ProfileInfo);