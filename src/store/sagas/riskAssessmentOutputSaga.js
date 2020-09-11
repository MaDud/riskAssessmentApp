import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import instance from '../../instance';

export function* archiveRASaga (action) {
    yield put(actions.archiveInit())
    try {
        yield instance.put('/riskAssessment/'+ action.id + '/status.json', new String('archive'))
        yield put(actions.archiveSuccess())
    } catch (error) {
        yield put(actions.archiveFail())
    }
}

