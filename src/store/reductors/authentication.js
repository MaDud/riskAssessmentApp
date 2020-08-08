import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    error: null
};

const authentication = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.INIT_LOGIN:
        case actionTypes.INIT_LOGOUT: 
        case actionTypes.INIT_SIGNUP:
            return {
                ...state,
                loading: true
            }
        case actionTypes.LOGIN:
        case actionTypes.LOGOUT:
        case actionTypes.SIGNUP:
            return {
                ...state,
                loading: false,
                error: null
            };
        case actionTypes.LOGIN_ERROR: 
        case actionTypes.LOGOUT_ERROR:
        case actionTypes.SIGNUP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error
            }
        case actionTypes.CLEAN_ERROR:
            return {
                ...state,
                error: null
            }
        default:
            return state
    }
}

export default authentication