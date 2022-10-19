import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import AuthReducer from './Reducers/AuthReducer'
import { MyPostReducer, PostReducer } from './Reducers/PostReducer'
const rootReducer = combineReducers({
  Auth: AuthReducer,
  post: PostReducer,
  myPost: MyPostReducer,
})

const initialState = {}

const Store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
)

export default Store
