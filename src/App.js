import React from 'react';

import Auxiliary from './hoc/Auxiliary';

//fontawsome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSort, faSortUp, faSortDown, faFolderPlus, faSearch, faTimes, faAngleDoubleLeft, faAngleDoubleRight, faTrashAlt, faEdit, faFolderOpen, faBalanceScaleLeft, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import Layout from './components/Layout/Layout';
import UserPanel from './containers/UserPanel/UserPanel';
import asyncComponent from './hoc/AsyncComponent';

import { connect } from 'react-redux';
import {Route ,Switch, Redirect} from 'react-router-dom';

const AsyncRiskAssessmentOutput = asyncComponent( () => {
  return import('./containers/RiskAssessmentOutput/RiskAssessmentOutput')
})

const AsyncAuthentication = asyncComponent( () => {
  return import('./containers/Authentication/Authentication')
})

const AsyncLandingPage = asyncComponent( () => {
  return import('./containers/Landingpage/Landingpage')
})

const AsyncRiskAssessmentForm = asyncComponent( () => {
  return import('./containers/RiskAssessmentForm/RiskAssessmentForm')
})

const App = props => {
  library.add(fab, faSort, faSortUp, faSortDown, faFolderPlus, faSearch, faTimes, faAngleDoubleLeft, faAngleDoubleRight, faTrashAlt, faEdit, faFolderOpen, faBalanceScaleLeft, faEllipsisV )
  const { auth } = props;
  let router = (<Switch>
                  <Route path="/" exact component={UserPanel}/>
                  <Route path="/riskAssessment/:id" component={AsyncRiskAssessmentOutput} />
                  <Route path='/authentication' component={AsyncAuthentication} />
                  <Route path='/process' component={AsyncLandingPage} />
                  <Redirect to= '/' />
              </Switch>)
  if (auth) {
    router = (<Switch>
                <Route path="/" exact component={UserPanel}/>
                <Route path="/riskAssessment/:id" component={AsyncRiskAssessmentOutput} />
                <Route path='/riskAssessmentForm' exact component={AsyncRiskAssessmentForm} />
                <Route path="/riskAssessmentForm/:id/:version" exact component={AsyncRiskAssessmentForm}/>
                <Route path='/process' component={AsyncLandingPage} />
                <Redirect to= '/' />
            </Switch>)
  }
  return (
    <Auxiliary>
      <Layout>
        {router}
      </Layout>
    </Auxiliary>
  );
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth.uid
  }
}
export default connect(mapStateToProps)(App);
