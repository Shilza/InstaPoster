import Http from '../../Http'
import * as action from '../../store/actions/index'

export function post(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('api/post/create', data)
                .then(({data}) => resolve(data))
                .catch(({response}) => reject(response.data))
        })
    )
}