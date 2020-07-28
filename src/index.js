import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import userPanel from './store/reductors/userPanel';
import riskAssessment from './store/reductors/riskAssessment';
import riskAssessmentOutput from './store/reductors/riskAssessmentOutput';
import archiveHistory from './store/reductors/archiveHistory';
import { getFirestore, createFirestoreInstance, firestoreReducer} from 'redux-firestore';
import { getFirebase, ReactReduxFirebaseProvider, firebaseReducer} from 'react-redux-firebase';
import firebase from './config/fbConfig';
import authentication from './store/reductors/authentication';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reductors = combineReducers({
    userPanel: userPanel,
    riskAssessment: riskAssessment,
    riskAssessmentOutput: riskAssessmentOutput,
    archiveHistory: archiveHistory,
    authentication: authentication,
    firestore: firestoreReducer,
    firebase: firebaseReducer
})

const store = createStore(reductors, composeEnhancers(applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore}))));

const rrfProps = {
    firebase,
    config: {userProfile: 'users',
                useFirestoreForProfiles: true},
    dispatch: store.dispatch,
    createFirestoreInstance
}
ReactDOM.render(<Provider store={store}>
                    <ReactReduxFirebaseProvider {...rrfProps}>
                        <BrowserRouter>
                            <App/>
                        </BrowserRouter>
                    </ReactReduxFirebaseProvider>
                </Provider>,document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
