import {
    SURVEYS_FETCHING, SURVEYS_ERROR, SURVEYS_FETCHED
} from "../constants/types"

const initialState = {
    fetching: false,
    fetched: false,
    isError: false,
    errorMessage: '',
    successMessage: '',
    list: []
}

export default (state = initialState, action) => {
    const { type, payload } = action
    switch (type) {
        case SURVEYS_FETCHING:
            return { ...state, fetching: true, fetched: false, isError: false, errorMessage: '', successMessage: '', list: [] }
        case SURVEYS_FETCHED:
            return { ...state, fetching: false, fetched: true, isError: false, errorMessage: '', successMessage: payload.message, list: payload.surveys }
        case SURVEYS_ERROR:
            return { ...state, fetching: false, fetched: false, isError: true, errorMessage: payload.message, successMessage: '', list: [] }
        default: return state
    }
}
