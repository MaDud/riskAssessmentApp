import * as actionTypes from './actionTypes';
import instance from '../../instance';

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