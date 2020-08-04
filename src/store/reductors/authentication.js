import * as actionTypes from '../actions/actionTypes';

const initialState = {
    error: null
};

const authentication = (state = initialState, action) => {

    switch (action.type) {
        case actionTypes.AUTHENTICATION_SUCCESS:
            return {
                ...state,
                error: null
            }
        case actionTypes.AUTHENTICATION_FAIL:
            return {
                ...state,
                error: action.error
            }
        default:
            return state
    }
}

export default authentication