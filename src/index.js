import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import {userPanelWatcher, authenticationWatcher} from './store/sagas/index';
import userPanel from './store/reductors/userPanel';
import riskAssessment from './store/reductors/riskAssessment';
import archiveHistory from './store/reductors/archiveHistory';
import authentication from './store/reductors/authentication';
import {createFirestoreInstance} from 'redux-firestore';
import { getFirebase, ReactReduxFirebaseProvider, firebaseReducer} from 'react-redux-firebase';
import firebase from './config/fbConfig';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const sagaMiddleware = createSagaMiddleware();

// const createStoreWithFirebase = compose(reduxFirestore(firebase)(createStore));

const reductors = combineReducers({
    userPanel: userPanel,
    riskAssessment: riskAssessment,
    archiveHistory: archiveHistory,
    authentication: authentication,
    firebase: firebaseReducer,
})

const store = createStore(reductors, 
                    composeEnhancers(applyMiddleware(thunk.withExtraArgument({getFirebase}), sagaMiddleware)));

sagaMiddleware.run(userPanelWatcher);
sagaMiddleware.run(authenticationWatcher)

const rrfProps = {
    firebase,
    config: {userProfile: 'users'},
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
