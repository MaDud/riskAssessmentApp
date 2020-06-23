import * as actionTypes from './actionTypes';
import instance from '../../instance';

export const fetchRASuccess = (id, data) => {
    return {
        type: actionTypes.FETCH_RA_SUCCESS,
        id: id,
        number: data.number,
        version: data.version,
        assessmentData: data.assessmentData,
        hazardList: data.hazardList
    }
}

export const fetchRAFail = () => {
    return {
        type: actionTypes.FETCH_RA_FAIL
    }
}

export const initRAOutput = (id) => {
    return dispatch => {
        Promise.all([instance.get('/hazardList.json'),
        instance.get('/riskAssessment/' + id + '.json')])
        .then(response => { 
            let data0 = response[0].data;
            let data1 = response[1].data;
            let hazards = {};
            for (let el in data0) {
                hazards['hazard'+el] = {value:data0[el], 
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
            let lastSavedVersion = data1.version[data1.version.length - 1];
            for (let el in lastSavedVersion.hazardList) {
                hazards[el] = lastSavedVersion.hazardList[el]
            }
            
            let data = {number: data1.number,
                        version: data1.version.length - 1,
                        status: data1.status,
                        assessmentData: data1.version[data1.version.length - 1].assessmentData,
                        hazardList: hazards}
            
            dispatch(fetchRASuccess(id,data))
        })
        .catch(error => dispatch(fetchRAFail()))
    }
}

export const archiveInit = () => {
    return {
        type: actionTypes.ARCHIVE_INIT
    }
}

export const archiveSuccess = () => {
    return {
        type: actionTypes.ARCHIVE_SUCCESS
    }
}

export const archiveFail = () => {
    return {
        type: actionTypes.ARCHIVE_FAIL
    }
}

export const archiveRA = (id) => {
    return dispatch => {
        dispatch(archiveInit());
        instance.put('/riskAssessment/'+ id + '/status.json', new String('archive'))
        .then(response => dispatch(archiveSuccess()))
        .catch(error => dispatch(archiveFail()))
    }
}

export const raOutputClean = () => {
    return {
        type: actionTypes.RA_OUTPUT_CLEAN
    }
}