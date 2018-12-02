import userProcessReducer from './userProcessReducer';
import currentUser from './currentUser';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  form: formReducer,
  process: userProcessReducer,
  currentUser: currentUser,
})