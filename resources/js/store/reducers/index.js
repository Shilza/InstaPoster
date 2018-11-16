import {combineReducers} from 'redux'
import auth from "./auth";
import images from "./images";
import instagramProfiles from "./instagramProfiles";
import posts from "./posts";


const RootReducer = combineReducers({
    auth,
    images,
    instagramProfiles,
    posts
});


export default RootReducer;