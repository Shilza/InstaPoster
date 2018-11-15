import * as ActionTypes from '../action-types'

const logout = store => next => action => {
    if(action.type === ActionTypes.AUTH_LOGOUT) {
        localStorage.removeItem('expires_in');
        localStorage.removeItem('access_token');
    }
    return next(action);
};

export default logout;