import * as actionTypes from './actionTypes';

export const authenticationInit = () => {
    return {
        type: actionTypes.AUTHENTICATION_INIT
    }
};

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
        .catch(error => dispatch(authenticationFail(error)))
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

export const signOn = (data) => {
    return (dispatch, getState, {getFirebase}) => {
        const firebase = getFirebase();
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then(response => console.log(response))
        .catch(error => console.log(error))
    }
}


