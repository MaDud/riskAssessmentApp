import * as actionTypes from './actionTypes';
import instance from '../../instance';

export const inputHandler = (e) => {
    return {
        type: actionTypes.INPUT_HANDLER,
        data: e.target.id,
        value: e.target.value,
    }
}

export const checkData = () => {
    return {
        type: actionTypes.CHECK_DATA
    }
}

export const RAtype = (type) => {
    return {
        type: actionTypes.RA_TYPE,
        RAtype: type
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
                    clean: true,
                    valid: false};
            };
            dispatch(setHazards(hazards))})
        .catch(error => dispatch(fetchHazardsError()))
    }
}

export const setNumber = (number) => {
    return {
        type: actionTypes.SET_NUMBER,
        number: number
    }
}

export const fetchNumberError = () => {
    return {
        type: actionTypes.FETCH_NUMBER_ERROR
    }
}

export const initNumber = () => {
    return dispatch => {
        instance.get('/prevNumber.json')
        .then(response => {
            dispatch(setNumber(response.data + 1))
        })
        .catch(error => {
            dispatch(fetchNumberError())
        })
}}

export const initVersion = () => {
    return {
        type: actionTypes.INIT_VERSION
    }
}

export const hazardSwitch = (id) => {
    return {
        type: actionTypes.HAZARD_SWITCH,
        id: id
    }
}

export const cleanData = (id) => {
    return {
        type: actionTypes.CLEAN_DATA,
        id: id
    }
}

export const saveData = (id) => {
    return {
        type: actionTypes.SAVE_DATA,
        id: id
    }
}

export const check = () => {
    return {
        type: actionTypes.CHECK
    }
}

export const hazardInputHandler = (event,id) => {
    return {
        type: actionTypes.HAZARD_INPUT_HANDLER,
        id: id,
        name: event.target.name,
        value: event.target.value
    }
}

export const cleanState = () => {
    return {
        type: actionTypes.CLEAN_STATE
    }
}

