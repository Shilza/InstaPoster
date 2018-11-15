import {createSelector} from "reselect/lib/index";

const getProfiles = state => state.instagramProfiles.profiles;
const getActiveProfile = createSelector(
    getProfiles,
    profiles => {

        let activeProfile = {};
        profiles.forEach(item => {
            if(item.active)
                activeProfile = item;
        });

        return activeProfile;
    }
);

export default getActiveProfile;