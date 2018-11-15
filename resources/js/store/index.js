import {applyMiddleware,createStore} from 'redux'
import RootReducer from './reducers'
import ReduxThunk from 'redux-thunk'
import logout from './middlewares/Logout'

const store = createStore(
    RootReducer,
    applyMiddleware(...[ReduxThunk, logout])
);

export default store;