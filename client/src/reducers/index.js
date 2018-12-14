import userProcessReducer from './userProcessReducer';
import currentUser from './currentUser';
import patients from './patients'
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

export default combineReducers({
  form: formReducer,
  patients: patients,
  process: userProcessReducer,
  currentUser: currentUser,
})
