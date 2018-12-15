import React from 'react'
import {render} from 'react-dom'
import Routes from "./routes";
import Provider from "react-redux/es/components/Provider";
import * as AuthService from './services/Auth/services';
import store from './store'
import BladeLoader from "./pages/Home/Common/BladeLoader";

void async function start() {
    if (localStorage.hasOwnProperty('access_token')) {

        render(
            <BladeLoader/>,
            document.getElementById('root')
        );

        await store.dispatch(AuthService.me()).catch(e => {});
    }

    render(
        <Provider store={store}>
            <Routes/>
        </Provider>,
        document.getElementById('root')
    );
}();