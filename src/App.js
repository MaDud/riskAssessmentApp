import React from 'react';

import Auxiliary from './hoc/Auxiliary';

import Layout from './components/Layout/Layout';
import RiskAssessmentForm from './containers/RiskAssessmentForm/RiskAssessmentForm';
import UserPanel from './containers/UserPanel/UserPanel';
import RiskAssessmentOutput from './containers/RiskAssessmentOutput/RiskAssessmentOutput';

import {Route ,Switch} from 'react-router-dom';

function App() {
  return (
    <Auxiliary>
      <Layout>
        <Switch>
          <Route path="/" exact component={RiskAssessmentForm}/>
          <Route path="/userPanel" component={UserPanel} />
          <Route path="/riskAssessment" component={RiskAssessmentOutput} />
        </Switch>
      </Layout>
    </Auxiliary>
  );
}

export default App;
