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

export function* userPanelWatcher () {
    yield takeEvery(actionTypes.ARCHIVE_PROCESS, archiveRASaga);
    yield takeEvery(actionTypes.ADD_NEW_PROCESS, addNewSaga);
    yield takeEvery(actionTypes.ADD_NEW_VERSION_PROCESS, addNewVersionSaga);
    yield takeEvery(actionTypes.ADD_WORK_COPY_PROCESS, addNewWorkCopySaga);
    yield takeEvery(actionTypes.ADD_VERSION_WORK_COPY_PROCESS, addNewVersionWorkCopySaga);
    yield takeEvery(actionTypes.ADD_NEW_FROM_WORK_COPY_PROCESS, addNewFromWorkCopySaga);
    yield takeEvery(actionTypes.HAZARD_LIST_INIT_PROCESS, initHazardListSaga)
}