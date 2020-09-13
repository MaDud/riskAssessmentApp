import {put, all} from 'redux-saga/effects';
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

export function* addNewSaga (action) {
    yield put(actions.addInit());
    try {
        const token = yield getFirebase().auth().currentUser.getIdToken(true).then( token => {return token});
        yield all( [instance.post('/riskAssessment.json?auth='+token, action.data),
                    instance.put('/prevNumber.json?auth='+token, action.data.number)]);
        yield put(actions.addSuccess())
    } catch (error) {
        yield put(actions.addFail('new'))
    }
}

export function* addNewVersionSaga (action) {
    yield put(actions.addInit());
    try {
        const token = yield getFirebase().auth().currentUser.getIdToken(true).then( token => {return token});
        yield instance.put('/riskAssessment/' + action.id + '/version/' + action.version +'.json?auth=' + token, action.dataToAdd)
        yield put(actions.addVersionSuccess())
    } catch (error) {
        yield put(actions.addFail('new_version'))
    }
}

export function* addNewWorkCopySaga (action) {
    yield put(actions.addInit());
    try {
        const token = yield getFirebase().auth().currentUser.getIdToken(true).then( token => {return token});
        yield all([instance.post('/riskAssessment.json?auth=' + token, action.data),
                            instance.put('/prevNumber.json?auth=' + token, action.data.number)]);
        yield put(actions.addWorkCopySuccess())
    } catch (error) {
        yield put(actions.addFail('new_work_copy'))
    }
}

export function* addNewVersionWorkCopySaga (action) {
    yield put(actions.addInit());
    try {
        const token = yield getFirebase().auth().currentUser.getIdToken(true).then( token => {return token});
        instance.put('/riskAssessment/' + action.id + '/draft/' + action.version +'.json?auth=' + token , action.dataToAdd);
        yield put(actions.addWorkCopySuccess())
    } catch (error) {
        yield put(actions.addFail('new_version_work_copy'))
    }
}

export function* addNewFromWorkCopySaga (action) {
    try {
        const token = yield getFirebase().auth().currentUser.getIdToken(true).then( token => {return token});
        const data = yield instance.get('/riskAssessment/' + action.id + '.json');
        if (data.data.status === 'active') {
            const versionNumber = data.data.version.length;
            yield all([instance.put('/riskAssessment/' + action.id + '/version/' + versionNumber + '.json?auth=' + token, action.dataToAdd),
                    instance.delete('/riskAssessment/' + action.id + '/draft.json')]);
            yield put(actions.addVersionSuccess());
            yield put(actions.removeWorkCopy(action.id))
        } else if (data.data.status === 'draft') {
            yield all([instance.put('/riskAssessment/' + action.id + '/version/0.json?auth' + token, action.dataToAdd),
                    instance.put('/riskAssessment/' + action.id + '/status.json?auth=' + token,  new String('active')),
                    instance.delete('/riskAssessment/' + action.id + '/draft.json?auth=' + token)]);
            yield put(actions.addSuccess());
            yield put(actions.removeWorkCopy(action.id))
        }
    } catch (error) {
        yield put(actions.addFail('add_new_from_work_copy'))
    }
}

export function* initHazardListSaga (action) {
    yield put(actions.hazardListInit());
    try {
        const responseData = yield instance.get('/riskAssessment.json');
        const data = responseData.data;
        const date = new Date();
        let RAlist = {};
        let draftsList = {};
        let active = 0;
        let review = 0;
        let overdue = 0;
        for (let id in data) {
                
            if (data[id].status === 'active') {
                const active_version = data[id].version.length -1;
                const target = data[id].version[active_version].assessmentData;
                const reviewDate = new Date(target.reviewDate);
                const timeDiffrence= reviewDate-date;
                const days= Math.floor(timeDiffrence/(1000 * 60 * 60 * 24));
                RAlist[id] = {no: Number(data[id].number),
                        position: target.position,
                        owner: target.owner,
                        nextReview: reviewDate,
                        status: data[id].status,
                        review: days <= 30 ? true:false,
                        overdue: days < 0 ? true:false};
                
                active += 1;

                if (RAlist[id].review) {
                    review += 1
                } 
                if (RAlist[id].overdue) {
                    overdue += 1
                }
                
                if (data[id].status === 'active' && data[id].draft) {
                    for (let draft in data[id].draft) {
                        if (data[id].draft[draft] !== null) {
                        draftsList[id + '/' + draft] = {no: data[id].number,
                                          position: data[id].draft[draft].assessmentData.position,
                                          owner: data[id].draft[draft].assessmentData.owner}    
                        }
                    }
                }
            } else if (data[id].status === 'draft') {
                for (let draft in data[id].draft) {
                    draftsList[id + '/' + draft] = {no: data[id].number,
                                        position: data[id].draft[draft].assessmentData.position,
                                        owner: data[id].draft[draft].assessmentData.owner}
                }
            }
        };
        yield put(actions.fetchHazardListSuccess(RAlist, draftsList, active, overdue, review))
    } catch (error) {
        yield put(actions.fetchHazardListFail())
    }
}
 

