import React from 'react';

import {connect} from 'react-redux';
import RiskAssessmentNav from '../../components/RiskAssessmentOutput/RiskAssessmentNav/RiskAssessmentNav';
import RiskMatric from '../../components/RiskAssessment/HazardIdentyfication/RiskMatric/RiskMatric';
import InfoBox from '../../components/UI/InfoBox/InfoBox';
import Button from '../../components/UI/Button/Button';
import classes from './riskAssessmentOutput.module.css';
import * as action from '../../store/actions/index';

const TABLE_HEADS = ['Zagrożenie','Źródło zagrożenia', 'Możliwe skutki zagrożenia', 'Środki ochrony przed zagrożeniem', 'Ryzyko']


class RiskAssessmentOutput extends React.Component {

    state = {
        archiveInfo: false
    }

    componentDidMount () {
        const query = this.props.match.params.id;
        this.props.initRAOutput(query)
    }

    archiveToggle = () => {
        const archiveInfo = !this.state.archiveInfo;
        this.setState({archiveInfo: archiveInfo})
    }

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
        console.log(this.state.archiveInfo)
        return (
            <div className={classes.Output}>
                <RiskAssessmentNav 
                    close={this.props.close}
                    archive={this.archiveToggle}/>
                <InfoBox archiveInfo = {this.state.archiveInfo}>
                    <p>Czy na pewno chcesz przenieśc tą ocenę ryzyka do archiwum?</p>
                    <div className={classes.ButtonBox}>
                        <Button btnType= 'Active'>Przenieś do archiwum</Button>
                        <Button btnType= 'Warning' clicked = {this.archiveToggle}>Anuluj</Button>
                    </div>
                </InfoBox>
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

const mapPropsToDispatch = dispatch => {
    return {
        cleanState: () => dispatch(action.cleanState()),
        initRAOutput: id => dispatch(action.initRAOutput(id))
    }
}

export default connect(mapStateToProps, mapPropsToDispatch)(RiskAssessmentOutput);