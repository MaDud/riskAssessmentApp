import React from 'react';

import Auxiliary from './hoc/Auxiliary';

//fontawsome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { faSort, faSortUp, faSortDown, faFolderPlus, faSearch, faTimes, faAngleDoubleLeft, faAngleDoubleRight, faTrashAlt, faEdit, faFolderOpen } from '@fortawesome/free-solid-svg-icons'

import Layout from './components/Layout/Layout';
import RiskAssessmentForm from './containers/RiskAssessmentForm/RiskAssessmentForm';
import UserPanel from './containers/UserPanel/UserPanel';
import RiskAssessmentOutput from './containers/RiskAssessmentOutput/RiskAssessmentOutput';

import {Route ,Switch} from 'react-router-dom';

function App() {
  library.add(fab, faSort, faSortUp, faSortDown, faFolderPlus, faSearch, faTimes, faAngleDoubleLeft, faAngleDoubleRight, faTrashAlt, faEdit, faFolderOpen )
  return (
    <Auxiliary>
      <Layout>
        <Switch>
          <Route path="/" exact component={RiskAssessmentForm}/>
          <Route path="/riskAssessmentForm/:id/:version" component={RiskAssessmentForm}/>
          <Route path="/userPanel" component={UserPanel} />
          <Route path="/riskAssessment/:id" component={RiskAssessmentOutput} />
        </Switch>
      </Layout>
    </Auxiliary>
  );
}

export default App;
