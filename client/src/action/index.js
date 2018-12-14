import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { message, notification } from 'antd'
import { setTokenToLocalStorage, deleteTokenFromLocalStorage, getTokenFromLocalStorage } from '../helpers/auth'

import {
  USER_REGISTER_FETCHING, USER_REGISTER_ERROR, USER_REGISTER_FETCHED,
  USER_LOGIN_FETCHING, USER_LOGIN_ERROR, USER_LOGIN_FETCHED,
  SET_CURRENT_USER_FETCHING, SET_CURRENT_USER_FETCHED,
  SET_CURRENT_USER_NOTAUTH,
  PATIENTS_ERROR, PATIENTS_FETCHED, PATIENTS_FETCHING
} from '../constants/types'
import setAuthToken from '../helpers/setAuthToken'

export const registerUser = (values, history) => async dispatch => {
  dispatch({ type: USER_REGISTER_FETCHING })
  const req = await axios.post('/api/users/nurse/register', {
    username: values.username || '',
    password: values.password || '',
    email: values.email || '',
    name: values.name || ''
  })
  if (req.data.success) {
    message.success("You successfully registered as a nurse!", 2, () => history.push('/login'))
    dispatch({ type: USER_REGISTER_FETCHED, payload: req.data })
  } else {
    dispatch({ type: USER_REGISTER_ERROR, payload: req.data })
  }
};

export const loginUser = (values, history) => async dispatch => {
  dispatch({ type: USER_LOGIN_FETCHING })
  const req = await axios.post(`/api/users/${values.type}/login`, {
    username: values.username || '',
    password: values.password || ''
  })
  if (req.data.success) {
    dispatch({ type: USER_LOGIN_FETCHED, payload: {data: req.data, type: values.type }})
    const { token } = req.data
    setTokenToLocalStorage(token)
    setAuthToken(token)
    const decoded = jwt_decode(token)
    dispatch(setCurrentUser(decoded))
  } else {
    if (req.data.errors) {
      const errs = req.data.errors
      if (errs.username) notification.error({ message: errs.username, duration: 3 })
      if (errs.password) notification.error({ message: errs.password, duration: 3 })
    }
    if (req.data.message) message.error(req.data.message)
    dispatch({ type: USER_LOGIN_ERROR, payload: req.data })
  }
};

export const setCurrentUser = decoded => dispatch => {
  dispatch({ type: SET_CURRENT_USER_FETCHED, payload: decoded })
}

export const getMe = () => dispatch => {
  dispatch({ type: SET_CURRENT_USER_FETCHING })
  const token = getTokenFromLocalStorage()
  if (!token) dispatch({ type: SET_CURRENT_USER_NOTAUTH })
  if (token) {
    setAuthToken(token);
    const decoded = jwt_decode(token);
    dispatch(setCurrentUser(decoded));

    const currentTime = Date.now() / 1000;
    if(decoded.exp < currentTime) {
      dispatch(logoutUser())
      window.location.href = '/login'
    }
  }
}

export const getPatients = () => async dispatch => {
  dispatch({ type: PATIENTS_FETCHING })
  const res = await axios.get('/api/patients/list')
  res.data.success
    ? dispatch({ type: PATIENTS_FETCHED, payload: { message: res.data.message, patients: res.data.patients } })
    : dispatch({ type: PATIENTS_ERROR, payload: { message: res.data.message } })
}

export const addPatient = (values, history) => async dispatch => {
  const res = await axios.post('/api/patients/add', {
      username: values.username || '',
      password: values.password || '',
      email: values.email || '',
      name: values.name || ''
  })
  if (res.data.success) {
      message.success(res.data.message, 2, () => history.push('/patients/list'))
  } else {
      message.error(res.data.error)
  }
}

export const addTip = (values, history) => async dispatch => {

}

export const logoutUser = (history, type) => async dispatch => {
  const res = await axios.post(`/api/users/${type}/logout`)
  deleteTokenFromLocalStorage();
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  if (history) history.push('/login');
}
