import React from 'react';

import classes from './riskMatric.module.css';
import Auxiliary from '../../../../hoc/Auxiliary';

const riskMatric = props => {

    let value = props.effect+'|'+props.propability;
    let risk;    

    switch (value) {
        case ("small|small"):
            risk = <div className={[classes.Level,classes.ExtraSmall].join(' ')}>Bardzo małe</div>;
            break;
        case ("small|medium"):
        case ("medium|small"):
            risk = <div className={[classes.Level,classes.Small].join(' ')}>Małe</div>;
            break;
        case ("small|big"):
        case ("medium|medium"):
        case ("big|small"):
            risk = <div className={[classes.Level,classes.Medium].join(' ')}>Średnie</div>;
            break;
        case ("medium|big"):
        case ("big|medium"):
            risk = <div className={[classes.Level,classes.Big].join(' ')}>Duże</div>;
            break;
        case ("big|big"):
            risk = <div className={[classes.Level,classes.ExtraBig].join(' ')}>Bardzo duże</div>;
            break;
        default:
            risk = null;
    };

    return risk !== null ? 
            (<Auxiliary>
                {risk}
            </Auxiliary>)
            : null;

};

export default riskMatric;