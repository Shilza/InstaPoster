import {createSelector} from "reselect/lib/index";

const getImages = state => state.images.images;
export const getDoneImages = createSelector(
    getImages,
    images => {

        return [...images].filter(item => {
            if(item.done)
                return item;
        });
    }
);

export const getShownImage = createSelector(
    getImages,
    images => {

        return [...images].filter(item => {
            if(item.shown)
                return item;
        })[0];
    }
);