import React from 'react';

import Auxiliary from './hoc/Auxiliary';

import Layout from './components/Layout/Layout';
import RiskAssessmentForm from './containers/RiskAssessmentForm/RiskAssessmentForm';

function App() {
  return (
    <Auxiliary>
      <Layout>
        <RiskAssessmentForm/>
      </Layout>
    </Auxiliary>
  );
}

export default App;
