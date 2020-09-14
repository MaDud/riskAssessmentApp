import {put} from 'redux-saga/effects';
import * as actions from '../actions/index';
import { getFirebase } from 'react-redux-firebase';

export function* signInSaga (action) {
    yield put(actions.initLogin());
    try {
        yield getFirebase().auth().signInWithEmailAndPassword(action.data.email, action.data.password)
        yield put(actions.login())
    } catch (error) {
        yield put(actions.loginError(error.message))
    }
}

export function* logOutSaga (action) {
    yield put(actions.initLogout());
    try {
        yield getFirebase().auth().signOut();
        yield put(actions.logout())
    } catch (error) {
        yield put(actions.logoutError(error.message))
    }
}

export function* signUpSaga (action) {
    yield put(actions.initSignup())
    try {
        yield getFirebase().auth().createUserWithEmailAndPassword(action.data.email, action.data.password);
        yield getFirebase().auth().currentUser.updateProfile({displayName: action.name});
        yield put(actions.signup())
    } catch (error) {
        yield put(actions.signupError(error.message))
    }
}