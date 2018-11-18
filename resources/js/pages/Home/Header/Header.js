import React from "react";
import Dropdown from "antd/es/dropdown/dropdown";
import Icon from "antd/es/icon/index";
import {connect} from "react-redux";
import Menu from "antd/es/menu/index";
import Profile from "./Profile";
import AddProfileModal from "./AddProfileModal";
import * as AuthService from "../../../services/Auth/services";
import * as PostsService from "../../../services/Post/services";
import * as actions from "../../../store/actions";
import {bindActionCreators} from "redux";
import {withRouter} from "react-router-dom";

class Header extends React.Component {

    constructor(props){
        super(props);

        this.openPostManager = this.openPostManager.bind(this);
        this.openHome = this.openHome.bind(this);
    }

    openPostManager(){
        this.props.history.push('/manager');
    }

    openHome(){
        this.props.history.push('/home');
    }

    render() {
        const {user, instagramProfiles, logout, removeAll} = this.props;
        const menu = (
            <Menu>
                {
                    instagramProfiles.map(({login, active}) =>
                        <Menu.Item
                            key={login}
                            className={active ? 'active-profile' : ''}
                        >
                            <Profile login={login}/>
                        </Menu.Item>
                    )
                }
                <Menu.Item key="0">
                    <AddProfileModal/>
                </Menu.Item>
                <Menu.Item key='1'>
                    <span onClick={this.openPostManager}>Post manager</span>
                </Menu.Item>
                <Menu.Divider/>
                <Menu.Item key="2" onClick={
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
                <a className='logo' onClick={this.openHome}>
                    InstaPoster
                </a>
                <Dropdown overlay={menu} trigger={['click']}>
                    <div className='header-dropdown'>
                        <a style={{marginRight: '5%'}}>{user.username}</a>
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
        getPosts: PostsService.getPosts
    }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));