import * as actionTypes from '../actions/actionTypes';

const initialState = {
    versionsList: {},
    loading: false,
    error: false
};

const archiveHistory = (state=initialState, action) => {

    switch (action.type) {
        case actionTypes.ARCHIVE_HISTORY_INIT:
            return {
                ...state,
                loading: true
            }
        case actionTypes.FETCH_ARCHIVE_HISTORY_SUCCESS:
            return {
                ...state,
                versionsList: action.versionsList,
                loading: false,
                error: false
            }
        case actionTypes.FETCH_ARCHIVE_HISTORY_FAIL:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }

}

export default archiveHistory;