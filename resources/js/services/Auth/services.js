import Http from '../../Http'
import * as action from '../../store/actions/index'

function setAccessToken(expires, token) {
    localStorage.setItem('access_token', token);
    localStorage.setItem('expires_in', expires);
}

export function login({remember, ...credentials}) {
    return dispatch => (
        Http.post('api/auth/login', credentials)
            .then(({data}) => {
                dispatch(action.authLogin(data.user));
                dispatch(action.setProfiles(data.instagramProfiles));

                if(remember)
                    setAccessToken(data.expires_in, data.access_token);
                Http.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
            })
    )
}

export function logout() {
    return dispatch => (
        Http.post('api/auth/logout')
            .then(() => dispatch(action.authLogout()))
    )
}

export function me() {
    return dispatch => (
        new Promise((resolve, reject) => {
        Http.post('api/auth/me')
            .then(({data}) => {
                dispatch(action.authLogin(data.user));
                dispatch(action.setProfiles(data.instagramProfiles));

                resolve(data);
            })
            .catch(err => reject(err))
        }
    ));
}

export function refresh() {
    return new Promise((resolve, reject) => {
        Http.post('api/auth/refresh')
            .then(({data}) => {
                setAccessToken(data.expires_in, data.access_token);
                Http.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`;
                resolve(data);
            })
            .catch(err => reject(err))
    });
}

export function resetPassword(credentials) {
    return dispatch => Http.post('api/auth/password/create', credentials)
}

export function updatePassword(credentials) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('api/auth/password/reset', credentials)
                .then(({data}) => {
                    return resolve(data.message);
                })
                .catch(err => {
                    const data = {
                        message: err.response.data.message,
                        statusCode: err.response.status,
                    };
                    return reject(data);
                })
        })
    )
}

export function register(credentials) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('api/auth/register', credentials)
                .then(({data}) => resolve(data))
                .catch(err => reject(err.response.data))
        })
    )
}
