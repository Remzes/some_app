import {
    PATIENTS_FETCHING, PATIENTS_FETCHED, PATIENTS_ERROR
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
        case PATIENTS_FETCHING:
            return { ...state, fetching: true, fetched: false, isError: false, errorMessage: '', successMessage: '', list: [] }
        case PATIENTS_FETCHED:
            return { ...state, fetching: false, fetched: true, isError: false, errorMessage: '', successMessage: payload.message, list: payload.patients }
        case PATIENTS_ERROR:
            return { ...state, fetching: false, fetched: false, isError: true, errorMessage: payload.message, successMessage: '', list: [] }
        default: return state
    }
}
