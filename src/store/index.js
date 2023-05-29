import { combineReducers, createStore } from 'redux';
import { userReducer } from './reducers/usersReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const rootReducer = combineReducers({
  users: userReducer,
})

export const store = createStore(rootReducer,composeWithDevTools());