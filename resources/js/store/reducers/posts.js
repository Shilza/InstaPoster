import * as ActionTypes from '../action-types'

const initialState = {
    posts: []
};

const posts = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.SET_POSTS:
            return setPosts(state, payload);
        default:
            return state;
    }
};

function setPosts(state, payload) {
    return {
        posts: payload
    }
}

export default posts;