import * as actionTypes from '../actions/actionTypes';

const initialState = {
    loading: false,
    message: null
}

const riskAssessmentOutput = (state = initialState, action) => {
     
    switch (action.type) {
        case actionTypes.ARCHIVE_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.ARCHIVE_SUCCESS:
            return {
                ...state,
                loading: false,
                message: 'Ocena ryzyka została przeniesiona do archiwum'
            }
        case actionTypes.ARCHIVE_FAIL:
            return {
                ...state,
                loading: false,
                message: 'Wystąpił błąd, spróbuj ponownie'
            }
        case actionTypes.RA_OUTPUT_CLEAN:
            return {
                ...state,
                message: null
            }
        default:
            return state
    }
}

export default riskAssessmentOutput;