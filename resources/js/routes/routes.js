import Welcome from '../pages/Welcome/Welcome'
import Home from '../pages/Home/Home'
import Register from '../pages/Welcome/Register'
import ForgotPass from '../pages/Welcome/ForgotPass'
import ResetPass from '../pages/Welcome/ResetPass'
import PostManager from '../pages/Home/PostManager/PostManager'

export const routes = [
    {
        path: '/',
        exact: true,
        auth: false,
        component: Welcome
    },
    {
        path: '/home',
        exact: true,
        auth: true,
        component: Home
    },
    {
        path: '/login',
        exact: true,
        auth: false,
        component: Welcome
    },
    {
        path: '/register',
        exact: true,
        auth: false,
        component: Register
    },
    {
        path: '/password-reset',
        exact: true,
        auth: false,
        component: ForgotPass
    },
    {
        path: '/password-update/:token/:email',
        exact: true,
        auth: false,
        component: ResetPass
    },
    {
        path: '/manager',
        exact: true,
        auth: true,
        component: PostManager
    }
];