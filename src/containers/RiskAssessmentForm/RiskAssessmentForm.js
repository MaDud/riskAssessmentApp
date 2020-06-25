import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';
import ErrorBoundaries from '../../hoc/ErrorBoundaries/ErrorBoundaries';
import RiskAssessmentGeneralInfo from '../../components/RiskAssessment/RiskAssessmentGeneralInfo/RiskAssessmentGeneralInfo';
import HazardIdentyfication from '../../components/RiskAssessment/HazardIdentyfication/HazardIdentyfication';
import HazardForm from '../../components/RiskAssessment/HazardIdentyfication/HazardForm/HazardForm';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

class RiskAssessmentForm extends React.Component {

    //pobieranie zagrożeń z bazy danych i dodawanie ich do state
    componentDidMount () {
        if (this.props.RAtype === 'new_version') {
            this.props.initVersion();
        } else if (this.props.RAtype === 'new') {
            this.props.initNumber();
            this.props.initHazardsList()
        }
    }

    //czyszczenie zapisanych danych
    cleanChanges = (event, id) => {
        event.preventDefault();
        this.props.cleanData(id);
        this.props.check()
    }

    //zapisywanie zmian
    saveChanges= (event, id) => {
        event.preventDefault();
        this.props.saveData(id);
        this.props.check()
    }

    //dodawanie nowej oceny ryzyka do bazy
    addNew = e => {
        e.preventDefault();

        let hazards = Object.keys(this.props.hazardList).filter(el => {
            return this.props.hazardList[el].save && this.props.hazardList[el].valid
        })
        let newHazardList = {}
        for (let el in hazards) {
            newHazardList[hazards[el]]= this.props.hazardList[hazards[el]]
        }
        let versionNumber = {};
        versionNumber[this.props.mainData.version] = {assessmentData : this.props.riskAssessment, hazardList: newHazardList};
        let data = {status: 'active', number: this.props.mainData.number, version: versionNumber}
        console.log('version', versionNumber)
        
        if (this.props.RAtype === 'new') {
            this.props.addNew(data);
        } else if (this.props.RAtype === 'new_version') {
            this.props.addNewVersion(this.props.mainData.id ,versionNumber)
        }
        
        this.props.cleanState();
        this.props.history.push('/userPanel')
    }

    dataHandler = (e) => {
        this.props.dataInputHandler(e);
        this.props.checkData()
    }

    //anulowanie dodawania do bazy
    discardChanges = e => {
        e.preventDefault();
        this.props.cleanState();
        this.props.history.push('/userPanel')
    }

    //generowanie formularza po kliknięciu przycisku
    hazardForm = (id) => {

        let hazardForm = null;

        if (this.props.hazardList[id].checked) {
            hazardForm = <HazardForm 
                            change={(e)=> this.props.hazardInputHandler(e, id)}
                            source={this.props.hazardList[id].source}
                            possibleEffects={this.props.hazardList[id].possibleEffects}
                            protection={this.props.hazardList[id].protection}
                            effectOption={this.props.hazardList[id].effect}
                            propabilityOption={this.props.hazardList[id].propability}
                            effect={this.props.hazardList[id].effect}
                            propability={this.props.hazardList[id].propability}
                            disabled={this.props.hazardList[id].clean}
                            clean={(e) => this.cleanChanges(e, id)}
                            save={(e) => this.saveChanges(e, id)}
                        />
        }
        return hazardForm
    }


    render() {          

        let hazardArray = [];
        for (let key in this.props.hazardList) {
            hazardArray.push({
                id: key,
                value: this.props.hazardList[key].value,
            })
        }

        let hazardIdentyfication = "Spinner in future";
        if (this.props.hazardList !== null) {
            hazardIdentyfication = hazardArray.map( el => {
                return <ErrorBoundaries key={el.id}>
                            <HazardIdentyfication
                                key={el.id}
                                hazard={el.value}
                                click={()=>this.props.hazardSwitch(el.id)}
                                checked={this.props.hazardList[el.id].checked}
                                save={this.props.hazardList[el.id].save}
                                valid={this.props.hazardList[el.id].valid}>
                                    {this.hazardForm(el.id)}
                            </HazardIdentyfication>
                        </ErrorBoundaries>})
        }  

        return (
            <Auxiliary>
                <RiskAssessmentGeneralInfo
                    change={e => this.dataHandler(e)}
                    disabled={!(this.props.valid.hazardsValidity && this.props.valid.dataValidity)}
                    add={e => this.addNew(e)}
                    cancel={e => this.discardChanges(e)}
                    number={this.props.mainData.number}
                    version={this.props.mainData.version}
                    date={this.props.riskAssessment.date}
                    team={this.props.riskAssessment.team}
                    position={this.props.riskAssessment.position}
                    localization={this.props.riskAssessment.localization}
                    description={this.props.riskAssessment.description}
                    notice={this.props.riskAssessment.notice}
                    reviewDate={this.props.riskAssessment.reviewDate}
                    owner={this.props.riskAssessment.owner}>
                        {hazardIdentyfication}
                </RiskAssessmentGeneralInfo>
            </Auxiliary>
        )
    }
};

const mapStateToProps = state => {
    return {
        mainData: state.riskAssessment,
        riskAssessment: state.riskAssessment.assessmentData,
        hazardList: state.riskAssessment.hazardList,
        valid: state.riskAssessment.validity,
        RAtype: state.riskAssessment.RAtype
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dataInputHandler: (e) => dispatch(action.inputHandler(e)),
        initHazardsList: () => dispatch(action.initHazardsList()),
        initVersion: () => dispatch(action.initVersion()),
        initNumber: () => dispatch(action.initNumber()),
        hazardSwitch: (id) => dispatch(action.hazardSwitch(id)),
        cleanData: (id) => dispatch(action.cleanData(id)),
        saveData: (e,id) => dispatch(action.saveData(e,id)),
        hazardInputHandler: (e,id) => dispatch(action.hazardInputHandler(e,id)),
        addNew: data => dispatch(action.addNew(data)),
        addNewVersion: (id,data) => dispatch(action.addNewVersion(id,data)),
        check: () => dispatch(action.check()),
        checkData: () => dispatch(action.checkData()),
        cleanState: () => dispatch(action.cleanState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RiskAssessmentForm);