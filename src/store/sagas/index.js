import {takeEvery} from 'redux-saga/effects';
import * as actionTypes from '../actions/actionTypes';

import {archiveRASaga} from './riskAssessmentOutputSaga';

export function* archiveWatcher () {
    yield takeEvery(actionTypes.ARCHIVE_PROCESS, archiveRASaga)
}