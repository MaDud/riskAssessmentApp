import React from 'react';

import {connect} from 'react-redux';
import RiskAssessmentNav from '../../components/RiskAssessmentOutput/RiskAssessmentNav/RiskAssessmentNav';
import RiskMatric from '../../components/RiskAssessment/HazardIdentyfication/RiskMatric/RiskMatric';
import Table from '../../components/UI/Table/Table';
import classes from './riskAssessmentOutput.module.css';

const tableHeads = [{label: 'Zagrożenie', id: 'hazard'},
                    {label:'Źródło zagrożenia', id:'source'},
                    {label: 'Możliwe skutki zagrożenia', id: 'possibleEffects'}, 
                    {label: 'Środki ochrony przed zagrożeniem', id:'protection'},
                    {label: 'Ryzyko', id: 'risk'}]


class RiskAssessmentOutput extends React.Component {

    render() {

        const rows = {};
        for (let hazard in this.props.hazardList) {
            rows[this.props.hazardList[hazard]] = {
                            hazard: this.props.hazardList[hazard].value,
                            source: this.props.hazardList[hazard].source,
                            possibleEffect: this.props.hazardList[hazard].possibleEffect,
                            protection: this.props.hazardList[hazard].protection,
                            risk: <RiskMatric effect = {this.props.hazardList[hazard].effect} propability = {this.props.hazardList[hazard].propability} />
            }
        }

        console.log(rows)
        return (
            <div className={classes.Output}>
                <RiskAssessmentNav />
                <div className={classes.Info}>
                    <h5>{'Numer: ' + this.props.number + ' wersja: ' + this.props.version} </h5>
                    <h2>{this.props.data.position}</h2>
                    <h4>Obszar pracy</h4>
                    <p>{this.props.data.localization}</p>
                    <h4>Charakterystyka pracy</h4>
                    <p>{this.props.data.description}</p>   
                </div> 
                <Table table={classes.Table}
                        columns= {tableHeads}
                        rows= {rows}
                         />         
            </div>
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