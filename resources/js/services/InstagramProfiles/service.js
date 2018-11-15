import * as action from "../../store/actions";
import Http from "../../Http";

export function addProfile(payload) {
    return dispatch => (
        new Promise((resolve, reject) => {
                Http.post('api/inst/add', payload)
                    .then(({data}) => {
                        dispatch(action.addProfile(data.profile));

                        resolve(data);
                    })
                    .catch(err => reject(err.response.data))
            }
        ));
}
