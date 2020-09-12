import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import instance from '../../instance';
import { getFirebase } from 'react-redux-firebase';

export function* archiveRASaga (action) {
    yield put(actions.archiveInit());
    try {
        const token = yield getFirebase().auth().currentUser.getIdToken(true).then( token => {return token});
        yield instance.put('/riskAssessment/'+ action.id + '/status.json?auth='+token, new String('archive'));
        yield put(actions.archiveSuccess(action.id))
    } catch (error) {
        yield put(actions.archiveFail());
        console.log(error)
    }
}

