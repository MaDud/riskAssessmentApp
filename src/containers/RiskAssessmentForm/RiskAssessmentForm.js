import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';

import RiskAssessment from '../../components/RiskAssessment/RiskAssessment';
import HazardIdentyfication from '../../components/RiskAssessment/HazardIdentyfication/HazardIdentyfication';
import HazardForm from '../../components/RiskAssessment/HazardIdentyfication/HazardForm/HazardForm';
import instance from '../../instance';

class RiskAssessmentForm extends React.Component {

    state = {
        assesmentData: {
                        number: null,
                        version: null,
                        date: null,
                        team: null,
                        position: null,
                        localization: null,
                        description: null,
                        notice: null,
                        reviewDate: null,
                        owner: null
                        },
        hazardList: null
    };

    //pobieranie zagrożeń z bazy danych i dodawanie ich do state
    componentDidMount () {
        instance.get('/hazardList.json')
            .then(response => {
                const data = response.data;
                let hazardState= {...this.state.hazardList};
                for (let el in data) {
                    let id = 'hazard'+el;
                    hazardState[id] = {value:data[el], 
                                    checked:false,
                                    source: "",
                                    possibleEffects: "",
                                    protection: "",
                                    effect: "",
                                    propability: "",
                                    save: false,
                                    clean: true};
                };
                console.log(hazardState);
                this.setState({hazardList: hazardState})
            })
            .catch(error => console.log(error))
    }

    // funkcja pokazująca formularz identyfikacji zagrożeń w zależności od przycisku typu switch
    hazardUpdate = (id) => {
        const hazardArray = {...this.state.hazardList};
        let hazardElement = {...hazardArray[id]};
        
        hazardElement.checked = !this.state.hazardList[id].checked;

        if (!hazardElement.checked && !hazardElement.save) {
            hazardElement = {value: this.state.hazardList[id].value,
                            checked: hazardElement.checked,
                            source: "",
                            possibleEffects: "",
                            protection: "",
                            effect: "",
                            propability: "",
                            save: false,
                            clean: false,
                            };
        }

        hazardArray[id] = hazardElement;
        this.setState({hazardList:hazardArray})
    }

    //aktualizacja stanu na podstawie wartości inputu
    inputHandler = (event, id) => {
        const hazardArray = {...this.state.hazardList};
        const hazardElement = {...hazardArray[id]};
        const elementName = event.target.name;

        hazardElement[elementName] = event.target.value;
        hazardElement.save = true;
        hazardArray[id] = hazardElement;
        
        this.setState({hazardList:hazardArray})
    }

    dataInputHandler = (e) => {
        const dataArray = {...this.state.assesmentData};
        const elementId = e.target.id;
        let dataElement = e.target.value;
        
        dataArray[elementId] = dataElement;

        this.setState({assesmentData:dataArray})
    }

    //czyszczenie zapisanych danych
    cleanChanges = (event, id) => {
        event.preventDefault();

        const hazardArray = {...this.state.hazardList};
        let hazardElement = {...hazardArray[id]};

        hazardElement = {value: this.state.hazardList[id].value,
                        checked: false,
                        source: "",
                        possibleEffects: "",
                        protection: "",
                        effect: "",
                        propability: "",
                        save: false,
                        clean: true,
                        };
        hazardArray[id] = hazardElement;

        this.setState({hazardList:hazardArray})
    }

    //dodawanie nowej oceny ryzyka do bazy
    addNew = e => {
        e.preventDefault();

        const data = {
            ...this.state,
            status: "active"
        }

        instance.post('/riskAssessment.json', data)
            .then(response => console.log(response))
            .catch(error => console.log(error));

        this.props.history.push('/userPanel')
    }

    //anulowanie dodawania do bazy
    discardChanges = e => {
        e.preventDefault();
    }

    //generowanie formularza po kliknięciu przycisku
    hazardForm = (id) => {

        let hazardForm = null;

        if (this.state.hazardList[id].checked) {
            hazardForm = <HazardForm 
                            change={(e)=> this.inputHandler(e, id)}
                            source={this.state.hazardList[id].source}
                            possibleEffects={this.state.hazardList[id].possibleEffects}
                            protection={this.state.hazardList[id].protection}
                            effectOption={this.state.hazardList[id].effect}
                            propabilityOption={this.state.hazardList[id].propability}
                            effect={this.state.hazardList[id].effect}
                            propability={this.state.hazardList[id].propability}
                            disabled={!this.state.hazardList[id].save}
                            clean={(e) => this.cleanChanges(e, id)}
                        />
        }
        return hazardForm
    }


    render() {   
        console.log(this.state)

        let hazardArray = [];
        for (let key in this.state.hazardList) {
            hazardArray.push({
                id: key,
                value: this.state.hazardList[key].value,
            })
        }

        let hazardIdentyfication = "Spinner in future";
        if (this.state.hazardList !== null) {
            hazardIdentyfication = hazardArray.map( el => {
                return <HazardIdentyfication
                        key={el.id}
                        hazard={el.value}
                        click={()=>this.hazardUpdate(el.id)}
                        checked={this.state.hazardList[el.id].checked}
                        save={this.state.hazardList[el.id].save}>
                            {this.hazardForm(el.id)}
                        </HazardIdentyfication>
                         })
        }  

        return (
            <Auxiliary>
                <RiskAssessment
                    change={e => this.dataInputHandler(e)}
                    add={e => this.addNew(e)}
                    cancel={e => this.discardChanges(e)}>
                    {hazardIdentyfication}
                </RiskAssessment>
            </Auxiliary>
        )
    }
};

export default RiskAssessmentForm;