import React from 'react';

import Auxiliary from '../../hoc/Auxiliary';

import HazardIdentyfication from '../../components/RiskAssessment/HazardIdentyfication/HazardIdentyfication';

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
            return hazardState[key] = {value: el, checked: false}
        });
        this.setState({hazardList: hazardState});
    }

    hazardUpdate = (id) => {
        const hazardArray = {...this.state.hazardList};
        const hazardElement = {...hazardArray[id]};

        hazardElement.checked = !this.state.hazardList[id].checked;
        hazardArray[id] = hazardElement;

        this.setState({hazardList:hazardArray})
    }

    render() {   

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
                checked={()=>this.hazardUpdate(el.id)}
                />})
        }  

        return (
            <Auxiliary>
                {hazardIdentyfication}
            </Auxiliary>
        )
    }
};

export default RiskAssessmentForm;