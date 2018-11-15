import React from "react";
import {bindActionCreators} from "redux";
import * as actions from "../../../store/actions";
import {connect} from "react-redux";

class Profile extends React.Component {

    constructor(props){
        super(props);

        this.setProfileActive = this.setProfileActive.bind(this);
    }

    setProfileActive() {
        this.props.setProfileActive(this.props.login);
    }

    render() {
        const {login} = this.props;
        return <span onClick={this.setProfileActive}>{login}</span>
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        setProfileActive: actions.setProfileActive
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(Profile);