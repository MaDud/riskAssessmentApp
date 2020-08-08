import * as action from './actionTypes';

export const initLogin = () => {
    return {
        type: action.INIT_LOGIN
    }
}

export const initLogout = () => {
    return {
        type: action.INIT_LOGOUT
    }
}

export const initSignup = () => {
    return {
        type: action.INIT_SIGNUP
    }
}

export const login = () => {
    return {
        type: action.LOGIN
    }
}

export const logout = () => {
    return {
        type: action.LOGOUT
    }
}

export const signup = () => {
    return {
        type: action.SIGNUP
    }
}

export const loginError = (error) => {
    return {
        type: action.LOGIN_ERROR,
        error: error
    }
}

export const logoutError = (error) => {
    return {
        type: action.LOGOUT_ERROR,
        error: error
    }
}

export const signupError = (error) => {
    return {
        type: action.SIGNUP_ERROR,
        error: error
    }
}

export const signIn = (data) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch(initLogin());
        const firebase = getFirebase();
        firebase.auth().signInWithEmailAndPassword(data.email, data.password)
        .then( () => dispatch(login()))
        .catch(error => dispatch(loginError(error.message)))
    }
}

export const logOut = () => {
    return (dispatch, getState, {getFirebase}) => {
        initLogout();
        const firebase = getFirebase();
        firebase.auth().signOut()
        .then( () => dispatch(logout()))
        .catch(error => dispatch(logoutError(error.message)))
    }
}

export const signUp = (data, name) => {
    return (dispatch, getState, {getFirebase}) => {
        dispatch(initSignup())
        const firebase = getFirebase();
        firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
        .then( () => firebase.updateProfile({displayName: name}))
        .then( () => dispatch(signup()))
        .catch(error => dispatch(signupError(error.message)))
    }
}

export const cleanError = () => {
    return {
        type: action.CLEAN_ERROR
    }
}


