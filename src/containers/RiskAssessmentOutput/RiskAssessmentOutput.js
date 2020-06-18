import React from 'react';

import {connect} from 'react-redux';
import RiskAssessmentNav from '../../components/RiskAssessmentOutput/RiskAssessmentNav/RiskAssessmentNav';
import RiskMatric from '../../components/RiskAssessment/HazardIdentyfication/RiskMatric/RiskMatric';
import classes from './riskAssessmentOutput.module.css';

const TABLE_HEADS = ['Zagrożenie','Źródło zagrożenia', 'Możliwe skutki zagrożenia', 'Środki ochrony przed zagrożeniem', 'Ryzyko']


class RiskAssessmentOutput extends React.Component {

    render() {

        const tableHeads = TABLE_HEADS.map( (head, index) => {return <th key={index}>{head}</th>})
        const rows = [];
        for (let hazard in this.props.hazardList) {
            rows.push([ this.props.hazardList[hazard].value,
                        this.props.hazardList[hazard].source,
                        this.props.hazardList[hazard].possibleEffects,
                        this.props.hazardList[hazard].protection,
                        <RiskMatric effect = {this.props.hazardList[hazard].effect} propability = {this.props.hazardList[hazard].propability} type='td' key={4}/>])
            }

            console.log(rows)
        
        const tableRows = rows.map( (row, index) => {
            return <tr key={index}>
                {row.map( (item, index) => {
                    let cell;;
                    if (index === 4) {
                        cell = item
                    } else {
                        cell = <td key={index}>{item}</td>
                    }
                    return cell})}
            </tr>
        })
    
        return (
            <div className={classes.Output}>
                <RiskAssessmentNav 
                    close={this.props.close}
                    archive={this.props.archive}/>
                <div className={classes.Info}>
                    <h5>{'Numer: ' + this.props.number + ' wersja: ' + this.props.version} </h5>
                    <h2>{this.props.data.position}</h2>
                    <h4>Obszar pracy</h4>
                    <p>{this.props.data.localization}</p>
                    <h4>Charakterystyka pracy</h4>
                    <p>{this.props.data.description}</p>   
                </div> 
                <table className={classes.Table}>
                    <thead>
                        <tr>
                            {tableHeads}
                        </tr>
                    </thead>
                    <tbody>
                        {tableRows}
                    </tbody>
                </table>     
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