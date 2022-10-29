import { composeWithDevTools } from '@redux-devtools/extension'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import AuthReducer,{allUsersReducer} from './Reducers/AuthReducer'
import { FollowReducer, MyPostReducer, PostReducer, UserProfileReducer } from './Reducers/PostReducer'
const rootReducer = combineReducers({
  Auth: AuthReducer,
  post: PostReducer,
  myPost: MyPostReducer,
  allUsers:allUsersReducer,
  User:UserProfileReducer,
  follow:FollowReducer
})

const initialState = {}

const Store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(thunk)),
)

export default Store
