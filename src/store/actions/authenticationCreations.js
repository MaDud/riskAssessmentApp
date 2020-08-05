import * as actionTypes from './actionTypes';

export const authenticationSuccess = () => {
    return {
        type: actionTypes.AUTHENTICATION_SUCCESS
    }
};

export const authenticationFail = (error) => {
    return {
        type: actionTypes.AUTHENTICATION_FAIL,
        error: error
    }
};

export const signIn = (data) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then(response => dispatch(authenticationSuccess()))
        .catch(error => dispatch(authenticationFail('Nieprawidłowe dane logowania')))
    }
}

export const logOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().signOut()
        .then( response => console.log('success'))
        .catch( error => console.log(error))
    }
}

export const signUp = (data, name) => {
    return (dispatch, getState, {getFirebase, getFirestore}) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then( () => firebase.updateProfile({displayName: name}))
        .then( response => console.log(response))
        .catch(error => console.log(error))
    }
}


