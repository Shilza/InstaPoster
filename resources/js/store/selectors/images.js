import {createSelector} from "reselect/lib/index";

const getImages = state => state.images.images;
const getDoneImages = createSelector(
    getImages,
    images => {
        let doneImages = [...images];

        return doneImages.filter(item => {
            if(item.done) {
                return item;
            }
        });
    }
);

export default getDoneImages;