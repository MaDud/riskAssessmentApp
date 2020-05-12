import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';

import RiskAssessment from '../../components/RiskAssessment/RiskAssessment';
import HazardIdentyfication from '../../components/RiskAssessment/HazardIdentyfication/HazardIdentyfication';
import HazardForm from '../../components/RiskAssessment/HazardIdentyfication/HazardForm/HazardForm';
import { connect } from 'react-redux';
import * as action from '../../store/actions/index';

class RiskAssessmentForm extends React.Component {

    //pobieranie zagrożeń z bazy danych i dodawanie ich do state
    componentDidMount () {
            this.props.initHazardsList()
    }

    //czyszczenie zapisanych danych
    cleanChanges = (event, id) => {
        event.preventDefault();
        this.props.cleanData(id);
        this.props.hazardSwitch(id)
    }

    //zapisywanie zmian
    saveChanges= (event, id) => {
        event.preventDefault();
        this.props.saveData(id);
        this.props.hazardSwitch(id)
    }

    //dodawanie nowej oceny ryzyka do bazy
    addNew = e => {
        e.preventDefault();

        this.props.saveRiskAssessment();

        let hazards = Object.keys(this.props.hazardList).filter(el => {
            return this.props.hazardList[el].save
        })
        let newHazardList = {}
        for (let el in hazards) {
            newHazardList[hazards[el]]= this.props.hazardList[hazards[el]]
        }

        const data = {assessmentData : this.props.riskAssessment, hazardList: newHazardList, status: 'active'}
        this.props.addNew(data)

        this.props.history.push('/userPanel')
    }

    //anulowanie dodawania do bazy
    discardChanges = e => {
        e.preventDefault();
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
                return <HazardIdentyfication
                        key={el.id}
                        hazard={el.value}
                        click={()=>this.props.hazardSwitch(el.id)}
                        checked={this.props.hazardList[el.id].checked}
                        save={this.props.hazardList[el.id].save}>
                            {this.hazardForm(el.id)}
                        </HazardIdentyfication>
                         })
        }  

        return (
            <Auxiliary>
                <RiskAssessment
                    change={e => this.props.dataInputHandler(e)}
                    add={e => this.addNew(e)}
                    cancel={e => this.discardChanges(e)}>
                    {hazardIdentyfication}
                </RiskAssessment>
            </Auxiliary>
        )
    }
};

const mapStateToProps = state => {
    return {
        riskAssessment: state.riskAssessment.assessmentData,
        hazardList: state.riskAssessment.hazardList,
        status: state.riskAssessment.status
    }
};

const mapDispatchToProps = dispatch => {
    return {
        dataInputHandler: (e) => dispatch(action.inputHandler(e)),
        initHazardsList: () => dispatch(action.initHazardsList()),
        hazardSwitch: (id) => dispatch(action.hazardSwitch(id)),
        cleanData: (id) => dispatch(action.cleanData(id)),
        saveData: (e,id) => dispatch(action.saveData(e,id)),
        hazardInputHandler: (e,id) => dispatch(action.hazardInputHandler(e,id)),
        addNew: data => dispatch(action.addNew(data)),
        saveRiskAssessment: () => dispatch(action.saveRiskAssessment())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RiskAssessmentForm);