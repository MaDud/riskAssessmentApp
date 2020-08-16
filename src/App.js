import React from 'react';

import Auxiliary from './hoc/Auxiliary';

//fontawsome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSort, faSortUp, faSortDown, faFolderPlus, faSearch, faTimes, faAngleDoubleLeft, faAngleDoubleRight, faTrashAlt, faEdit, faFolderOpen, faBalanceScaleLeft, faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import Layout from './components/Layout/Layout';
import RiskAssessmentForm from './containers/RiskAssessmentForm/RiskAssessmentForm';
import UserPanel from './containers/UserPanel/UserPanel';
import RiskAssessmentOutput from './containers/RiskAssessmentOutput/RiskAssessmentOutput';
import Authentication from './containers/Authentication/Authentication';
import LandingPage from './containers/Landingpage/Landingpage';
import { connect } from 'react-redux';

import {Route ,Switch, Redirect} from 'react-router-dom';

const App = props => {
  library.add(fab, faSort, faSortUp, faSortDown, faFolderPlus, faSearch, faTimes, faAngleDoubleLeft, faAngleDoubleRight, faTrashAlt, faEdit, faFolderOpen, faBalanceScaleLeft, faEllipsisV )
  const { auth } = props;
  let router = (<Switch>
                  <Route path="/" exact component={UserPanel}/>
                  <Route path="/riskAssessment/:id" component={RiskAssessmentOutput} />
                  <Route path='/authentication' component={Authentication} />
                  <Route path='/process' component={LandingPage} />
                  <Redirect to= '/' />
              </Switch>)
  if (auth) {
    router = (<Switch>
                <Route path="/" exact component={UserPanel}/>
                <Route path="/riskAssessment/:id" component={RiskAssessmentOutput} />
                <Route path='/riskAssessmentForm' exact component={RiskAssessmentForm} />
                <Route path="/riskAssessmentForm/:id/:version" exact component={RiskAssessmentForm}/>
                <Route path='/process' component={LandingPage} />
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
