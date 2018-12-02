import {
  USER_REGISTER_FETCHED, USER_REGISTER_ERROR, USER_REGISTER_FETCHING,
  USER_LOGIN_FETCHED, USER_LOGIN_ERROR, USER_LOGIN_FETCHING
} from '../constants/types'

const initialState = {
  fetching: false,
  fetched: false,
  isError: false,
  errors: {},
  errorMessage: '',
  successMessage: '',
};

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case USER_REGISTER_FETCHING:
      return {...state, fetching: true, fetched: false, isError: false, errors: {}, errorMessage: '', successMessage: '' }
    case USER_REGISTER_FETCHED:
      return {...state, fetching: false, fetched: true, isError: false, errors: {}, errorMessage: '', successMessage: payload.message }
    case USER_REGISTER_ERROR:
      return {...state, fetching: false, fetched: false, errors: payload.errors, isError: true, errorMessage: payload.message, successMessage: '' }
    case USER_LOGIN_FETCHING:
      return {...state, fetching: true, fetched: false, isError: false, errors: {}, errorMessage: '', successMessage: '' }
    case USER_LOGIN_FETCHED:
      return {...state, fetching: false, fetched: true, isError: false, errors: {}, errorMessage: '', successMessage: payload.message }
    case USER_LOGIN_ERROR:
      return {...state, fetching: false, fetched: false, errors: payload.errors, isError: true, errorMessage: payload.message, successMessage: '' }
    case 'USER_LOG_OUT':
      return {...state, fetching: false, fetched: true, errors: {}, isError: false, errorMessage: '', successMessage: payload.message}
    default:
      return state
  }
}