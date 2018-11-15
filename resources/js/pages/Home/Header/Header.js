import React from "react";
import Dropdown from "antd/es/dropdown/dropdown";
import Icon from "antd/es/icon/index";
import {connect} from "react-redux";
import Menu from "antd/es/menu/index";
import Profile from "./Profile";
import AddUserModal from "./AddUserModal";
import * as AuthService from "../../../services/Auth/services";
import * as actions from "../../../store/actions";
import {bindActionCreators} from "redux";

class Header extends React.Component {

    render() {
        const {user, instagramProfiles, logout, removeAll} = this.props;
        const menu = (
            <Menu>
                {
                    instagramProfiles.map(({login, active}) =>
                        <Menu.Item key={login} className={active ? 'active-profile' : ''}>
                            <Profile login={login}/>
                        </Menu.Item>
                    )
                }
                <Menu.Item key="0">
                    <AddUserModal/>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="1" onClick={
                    () => {
                        logout();
                        removeAll();
                    }
                }>
                    Logout
                </Menu.Item>
            </Menu>
        );

        return (
            <div className='home-header'>
                <a className='logo'>
                    InstaPoster
                </a>
                <Dropdown overlay={menu} trigger={['click']}>
                    <div className='header-dropdown'>
                        <div style={{display: 'flex', justifyContent: 'space-around', alignItems: 'flex-end'}}>
                            <a style={{marginRight: '5%'}}>{user.username}</a>
                            <img id='comment-profile-image'
                                 src={'https://pp.userapi.com/c844617/v844617683/f8d9c/lKSt8v-NIyQ.jpg?ava=1'}/>

                        </div>
                        <a className="ant-dropdown-link" href="#">
                            <Icon type="down"/>
                        </a>
                    </div>
                </Dropdown>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        instagramProfiles: state.instagramProfiles.profiles
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        logout: AuthService.logout,
        removeAll: actions.removeAll,
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);