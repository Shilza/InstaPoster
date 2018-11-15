import * as ActionTypes from '../action-types'

export function authLogin(payload){
    return {
        type: ActionTypes.AUTH_LOGIN,
        payload
    }
}

export function authLogout(){
    return {
        type: ActionTypes.AUTH_LOGOUT
    }
}

export function setProfiles(payload) {
    return {
        type: ActionTypes.SET_PROFILES,
        payload
    }
}

export function setProfileActive(payload) {
    return {
        type: ActionTypes.SET_PROFILE_ACTIVE,
        payload
    }
}

export function addProfile(payload) {
    return {
        type: ActionTypes.ADD_PROFILE,
        payload
    }
}
export function setImages(payload) {
    return {
        type: ActionTypes.ADD_IMAGES,
        payload
    }
}

export function setShownImage(payload) {
    return {
        type: ActionTypes.SET_SHOWN_IMAGE,
        payload
    }
}

export function removeImage(payload) {
    return {
        type: ActionTypes.REMOVE_IMAGE,
        payload
    }
}

export function setDone(payload) {
    return {
        type: ActionTypes.SET_DONE,
        payload
    }
}

export function removeAll(payload) {
    return {
        type: ActionTypes.REMOVE_ALL,
        payload
    }
}