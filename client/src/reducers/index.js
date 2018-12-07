import userProcessReducer from './userProcessReducer';
import currentUser from './currentUser';
import surveys from './surveys'
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  form: formReducer,
  surveys: surveys,
  process: userProcessReducer,
  currentUser: currentUser,
})
