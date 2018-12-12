import * as ActionTypes from '../action-types'

const initialState = {
    images: []
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
            return removeAll();
        default:
            return state;
    }
};

const autoIncrement = (() => {
    let id = 0;
    return () => id++;
})();


function addImages(state, payload) {
    let images = [...state.images].map(item => {
            item.shown = false;
            return item;
        }
    );

    const newPic = {
        image: payload,
        id: autoIncrement(),
        done: false,
        post_time: Math.floor(Date.now() / 1000) + 3600,
        shown: true
        //Add one hour to post(default value)
    };
    images.push(newPic);

    return {images};
}

function removeAll() {
    return {
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

    return {images};
}

function setShown(state, payload) {
    let images = [...state.images].map(item => {
        item.shown = item === payload;

        return item;
    });

    return {images}
}

function removeImage(state, payload) {
    let shownContains = false;
    let images = [...state.images].filter((item, index) => {
        if (item.id !== payload.id) {
            if (state.images.length - 2 === index) {
                shownContains = true;
                item.shown = true;
            }

            return item;
        }
    });

    if(!shownContains)
        images[images.length - 1].shown = true;

    return {images}
}

export default images;