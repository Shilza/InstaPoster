import React from 'react'
import {Route, Redirect} from 'react-router'
import {connect} from 'react-redux'
import {Main} from "../Main";
import Header from "../pages/Home/Header/Header";

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Main>
                <Header/>
                <Component {...props}/>
            </Main>
        ) : (
            <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(PrivateRoute);