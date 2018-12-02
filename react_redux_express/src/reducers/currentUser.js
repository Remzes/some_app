import {
   SET_CURRENT_USER_FETCHED, SET_CURRENT_USER_FETCHING, SET_CURRENT_USER_NOTAUTH
} from '../constants/types'

const initialState = {
  fetching: true,
  fetched: false,
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_CURRENT_USER_FETCHING:
      return { ...state, isAuthenticated: false, user: {}, fetched: false, fetching: true }
    case SET_CURRENT_USER_FETCHED:
      const isAuthenticated = Object.keys(payload).length > 0
      return { ...state, isAuthenticated: isAuthenticated, user: payload.user, fetched: true, fetching: false }
    case SET_CURRENT_USER_NOTAUTH:
      return { ...state, isAuthenticated: false, user: {}, fetched: true, fetching: false }
    default:
      return state;
  }
}