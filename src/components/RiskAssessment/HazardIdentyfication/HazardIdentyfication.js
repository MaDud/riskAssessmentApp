import React from 'react';

import HazardForm from './HazardForm/HazardForm';

//lista zagrożeń
const hazards = ['Przeciążenie układu ruchu', 
                'Upadek na tym samym poziomie',
                'Uderzenie o nieruchome przedmioty',
                'Uderzenie przez spadające lub poruszające się przedmioty'
];

//generowanie formularza 
const hazardIdentyfication = props => {

    const hazardsList = hazards.map((el,index) => {
        return <HazardForm 
                key={index}
                hazard={el}
                change={props.change}/>
    });

    return(
        <div>
            {hazardsList}
        </div>
    )
};

export default hazardIdentyfication;