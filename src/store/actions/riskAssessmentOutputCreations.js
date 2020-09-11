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
    return {
        type: actionTypes.ARCHIVE_PROCESS,
        id: id
    }
}

export const raOutputClean = () => {
    return {
        type: actionTypes.RA_OUTPUT_CLEAN
    }
}