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

    const hazardsList = hazards.map(el => {
        return <HazardForm 
                hazard={el}/>
    });

    return(
        <div>
            {hazardsList}
        </div>
    )
};

export default hazardIdentyfication;