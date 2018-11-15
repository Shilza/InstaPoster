import {combineReducers} from 'redux'
import auth from "./auth";
import images from "./images";
import instagramProfiles from "./instagramProfiles";


const RootReducer = combineReducers({
    auth,
    images,
    instagramProfiles
});


export default RootReducer;