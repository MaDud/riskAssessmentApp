import * as actionTypes from './actionTypes';
import instance from '../../instance';

export const archiveHistoryInit = () => {
    return {
        type: actionTypes.ARCHIVE_HISTORY_INIT
    }
}

export const archiveHistorySuccess = (data) => {
    return {
        type: actionTypes.FETCH_ARCHIVE_HISTORY_SUCCESS,
        versionsList: data
    }
}

export const archiveHistoryFail = () => {
    return {
        type: actionTypes.FETCH_ARCHIVE_HISTORY_FAIL
    }
}

export const archive = id => {
    return dispatch => {
        instance.get('/riskAssessment/' + id + '/version.json')
        .then(response => {
            const data = {};
            for (let version in response.data) {
                data[version] = {date: response.data[version].assessmentData.date,
                                notice: response.data[version].assessmentData.notice}
            };
            dispatch(archiveHistorySuccess(data))
        })
        .catch(error => dispatch(archiveHistoryFail()))
    }
}