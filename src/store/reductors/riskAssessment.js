import * as actionTypes from '../actions/actionTypes';

const date = new Date();
const year = date.getFullYear() + 1;
const month = date.getMonth();
const day = date.getDate();
const reviewDate = new Date(year, month, day).toISOString().substring(0,10);

const initialState = {
    number: 5,
    version: 0,
    assessmentData: {
                    date: new Date().toISOString().substring(0,10),
                    team: '',
                    position: '',
                    localization: '',
                    description: '',
                    notice: '',
                    reviewDate: reviewDate,
                    owner: ''},
    hazardList: null,
    validity: {
            requiredHazards: 2,
            hazardsValidity: false,
            dataValidity: false},
    error: false,
};

const riskAssessment = (state=initialState, action) => {

    switch (action.type) {
        case actionTypes.INPUT_HANDLER:
            return {
                ...state,
                assessmentData: {...state.assessmentData,
                                [action.data]: action.value},
            }
        case actionTypes.CHECK_DATA:
            let isValid;
            const dataPath = state.assessmentData;
            if (dataPath.team !== '' &&
                dataPath.position !== '' &&
                dataPath.localization !== '' &&
                dataPath.description !== '' &&
                dataPath.owner !== '') {
                    isValid = true
            } else {
                isValid = false
            } 
            return {
                ...state,
                validity: {...state.validity,
                           dataValidity: isValid
                }
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
        case actionTypes.SET_NUMBER:
            return {
                ...state,
                number: action.number,
                error: false
            }
        case actionTypes.FETCH_NUMBER_ERROR:
            return {
                ...state,
                error: true
            }
        case actionTypes.HAZARD_SWITCH:
            return {
                ...state,
                hazardList: {...state.hazardList,
                            [action.id]: {...state.hazardList[action.id],
                                        checked: !state.hazardList[action.id].checked}
                            }
            }
        case actionTypes.CLEAN_DATA:
            return {
                ...state,
                hazardList: {...state.hazardList,
                            [action.id]: {...state.hazardList[action.id],
                                source: "",
                                possibleEffects: "",
                                protection: "",
                                effect: "",
                                propability: "",
                                clean: true,
                                save: false,
                                valid: false,
                                checked: !state.hazardList[action.id].checked
                                },
                            }
            }
        case actionTypes.SAVE_DATA:
            let valid = false;
            const path = state.hazardList[action.id];
            if (path.source !== '' &&
                path.possibleEffects !== '' &&
                path.protection !== '' &&
                path.effect !== '' &&
                path.propability !== '') {
                    valid = true
            }
            return {
                ...state,
                hazardList: {...state.hazardList,
                            [action.id]: {...state.hazardList[action.id],
                                        clean: false,
                                        save: true,
                                        valid: valid,
                                        checked: !state.hazardList[action.id].checked}}
            }
        case actionTypes.CHECK:
            let count = 0;
            for (let el in state.hazardList) {
                if (state.hazardList[el].save && state.hazardList[el].valid) {
                    count += 1
                }
            }
            return {
                ...state,
                validity: {
                        ...state.validity,
                        hazardsValidity: count >= state.validity.requiredHazards
                }
            }
        case actionTypes.HAZARD_INPUT_HANDLER:
            return {
                ...state,
                hazardList: {...state.hazardList,
                            [action.id]: {...state.hazardList[action.id],
                                        [action.name]: action.value,
                                        clean: false
                                        }}
            }
        case actionTypes.CLEAN_STATE:
            return {
                number: '',
                version: 0,
                assessmentData: {
                                ...state.assessmentData,
                                team: '',
                                position: '',
                                localization: '',
                                description: '',
                                notice: '',
                                owner: ''},
                hazardList: null,
                validity: {
                        requiredHazards: 2,
                        hazardsValidity: false,
                        dataValidity: false},
                error: false,
            }
        default:
            return state
    }
};

export default riskAssessment;



