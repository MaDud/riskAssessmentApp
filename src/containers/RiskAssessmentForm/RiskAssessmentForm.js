import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';

import RiskAssessment from '../../components/RiskAssessment/RiskAssessment';
import HazardIdentyfication from '../../components/RiskAssessment/HazardIdentyfication/HazardIdentyfication';

class RiskAssessmentForm extends React.Component {

    state = {
        riskData: {
            jobPosition: '',
            localization: '',
            number: '',
            version: '',
            date: '',
            assessmentTeam: '',
            nextRevision: ''
        },
        hazardIdentyfication: {}
    }

    render() {
        return (
            <Auxiliary>
                <RiskAssessment>
                    <HazardIdentyfication />
                </RiskAssessment>
            </Auxiliary>
        )
    }
};

export default RiskAssessmentForm;