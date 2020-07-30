import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null
};

const authentication = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.AUTHENTICATION_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null
            }
        case actionTypes.AUTHENTICATION_FAIL:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export default authentication