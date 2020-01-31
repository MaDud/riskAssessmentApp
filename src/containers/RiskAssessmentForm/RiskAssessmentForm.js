import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';

import HazardIdentyfication from '../../components/RiskAssessment/HazardIdentyfication/HazardIdentyfication';
import HazardForm from '../../components/RiskAssessment/HazardIdentyfication/HazardForm/HazardForm';

const hazards = ['Przeciążenie układu ruchu', 
                'Upadek na tym samym poziomie',
                'Uderzenie o nieruchome przedmioty',
                'Uderzenie przez spadające lub poruszające się przedmioty'
                ];  

class RiskAssessmentForm extends React.Component {

    state = {
        hazardList: null,
    };

    //aktualizacja stanu dla listy zagrożeń i mapowanie ich do state
    componentDidMount () {
        let hazardState = {...this.state.hazardList};

        hazards.map((el,index) => {
            let key = "hazard"+index;
            return hazardState[key] = {value: el,
                                    checked: false,
                                    source: "",
                                    possibleEffects: "",
                                    protection: "",
                                    effect: "",
                                    propability: "",
                                    save: false,
                                    clean: true,
                                    touched: false,
                                    extraSave: false,
                                    }
        });

        this.setState({hazardList: hazardState});
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
                            touched: false,
                            extraSave: false
                            };
        } 

        hazardArray[id] = hazardElement;

        this.setState({hazardList:hazardArray})
    }

    //aktualizacja stanu na podstawie wartości inputu
    inputHandler = (event, id) => {
        event.preventDefault();

        const hazardArray = {...this.state.hazardList};
        const hazardElement = {...hazardArray[id]};
        const elementName = event.target.name;

        hazardElement[elementName] = event.target.value;
        hazardElement.touched = true;
        hazardElement.extraSave = false;
        hazardArray[id] = hazardElement;
        
        this.setState({hazardList:hazardArray})
    }

    //zapisywanie zmian
    saveChanges = (event, id) => {
        event.preventDefault();

        const hazardArray = {...this.state.hazardList};
        const hazardElement = {...hazardArray[id]};

        hazardElement.save = true;
        hazardElement.clean = false;
        hazardElement.touched = false;
        hazardElement.extraSave = true;
        
        hazardArray[id] = hazardElement;

        this.setState({hazardList:hazardArray})
    }

    //czyszczenie zapisanych danych
    cleanChanges = (event, id) => {
        event.preventDefault();

        const hazardArray = {...this.state.hazardList};
        let hazardElement = {...hazardArray[id]};

        hazardElement = {value: this.state.hazardList[id].value,
                        checked: true,
                        source: "",
                        possibleEffects: "",
                        protection: "",
                        effect: "",
                        propability: "",
                        save: false,
                        clean: true,
                        touched: false,
                        extraSave: false,
                        };
        hazardArray[id] = hazardElement;

        this.setState({hazardList:hazardArray})
    }

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
                            save={(e) => this.saveChanges(e, id)}
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
        if (this.state.hazardList !==null) {
            hazardIdentyfication = hazardArray.map( el => {
                return <HazardIdentyfication
                        key={el.id}
                        hazard={el.value}
                        checked={()=>this.hazardUpdate(el.id)}>
                            {this.hazardForm(el.id)}
                        </HazardIdentyfication>
                         })
        }  

        return (
            <Auxiliary>
                {hazardIdentyfication}
            </Auxiliary>
        )
    }
};

export default RiskAssessmentForm;