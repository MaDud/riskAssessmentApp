import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import {archiveRASaga, 
    addNewSaga, 
    addNewVersionSaga, 
    addNewWorkCopySaga, 
    addNewVersionWorkCopySaga,
    addNewFromWorkCopySaga,
    initHazardListSaga
} from './userPanelSaga';

import {signInSaga, 
    logOutSaga, 
    signUpSaga
} from './authenticationSaga';

export function* userPanelWatcher () {
    yield takeEvery(actionTypes.ARCHIVE_PROCESS, archiveRASaga);
    yield takeEvery(actionTypes.ADD_NEW_PROCESS, addNewSaga);
    yield takeEvery(actionTypes.ADD_NEW_VERSION_PROCESS, addNewVersionSaga);
    yield takeEvery(actionTypes.ADD_WORK_COPY_PROCESS, addNewWorkCopySaga);
    yield takeEvery(actionTypes.ADD_VERSION_WORK_COPY_PROCESS, addNewVersionWorkCopySaga);
    yield takeEvery(actionTypes.ADD_NEW_FROM_WORK_COPY_PROCESS, addNewFromWorkCopySaga);
    yield takeEvery(actionTypes.HAZARD_LIST_INIT_PROCESS, initHazardListSaga)
}

export function* authenticationWatcher () {
    yield takeEvery(actionTypes.SIGN_IN_PROCESS, signInSaga);
    yield takeEvery(actionTypes.LOG_OUT_PROCESS, logOutSaga);
    yield takeEvery(actionTypes.SIGN_UP_PROCESS, signUpSaga)
}