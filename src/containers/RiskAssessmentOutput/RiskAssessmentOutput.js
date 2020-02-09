import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import Button from '../../components/UI/Button/Button';

class RiskAssessmentOutput extends React.Component {
    render() {
        return (
            <Auxiliary>
                <Button btnType="Submit">Zamknij</Button>
            </Auxiliary>
        )
    }
};

export default RiskAssessmentOutput;