import * as actionTypes from '../actions/actionTypes';

const initialState = {
    assessmentData: {
                    number: null,
                    version: null,
                    date: null,
                    team: null,
                    position: null,
                    localization: null,
                    description: null,
                    notice: null,
                    reviewDate: null,
                    owner: null},
    hazardList: null,
    error: false
};

const riskAssessment = (state=initialState, action) => {

    switch (action.type) {
        case actionTypes.INPUT_HANDLER:
            console.log(state)
            return {
                ...state,
                assessmentData: {...state.assessmentData,
                                [action.data]: action.value}
            }
        case actionTypes.SET_HAZARDS:
            return {
                ...state,
                hazardList: action.hazardList,
                error: false
            }
        case actionTypes.FETCH_HAZARDS_ERROR:
            return {
                ...state,
                error: true
            }
        // case actionTypes.HAZARD_SWITCH:
        //     return {
        //         ...state,
        //         hazardList: {...state.hazardList,
        //                     [action.id]: {...state.hazardList[action.id],
        //                     checked: !state.hazardList[action.id].checked}
        //                     }
        //     }
        default:
            return state
    }
};

export default riskAssessment;



