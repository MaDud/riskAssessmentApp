import * as actionTypes from './actionTypes';
import instance from '../../instance';

export const inputHandler = (e) => {
    return {
        type: actionTypes.INPUT_HANDLER,
        data: e.target.id,
        value: e.target.value,
    }
}

export const setHazards = (hazards) => {
    return {
        type: actionTypes.SET_HAZARDS,
        hazardList: hazards
    }
}

export const fetchHazardsError = () => {
    return {
        type: actionTypes.FETCH_HAZARDS_ERROR
    }
}

export const initHazardsList = () => {
    return dispatch => {
        instance.get('/hazardList.json')
        .then(response => {
            const data = response.data;
            let hazards = {};
            for (let el in data) {
                hazards['hazard'+el] = {value:data[el], 
                    checked:false,
                    source: "",
                    possibleEffects: "",
                    protection: "",
                    effect: "",
                    propability: "",
                    save: false,
                    clean: true};
            };
            dispatch(setHazards(hazards))})
        .catch(error => dispatch(fetchHazardsError()))
    }
}

export const hazardSwitch = (id) => {
    return {
        type: actionTypes.HAZARD_SWITCH,
        id: id
    }
}