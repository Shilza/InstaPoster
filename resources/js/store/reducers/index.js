import {combineReducers} from 'redux'
import Auth from "./Auth";
import Images from "./Images";
import InstagramProfiles from "./InstagramProfiles";

const RootReducer = combineReducers({Auth, Images, InstagramProfiles});

export default RootReducer;