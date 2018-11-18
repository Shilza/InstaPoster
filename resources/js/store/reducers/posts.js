import * as ActionTypes from '../action-types'

const initialState = {
    posts: []
};

const posts = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.SET_POSTS:
            return setPosts(state, payload);
        case ActionTypes.DELETE_POST:
            return deletePost(state, payload);
        default:
            return state;
    }
};

function setPosts(state, payload) {
    return {
        posts: payload
    }
}

function deletePost(state, payload) {
    const posts = state.posts.map(item => {
        item.posts = item.posts.filter(item => {
            if (item.id !== payload)
                return item;
        });

        return item;
    });

    return {
        posts
    }
}

export default posts;