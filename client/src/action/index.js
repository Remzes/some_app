import axios from 'axios'
import jwt_decode from 'jwt-decode';
import { message } from 'antd'
import { setTokenToLocalStorage, deleteTokenFromLocalStorage, getTokenFromLocalStorage } from '../helpers/auth'

import {
  USER_REGISTER_FETCHING, USER_REGISTER_ERROR, USER_REGISTER_FETCHED,
  USER_LOGIN_FETCHING, USER_LOGIN_ERROR, USER_LOGIN_FETCHED,
  SET_CURRENT_USER_FETCHING, SET_CURRENT_USER_FETCHED,
  SET_CURRENT_USER_NOTAUTH,
  SURVEYS_ERROR, SURVEYS_FETCHED, SURVEYS_FETCHING
} from '../constants/types'
import setAuthToken from '../helpers/setAuthToken'

export const registerUser = (values) => async dispatch => {
  dispatch({ type: USER_REGISTER_FETCHING })
  const req = await axios.post('/api/users/register', {
    username: values.username || '',
    password: values.password || '',
    email: values.email || '',
    name: values.name || ''
  })
  if (req.data.success) {
    dispatch({ type: USER_REGISTER_FETCHED, payload: req.data })
  } else {
    dispatch({ type: USER_REGISTER_ERROR, payload: req.data })
  }
};

export const loginUser = (values, history) => async dispatch => {
  dispatch({ type: USER_LOGIN_FETCHING })
  const req = await axios.post(`/api/users/login`, {
    username: values.username || '',
    password: values.password || ''
  })
  if (req.data.success) {
    dispatch({ type: USER_LOGIN_FETCHED, payload: req.data })
    const { token } = req.data
    setTokenToLocalStorage(token)
    setAuthToken(token)
    const decoded = jwt_decode(token)
    dispatch(setCurrentUser(decoded))
  } else {
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

export const getSurveys = () => async dispatch => {
  dispatch({ type: SURVEYS_FETCHING })
  const res = await axios.get('/api/surveys/list/my')
  res.data.success
    ? dispatch({ type: SURVEYS_FETCHED, payload: { message: res.data.message, surveys: res.data.surveys } })
    : dispatch({ type: SURVEYS_ERROR, payload: { message: res.data.message } })
}

export const submitSurvey = values => async dispatch => {
  const res = await axios.post('/api/surveys/add', {
    title: values.surveyTitle,
    questions: values.questions,
    numberOfQuestions: values.questions.length
  })
  res.data.success
    ? message.success(res.data.message)
    : message.error(res.data.error)
}

export const logoutUser = history => async dispatch => {
  const res = await axios.post('/api/users/logout')
  deleteTokenFromLocalStorage();
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  if (history) history.push('/login');
}
