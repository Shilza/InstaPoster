import React from "react";
import {connect} from "react-redux";
import getActiveProfile from '../../../store/selectors/profiles';

const ProfileInfo = ({getFieldDecorator, activeProfile}) => {
    const {login} = activeProfile;

    return (
        <div id='comment-profile-container'>
            <img id='comment-profile-image'
                 src={'https://pp.userapi.com/c844617/v844617683/f8d9c/lKSt8v-NIyQ.jpg?ava=1'}/>
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