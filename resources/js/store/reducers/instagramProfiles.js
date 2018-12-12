import * as ActionTypes from '../action-types'

const initialState = {
    profiles: []
};

const instagramProfiles = (state = initialState, {type, payload = null}) => {

    switch (type) {
        case ActionTypes.SET_PROFILES:
            return setProfiles(state, payload);
        case ActionTypes.SET_PROFILE_ACTIVE:
            return setProfileActive(state, payload);
        case ActionTypes.ADD_PROFILE:
            return addProfile(state, payload);
        case ActionTypes.DELETE_PROFILE:
            return deleteProfile(state, payload);
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

    return { profiles }
}

function setProfileActive(state, payload) {
    const profiles = state.profiles.map(item => {
        item.active = payload === item.login;
        return item;
    });

    return { profiles }
}

function addProfile(state, payload) {
    let profiles = [...state.profiles];
    profiles.push(payload);

    return { profiles };
}

function deleteProfile(state, payload) {
    const profiles = state.profiles.filter(item => {
        if(item.login !== payload)
            return item;
    });

    return { profiles };
}

export default instagramProfiles;