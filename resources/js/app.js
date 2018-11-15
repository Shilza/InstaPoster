import React from 'react'
import {render} from 'react-dom'
import Routes from "./routes";
import Provider from "react-redux/es/components/Provider";
import * as AuthService from './services/Auth/services';
import store from './store'

void async function start() {
    if (localStorage.hasOwnProperty('access_token'))
        await store.dispatch(AuthService.me());

    render(
        <Provider store={store}>
            <Routes/>
        </Provider>,
        document.getElementById('root')
    );
}();