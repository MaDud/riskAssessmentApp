import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import {archiveRASaga} from './userPanelSaga';

export function* userPanelWatcher () {
    yield takeEvery(actionTypes.ARCHIVE_PROCESS, archiveRASaga)
}