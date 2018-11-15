import * as ActionTypes from '../action-types'

const initialState = {
    profiles: [],
};

const InstagramProfiles = (state = initialState, {type, payload = null}) => {

    switch (type) {
        case ActionTypes.SET_PROFILES:
            return setProfiles(state, payload);
        case ActionTypes.SET_PROFILE_ACTIVE:
            return setProfileActive(state, payload);
        default:
            return state;
    }
};

function setProfiles(state, payload) {
    const profiles = payload.map(
        (item, index) => {
            item.active = index === payload.length - 1;
            return item;
        }
    );

    return {
        profiles
    };
}

function setProfileActive(state, payload) {
    const profiles = state.profiles.map(item => {
        item.active = payload === item.login;
        return item;
    });

    return {
        profiles
    }
}

export default InstagramProfiles;