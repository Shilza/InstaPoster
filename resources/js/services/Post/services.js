import Http from '../../Http'
import * as action from '../../store/actions/index'

export function post(data) {
    return dispatch => (
        new Promise((resolve, reject) => {
            Http.post('api/post/create', data)
                .then(({data}) => resolve(data.message))
                .catch(({response}) => reject(response.data.message))
        })
    )
}

export function getPosts() {
    return dispatch =>
        Http.get('api/post/get')
            .then(({data}) => dispatch(action.setPosts(data)))
            .catch(({response}) => {})
}