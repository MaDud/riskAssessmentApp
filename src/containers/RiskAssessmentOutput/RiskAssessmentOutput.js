import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import {connect} from 'react-redux';
import * as action from '../../store/actions/index';


class RiskAssessmentOutput extends React.Component {

    render() {
        return (
            <Auxiliary>
                <span>{this.props.number + '/wersja' + this.props.version} </span>
                <h2>stanowisko</h2>
                <h4>Obszar pracy</h4>
                <p>opis</p>
                <h4>Charakterystyka pracy</h4>
                <p>opis</p>             
            </Auxiliary>
        )
    }
};

const mapStateToProps = state => {
    return {
        number: state.riskAssessment.number,
        version: state.riskAssessment.version,
        id: state.riskAssessment.id,
        data: state.riskAssessment.assessmentData,
        hazardList: state.riskAssessment.hazardList
    }
};

export default connect(mapStateToProps)(RiskAssessmentOutput);