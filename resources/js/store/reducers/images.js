import * as ActionTypes from '../action-types'

const initialState = {
    images: [],
    shownNowPic: ''
};

const images = (state = initialState, {type, payload = null}) => {
    switch (type) {
        case ActionTypes.ADD_IMAGES:
            return addImages(state, payload);
        case ActionTypes.SET_SHOWN_IMAGE:
            return setShown(state, payload);
        case ActionTypes.REMOVE_IMAGE:
            return removeImage(state, payload);
        case ActionTypes.SET_DONE:
            return setDone(state, payload);
        case ActionTypes.REMOVE_ALL:
            return removeAll(state);
        default:
            return state;
    }
};

const autoIncrement = (() => {
    let id = 0;
    return () => id++;
})();


function addImages(state, payload) {
    let images = [...state.images];
    const newPic = {
        image: payload,
        id: autoIncrement(),
        done: false,
        post_time: Math.floor(Date.now() / 1000) + 3600
        //Add one hour to post(default value)
    };
    images.push(newPic);

    state = {
        images,
        shownNowPic: newPic
    };

    return state;
}

function removeAll(state) {
    return {
        ...state,
        images: []
    };
}

function setDone(state, payload) {
    let images = [...state.images];

    images = images.map(item => {
        if (item.id === payload.id)
            item = payload;
        return item;
    });

    state = {
        ...state,
        images
    };

    return state;
}

function setShown(state, payload) {
    state = {
        ...state,
        shownNowPic: payload
    };

    return state;
}

function removeImage(state, payload) {
    let images = [...state.images];
    let shownNowPic = state.shownNowPic;

    images = images.filter(item => {
        if (item !== payload)
            return item;
    });

    if (payload === shownNowPic)
        shownNowPic = images[images.length - 1];

    return {
        images, shownNowPic
    }
}

export default images;