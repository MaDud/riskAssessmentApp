import * as actionTypes from './actionTypes';
import instance from '../../instance';

export const fetchRASuccess = (id, data) => {
    const path = data.version[data.version.length - 1]
    console.log(path)
    return {
        type: actionTypes.FETCH_RA_SUCCESS,
        id: id,
        number: data.number,
        version: data.version.length - 1,
        assessmentData: {
                        date: path.assessmentData.date,
                        team: path.assessmentData.team,
                        position: path.assessmentData.position,
                        localization: path.assessmentData.localization,
                        description: path.assessmentData.description,
                        notice: path.assessmentData.notice,
                        reviewDate: path.assessmentData.reviewDate,
                        owner: path.assessmentData.owner},
        hazardList: path.hazardList
    }
}

export const fetchRAFail = () => {
    return {
        type: actionTypes.FETCH_RA_FAIL
    }
}

export const initRAOutput = (id) => {
    console.log(id)
    return dispatch => {
        instance.get('/riskAssessment/' + id + '.json')
        .then(response => dispatch(fetchRASuccess(id, response.data)))
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